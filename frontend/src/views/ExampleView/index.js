import React, { Component } from "react";

class ExampleView extends Component {
  state = {
    message: "Default message",
    error: "",
    isLoading: false
  };

  fetchMessage = () => {
    this.setState({ isLoading: true });

    // HTTP GET Request to our backend api and load into state
    fetch("v1/example")
      .then(res => res.json())
      .then(res => this.setState({ isLoading: false, message: res.data }))
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    let { message, isLoading, error } = this.state;

    return (
      <section className="container">
        <h1>Example View with many features</h1>
        <div className="error">{error}</div>
        <button onClick={this.fetchMessage}>Fetch message from backend</button>
        <h2>{isLoading ? "Loading..." : message}</h2>
      </section>
    );
  }
}

export default ExampleView;
