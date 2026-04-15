import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { NumericFormat as NumberFormat } from 'react-number-format';
import TimePicker from 'react-time-picker'

import './OrderBooking.scss';
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'

const OrderBooking = (props) => {
        const toDateValue = (date) => {
            if (!date) return '';
            const d = new Date(date);
            if (Number.isNaN(d.getTime())) return '';
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${d.getFullYear()}-${month}-${day}`;
        };

        return (

            <Row className="OrderBooking d-block">
                <Container>
                    <Row>
                        <Col>
                            <NavLink onClick={() => props.cartStore.toggleOrderBookingShow() || props.cartStore.clearCart()} className="sidebar-header-nav" style={{color: "white"}}><i className="fas fa-arrow-left mr-2" style={{color: "white"}}></i> Pemesanan</NavLink>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs="6" className="pl-0">
                        <Col>
                            <h7 className="mb-0">PEMESAN</h7>
                            {/* <Input className="input pemesan" placeholder="NAMA" text-color="white"></Input> */}
                            <Input className="input-nama" type="text" name="bookingName" id="bookingName" placeholder="NAMA" 
                                value={props.cartStore.state.valueInputBooking["bookingName"]} 
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                        <Col>
                            <h7 className="mb-0">TANGGAL SELESAI</h7>
                            {/* <Input className="input tgl" placeholder="DD-MM-YYYY"></Input> */}
                            {/* <Input className="input-tgl" type="date" name="bookingDate" id="bookingDate" placeholder="DD-MM-YYYY"
                                value={props.cartStore.state.valueInputBooking["bookingDate"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                /> */}
                            <Input
                                className="input-tgl"
                                type="date"
                                name="bookingDate"
                                id="bookingDate"
                                value={toDateValue(props.cartStore.state.startDate)}
                                min={toDateValue(new Date())}
                                onChange={(e) => props.cartStore.handleDateChange(new Date(e.target.value))}
                            />
                        </Col>
                        <Col>
                            <h7 className="mb-0">JAM SELESAI</h7>
                            {/* <Input className="input jam" placeholder="HH-MM"></Input> */}
                            <TimePicker onChange={props.cartStore.onChangeTime} 
                                        format="HH:mm" value={props.cartStore.state.time}
                                        locale="sv-sv" />
                        </Col>
                        <Col>
                            <h7 className="mb-0">TELEPON</h7>
                            <Input className="input-telepon" type="text" name="bookingPhone" id="bookingPhone" placeholder="TELEPON"
                                value={props.cartStore.state.valueInputBooking["bookingPhone"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                autoComplete="new-bookingPhone"
                                />
                        </Col>
                        
                        </Col>
                        <Col xs="6"  className="pl-0">
                        <Col>
                            <h7 className="mb-0">ALAMAT</h7>
                            {/* <Input className="input alamat" type="textarea" placeholder="ALAMAT"></Input> */}
                            <Input className="input-alamat" type="textarea" name="bookingAddress" id="bookingAddress" placeholder="ALAMAT"
                                value={props.cartStore.state.valueInputBooking["bookingAddress"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                autoComplete="new-bookingAddress"
                                />
                        </Col>
                        <Col>
                            <h7 className="mb-0">CATATAN</h7>
                            {/* <Input className="input-note" type="textarea" placeholder="CATATAN"></Input> */}
                            <Input className="input-note" type="textarea" name="bookingNote" id="bookingNote" placeholder="CATATAN"
                                    value={props.cartStore.state.valueInputBooking["bookingNote"]} style={{marginTop:"0px"}}
                                    onChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    />
                        </Col>
                        
                        </Col>
                    </Row>
                    <Row className="Sidebar">
                        {/* LEFT */}
                        <Col className="pr-0">
                            <Form>
                                <FormGroup row>
                                    <Label sm={4} style={{paddingRight: "0"}} className="control-label">BIAYA TAMBAHAN</Label>
                                    <Col sm={7} style={{paddingLeft: "0", paddingRight: "0"}}>
                                    <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="input-uangTambah" placeholder="Rp 0"  
                                    name="bookingAddition" id="bookingAddition"
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"]}  
                                    onValueChange={props.cartStore.onChangeBooking}                                  
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    autoComplete="off"
                                    />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={4} className="control-label">DISKON</Label>
                                    <Col sm={6} style={{float: "left", paddingLeft: "0", paddingRight: "0"}} >
                                    {props.cartStore.state.discountType === 'Rp' &&
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="input-uangDiskon" placeholder="Rp 0" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount" 
                                    onValueChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    autoComplete="off"
                                    prefix={'Rp '}/>
                                    }
                                    {props.cartStore.state.discountType === '%' &&
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="input-uangDiskon" placeholder="%" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onValueChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    autoComplete="off"
                                    suffix={'%'}/>
                                    }
                                    </Col>
                                    <Col sm={2}>
                                    <FormGroup check className="pl-0">
                                        <Input checked={props.cartStore.state.discountType === "Rp"} onChange={props.cartStore.handleDiscountChange} value="Rp" className="radio sm " size="sm" type="radio" name="Rp" id="Rp" /><Label check> Rp </Label>
                                    </FormGroup>
                                    <FormGroup check className="pl-0">
                                        <Input checked={props.cartStore.state.discountType === "%"} onChange={props.cartStore.handleDiscountChange} value="%" className="radio sm " size="sm" type="radio" name="%" id="%" /><Label check> % </Label>
                                    </FormGroup>   
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={4} className="control-label">UANG MUKA</Label>
                                    <Col style={{paddingLeft: "0", paddingRight: "0"}} sm={7}>
                                        <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="input-uangMuka" placeholder="RP 0"  
                                        name="bookingPayment" id="bookingPayment"
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                        onValueChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}
                                        autoComplete="off"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                <Row >
                                {/* <Label sm={2} className="approval">USER</Label> */}
                                <Col sm={6} style={{paddingRight: "9%"}}>
                                <Input className="input-user" type="text" placeholder="USER APPROVAL" 
                                        name="approvalUser" id="approvalUser"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangeUserApprove}
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col sm={6} style={{paddingLeft: '1%', paddingRight: "9%"}}>
                                <Input className="input-password" type="password" placeholder="PIN" 
                                        // value={props.cartStore.state.valueInputBooking["approvalCode"]}
                                        name="approvalCode" id="approvalCode"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangePinApprove}
                                        autoComplete="off"
                                    />
                                </Col>
                                </Row>
                                <Row style={{paddingTop: "10px", paddingLeft:"3%"}}>
                                {/* <Label sm={2} className="approval">APPROVAL</Label> */}
                                
                                <Button onClick={() => props.cartStore.addReservation(props.userNow, props.modalStore.toggleModal)} color="danger"><i className="fas fa-edit"></i> SIMPAN</Button>
                                
                                </Row>
                            </FormGroup>
                            </Form>
                            <Row className="product-nav no-gutters " >

                                <Col xs="12">
                                    <FooterNavRightBooking cartStore={props.cartStore} rootStore={props.rootStore} modalStore={props.modalStore}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Row>

        )
    }
    
   

export default OrderBooking