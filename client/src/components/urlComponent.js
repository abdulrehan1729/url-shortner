import React, { Component } from "react";
import axios from "axios";
import Loader from "./loader";

export class urlComponent extends Component {
  constructor() {
    super();
    this.state = {
      isUrlShorten: false,
      url: "",
      shortUrl: "",
      copySuccess: false,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const shortBaseUrl = process.env.BASE_URL || "http://localhost:7800";
    axios
      .post("/", {
        originalUrl: this.state.url,
        shortBaseUrl: shortBaseUrl,
      })
      .then((resp) => {
        if (!resp.error) {
          this.setState({
            shortUrl: resp.data.shortUrl,
            isUrlShorten: true,
            isLoading: false,
          });
        } else {
          console.log(resp.error);
        }
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
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
          <h4>Please click on the below link to visit the website</h4>
          <div>
            <a ref={(a) => (this.textArea = a)} href={this.state.shortUrl}>
              {this.state.shortUrl}
            </a>
          </div>
        </div>
      );
    }
  }
}

export default urlComponent;
