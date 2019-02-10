import React, { Component } from 'react';

export default class ServiceCategories extends Component {
  render() {
    const {keyword, address, category} = this.props
    const parsedKeyword = keyword && firstLetterAsCap(keyword)
    const searchCriteria = createSearchCriteria(parsedKeyword, address, category)

    return <p>{searchCriteria}</p>
  }
};

function createSearchCriteria (keyword, address, category) {
  let search = ["Searching"]

  if (keyword) search.push(<span> for: <b>{keyword}</b> </span>)
  if (address) search.push(<span> near: <b>{address}</b></span>)
  if (category) search.push(<span> in: <b>{category}</b></span>)
  if (search.length < 2) return null

  return search
}

function firstLetterAsCap(str) {
  str = str.split(" ");

  for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}
