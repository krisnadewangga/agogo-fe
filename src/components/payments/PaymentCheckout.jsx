import React, {Component} from 'react'
import { Container, Row, Col, NavLink, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import NumberFormat from 'react-number-format';
import CalcNumericPayment from '../calcs/CalcNumericPayment'
import './PaymentCheckout.scss';

const InputValue = ({value, label, props}) => {
  return (
    value && <div className={props.cartStore.state.activeInputPayment === label ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
      <span check className="ml-1 mr-2">
        {label.toUpperCase()}
      </span>
      <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
        value={props.cartStore.state.paymentMethod.value?.[label]}
        name={label}
        autoFocus
        onFocus={props.cartStore.moveCaretAtEnd}
      />
      <Input className="input-masking mb-4" type="text" name={label} id={label} placeholder=" ..." bsSize="lg" 
        value={props.cartStore.state.paymentMethod.value?.[label]}
        onFocus={props.cartStore.setActiveInputPayment}
        onChange={props.cartStore.onChangePayment}
        autoFocus
      />
    </div>
  )
}

const PaymentCheckout = (props) => {
  const [cash, setCash] = React.useState(false)
  const [transfer, setTransfer] = React.useState(false)
  const [qris, setQris] = React.useState(false)
  return (

    <Row className="PaymentCheckout d-block">
      <Container>
      <Row className="SidebarHeader">
          <Col sm="7">
            <NavLink onClick={() => props.cartStore.togglePaymentCheckoutShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2 whiteColor"></i><span style={{fontSize: "1em", color: 'white'}}>Lanjut Belanja</span></NavLink>
          </Col>
          <Col sm="5" style={{textAlign: "end"}}>
            <Button onClick={() => props.cartStore.doTransaction(props.userNow.id, props.modalStore.toggleModal)} 
            color="danger" size="lg" className="py-3 px-5 btn-bayar-fixed"><i className="fas fa-coins mr-2"></i> BAYAR</Button>
          </Col>
        </Row>

        {/* <Row className="SidebarBody mt-4 mb-3">
          <Col>
            <h5 className="mb-0">SUB TOTAL</h5>
            <h3><strong><NumberFormat value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></strong></h3>
          </Col>
        </Row> */}

        <Row className="SidebarBody">

          {/* LEFT
            <h5>DISKON</h5>
            {props.cartStore.state.discountType === 'Rp' &&
            <div className={props.cartStore.state.activeInputPayment === 'paymentDiscount' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount" 
                onFocus={props.cartStore.moveCaretAtEnd}
                prefix={'Rp '}
                onChange={props.cartStore.onChangePayment}
              />
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount"
                onFocus={props.cartStore.setActiveInputPayment}
              />
            </div>
            }
            {props.cartStore.state.discountType === '%' &&
            <div className="input-keyboard-wrapper">
              <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="0%" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount"
                onFocus={props.cartStore.moveCaretAtEnd}
                suffix={'%'}
                onChange={props.cartStore.onChangePayment}
              />
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount"
                onFocus={props.cartStore.setActiveInputPayment}
              />
            </div>
            }
             */}
          <Col>
            <h5 className="mb-0">TOTAL</h5>
            <h3><strong><NumberFormat value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></strong></h3>

            <h5 className="mt-4">TOTAL PEMBAYARAN</h5>
            <div>
              <FormGroup
                check
                inline
                className="m-0"
              >
                <Input type="checkbox" className="form-control-sm" value={cash} onChange={(e) => setCash(e.target.checked)}/>
                <span check className="ml-1 mr-2">
                  Cash
                </span>
                <Input type="checkbox" className="form-control-sm" value={transfer} onChange={(e) => setTransfer(e.target.checked)}/>
                <span check className="ml-1 mr-2">
                  Transfer
                </span>
                <Input type="checkbox" className="form-control-sm" value={qris} onChange={(e) => setQris(e.target.checked)}/>
                <span check className="ml-1">
                  QRIS
                </span>
              </FormGroup>
              <InputValue props={props} value={cash} label="cash" />
              <InputValue props={props} value={transfer} label="transfer" />
              <InputValue props={props} value={qris} label="qris" />
            </div>

            {/* <div className={props.cartStore.state.activeInputPayment === 'paymentTotal' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                value={props.cartStore.state.valueInputPayment["paymentTotal"]}
                name="paymentTotal" id="paymentTotal"
                autoFocus
                onFocus={props.cartStore.moveCaretAtEnd}
              />
              <Input className="input-masking mb-4" type="text" name="paymentTotal" id="paymentTotal" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputPayment["paymentTotal"]}
                onFocus={props.cartStore.setActiveInputPayment}
                onChange={props.cartStore.onChangePayment}
                autoFocus
              />
            </div> */}

            <h5 className="mb-0">
              {(props.cartStore.getTotalPayment() < props.cartStore.state.grandTotalAmountDiscount )
              ? 'KURANG' 
              : 'KEMBALI'}
            </h5>
            <h3 className="text-orange mb-3"><strong>
            <NumberFormat value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '}  />
            </strong></h3>

          
            {(props.cartStore.state.jalur == "2") ? 
              <div>
              <h5 className="mt-4">Diambil Oleh ?</h5>
              <Input className="input-masking mb-4" type="text" name="diambilOleh" id="diambilOleh" placeholder="Nama" bsSize="lg" 
                /></div> : ''
            }
          </Col>

          {/* RIGHT */}
          <Col className="px-0">
            <CalcNumericPayment
              cartStore={props.cartStore}
              onChange={props.cartStore.onChange} 
              onChangeInput={props.cartStore.onChangeInput} 
              onEnter={props.cartStore.onEnter} 
              inputName={props.cartStore.state.inputName}
            />
          </Col>
          
        </Row>
      </Container>
    </Row>

  )
}

export default PaymentCheckout