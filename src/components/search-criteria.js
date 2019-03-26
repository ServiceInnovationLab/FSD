import React, { Component } from 'react';

export default class SearchCriteria extends Component {
  render() {
    const { keyword, address, category, numOfResults } = this.props;
    const parsedKeyword = keyword && firstLetterAsCap(keyword);
    const searchCriteria = createSearchCriteria(parsedKeyword, address, category);

    if (numOfResults !== 0){
    return <p>{searchCriteria} ({numOfResults} results found)</p>;
    }
    else {
      return <p>{searchCriteria}</p>
    }
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

function firstLetterAsCap(str) {
  str = str.split(' ');

  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(' ');
}
