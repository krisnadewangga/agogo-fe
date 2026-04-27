import React from 'react'

class ProductionStore extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <th><i className="fas fa-minus-circle add-product"> Penjualan</i></th>
                </tr>
                <tr>
                    <td className="production">Toko</td>
                    <td className="product-total-store text-right" >{ this.props.cartStore.state.produksi["total"+this.props.cartStore.state.selectedProduct.name] || "-"}</td>
                    <td className='d-block' style={{width: '40px'}}>&nbsp;</td>
                </tr>
                <tr>
                    <td className="production">Pemesanan</td>
                    <td className="product-total-store text-right" >{ this.props.cartStore.state.produksi["pemesanan"+this.props.cartStore.state.selectedProduct.name] || "-"}</td>
                    <td></td>
                </tr>
                <hr />
                <tr>
                    <td className="total-sales">Total Penjualan</td>
                    <td className="calc-product-total text-right">{parseInt(this.props.cartStore.state.produksi["total"+this.props.cartStore.state.selectedProduct.name] || 0)+
                                                                    parseInt(this.props.cartStore.state.produksi["pemesanan"+this.props.cartStore.state.selectedProduct.name] || 0) || "-"}</td>
                    <td></td>
                </tr>
            </table>
        )
    }
}

export default ProductionStore