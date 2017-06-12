import React from "react";
import BetTable from "./BetTable";

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bets: [],
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.fetchHistory();
    }

    fetchHistory() {
        return fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pageNr: 1,
                pageSize: 10,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    bets: responseJson.bets,
                }, function () {
                    console.log('new state do something');
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <BetTable bets={this.state.bets}/>
        );
    }
}

export default History;