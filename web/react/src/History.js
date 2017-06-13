import React from "react";
import BetTable from "./BetTable";
import {Pagination} from "react-bootstrap";

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bets: [],
            activePage: 1,
            pageSize: 10,
        };
        this.handlePageSelect = this.handlePageSelect.bind(this);
    }

    componentDidMount() {
        this.fetchHistory(this.state.activePage);
    }

    handlePageSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
        this.fetchHistory(eventKey);
    }

    fetchHistory(page) {
        return fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pageNr: page,
                pageSize: this.state.pageSize,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    bets: responseJson.bets,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <BetTable bets={this.state.bets}/>
                <div className="row">
                    <div className="col-centered">
                        <Pagination bsSize="medium" items={this.state.pageSize} activePage={this.state.activePage} onSelect={this.handlePageSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default History;