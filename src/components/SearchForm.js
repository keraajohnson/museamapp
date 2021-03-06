import React, { Component } from "react";
import axios from "axios";

const APIKEY = process.env.REACT_APP_API_KEY; // Your API Key goes here, we should put this in .env

// Searchform is in charge of the actual call to the API,
// It should have a controlled input for searching (what are the 3 things we need to make a controlled input?)
// It will recieve 2 function props, one to pass the current search term to App
// And one to pass the current search results to the App

// This component should have the structure:
// <form>
// 	<label></label>
//	<input type="search"/>
// </form>

class SearchForm extends Component {
  constructor() {
    super();
    console.log(APIKEY);
    this.state = {
      searchInput: ""
    };
  }

  async getSearchResults(query) {
    try {
      const results = await axios.get(
        "https://www.rijksmuseum.nl/api/en/collection/",
        {
          params: {
            imgonly: true,
            ps: 20,
            q: query,
            key: APIKEY
          }
        }
      );
      console.log(results);
      const art = results.data.artObjects;
      this.props.updateArt(art);
      this.props.updateCurrentSearch(this.state.searchInput);

      //   reset the search form
      this.setState({
        searchInput: ""
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.getSearchResults(this.state.searchInput);
  };

  handleChange = event => {
    this.setState({
      searchInput: event.target.value
    });
  };

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <label htmlFor="">Find Some Art</label>
        <input
          type="search"
          id="search"
          name="search"
          value={this.state.searchInput}
          onChange={event => this.handleChange(event)}
        />
      </form>
    );
  }
}

export default SearchForm;
