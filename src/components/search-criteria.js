import React, { Component } from 'react';

export default class SearchCriteria extends Component {
  render() {
    const { keyword, address, region, category, numOfResults } = this.props;
    const searchCriteria = createSearchCriteria(keyword, address, region, category);

    return (<p>
      {searchCriteria}
      {' '}
      {searchCriteria && 
        <span>
        ({numOfResults} results found)
        </span>
      }
      </p>);
  }
}

function createSearchCriteria(keyword, address, region, category) {
  const search = ['Searching'];

  if (keyword) search.push(
      <span>{' '} for: <b>{keyword}</b>{' '}</span>,
    );
  if (address || region) search.push(
      <span key={address || region}>{' '} near: <b>{address || region}</b></span>,
    );
  if (category) search.push(
      <span>{' '} in: <b>{category}</b></span>,
    );
  if (search.length < 2) return null;

  return search;
}

