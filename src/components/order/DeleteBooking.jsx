import React from 'react'
import { Container, Row, Col, Input, Label, Button, NavLink, Form, FormGroup } from 'reactstrap'
import NumberFormat from 'react-number-format';
import './DeleteBooking.scss'
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'


const DeleteBooking = (props) => {
    const date = props.cartStore.state.dataReservation.tgl_selesai.toString()
    const splitDate = date.split('-')
    const formatedDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
    return (

        <Row className="deleteBooking d-block">
            <Container>
                <Row className="SidebarHeader">
                    <Col>
                        <NavLink onClick={() => props.cartStore.toggleBookingDeleteShow() || props.cartStore.clearCart()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink>
                    </Col>
                </Row>

                <Row className="SidebarBodyBooking">
                    <Col sm={4}>
                        <h7 className="mb-0">PEMESAN</h7>
                        <Input disabled value={props.cartStore.state.dataReservation.nama} className="input pemesan" placeholder="NAMA"></Input>
                    </Col>
                    <Col sm={4}>
                        <h7 className="mb-0">TANGGAL SELESAI</h7>
                        <Input disabled value={formatedDate} className="input tgl" placeholder="DD-MM-YYYY"></Input>
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
                                        <h7 className="mb-0">CATATAN</h7>
                                    </Label>
                                </Col>
                                <Col sm={9}>
                                    <Input bsSize="md" disabled value={props.cartStore.state.dataReservation.catatan} type="textarea" name="note" rows="3" ></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={4}>
                                    <Label>
                                        <h7 className="mb-0">UANG MUKA</h7><br />
                                        <i className="far fa-times-circle notif-close"></i><span className="notif"> Belum dibayar</span>
                                    </Label>
                                </Col>
                                <Col sm={8}>
                                <div className='input-keyboard-wrapper'>
                                <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="form-control-md form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.dataReservation.uang_muka} bsSize="md"
                                    name="uang_muka" id="uang_muka"
                                    prefix={'Rp '} disabled
                                />
                                </div>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={4} style={{paddingTop: "10px"}}>
                                    <Label>
                                    <h7 className="mb-0">USER APPROVAL</h7>
                                    </Label>
                                </Col>
                                <Col sm={8} style={{paddingTop: "10px"}}>
                                    <Input className="input-user" type="text" placeholder="USER APPROVAL" bsSize="md"
                                        name="approvalUser" id="approvalUser"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangeUserApprove}
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col sm={4} style={{paddingTop: "10px"}}>
                                    <Label>
                                    <h7 className="mb-0">APPROVAL</h7>
                                    </Label>
                                </Col>
                                <Col sm={8} style={{paddingTop: "10px"}}>
                                    <Input className="input-password" type="password" placeholder="PIN" bsSize="md" 
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
                                    <Button onClick={() => props.cartStore.deleteReservationModal(props.modalStore.toggleModal)} 
                                    size="md" name="btn-del" className="btn-del"><i class="fas fa-trash-alt del"></i>HAPUS</Button>
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

export default DeleteBooking;