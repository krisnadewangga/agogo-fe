import React from 'react'
import { Navbar, Nav, NavItem, NavLink, FormGroup, Label, Input } from 'reactstrap';

const FooterNavRightProduction = (props) => {
    return (

        <Navbar expand="md">
            <Nav className="ml-auto" navbar>
                
                    <NavItem className="radio-btn">
                        <input type="radio" name="semua-stock" id="semua-stock" className="radio" checked={props.productStore.state.selectedStok === "Semua Stok"} onChange={props.productStore.handleStokChange} value="Semua Stok"/>
                        <span className="item-stok">Semua Stok</span>
                    </NavItem>
                    <NavItem className="radio-btn">
                        <input type="radio" name="stock-tersedia" id="stock-tersedia" className="radio" checked={props.productStore.state.selectedStok === "Stok Tersedia"} onChange={props.productStore.handleStokChange} value="Stok Tersedia"/>
                        <span className="item-stok">Stok Tersedia</span>
                    </NavItem>
                    <NavItem className="radio-btn">
                        <input type="radio" name="stock-habis" id="stock-habis" className="radio" checked={props.productStore.state.selectedStok === "Stok Habis"} onChange={props.productStore.handleStokChange} value="Stok Habis" />
                        <span className="item-stok">Stok Habis</span>
                    </NavItem>

                <NavItem>
                    <NavLink onClick={() => props.modalStore.toggleModal('logout', 'md')}><i className="fas fa-sign-out-alt"></i> <br />Logout</NavLink>
                    {/* <NavLink href="/logout"><i class="fas fa-sign-out-alt"></i><br />Logout</NavLink> */}
                </NavItem>
                <NavItem>
                    <a href="#" className="btn-fullscreen-other" onClick={props.rootStore.goFull} >
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </NavItem>
            </Nav>
        </Navbar>

    )
}

export default FooterNavRightProduction

