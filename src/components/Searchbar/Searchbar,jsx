import React, { Component } from 'react';
import './Searchbar.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchform" onSubmit={this.handleSubmit}>
          <input
            className="searchform-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button className="searchform-button" type="submit">
            Search
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;