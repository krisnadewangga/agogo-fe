import React from 'react'

class OthersProduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        popoverOpen: false,
        }
    }

    toggle() {
        this.setState({
        popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <table>
                <tr>
                    <th><i className="fas fa-minus-circle add-product"> Lain-lain</i></th>
                </tr>
                <tr>
                    <td className="production">Rusak/Lain-lain</td>
                    <td className="product-total-broken text-right" >{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "rusak"] || "-"}</td>
                    <td><button type="button" className={this.props.cartStore.productionButton4()} onClick={() => this.props.modalStore.toggleModal('productionOther', 'lg', "4")}><i className="fas fa-pen-square edit"></i></button></td>
                </tr>
                <tr>
                    <td className="production">Airmadidi</td>
                    <td className="product-total-others text-right" >{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "lain"] || "-"}</td>
                    <td><button type="button" className={this.props.cartStore.productionButton5()} onClick={() => this.props.modalStore.toggleModal('productionOther', 'lg', "5")}><i className="fas fa-pen-square edit"></i></button></td>
                </tr>
                <hr />
                <tr>
                    <td className="total-others">Total Lain-lain</td>
                    <td className="calc-product-total text-right">{parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "rusak"] || 0)+
                                                                    parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "lain"] || 0) || "-"}</td>
                </tr>
            </table>
        )
    }
}

export default OthersProduction