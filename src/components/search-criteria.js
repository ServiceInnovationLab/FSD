import React, { Component } from 'react';

export default class SearchCriteria extends Component {
  render() {
    const { keyword, address, category, numOfResults } = this.props;
    const searchCriteria = createSearchCriteria(keyword, address, category);

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

function createSearchCriteria(keyword, address, category) {
  const search = ['Searching'];

  if (keyword)
    search.push(
      <span>
        {' '}
        for: <b>{keyword}</b>{' '}
      </span>,
    );
  if (address)
    search.push(
      <span key={address}>
        {' '}
        near: <b>{address}</b>
      </span>,
    );
  if (category)
    search.push(
      <span>
        {' '}
        in: <b>{category}</b>
      </span>,
    );
  if (search.length < 2) return null;

  return search;
}

