import * as React from "react";
import {Component} from "react";
import {RevenueOut} from "./RevenueOut";

interface Props {
}

interface State {
    date: string,
    amount: number,
    result: number,
    errorMessage: string;
}

export default class Revenue extends Component<Props, State> {
    state: State = {
        date: "",
        amount: 0,
        result: 0,
        errorMessage: ""
    };

    componentDidMount(): void {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        this.setState({
            date: date.toISOString().substr(0, 10)
        });
    }

    render() {
        return (
            <div className="revenue">
                <form className="revenue" onSubmit={this.onSubmit}>
                    <label htmlFor="date">Purchase date</label>
                    <input name="date" type="date" onChange={this.dateChanged} value={this.state.date}/>

                    <label htmlFor="amount">Amount of $ purchased</label>
                    <input type="number" name="amount" onChange={this.amountChanged} value={this.state.amount}/>

                    <input type="submit"/>
                </form>
                <RevenueOut revenue={this.state.result}/>
                <output>{this.state.errorMessage}</output>
            </div>
        );
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const revenueRequest = {
            date: this.state.date,
            amount: this.state.amount
        };

        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const options = {
            url: "http://localhost:8080/api/calculate",
            method: "POST",
            headers: headers,
            body: JSON.stringify(revenueRequest)
        };

        fetch(options.url, options)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                this.setState({
                    result: json,
                    errorMessage: ""
                });
            })
            .catch(err => err.json().then((json: any) => this.setState({
                errorMessage: json.errors[0].defaultMessage
            })));
    };

    dateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            date: e.target.value
        });
    };

    amountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            amount: Number(e.target.value)
        });
    };
}