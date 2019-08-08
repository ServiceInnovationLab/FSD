export default {
  parse: function parse(queryString) {
    const query = {};
    const pairs = (queryString[0] === '?'
      ? queryString.substr(1)
      : queryString
    ).split('&');
    for (const element of pairs) {
      const pair = element.split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  },
};
