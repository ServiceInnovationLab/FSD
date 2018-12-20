

import SearchContainer from '../containers/search-container';
import ListOfServiceProviders from '../containers/list-of-service-providers';

  doSetCategory = categoryName => {
    const {
      history: { push, location },
      categoryContext: { setCategory }
    } = this.props;
    setCategory(categoryName);
    push(`${location.pathname}?category=${categoryName}`);
    loadResults(location.search).then(res => this.setState({serviceProviders: res}))
  };

  render() {
    const { serviceProviders } = this.state;
    const { history } = this.props;

    return (
      <section>
        <Header />
        <main role="main">
          <ServiceCategories doSetCategory={this.doSetCategory} />
          <ListOfServiceProviders serviceProviders={serviceProviders} history={history}/>
          <MapContainer id='map' style={{height: '50vh'}} />
        </main>
      </section>
    );
  }
}
