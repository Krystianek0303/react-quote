import React from "react";

export default class FetchRandom extends React.Component {

    state = {
        loading: true,
        quote: null,
    };
    async componentDidMount() {
        const url = "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ quote: data.results[0], loading: false});
    }


    render() {
        return (
        <div>
            {this.state.loading || !this.state.quote ? (
            <div> loading... </div> 
            ) : (
            <div>
                <div>{this.state.quote.name.first}</div>
            </div>
            )}
        </div>
        );
    }
}