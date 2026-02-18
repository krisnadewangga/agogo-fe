import React from 'react'

class ProductionStore extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <tr>
                    <th><i class="fas fa-minus-circle add-product"> Penjualan</i></th>
                </tr>
                <tr>
                    <td className="production-store">Toko</td>
                    <td className="product-total-store text-right" >{ this.props.cartStore.state.produksi["total"+this.props.cartStore.state.selectedProduct.name] || "-"}</td>
                </tr>
                <tr>
                    <td className="booking-production">Pemesanan</td>
                    <td className="product-total-store text-right" >{ this.props.cartStore.state.produksi["pemesanan"+this.props.cartStore.state.selectedProduct.name] || "-"}</td>
                </tr>
                <hr />
                <tr>
                    <td className="total-sales">Total Penjualan</td>
                    <td className="calc-product-total text-right">{parseInt(this.props.cartStore.state.produksi["total"+this.props.cartStore.state.selectedProduct.name] || 0)+
                                                                    parseInt(this.props.cartStore.state.produksi["pemesanan"+this.props.cartStore.state.selectedProduct.name] || 0) || "-"}</td>
                </tr>
            </div>
        )
    }
}

export default ProductionStore