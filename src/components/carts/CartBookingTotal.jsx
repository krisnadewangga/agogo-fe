import React from 'react'
import { NumericFormat as NumberFormat } from 'react-number-format'

const CartBookingTotal = (props) => {
    return (
        // <tfoot className="tfoot-booking">
        <tfoot className={props.name}>
            <tr className="table-spacer-booking"><td></td></tr>
            <tr className="cart-subtotal">
                <th scope="row">Sub Total</th>
                <td className="subtotal-price"><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} className="h5 font-weight-bold" /></td>
            </tr>
            <tr className="cart-subtotal">
                <th scope="row">Biaya Tambahan</th>
                <td className="subtotal-price"><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            <tr className="cart-subtotal">
                <th scope="row">Diskon</th>
                <td className="subtotal-price">
                    <NumberFormat prefix={props.cartStore.state.discountAmount ? 'Rp ' : 'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />
                </td>
            </tr>
            {/* <tr className="cart-subtotal">
                <td scope="row">Pajak Pemda</td>
                <td className="subtotal-price">
                    <NumberFormat prefix={props.cartStore.state.totalTax ? 'Rp ' : 'Rp '} value={props.cartStore.state.totalTax} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />
                </td>
            </tr> */}

            <tr className="cart-subtotal">
                <th scope="row">Total</th>
                <td className="subtotal-price">
                    <NumberFormat value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                </td>
            </tr>
            <tr className="cart-subtotal">
                <th scope="row">Uang Muka</th>
                <td className="subtotal-price">
                    <NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} />
                </td>
            </tr>
            <tr className="table-spacer"><td></td></tr>
            <tr className="cart-total">
            <th className="header grand-total-label">Sisa Pembayaran</th>
                <th className="header text-right grand-total">
                    <NumberFormat value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                </th> 
            </tr>
        </tfoot>
    )
}

export default CartBookingTotal