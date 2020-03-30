import React, { Component } from "react";
import axios from "axios";

export class urlComponent extends Component {
  constructor() {
    super();
    this.state = {
      isUrlShorten: false,
      url: "",
      shortUrl: "",
      copySuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this);
  }
  handleChange(event) {
    console.log(event);
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const shortBaseUrl = "http://localhost:7800";
    axios
      .post("/", {
        originalUrl: this.state.url,
        shortBaseUrl: shortBaseUrl
      })
      .then(resp => {
        if (!resp.error) {
          this.setState({
            shortUrl: resp.data.shortUrl,
            isUrlShorten: true
          });
        } else {
          console.log(resp.error);
        }
      });
  }
  copyCodeToClipboard = () => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    this.setState({ copySuccess: true });
  };
  render() {
    if (!this.state.isUrlShorten) {
      return (
        <div>
          <h3>Please paste the link below to get shorten version</h3>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="url"
                name="url"
                value={this.state.url}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <textarea
              ref={textarea => (this.textArea = textarea)}
              value={this.state.shortUrl}
            />
          </div>
          <div>
            <button onClick={() => this.copyCodeToClipboard()}>
              Copy to Clipboard
            </button>
            {this.state.copySuccess ? (
              <div style={{ color: "green" }}>Success!</div>
            ) : null}
          </div>
        </div>
      );
    }
  }
}

export default urlComponent;
