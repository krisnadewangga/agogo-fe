import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { NumericFormat as NumberFormat } from 'react-number-format';

import './OrderBooking.scss';
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'

const OrderBooking = (props) => {
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        const getSafeDate = () => {
            const rawDate = props.cartStore.state.startDate || new Date();
            const date = new Date(rawDate);
            if (Number.isNaN(date.getTime())) {
                return new Date();
            }
            return date;
        };

        const currentDate = getSafeDate();
        const selectedTime = typeof props.cartStore.state.time === 'string' ? props.cartStore.state.time : '00:00';
        const [selectedHour, selectedMinute] = selectedTime.split(':');

        const updateDate = (nextParts = {}) => {
            const nextDate = new Date(currentDate);
            if (nextParts.day !== undefined) nextDate.setDate(parseInt(nextParts.day, 10));
            if (nextParts.month !== undefined) nextDate.setMonth(parseInt(nextParts.month, 10) - 1);
            if (nextParts.year !== undefined) nextDate.setFullYear(parseInt(nextParts.year, 10));
            props.cartStore.handleDateChange(nextDate);
        };

        const updateTime = (nextParts = {}) => {
            const hour = nextParts.hour !== undefined ? String(nextParts.hour).padStart(2, '0') : (selectedHour || '00');
            const minute = nextParts.minute !== undefined ? String(nextParts.minute).padStart(2, '0') : (selectedMinute || '00');
            props.cartStore.onChangeTime(`${hour}:${minute}`);
        };

        const yearOptions = Array.from({ length: 4 }, (_, index) => currentDate.getFullYear() + index);
        const dayOptions = Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() }, (_, index) => index + 1);
        const hourOptions = Array.from({ length: 24 }, (_, index) => index);
        const minuteOptions = Array.from({ length: 60 }, (_, index) => index);

        return (
        <div>
            <Row className="OrderBooking d-block">
                <Container fluid className="order-booking-shell">
                    <Row className="order-booking-header">
                        <Col>
                            <NavLink onClick={() => props.cartStore.toggleOrderBookingShow() || props.cartStore.clearCart()} className="sidebar-header-nav" style={{color: "white"}}><i className="fas fa-arrow-left mr-2" style={{color: "white"}}></i> Pemesanan</NavLink>
                        </Col>
                    </Row>

                    <Row className="order-booking-grid">
                        <Col xs="12" lg="6" className="order-booking-column">
                            <div className="order-booking-panel">
                                <div className="order-booking-panel-title">Data Pemesanan</div>
                                <div className="order-booking-field">
                                    <small className="order-booking-label">PEMESAN</small>
                                    <Input className="input-nama" type="text" name="bookingName" id="bookingName" placeholder="Nama pemesan" 
                                        value={props.cartStore.state.valueInputBooking["bookingName"]} 
                                        onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}
                                    />
                                </div>
                                <div className="order-booking-field">
                                    <small className="order-booking-label">TANGGAL SELESAI</small>
                                    <div className="order-booking-date-time order-booking-date-row">
                                        <Input
                                            className="booking-select booking-select-day"
                                            type="select"
                                            value={String(currentDate.getDate())}
                                            onChange={(e) => updateDate({ day: e.target.value })}
                                        >
                                            {dayOptions.map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </Input>
                                        <Input
                                            className="booking-select booking-select-month"
                                            type="select"
                                            value={String(currentDate.getMonth())}
                                            onChange={(e) => updateDate({ month: Number(e.target.value) + 1 })}
                                        >
                                            {monthNames.map((month, index) => (
                                                <option key={month} value={index}>
                                                    {month}
                                                </option>
                                            ))}
                                        </Input>
                                        <Input
                                            className="booking-select booking-select-year"
                                            type="select"
                                            value={String(currentDate.getFullYear())}
                                            onChange={(e) => updateDate({ year: e.target.value })}
                                        >
                                            {yearOptions.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </Input>
                                    </div>
                                </div>
                                <div className="order-booking-field">
                                    <small className="order-booking-label">JAM SELESAI</small>
                                    <div className="order-booking-date-time order-booking-time-row">
                                        <Input
                                            className="booking-select booking-select-hour"
                                            type="select"
                                            value={String(parseInt(selectedHour || '0', 10))}
                                            onChange={(e) => updateTime({ hour: e.target.value })}
                                        >
                                            {hourOptions.map((hour) => (
                                                <option key={hour} value={hour}>
                                                    {String(hour).padStart(2, '0')}
                                                </option>
                                            ))}
                                        </Input>
                                        <Input
                                            className="booking-select booking-select-minute"
                                            type="select"
                                            value={String(parseInt(selectedMinute || '0', 10))}
                                            onChange={(e) => updateTime({ minute: e.target.value })}
                                        >
                                            {minuteOptions.map((minute) => (
                                                <option key={minute} value={minute}>
                                                    {String(minute).padStart(2, '0')}
                                                </option>
                                            ))}
                                        </Input>
                                    </div>
                                </div>
                                <div className="order-booking-field">
                                    <small className="order-booking-label">TELEPON</small>
                                    <Input className="input-telepon" type="text" name="bookingPhone" id="bookingPhone" placeholder="Nomor telepon"
                                        value={props.cartStore.state.valueInputBooking["bookingPhone"]}
                                        onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}
                                        autoComplete="new-bookingPhone"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" lg="6" className="order-booking-column">
                            <div className="order-booking-panel">
                                <div className="order-booking-panel-title">Detail Pengiriman</div>
                                <div className="order-booking-field">
                                    <small className="order-booking-label">ALAMAT</small>
                                    <Input className="input-alamat" type="textarea" name="bookingAddress" id="bookingAddress" placeholder="Alamat pengantaran"
                                        value={props.cartStore.state.valueInputBooking["bookingAddress"]}
                                        onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}
                                        autoComplete="new-bookingAddress"
                                    />
                                </div>
                                <div className="order-booking-field">
                                    <small className="order-booking-label">CATATAN</small>
                                    <Input className="input-note" type="textarea" name="bookingNote" id="bookingNote" placeholder="Catatan khusus"
                                        value={props.cartStore.state.valueInputBooking["bookingNote"]} style={{marginTop:"0px"}}
                                        onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="Sidebar order-booking-finance">
                        <Col className="pr-0 mb-5">
                            <Form className="order-booking-form">
                                <FormGroup row className="order-booking-inline-row">
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

                                <FormGroup row className="order-booking-inline-row order-booking-finance-row">
                                    <Label sm={4} className="control-label">DISKON</Label>
                                    <Col sm={6} className="d-flex justify-content-center" style={{paddingLeft: "0", paddingRight: "0"}} >
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
                                    <Col sm={2} className="order-booking-discount-type d-flex align-items-center justify-content-center gap-2" style={{paddingLeft: "0"}}>
                                    <FormGroup check className="pl-0 mb-0">
                                        <Input checked={props.cartStore.state.discountType === "Rp"} onChange={props.cartStore.handleDiscountChange} value="Rp" className="radio sm " size="sm" type="radio" name="Rp" id="Rp" /><Label check> Rp </Label>
                                    </FormGroup>
                                    <FormGroup check className="pl-0 mb-0">
                                        <Input checked={props.cartStore.state.discountType === "%"} onChange={props.cartStore.handleDiscountChange} value="%" className="radio sm " size="sm" type="radio" name="%" id="%" /><Label check> % </Label>
                                    </FormGroup>   
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="order-booking-inline-row">
                                    <Label sm={4} className="control-label">UANG MUKA</Label>
                                    <Col style={{paddingLeft: "0", paddingRight: "0"}} sm={7}>
                                        <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="input-uangMuka" placeholder="Rp 0"  
                                        name="bookingPayment" id="bookingPayment"
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                        onValueChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}
                                        autoComplete="off"/>
                                    </Col>
                                </FormGroup>

                                <div className="order-booking-approval">
                                    <Row>
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
                                                name="approvalCode" id="approvalCode"
                                                onFocus={props.cartStore.setActiveInputRefund}
                                                onChange={props.cartStore.onChangePinApprove}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <div className="order-booking-actions order-booking-actions-center">
                                        <Button onClick={() => props.cartStore.addReservation(props.userNow, props.modalStore.toggleModal)} color="danger" className="order-booking-save">
                                            <i className="fas fa-edit"></i> SIMPAN
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row className="product-nav no-gutters order-booking-footer w-100" >
                <Col xs="12">
                    <FooterNavRightBooking cartStore={props.cartStore} rootStore={props.rootStore} modalStore={props.modalStore}/>
                </Col>
            </Row>
</div>
        )
    }
    
   

export default OrderBooking