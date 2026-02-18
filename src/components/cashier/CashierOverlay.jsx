import React from 'react'

const CashierOverlay = (props) => {
  return (

    <div className={props.isCashierOverlayShow ? "CashierOverlay d-block" : "CashierOverlay d-none"}></div>

  )
}

export default CashierOverlay