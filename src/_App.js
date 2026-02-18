import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import './sass/App.scss';
import { Provider, Subscribe, Container } from 'unstated' 

class App extends Component {

  constructor() {
    super();
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    let dataURL = "http://dev.wakwaw.com/agogo/wp-json/wp/v2/produk?_embed";
    // let dataURL = "http://gigit.store/wp-json/wp/v2/product?_embed";
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res
        })
      })
  }

  render() {

    let products = this.state.products.map((product, index) => {
      return <div key={index}>
      <img style={{width:'300px'}} src={product.gambar.guid} />
      {/* <img src={product._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url} /> */}
      <h3>{product.title.rendered}</h3>
      <div>{product.harga}</div>
      <div>{product.kategori}</div>
      </div>
    });

    return (
      <div className="App container">

        <div className="row">
          <div className="col-12">
            {products}
            <Button color="primary">primary</Button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
