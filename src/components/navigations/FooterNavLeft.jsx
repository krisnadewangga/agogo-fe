import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from 'reactstrap';

class FooterNavLeft  extends Component {

  handleChange = (e) => {
    this.props.cartStore.setState({
      searchCode: e.target.value
    }, () => {
      this.buttonSetSearchCode(this.props.cartStore.state.searchCode)
    })
  }

  buttonSetSearchCode(code){
    this.props.cartStore.setSearchCode(code)
    // this.props.cartStore.setKonnek(code);
  }

  resetSearchCode(){
    this.props.cartStore.setState({
      searchCode: ''
    })
  }

  handleTCode = (e) => {
    // this.setState.Tcode = "okokok";
    let Tcode = e.target.value;
    this.props.cartStore.setState({
      Tcode: e.target.value
    }, () => {
      this.props.cartStore.searchTransaksiMCode(Tcode);
    });
  }

  resetSearchTcode(){
    this.props.cartStore.setState({
      Tcode: ''
    })
  }
  

  render() {
    
    return (
      <Navbar expand="md" className="flex-wrap">
        <NavbarBrand className="ml-2 mr-0">
          <Input className="cart-nav-input mr-2" type="input" name="qrcode" id="productQRCode" placeholder="QR Code ..." 
            value={this.props.cartStore.state.searchCode}
            onChange={this.handleChange}
            ref={el => this.inputTitle = el}/>
        </NavbarBrand>

        <NavbarBrand clasName="ml-2 mr-0">
          <Input className="cart-nav-input mr-2" type="text" name="trcode" id="transaksiCode" placeholder="T. Code ..."
           onChange={this.handleTCode} value={this.props.cartStore.state.Tcode} />
           {/* <input type="text" /> */}
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="navPadding" active={this.props.cartStore.state.isTransactionListShow} onClick={() => this.props.cartStore.openTransaction()}><i className="fas fa-folder-open"></i><br />Pending</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navPadding" active={this.props.cartStore.state.isDoneTransactionListShow} onClick={() => this.props.cartStore.openDoneTransaction()}><i className="fas fa-folder-open"></i><br />Selesai</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navPadding px-3" disabled={this.props.cartStore.state.isDisabled} onClick={() => this.props.cartStore.addTransaction(this.props.userNow.id, this.props.modalStore.toggleModal)}><i className="fas fa-save"></i><br />Simpan</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navPadding px-3" disabled={this.props.cartStore.state.isDisabled} active={this.props.cartStore.state.isPaymentCheckoutShow} onClick={() => this.props.cartStore.paymentCheckout()}><i className="fas fa-coins"></i><br/>Bayar</NavLink>
          </NavItem>
        </Nav>

      </Navbar>

    )
  }
}

export default FooterNavLeft

