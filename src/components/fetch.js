import React from "react";


class QuoteBox extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        quoteData: [],
        quote: '',
        author: ''
      }
      this.randomQuote = this.randomQuote.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount() {
      const API = 'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
      fetch(API)
          .then((response) => response.json())
          .then((data) => {
              this.setState({
                quoteData: data.quotes
              },()=>{
                // add handle click function here, so that a random quote in shown on initial load
                this.handleClick();
              })
          })
          .catch(error => console.log('Error', error));
          // remove randomQuote() call from here, there is no use of that call here.
  
    }
  
    randomQuote() {
      const randomNumber = Math.floor(Math.random() * this.state.quoteData.length);
      return this.state.quoteData[randomNumber];
    }
  
    handleClick() {
      const oneRandomQuote = this.randomQuote();
      this.setState({
        quote: oneRandomQuote.quote,
        author: oneRandomQuote.author
      })
    }
  
    render() {
      return (
        <div id='quote-box'>
          <h1 id='text'>
            {this.state.quote}
          </h1>
          <h3 id='author'>
            - {this.state.author}
          </h3>
          <Buttons handleClick={this.handleClick}/>
        </div>
      )
    }
  }
  
  class Buttons extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div className='buttons'>
          <a id='tweet-quote' className='button' href={`https://twitter.com/intent/tweet/?text=${this.props.quote} - ${this.props.author}`}><i className='fab fa-twitter'></i></a>
          <button id='new-quote' className='button' onClick={this.props.handleClick}>
            New quote
          </button>
        </div>
      )
    }
  }
