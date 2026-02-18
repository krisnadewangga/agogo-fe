import React from 'react'
import NumberFormat from 'react-number-format';
import { CardDeck, CardImg, CardBody, CardTitle, CardImgOverlay } from 'reactstrap';

import './ProductItem.scss';
import DefaultImage from '../../containers/DefaultImage';

const ProductItem = (props) => {
  return (
    <CardDeck className="product-item p-1">
      {/* idx, id, name, qty, price */}
      <a href="#" onClick={() => props.cartStore.addSelectedProduct(props.productIndex, props.productID, props.productName, props.productQty, props.productPrice, props.activePath, props.modalStore)}>
        <CardImg top width="100%" loading="lazy" src={props.productImage} alt={props.productName} onError={(e) => {
            e.currentTarget.onerror = null; // prevents infinite loop if fallback also fails
            e.currentTarget.src = DefaultImage; // set the fallback source
         }} />
        <CardImgOverlay>
          <CardBody className="p-0">
            <CardTitle className={props.colorTitle}>
              {props.productName.length < 15
                  ? `${props.productName}`
                  : `${props.productName.substring(0, 14)}...`}
              <div>
              <em><h6><NumberFormat value={props.productPrice} displayType={'text'} prefix={'Rp '} /></h6></em>
              </div>
            </CardTitle>
          </CardBody> 
        </CardImgOverlay>
        <i className="product-is-added fas fa-plus-circle"></i>
      </a>
    </CardDeck>
  )
}

export default ProductItem