import React from 'react'
import { Navbar, Nav, NavItem, NavLink, FormGroup, Label, Input } from 'reactstrap';

const FooterNavKasir = (props) => {
    return (

        <Navbar expand="md">
            <Nav className="ml-auto" navbar>
                
                    <NavItem className="radio-btn">
                        <input type="radio" name="semua-stock" id="semua-stock" className="radio" checked={props.productStore.state.selectedStok === "Semua Stok"} onChange={props.productStore.handleStokChange} value="Semua Stok"/>
                        <span className="item-stok">Semua</span>
                    </NavItem>
                    <NavItem className="radio-btn">
                        <input type="radio" name="stock-tersedia" id="stock-tersedia" className="radio" checked={props.productStore.state.selectedStok === "Stok Tersedia"} onChange={props.productStore.handleStokChange} value="Stok Tersedia"/>
                        <span className="item-stok">Stok Tersedia</span>
                    </NavItem>
                    <NavItem className="radio-btn">
                        <input type="radio" name="stock-habis" id="stock-habis" className="radio" checked={props.productStore.state.selectedStok === "Stok Habis"} onChange={props.productStore.handleStokChange} value="Stok Habis" />
                        <span className="item-stok">Stok Habis</span>
                    </NavItem>

                
            </Nav>
        </Navbar>

    )
}

export default FooterNavKasir

