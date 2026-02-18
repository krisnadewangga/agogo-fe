import React from 'react'
import { Container, Row, Col, NavLink, Button, Input } from 'reactstrap';

const CashierOverlayShow = (props) => {
    
        return (
            <Row className="CashierOverlay d-block">
                <Container>
                    <row className="sidebarHeader">
                        <Col>
                            <NavLink onClick={() => props.cardStore.togglePaymentCheckoutShow.bind(this)} className="header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink> 
                        </Col>
                    </row>
                </Container>
            </Row>
        )
    }

export default CashierOverlayShow