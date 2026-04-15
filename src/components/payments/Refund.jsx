import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, FormGroup, Label } from 'reactstrap';
import CalcNumericRefund from '../calcs/CalcNumericRefund';
import './Refund.scss';

const Refund = (props) => {
  return (

    <Row className="Refund d-block">
      <Container>
        <Row className="SidebarHeader">
          <Col>
            <NavLink onClick={() => props.cartStore.toggleOpenRefundShow() || props.cartStore.clearCart()} className="sidebar-header-nav"  style={{color: "white"}}><i className="fas fa-arrow-left mr-2"  style={{color: "white"}}></i>Refund</NavLink>
          </Col>
        </Row>

        <Row sm={4}>
        <FormGroup check>
              <Label style={{marginLeft:"4px", marginRight:"10px"}} check> Toko </Label>
              <Input style={{position: "relative"}} checked={props.cartStore.state.selectedRefund === "TK"} onChange={(e) => props.cartStore.handleRefundChange(e)} value="TK" className="radio sm" size="sm" type="radio" name="TK" id="TK" /> {' '}
            </FormGroup>  
          <FormGroup check>
              <Label style={{marginLeft:"4px", marginRight:"10px"}} check> Pesanan </Label>
              <Input style={{position: "relative"}} checked={props.cartStore.state.selectedRefund === "PS"} onChange={(e) => props.cartStore.handleRefundChange(e)} value="PS" className="radio sm" size="sm" type="radio" name="PS" id="PS" /> {' '}
            </FormGroup>                    
          </Row>

        <Row className="SidebarBody" >

          {/* LEFT */}
          <Col className="pr-0">
            <h5>NOMOR ORDER</h5>
            {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
            <div className={props.cartStore.state.activeInputRefund === 'refundCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.whatRefund + '-' + (props.cartStore.state.valueInputRefund["refundCode"] || "" ? props.cartStore.state.valueInputRefund["refundCode"] || "" : "")}
                name="refundCode" id="refundCode"
                onFocus={props.cartStore.setActiveInputRefund}
                autoFocus
              />
            </div>

            <h5>USER APPROVAL</h5>
            {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
            <div className={props.cartStore.state.activeInputRefund === 'approvalUser' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="text" placeholder="USER APPROVAL" bsSize="lg" 
                name="approvalUser" id="approvalUser"
                onFocus={props.cartStore.setActiveInputRefund}
                onChange={props.cartStore.onChangeUserApprove}
                autoComplete="off"
              />
            </div> 

            <h5>APPROVAL</h5>
            {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
            <div className={props.cartStore.state.activeInputRefund === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="password" placeholder="PIN" bsSize="lg" 
                name="approvalCode" id="approvalCode"
                value={props.cartStore.state.valueInputRefund["approvalCode"]}
                onFocus={props.cartStore.setActiveInputRefund}
                onChange={props.cartStore.onChangePinApprove}
                autoComplete="off"
              />
            </div> 

          </Col>

          {/* RIGHT */}
          <Col className="px-0">
            <CalcNumericRefund
              cartStore={props.cartStore} 
              onEnterRefund={props.cartStore.onEnterRefund}
              modalStore={props.modalStore}
              // inputName={props.cartStore.state.inputName}
            />
            
          </Col>
          
        </Row>

        {/* <Row className="SidebarFooter mt-4">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button onClick={() => props.cartStore.doRefund()} color="danger" size="lg" className="py-3 px-5"><i className="fas fa-retweet mr-2"></i> Search</Button>
          </Col>
        </Row> */}
        <Row className="SidebarFooter mt-4">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button disabled={props.cartStore.state.isDisabledRefund} onClick={() => props.cartStore.doNextRefund(props.modalStore.toggleModal)} color="danger" size="lg" className="py-3 px-5"><i className="fas fa-retweet mr-2"></i> REFUND</Button>
          </Col>
        </Row>
      </Container>
    </Row>

  )
}

export default Refund