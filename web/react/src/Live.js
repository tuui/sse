import React from "react";
import BetTable from "./BetTable";
// import {EventSource} from "react-native-eventsource";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


class Live extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bets: []
        };
    }

    componentDidMount() {
        console.log('Live componentDidMount');
        this.subscription = this.getLiveBetsObserver().subscribe({
            next: (bet) => {
                this.setState({
                    bets: [bet]
                });

                console.log('next');
            },
            error: (err) => console.error(err)
        });
    }

    getLiveBetsObserver() {
        console.log('getLiveBetsObserver');
        // const EventSource = window['EventSource'];

        return Observable.create((observer) => {

            const eventSource = new EventSource('/api/live');
            console.log('Observable.create');
            eventSource.onmessage = (bet) => {
                observer.next(JSON.parse(bet.data));
                console.log('mess');
            };
            eventSource.onerror = (error) => observer.error(error);
            return () => {
                console.log('close eventSource');
                eventSource.close();
            };
        });
    }

    componentWillUnmount() {
        console.log('Live componentWillUnmount');
        // this.eventSource.close();

        this.subscription.unsubscribe();
    }

    render() {
        return (
            <BetTable bets={this.state.bets}/>
        );
    }
}

export default Live;