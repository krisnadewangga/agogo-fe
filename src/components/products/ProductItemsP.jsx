import React from 'react'
import ProductItem from './ProductItem';
import { Row, Col } from 'reactstrap';
import "./ProductItems.scss";

const ProductItems = (props) => {
  return (
    <Row className="ProductItems row m-0">

      
      { props.productStore.state.productsFiltered.map((product, index) => 
      <Col xs="4">
        <ProductItem 
          productIndex={index}
          productID={product.id} 
          productName={product.name} 
          productQty={1} 
          productPrice={product.price}
          productStok={product.stock}
          // productImage={product._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url} 
          productImage={product.photo} 
          colorTitle="text-white"
          products={props.products}
          cartStore={props.cartStore} 
          isAdded={props.cartStore.state.isAdded}
          activePath={props.activePath}
          modalStore={props.modalStore}
        />
      </Col>
      )}    

    </Row>
  )
}

export default ProductItems