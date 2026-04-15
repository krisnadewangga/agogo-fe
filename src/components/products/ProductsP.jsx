import React, { Component } from 'react';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';
import { Container } from 'reactstrap';
import ProductItems from './ProductItemsP'

import "./Products.scss";


class Products extends Component {

  componentWillMount(){
    this.props.productStore.setProductItemsHeight()
  }

  componentDidMount() {
    this.props.productStore.setFilteredKeyword("Semua Item")
    // this.props.productStore.fetchProducts()
    // this.props.cartStore.fetchProducts()
  }

  render() {

    return (
      <Container fluid className="products p-0">

        <ShadowScrollbars
          style={{ height: 'calc(100vh - 6rem)' }}
          isBlack
        >
          <ProductItems modalStore={this.props.modalStore} activePath={this.props.activePath} productStore={this.props.productStore} cartStore={this.props.cartStore}  />
        </ShadowScrollbars>

      </Container>
    );
  }
}

export default Products;
