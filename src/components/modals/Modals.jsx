import React, { Component } from 'react';
import axios from 'axios'
import { Subscribe } from 'unstated'
import { Button, ModalHeader, ModalBody, ModalFooter, Col, Input, Row, Label } from 'reactstrap';
import { Redirect, Route } from 'react-router-dom'
import './Modal.scss';
import CalcNumericKas from '../calcs/CalcNumericKas';
import CalcNumericModal from '../calcs/CalcNumericModal';
import Modal from 'react-modal'
import NumberFormat from 'react-number-format'

import RootContainer from '../../containers/RootContainer'
import ModalsContainer from '../../containers/ModalsContainer'
import CartsContainer from '../../containers/CartsContainer'

const root = document.getElementById("modal");
const customStyles = {
  content: {
    boxShadow: "7px 7px 33px 0px rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "2rem",
    border: "none",
    
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: "1000000",
    transition: "all 0.3s"
}
}

// Modal.setAppElement("#modal");
// Modal.setAppElement("#root");

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: '',
      days: [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Saturday"
    ],
    userLoggedIn :[],
    name: '',
    transaction: {}
    };
    this.root = React.createRef();
  };

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    if (date < 10) {
      date = '0' + date;
    } 
    if (month < 10) {
      month = '0' + month;
    }
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year,
    });
  }

  componentWillUnmount(){
    this.props.cartStore.clearCart()
  }

  clearCartCloseModal = (props) => {
    this.props.cartStore.clearCart() 
    this.props.toggle()
  }

  clearToggle = () => {
    this.props.toggle()
    this.props.cartStore.resetProduct()
  }

  hideModalTransaction = (props) => {
    // this.props.transactionStore.clearCart() 
    this.props.toggle()
  }
  onChangeInput = event => {
    let input = event.target.value;
    if(this.props.cartStore.state.activeInputRefund === "refundCode1"){
    this.props.cartStore.setState({ valueInputRefund: {refundCode1: input }});
    }
    else if (this.props.cartStore.state.activeInputRefund === "refundCode2") {
    this.props.cartStore.setState({ valueInputRefund: {refundCode2: input }});
    }
    else if (this.props.cartStore.state.activeInputRefund === "refundCode3") {
    this.props.cartStore.setState({ valueInputRefund: {refundCode3: input }});
    }
    else if (this.props.cartStore.state.activeInputRefund === "refundCode4") {
    this.props.cartStore.setState({ valueInputRefund: {refundCode4: input }});
    }
    else if (this.props.cartStore.state.activeInputRefund === "refundCode5") {
    this.props.cartStore.setState({ valueInputRefund: {refundCode5: input }});
    }
    else{
      console.log("input salah")
    }
  };


  renderSwitch(type) {
    const externalCloseBtn = <button className="close" style={{ zIndex:'20', position: 'absolute', top: '20px', right: '20px' }} onClick={this.props.toggle}>&times;</button>;
    switch(type) {
      case 'reguler':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block"><h3>Modal Reguler</h3></ModalHeader>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.props.toggle}>Do Something</Button>{' '}
            <Button color="danger" size="lg" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'simpanKasir':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
        {externalCloseBtn}
        <ModalHeader toggle={this.props.toggle} className="text-center d-block"><h3>Modal Reguler</h3></ModalHeader>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.hideModalTransaction}>Do Something</Button>{' '}
            <Button color="danger" size="lg" onClick={this.hideModalTransaction}>Cancel</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'alert':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block mt-2"><h3>ALERT !</h3></ModalHeader>
          <ModalBody>
            {this.props.message || "Input tidak sesuai"}
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="danger" size="lg" onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i> Close</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'logout':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block mt-2"><h3>Logout</h3></ModalHeader>
          <ModalBody>
            Apakah anda yakin akan keluar ?
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <a href="/logout" color="dark" className="btn btn-dark btn-lg"><i class="fas fa-sign-out-alt mr-1"></i> Log Out</a>
            <Button color="danger" size="lg" onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i> Batalkan</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'logoutKasir':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} className={this.props.className}toggle={this.props.toggle} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody style={{margin: "10px"}}>
            <Row>
            <Col style={{margin: "auto"}} centered>
            <a href="/logout">
            <div className="my-icon">
              <i className="fas fa-sign-out-alt mr-1 fa-7x"></i>
              <Label className="label">Logout</Label>
            </div>
            </a>
            </Col>
            <Col style={{margin: "auto"}} centered>
            <a href="#" onClick={() => this.props.modalStore.clearModal() || this.props.toggleModal('hitungKas', 'lg') || this.props.modalStore.getData()}>
            <div className="my-icon">
              <i className="fas fa-coins mr-1 fa-7x"></i>
              <Label className="label">Hitung Kas</Label>
            </div>
            </a>
            </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="danger" style={{paddingLeft: "50px", paddingRight: "50px"}} onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i>Batal</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'hitungKas':
        const user = sessionStorage.getItem('usernow')
        const data = JSON.parse(user)
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
        {/* {externalCloseBtn} */}
        <ModalHeader className="text-center d-block">
            {data.username.toUpperCase() || "nama user"}
          </ModalHeader>
        <ModalBody>
        <Row>
          <Col xs="7">
          {this.props.cartStore.state.approveOK ?
          <div style={{textAlign: "left", paddingLeft: "30px"}}>
            <h4>
            <tr>
              <td>Saldo Awal </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={this.props.modalStore.state.transaction.saldo_awal} 
              displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </td>
            </tr>
            <tr>
              <td>Transaksi </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.total_transaksi) - 
                parseInt(this.props.modalStore.state.transaction.total_refund)}
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
                </td>
            </tr>
            <hr style={{width: 'auto', marginTop: '10px'}} />
            <tr>
              <td>Saldo Akhir </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.total_transaksi) + 
                parseInt(this.props.modalStore.state.transaction.saldo_awal) - 
                parseInt(this.props.modalStore.state.transaction.total_refund)}
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
                </td>
            </tr>
            <br/>
            <tr>
              <td>CASH </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.cash)}
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </td>
            </tr>
            <tr>
              <td>TRANSFER </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.transfer)}
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </td>
            </tr>
            <tr>
              <td>QRIS </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.qris)}
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </td>
            </tr>
            <hr style={{width: 'auto', marginTop: '10px'}} />
             <tr>
              <td>Pemasukan </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.cash) + 
                parseInt(this.props.modalStore.state.transaction.transfer) +
                parseInt(this.props.modalStore.state.transaction.qris)}
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
                </td>
            </tr>
            {/* <tr>
              <td>Transaksi </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.total_transaksi) - 
                parseInt(this.props.modalStore.state.transaction.total_refund)}
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
                </td>
            </tr>
            <hr style={{width: 'auto', marginTop: '10px'}} />
              <tr>
              <td>Saldo Akhir </td>
              <td>:</td>
              <td className='toRight'>
              <NumberFormat value={parseInt(this.props.modalStore.state.transaction.cash) + 
                parseInt(this.props.modalStore.state.transaction.transfer) +
                parseInt(this.props.modalStore.state.transaction.qris) - 
                parseInt(this.props.modalStore.state.transaction.total_transaksi) - 
                parseInt(this.props.modalStore.state.transaction.total_refund)
              }
                displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
                </td>
            </tr> */}
            </h4>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button color="secondary" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times-circle mr-1"></i> Batalkan</Button>
              <Button href="#" onClick={() => this.props.cartStore.doPostKas(this.props.modalStore.state.transaction, data, this.props.modalStore)} color="danger" className="btn btn-danger btn-lg"><i class="fas fa-check mr-1"></i> Sign Out</Button>
            </div>
          </div>
          :
          <div>
          <h3>USER APPROVAL</h3>
            <div className={this.props.cartStore.state.activeInputRefund === 'approvalUser' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="text" placeholder="USER APPROVAL" bsSize="lg" style={{textAlign: "center", border: "2px solid black"}}
                name="approvalUser" id="approvalUser"
                onFocus={this.props.cartStore.setActiveInputRefund}
                onChange={this.props.cartStore.onChangeUserApprove}
                autoComplete="new-user"
              />
            </div>
          <h3>Approval</h3>
          <div className={this.props.cartStore.state.activeInputApproval === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" placeholder="PIN" bsSize="lg" style={{textAlign: "center", border: "2px solid black"}}
                value={this.props.cartStore.state.valueInputRefund["approvalCode"]}
                name="approvalCode" id="approvalCode" type="password" 
                onFocus={this.props.cartStore.setActiveInputRefund}
                onChange={this.props.cartStore.onChangePinApprove}
                autoComplete="new-pin"
              />
          </div>
          </div>
          }
          </Col>
          <Col xs="5">
          <CalcNumericKas
                  cartStore={this.props.cartStore} 
                  onEnterKas={this.props.cartStore.onEnterKas} 
                  modalStore={this.props.modalStore}
                  data={data}
                />
          </Col>
        </Row>
        </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'bayarPesanan':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {/* {externalCloseBtn} */}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Pesanan Berhasil Disimpan!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
            <Button className="mt-3 py-3 px-5" color="info" size="lg" onClick={() => this.props.cartStore.selectedPrint(this.props.where)}><i class="fas fa-print mr-1"></i> Re-print struk</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'bayarAmbil':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {/* {externalCloseBtn} */}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil!</h2>
            <tr>
              <th className="paewo">Uang dibayarkan : 
                <NumberFormat value={this.props.cartStore.getTotalPayment() || ''} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </th>
            </tr>
            <tr>
            <th className="paewo">Sisa pembayaran : 
                <NumberFormat value={this.props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </th>
            </tr>
            <tr>
            <th className="paewo">Uang kembali : 
                <NumberFormat value={this.props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </th>
            </tr>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
            <Button className="mt-3 py-3 px-5" color="info" size="lg" onClick={() => this.props.cartStore.selectedPrint('kasirTax')}><i class="fas fa-print mr-1"></i> Re-print struk</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );


      case 'pesananAmbil':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {/* {externalCloseBtn} */}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil!</h2>
            <tr>
              <th className="paewo">Uang dibayarkan : 
                <NumberFormat value={this.props.cartStore.state.valueInputPayment["paymentTotal"] || ''} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </th>
            </tr>
            <tr>
            <th className="paewo">Sisa pembayaran : 
                <NumberFormat value={this.props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </th>
            </tr>
            <tr>
            <th className="paewo">Uang kembali : 
                <NumberFormat value={this.props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </th>
            </tr>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
            <Button className="mt-3 py-3 px-5" color="info" size="lg" onClick={() => this.props.cartStore.selectedPrint('pesananTax')}><i class="fas fa-print mr-1"></i> Re-print struk</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );

      
      case 'bayarRefund':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {/* {externalCloseBtn} */}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Refund Berhasil!</h2>
            <tr>
              <th className="paewo">Total Refund : 
                <NumberFormat value={this.props.cartStore.state.totalRefund || ''} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' Rp '} />
              </th>
            </tr>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
            <Button className="mt-3 py-3 px-5" color="info" size="lg" onClick={() => this.props.cartStore.selectedPrint(this.props.where)}><i class="fas fa-print mr-1"></i> Re-print struk</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'hapus':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-times font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Pesanan Berhasil Dihapus!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'simpan':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Data Berhasil Disimpan!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'clearCart':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-times font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Apakah Anda yakin ingin menghapus Cart?</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> Ya, Hapus!</Button>
          </ModalBody>
        </Modal>
          )}
          </div>
      );
      case 'saveTransaction':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil Disimpan!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}> OK</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'showTransaction':
        const transaction = this.props.cartStore.state.showSelectedTransaction
        const uangBayar = parseInt(transaction.cash + transaction.transfer + transaction.qris)
        const uangKembali = parseInt(uangBayar - transaction.total_transaksi)
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <table>
              <tr class="tabletitle">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Jenis</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">Pembelian</td>
              </tr>
              <tr class="tabletitle">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">No order</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{transaction.no_transaksi}</td>
              </tr>
              <tr class="tabletitle">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Tanggal</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{transaction.tgl_bayar}</td>
              </tr>
              <tr class="tabletitle">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Kasir</td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center">{transaction.kasir_name}</td>
              </tr>
              <tr>
                <td colSpan={3}>
                ------------------------------------------------------------
                </td>
              </tr>
              {transaction?.carts?.map((item,index) => 
                <tr class="service">
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">{index + 1}. {item.product_name}</td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">&nbsp;{`(${item.qty} x ${item.price})`}</td>
                  <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
              )}
              <tr>
                <td colSpan={3}>
                ------------------------------------------------------------
                </td>
              </tr>
              <tr class="tabletitle">
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Subtotal </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
               <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={' '} value={transaction.total_transaksi} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
              <tr>
                <td colSpan={3}>
                ------------------------------------------------------------
                </td>
              </tr>
              <tr class="tabletitle">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Grand Total </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={' '} value={transaction.total_transaksi} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
            
              <tr class="tabletitle">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Pembayaran </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={' '} value={uangBayar} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
              <tr class="tabletitle">
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="left">Kembali </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="center"> : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                <td style={{fontFamily: 'Arial, Helvetica, sans-serif'}}align="right"><NumberFormat prefix={' '} value={uangKembali} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
              </tr>
            </table>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'changeDate':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            {this.state.date !== this.props.cartStore.state.formatDate 
            ?
            <div>
              {console.log(this.state.date, this.props.cartStore.state.formatDate)}
            <i className="fas fa-calendar-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Apakah anda yakin akan mengubah posisi tanggal ke hari berikutnya ?</h2>
            <Button className="mt-3 py-3 px-5" color="secondary" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> TIDAK</Button>{" "}
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={() => this.props.cartStore.changeAllDate(this.props.toggleModal, this.clearCartCloseModal)}><i class="fas fa-check mr-1"></i> YA</Button>
            </div>
            :
            <div>
            <i className="fas fa-calendar-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Tanggal sudah diubah!</h2>
            <Button className="mt-3 py-3 px-5" color="secondary" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> Close</Button>{" "}
            </div>
            }
            </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'catatan':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <h4 className="display-6 py-3">Tambah Catatan</h4>
            <div className={this.props.cartStore.state.activeInputBooking === 'note'+this.props.cartStore.state.selectedProduct.name ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                            <Input  
                                    // value={this.props.cartStore.state.valueInputBooking["note"]}
                                    defaultValue={this.props.cartStore.state.produksi["note"+this.props.cartStore.state.selectedProduct.name]}
                                    id={"note"+this.props.cartStore.state.selectedProduct.name}
                                    onChange={this.props.cartStore.onChangeBooking}
                                    onFocus={this.props.cartStore.setActiveInputBooking} 
                                    className="note-production" type="textarea" name="catatan" placeholder="TAMBAH CATATAN" rows="7"
                                    autoFocus
                                    ></Input>
                            </div>
            <Button className="mt-3 py-3 px-5" color="secondary" size="lg" onClick={this.props.toggle}><i class="fas fa-check mr-1"></i> Selesai</Button>{" "}
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'production':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} onAfterClose={this.props.cartStore.resetActiveInputRefund} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered >
          {externalCloseBtn}
          <ModalBody className="p-5">
            <Row>
              <div className="date"><span className="date-update">{this.state.days[new Date().getDay()] + ", " + this.state.date}</span></div>
            </Row>
            <Row>
            <div className="date">
              {this.props.where === "1" && 
              <div>
                Produksi
              </div>
              } 
              {this.props.where === "2" && 
              <div>
                {"Produksi " + this.props.where + " : " + this.props.cartStore.state.selectedProduct.name}
              </div>
              } 
              {this.props.where === "3" && 
              <div>
                {"Produksi " + this.props.where + " : " + this.props.cartStore.state.selectedProduct.name}
              </div>
              }
            </div>
            </Row>
            <Row className="SidebarBody" >
              {/* LEFT */}
              <Col xs='4'>
                <div centered>
                    <img className="img-view" src={this.props.cartStore.state.selectedProduct.photo}></img>
                </div>
                </Col>
                <Col xs='4'>
                <div className={this.props.cartStore.state.activeInputRefund === 'refundCode'+this.props.where ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" type="number" placeholder="Jumlah" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["refundCode1"] || 
                          this.props.cartStore.state.valueInputRefund["refundCode2"] || 
                          this.props.cartStore.state.valueInputRefund["refundCode3"]}
                    name="refundCode" id={"refundCode"+this.props.where}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                    onChange={e => this.onChangeInput(e)}
                    autoFocus
                  />
                </div>
                <div className={this.props.cartStore.state.activeInputRefund === 'approvalUser' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" placeholder="USER APPROVAL" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["approvalUser"]}
                    name="approvalUser" id="approvalUser" type="text"
                    onChange={this.props.cartStore.onChangeUserApprove}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                  />
                </div>
                <div className={this.props.cartStore.state.activeInputRefund === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" placeholder="PIN" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["approvalCode"]}
                    name="approvalCode" id="approvalCode" type="password"
                    onChange={this.props.cartStore.onChangePinApprove}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                  />
                </div>

                <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={() => this.props.cartStore.doProduction(this.props.cartStore.state.selectedProduct.id, this.props.modalStore)}><i class="fas fa-check mr-1"></i> OK</Button>

                </Col>

                <Col xs='4'>
                <CalcNumericModal
                  cartStore={this.props.cartStore} 
                  onEnterRefund={this.props.cartStore.onEnterRefund}
                  modalStore={this.props.modalStore} 
                />
                </Col>
  
              {/* RIGHT */}
              </Row>
          </ModalBody>
        </Modal>
        )}
        </div>
      );

      case 'productionOther':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} onAfterClose={this.props.cartStore.resetActiveInputRefund} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered >
          {externalCloseBtn}
          <ModalBody className="p-5">
            <Row>
              <div className="date"><span className="date-update">{this.state.days[new Date().getDay()] + ", " + this.state.date}</span></div>
            </Row>
            <Row>
            <div className="date">
              {this.props.where === "4" && 
              <div>
                {"Rusak : " + this.props.cartStore.state.selectedProduct.name}
              </div>
              } 
              {this.props.where === "5" && 
              <div>
                {"Lain-lain : " + this.props.cartStore.state.selectedProduct.name}
              </div>
              } 
            </div>
            </Row>
            <Row className="SidebarBody" >
              {/* LEFT */}
              <Col xs='4'>
                <div centered>
                  <img className="img-view" src={this.props.cartStore.state.selectedProduct.photo}></img>
                  <div style={{paddingTop: '10px'}} className={this.props.cartStore.state.activeInputBooking === 'note'+this.props.cartStore.state.selectedProduct.name ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                    <Input  
                            defaultValue={this.props.cartStore.state.produksi["note"+this.props.cartStore.state.selectedProduct.name]}
                            id={"note"+this.props.cartStore.state.selectedProduct.name}
                            onChange={this.props.cartStore.onChangeBooking}
                            onFocus={this.props.cartStore.setActiveInputBooking} 
                            className="note-production" type="textarea" name="catatan" placeholder="TAMBAH CATATAN" rows="4"
                            autoFocus
                            >
                    </Input>
                  </div>
                </div>
                </Col>
                <Col xs='4'>
                <div className={this.props.cartStore.state.activeInputRefund === 'refundCode'+this.props.where ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" type="number" placeholder="Jumlah" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["refundCode4"] ||
                          this.props.cartStore.state.valueInputRefund["refundCode5"]}
                    name="refundCode" id={"refundCode"+this.props.where}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                    onChange={e => this.onChangeInput(e)}
                    autoFocus
                  />
                </div>
                <div className={this.props.cartStore.state.activeInputRefund === 'approvalUser' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" placeholder="USER APPROVAL" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["approvalUser"]}
                    name="approvalUser" id="approvalUser" type="text"
                    onChange={this.props.cartStore.onChangeUserApprove}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                  />
                </div>
                <div className={this.props.cartStore.state.activeInputRefund === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" placeholder="PIN" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["approvalCode"]}
                    name="approvalCode" id="approvalCode" type="password"
                    onChange={this.props.cartStore.onChangePinApprove}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                  />
                </div>

                <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={() => this.props.cartStore.doProduction(this.props.cartStore.state.selectedProduct.id, this.props.modalStore)}><i class="fas fa-check mr-1"></i> OK</Button>

                </Col>

                <Col xs='4'>
                <CalcNumericModal
                  cartStore={this.props.cartStore} 
                  onEnterRefund={this.props.cartStore.onEnterRefund}
                  modalStore={this.props.modalStore} 
                />
                </Col>
  
              {/* RIGHT */}
              </Row>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      default:
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block">Connection Alert</ModalHeader>
          <ModalBody>
            Koneksi terhambat, mohon tunggu beberapa saat lagi
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.props.toggle}>OK</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
    }
  }

  render() {
    return (
      <Subscribe to={[RootContainer, ModalsContainer, CartsContainer]}>
      {(rootStore, modalStore, cartStore) => (
        <div>
          {this.renderSwitch(modalStore.state.modalType)}
        </div>
      )}
    </Subscribe>
    )
  }
}

export default Modals