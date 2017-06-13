import React from "react";
import moment from 'moment';

class BetTable extends React.Component {
    render() {
        var rows = [];
        this.props.bets.forEach(function (bet) {
            rows.push(<BetRow bet={bet} key={bet.id}/>);
        });
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>id</th>
                    <th>eventId</th>
                    <th>betOfferId</th>
                    <th>username</th>
                    <th>stake</th>
                    <th>odds</th>
                    <th>status</th>
                    <th>placed</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}

class BetRow extends React.Component {
    render() {
        var bet = this.props.bet;
        return (
            <tr>
                <td>{bet.id}</td>
                <td>{bet.eventId}</td>
                <td>{bet.betOfferId}</td>
                <td>{bet.username}</td>
                <td>{bet.stake}</td>
                <td>{bet.odds}</td>
                <td>{bet.status}</td>
                <td>{moment(bet.placed).format('DD.MM.YYYY HH:mm:ss')}</td>
            </tr>
        );
    }
}

export default BetTable;