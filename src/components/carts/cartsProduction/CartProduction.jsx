import React from 'react'
import { Table, Container, Row, Col, Input, Button, Popover, PopoverBody} from 'reactstrap'
import axios from 'axios'
import CartProductionTotal from '../CartProductionTotal'

import './CartProduction.scss'
import OthersProduction from './OthersProduction';
import ProductionStore from './ProductionStore';

class CartProduction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          //defauilt value of the date time
          date: '',
          prevDate : '',
          lastDate: '',
          days: [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Saturday"
        ],
        };
    }

    componentDidMount() {
        this.props.cartStore.getDateTrx()
    }

    getManagerRole = () => {
        const user = JSON.parse(sessionStorage.getItem("usernow"))
        if(user.role.some(value => [1,2].includes(value))){
            return true
        }
        return false
    }

    render() {
        return (


            <Container className="cart mt-4 pt-5 pr-0 pl-0">
                <Row style={{height: "400px"}}>
                    <Col xs="7" className="body-left">
                        <div className="date">Produksi per <span className="date-update">{this.props.cartStore.state.days[new Date(this.props.cartStore.state.lastDate).getDay()] + ", " +this.props.cartStore.state.formatDate}</span></div>
                        

                        
                        <div className="view-img img-fluid" style={{marginTop: "10px", maxWidth: 300, maxHeight: 300}}>
                            <img className="img-fluid" style={{maxWidth: 300, maxHeight: 300}} src={this.props.cartStore.state.selectedProduct.photo}></img>
                        </div>
                        <div className="select-view-product">
                            { this.props.cartStore.state.selectedProduct.name ? this.props.cartStore.state.selectedProduct.name : "Pilih product untuk melihat stok"}
                        </div>
    
                    </Col>
                    <Col xs="5" className="body-right">
                        <div>
                        <tr>
                            <th><i class="fas fa-plus-circle add-product"> Produksi</i></th>
                        </tr>
                        <tr className="full">
                            <td className="production">Produksi </td>
                            <td className="product-total text-right" id="produksi1">{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi1"] || 0 || "-"}</td>
                            <td className="button "><a className={this.props.cartStore.productionButton2()} onClick={() => this.props.modalStore.toggleModal('production', 'lg', "1")}><i class="fas fa-pen-square edit"></i></a></td>
                        </tr>
                        
                        <hr/>
                        <tr>
                            <td className="total-production">Total Produksi</td>
                            <td className="calc-product-total text-right">{parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi1"] || 0)+
                                                                           parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi2"] || 0)+
                                                                           parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi3"] || 0) || "-"
                                                                           }</td>
                        </tr>
                        </div>
                        {this.getManagerRole() && 
                            <ProductionStore cartStore={this.props.cartStore} modalStore={this.props.modalStore}/>
                        }
                        <OthersProduction cartStore={this.props.cartStore} modalStore={this.props.modalStore}/>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <h5>Catatan {this.props.cartStore.state.selectedProduct.name} : {this.props.cartStore.state.produksi["note"+this.props.cartStore.state.selectedProduct.name] || ""} </h5>
                    </Col>
                </Row>

                {this.getManagerRole() && 
                    <Table borderless striped>
                        <CartProductionTotal date={this.state} cartStore={this.props.cartStore}/>
                    </Table>
                }
            </Container>
        )
    }
}

export default CartProduction