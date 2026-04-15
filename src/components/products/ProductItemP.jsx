import React from 'react'
import { NumericFormat as NumberFormat } from 'react-number-format';
import { CardDeck, CardImg } from 'reactstrap';

import './ProductItem.scss';
import DefaultImage from '../../containers/DefaultImage';
import DefaultIP from '../../containers/DefaultIP';

const ProductItem = (props) => {
  const imgServer = props.productImage;
  const imgLocal = imgServer ? imgServer.replace("https://pos.agogo-bakery.com", DefaultIP) : DefaultImage;

  return (
    <CardDeck className="product-item p-1">
      {/* idx, id, name, qty, price */}
      <button
        type="button"
        className="w-100 p-0 border-0 bg-transparent text-left"
        onClick={() => props.cartStore.addSelectedProduct(props.productIndex, props.productID, props.productName, props.productQty, props.productPrice, props.activePath, props.modalStore)}
      >
        <div className="product-thumb">
          <CardImg top width="100%" loading="lazy" src={imgLocal} alt={props.productName} onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DefaultImage;
          }} />
          <div className="product-caption">
            <div className={['product-title', props.colorTitle].filter(Boolean).join(' ')}>
              {props.productName.length < 15
                  ? `${props.productName}`
                  : `${props.productName.substring(0, 14)}...`}
            </div>
            <div className="product-price">
              <NumberFormat value={props.productPrice} displayType={'text'} prefix={'Rp '} />
            </div>
          </div>
        </div>
        <i className="product-is-added fas fa-plus-circle"></i>
      </button>
    </CardDeck>
  )
}

export default ProductItem