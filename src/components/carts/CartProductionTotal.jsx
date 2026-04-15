import React from 'react' 
import { NumericFormat as NumberFormat } from 'react-number-format';

const CartProductionTotal = (props) => {
    const fallbackDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayLabels = Array.isArray(props.cartStore.state.days) && props.cartStore.state.days.length === 7
        ? props.cartStore.state.days
        : fallbackDays;
    const lastDate = props.cartStore.state.lastDate ? new Date(props.cartStore.state.lastDate) : new Date();
    const prevDayDate = new Date(lastDate);
    prevDayDate.setDate(prevDayDate.getDate() - 1);
    const prevDayLabel = dayLabels[prevDayDate.getDay()] || '-';

    return (
        <tfoot className="tfoot-booking">
            <tr className="cart-total">
                <th>
                    STOK AWAL <br/>
                    <span className="date">{prevDayLabel + ", " + (props.cartStore.state.prevDate || "-")}</span>  
                </th>
                <th><h2><NumberFormat value={props.cartStore.getStokAwal() || "-"} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  />
                </h2></th>
                <th>
                    SISA STOK
                </th>
                <th><h2><NumberFormat value={props.cartStore.getStokNow() || "-"} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  />
                </h2></th>
            </tr>
        </tfoot>
    )
}

export default CartProductionTotal