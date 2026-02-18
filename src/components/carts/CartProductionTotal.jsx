import React from 'react' 
import NumberFormat from 'react-number-format';

const CartProductionTotal = (props) => {
    return (
        <tfoot className="tfoot-booking">
            {/* <tr className="cart-total">
                <th>
                    STOK AWAL <br/>
                    <span className="date">{props.cartStore.state.days[new Date(props.cartStore.state.lastDate).getDay() - 1] + ", " + props.cartStore.state.prevDate}</span>  
                </th>
                <th><h2><NumberFormat value={props.cartStore.getStokAwal() || "-"} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  />
                </h2></th>
                <th>
                    SISA STOK
                </th>
                <th><h2><NumberFormat value={props.cartStore.getStokNow() || "-"} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  />
                </h2></th>
            </tr> */}
        </tfoot>
    )
}

export default CartProductionTotal