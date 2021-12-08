import React, { Component } from 'react';
import { random } from 'lodash';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: null,
      indexlast: 1,
    }
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.selectQuoteIndex = this.selectQuoteIndex.bind(this);
  }


  componentDidMount() {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(data => data.json())
      .then(quotes => this.setState({ quotes }, this.assignNewQuoteIndex));
  }

  get selectedQuote() {
    if (!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)) {
     return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }

  selectQuoteIndex() {
    if (!this.state.quotes.length) {
      return;
    }
    return random(0, this.state.quotes.length - 1);
  }

  assignNewQuoteIndex() {
    this.setState({ selectedQuoteIndex: this.selectQuoteIndex() });
    this.setState({ indexlast: this.state.selectedQuoteIndex });
    console.log(this.state.indexlast);
    return this.selectedQuoteIndex;
  }

  backquote() {
    this.setState({ selectedQuoteIndex: this.state.indexlast });
  }
  
  

render() {
  return (
    <div className="App" id="quote-box">
      { this.selectedQuote ? `"${this.selectedQuote.quote}" - ${this.selectedQuote.author}` : ''} <br/>
      <button onClick={() => this.backquote()}>Poprzedni Cytat</button>
      <button onClick={this.assignNewQuoteIndex}>Nastepny Cytat</button>
    <h1>My React App - Random Quotes</h1>
    <h2>Author: Krystian</h2>
    </div>
  );
  }
}

export default App;
