import React from 'react'
import { Container, Row, Col, Input, Label, Button, NavLink, Form, FormGroup } from 'reactstrap'
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'
import NumberFormat from 'react-number-format';

const TakeBooking = (props) => {
    let date = props.cartStore.state.tgl_trx


    console.log(date)
    let splitDate = date.split('-')
    let formatedDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
    date = formatedDate
    return (

        <Row className="deleteBooking d-block">
            <Container>
                <Row className="SidebarHeader">
                    <Col>
                        <NavLink onClick={() => props.cartStore.toggleBookingTakeShow() || props.cartStore.clearCart()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink>
                    </Col>
                </Row>

                <Row className="SidebarBodyBooking">
                    <Col sm={4}>
                        <h7 className="mb-0">PEMESAN</h7>
                        <Input disabled value={props.cartStore.state.dataReservation.nama} className="input pemesan" placeholder="NAMA"></Input>
                    </Col>
                    <Col sm={4}>
                        <h7 className="mb-0">TANGGAL SELESAI</h7>
                        <Input disabled value={date} className="input tgl" placeholder="DD-MM-YYYY"></Input>
                    </Col>
                    <Col sm={4}>
                        <h7 className="mb-0">JAM SELESAI</h7>
                        <Input disabled value={props.cartStore.state.dataReservation.waktu_selesai} className="input jam" placeholder="HH-MM"></Input>
                    </Col>
                </Row>

                <Row className="SidebarBottom">
                    <Col>
                        <Form>
                        <FormGroup row>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">Sisa Pembayaran</h7>
                                    </Label>
                                </Col>
                                <Col sm={9} style={{paddingLeft:'0'}}>
                                    <NumberFormat value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">CATATAN</h7>
                                    </Label>
                                </Col>
                                <Col sm={9} style={{paddingLeft:'0'}}>
                                    <Input disabled value={props.cartStore.state.dataReservation.catatan} bsSize="md" type="textarea" name="note" rows="3" ></Input>
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">UANG MUKA</h7><br />
                                        <i className="far fa-times-circle notif-close"></i><span className="notif"> Belum dibayar</span>
                                    </Label>
                                </Col>
                                <Col sm={9}>
                                    <Input bsSize="lg" type="text" name="uang-muka"></Input>
                                </Col>
                            </FormGroup> */}
                            <FormGroup row>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">USER APPROVAL</h7>
                                    </Label>
                                </Col>
                                <Col sm={9}>
                                <Input className="input-masking mb-4" type="text" placeholder="USER APPROVAL" bsSize="md"
                                        name="approvalUser" id="approvalUser"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangeUserApprove}
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">APPROVAL</h7>
                                    </Label>
                                </Col>
                                <Col sm={9}>
                                <Input className="input-masking mb-4" type="password" placeholder="PIN" bsSize="md"
                                        // value={props.cartStore.state.valueInputBooking["approvalCode"]}
                                        name="approvalCode" id="approvalCode"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangePinApprove}
                                        autoComplete="off"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col className="btn btn-deleted">
                                    <Button onClick={() => props.cartStore.takeReservation(props.userNow.id, props.modalStore.toggleModal)} size="md" name="btn-del" className="btn-del"><i class="fas fa-check check"></i>AMBIL</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <Row className="product-nav no-gutters">
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

export default TakeBooking;