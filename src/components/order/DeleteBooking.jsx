import React from 'react'
import { Container, Row, Col, Input, Button, NavLink, Form, FormGroup } from 'reactstrap'
import { NumericFormat as NumberFormat } from 'react-number-format';
import './DeleteBooking.scss'
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'


const DeleteBooking = (props) => {
    const reservation = props.cartStore.state.dataReservation || {}
    const rawDate = reservation.tgl_selesai ? reservation.tgl_selesai.toString() : ''
    const splitDate = rawDate.split('-')
    const formatedDate = splitDate.length === 3 ? `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}` : rawDate

    return (
        <Row className="OrderBooking deleteBooking d-block">
            <Container fluid className="order-booking-shell delete-booking-shell">
                <Row className="order-booking-header">
                    <Col>
                        <NavLink onClick={() => props.cartStore.toggleBookingDeleteShow() || props.cartStore.clearCart()} className="sidebar-header-nav" style={{color: "white"}}><i className="fas fa-arrow-left mr-2" style={{color: "white"}}></i> Pemesanan</NavLink>
                    </Col>
                </Row>

                <Row className="order-booking-grid delete-booking-grid">
                    <Col xs="12" lg="6" className="order-booking-column delete-booking-column">
                        <div className="order-booking-panel delete-booking-panel">
                            <div className="order-booking-panel-title">Data Pemesanan</div>
                            <div className="order-booking-field">
                                <small className="order-booking-label">PEMESAN</small>
                                <Input disabled value={reservation.nama || ''} className="input-nama" placeholder="Nama pemesan" />
                            </div>
                            <div className="order-booking-field">
                                <small className="order-booking-label">TANGGAL SELESAI</small>
                                <Input disabled value={formatedDate} className="input-tgl" placeholder="DD-MM-YYYY" />
                            </div>
                            <div className="order-booking-field">
                                <small className="order-booking-label">JAM SELESAI</small>
                                <Input disabled value={reservation.waktu_selesai || ''} className="input-jam" placeholder="HH:MM" />
                            </div>
                            <div className="order-booking-field">
                                <small className="order-booking-label">TELEPON</small>
                                <Input disabled value={reservation.telepon || ''} className="input-telepon" placeholder="Telepon" />
                            </div>
                        </div>
                    </Col>

                    <Col xs="12" lg="6" className="order-booking-column delete-booking-column">
                        <div className="order-booking-panel delete-booking-panel">
                            <div className="order-booking-panel-title">Konfirmasi Hapus</div>
                            <div className="order-booking-field">
                                <small className="order-booking-label">CATATAN</small>
                                <Input bsSize="md" disabled value={reservation.catatan || ''} type="textarea" name="note" rows="4" className="input-note" />
                            </div>
                            <div className="order-booking-field">
                                <small className="order-booking-label">UANG MUKA</small>
                                <div className='input-keyboard-wrapper'>
                                    <NumberFormat
                                        type="text"
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        className="form-control-md form-control input-uangMuka"
                                        placeholder="Rp 0"
                                        value={reservation.uang_muka || ''}
                                        bsSize="md"
                                        name="uang_muka"
                                        id="uang_muka"
                                        prefix={'Rp '}
                                        disabled
                                    />
                                </div>
                                <div className="delete-booking-status">
                                    <i className="far fa-times-circle notif-close"></i><span className="notif"> Belum dibayar</span>
                                </div>
                            </div>
                            <Form>
                                <FormGroup row>
                                    <Col xs="12" className="delete-booking-approval-col">
                                        <small className="order-booking-label">USER APPROVAL</small>
                                        <Input className="input-user" type="text" placeholder="USER APPROVAL" bsSize="md"
                                            name="approvalUser" id="approvalUser"
                                            onFocus={props.cartStore.setActiveInputRefund}
                                            onChange={props.cartStore.onChangeUserApprove}
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Col xs="12" className="delete-booking-approval-col">
                                        <small className="order-booking-label">APPROVAL</small>
                                        <Input className="input-password" type="password" placeholder="PIN" bsSize="md"
                                            name="approvalCode" id="approvalCode"
                                            onFocus={props.cartStore.setActiveInputRefund}
                                            onChange={props.cartStore.onChangePinApprove}
                                            autoComplete="off"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col className="order-booking-actions order-booking-actions-center delete-booking-actions">
                                        <Button onClick={() => props.cartStore.deleteReservationModal(props.modalStore.toggleModal)}
                                            size="md" name="btn-del" className="btn-del order-booking-save">
                                            <i className="fas fa-trash-alt del mr-1"></i>HAPUS
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>
                </Row>

                <Row className="product-nav no-gutters order-booking-footer w-100">
                    <Col xs="12">
                        <FooterNavRightBooking cartStore={props.cartStore} rootStore={props.rootStore} modalStore={props.modalStore}/>
                    </Col>
                </Row>
            </Container>
        </Row>
    )
}

export default DeleteBooking;