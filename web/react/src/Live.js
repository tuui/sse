import React from "react";
import BetTable from "./BetTable";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


class Live extends React.Component {

    max_list_size = 20;

    constructor(props) {
        super(props);
        this.state = {
            bets: []
        };
    }

    componentDidMount() {
        this.subscription = this.getLiveBetsObserver().subscribe({
            next: (bet) => {
                var updatedBets = this.state.bets;
                updatedBets.unshift(bet);
                if (updatedBets.length > this.max_list_size) {
                    updatedBets.splice(-1, updatedBets.length - this.max_list_size);
                }
                this.setState({
                    bets: updatedBets
                });
            },
            error: (err) => console.error(err)
        });
    }

    getLiveBetsObserver() {
        return Observable.create((observer) => {

            const eventSource = new EventSource('/api/live');
            eventSource.onmessage = (bet) => {
                observer.next(JSON.parse(bet.data));
            };
            eventSource.onerror = (error) => observer.error(error);
            return () => {
                eventSource.close();
            };
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <BetTable bets={this.state.bets}/>
        );
    }
}

export default Live;