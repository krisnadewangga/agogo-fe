import React, { Component } from 'react'
import { Table, NavLink, Container, Row, Col } from 'reactstrap';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import TransactionHeader from './TransactionHeader';
import TransactionItems from './TransactionItems';
import FooterNavRight from '../navigations/FooterNavRight';


class TransactionList extends Component {
  constructor(props){
    super(props)
  }
    state = {
    footerNvaBarHeight: 350,
    windowInnerHeight: 0,
    productItemsHeight: 0,
  }

  componentDidMount(){
    this.props.cartStore.fetchTransaction()
  }


  componentWillMount(){
    this.setState({
      windowInnerHeight: window.innerHeight
    },
      () => {
        this.setState({
          productItemsHeight: this.state.windowInnerHeight - this.state.footerNvaBarHeight
        })
      }
    );
  }


    render() {
      return (
        <Container className="transaction d-block">
        <NavLink onClick={() => this.props.cartStore.toggleOpenTransactionShow()} className="sidebar-header-nav" style={{color: "white"}}><i className="fas fa-arrow-left mr-2" style={{color: "white"}}></i>Transaksi Tertunda</NavLink>
            <Table style={{color: "white"}} borderless striped>
              <TransactionHeader />
            </Table>
  
            <ShadowScrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMin={500}
              autoHeightMax={500}
            >
              <div className="scroll-wrapper" id="Cobaaa">
                <Table style={{color: "white"}} borderless striped className="mb-0">
                  <TransactionItems cartStore={this.props.cartStore} paid={false} modalStore={this.props.modalStore}/>
                </Table>
              </div>
            </ShadowScrollbars>

            <Row className="product-nav no-gutters">
              <Col xs="12">
                <FooterNavRight cartStore={this.props.cartStore} rootStore={this.props.rootStore} modalStore={this.props.modalStore}/>
              </Col>
            </Row>
        </Container>
      );
    }
}

export default TransactionList