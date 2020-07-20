function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const quotes = [
{
  quote: "It is well with my soul.",
  author: "Unknown" },

{
  quote: "Just do the best you can.",
  author: "The Author" },

{
  quote: "I am as bad as the worst, but, thank God, I am as good as the best.",
  author: "Oscar Wilde" },

{
  quote:
  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  author: "Albert Einstein" },

{ quote: "I'm selfish, impatient, and a little insecure. I make mistakes, I'm out of control, and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
  author: "Marily Manroe" },
{
  quote: "A room without books is like a body without a soul.",
  author: "Marcus Tullius Cicero" },

{
  quote:
  "If a man does his best, what else is there?.",
  author: "George Patterson" }];



const getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const Text = props => {
  return React.createElement("div", { id: "text" }, props.text);
};

const Author = props => {
  return React.createElement("span", { id: "author" }, props.text);
};

const Tweet = props => {
  return (
    React.createElement("a", {
      id: "tweet-quote",
      className: "button",
      href: "https://www.twitter.com/intent/tweet".concat(props.tweet),
      target: "_blank" },

    React.createElement("i", { className: "fab fa-twitter" })));


};

class Button extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleClick",


    () => {
      console.log("Click happened in Button");
      this.props.handleClick();
    });}

  render() {
    return (
      React.createElement("button", { onClick: this.handleClick, type: "button", id: "new-quote" },
      this.props.children));


  }}


class QuoteBox extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleClick",







    () => {
      console.log("Click handled by QuoteBox");
      let index = getRandomInt(quotes.length);
      do {
        index = getRandomInt(quotes.length);
      } while (
      this.state.quote === quotes[index].quote);

      this.setState(prevState => ({
        quote: quotes[index].quote,
        author: quotes[index].author }));

    });this.state = { quote: this.props.quote, author: this.props.author };}

  render() {
    return (
      React.createElement("div", { id: "quote-box" },
      React.createElement("blockquote", null,
      React.createElement(Text, { text: this.state.quote }),
      React.createElement("cite", null,
      React.createElement(Author, { text: this.state.author }))),



      React.createElement("div", { id: "action" },
      React.createElement(Tweet, {
        tweet: encodeURI(
        "?hashtags=quotes&related=freeCodeCamp&text=".
        concat(this.state.quote).
        concat(" ").
        concat(this.state.author)) }),


      React.createElement(Button, { handleClick: this.handleClick }, "Quote"))));



  }}


class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement(QuoteBox, {
        quote: "The best way to find yourself is to lose yourself in the service of others..",
        author: "Mahatman Gandhi" }));


  }}


ReactDOM.render(React.createElement(Quote, null), document.getElementById("app"));