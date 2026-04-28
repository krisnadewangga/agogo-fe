import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DefaultIP from '../../containers/DefaultIP'

import './Selection.css'

class Selection extends Component {

    constructor(props){
        super(props)
      }
            state = {
                userLoggedIn: {},
                where: {},
                all: false,
                kasir: false,
                stok: false,
                pemesanan: false,
                kasirpemesanan: false,
                kasirproduksi: false,
                produksipemesanan: false,
                // admin: false,
                debugSession: {},
                missingSession: false,
            }

    getRoles = () => {
        const roles = this.state.userLoggedIn && this.state.userLoggedIn.role;

        if(Array.isArray(roles)){
            return roles.map(role => String(role));
        }

        if(roles === undefined || roles === null){
            return [];
        }

        return [String(roles)];
    }

    hasRole = (role) => this.getRoles().includes(String(role))

    componentDidMount(){


        const user = JSON.parse(sessionStorage.getItem('usernow'))
            this.setState({userLoggedIn: user}, () => this.checkRole())
            axios.get(DefaultIP + '/api/cekKas/'+user.id)
            .then(res => {
                this.setState({where: res.data})
            })
        
        // session debugging: capture token/tokenex/usernow so we can see why redirects happen
        try{
            const token = sessionStorage.getItem('token')
            const tokenex = sessionStorage.getItem('tokenex')
            const usernow = sessionStorage.getItem('usernow')
            const missing = !(token && tokenex && usernow)
            this.setState({ debugSession: { token, tokenex, usernow }, missingSession: missing })
            console.log('Selection session debug', { token, tokenex, usernow, missing })
        }catch(e){
            console.log('Error reading sessionStorage', e)
        }
    }

    checkRole(){

        /*

        1: superadmin
        2: admin
        3: kasir
        4: stokers/produksi
        5: pemesanan
        6: konsumen
        7: kurir



        */

        if(this.hasRole(3) && this.hasRole(4) && this.hasRole(5)){
            this.setState({all: !this.state.all})
        }
        else if(this.hasRole(3) && this.hasRole(5)){
            this.setState({kasirpemesanan: !this.state.kasirpemesanan})
        }
        else if(this.hasRole(3) && this.hasRole(4)){
            this.setState({kasirproduksi: !this.state.kasirproduksi})
        }
        else if(this.hasRole(4) && this.hasRole(5)){
            this.setState({produksipemesanan: !this.state.produksipemesanan})
        }
        else if(this.hasRole(3)){
            this.setState({kasir: !this.state.kasir})
        }
        else if(this.hasRole(4)){
            this.setState({stok: !this.state.stok})
        }
        else if(this.hasRole(5)){
            this.setState({pemesanan: !this.state.pemesanan})
        }
        else if(this.hasRole(2)){
            this.setState({admin: !this.state.admin})
        }
        else if(this.hasRole(2)){
            this.setState({admin: !this.state.admin})
        }
    }

    render() {
        const hasMenu = this.state.all || this.state.kasir || this.state.stok || this.state.pemesanan || this.state.kasirpemesanan || this.state.kasirproduksi || this.state.produksipemesanan
        const { missingSession, debugSession } = this.state

        return (
    <section className="Selection centered">
            {missingSession &&
                <div style={{padding:12,background:'#fff3f3',border:'1px solid #f5c2c2',color:'#8a1f1f',marginBottom:12,textAlign:'center'}}>
                    <div><strong>Session tidak lengkap — silakan masuk ulang.</strong></div>
                    <div style={{fontSize:12,opacity:0.9,marginTop:6}}>Debug: {JSON.stringify(debugSession)}</div>
                    <div style={{marginTop:8}}>
                        <a href="/" className="btn btn-sm btn-outline-danger">Kembali ke Login</a>
                    </div>
                </div>
            }
            <Container >
                <Row >
                    <Col sm="12" md={{ size: 6, offset: 3}} className="container-selection">
                        {/* {this.state.userLoggedIn.role.map(x => x)} */}
                        {/* {this.props.transactionStore.state.isKasir &&
                            <Link to={'/initial-balance'}>
                            <button className="btn btn-size">KASIR</button>
                            </Link>
                        } */}
                        {this.state.all &&
                            <div>
                            {this.state.where.status === 'counted' ?
                                <Link to={'/initial-balance'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link> : 
                                <Link to={'/cashier'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link>
                            }
                            <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                            </Link>
                            <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                            </Link>
                            </div>
                        }
                        {this.state.kasir &&
                            <div>
                            {this.state.where.status === 'counted' ?
                                <Link to={'/initial-balance'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link> : 
                                <Link to={'/cashier'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link>
                            }
                            </div>
                        }
                        {this.state.stok &&
                            <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                            </Link>
                        }
                        {this.state.pemesanan &&
                            <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                            </Link>
                        }
                        {this.state.kasirpemesanan &&
                            <div>
                            {this.state.where.status === 'counted' ?
                                <Link to={'/initial-balance'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link> : 
                                <Link to={'/cashier'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link>
                            }
                            <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                            </Link>
                            </div>
                        }
                        {this.state.kasirproduksi &&
                            <div>
                            {this.state.where.status === 'counted' ?
                                <Link to={'/initial-balance'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link> : 
                                <Link to={'/cashier'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link>
                            }
                            <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                            </Link>
                            </div>
                        }
                        {this.state.produksipemesanan &&
                            <div>
                            <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                            </Link>
                            <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                            </Link>
                            </div>
                        }
                        {!hasMenu &&
                            <div className="text-center text-muted mt-4">
                                Menu belum muncul. Periksa data role user di sessionStorage.
                            </div>
                        }
                        {/* {this.state.userLoggedIn.role.map(role => 
                         {if(role === "kasir"){
                             return (
                            <Link to={'/initial-balance'}>
                            <button className="btn btn-size">KASIR</button>
                            </Link>)
                            }
                            else if(role === "stok"){
                                return (
                                <Link to={'/production'}>
                                <button className="btn btn-size">PRODUKSI</button>
                                </Link>)
                            }
                            else if(role === "admin"){
                                return (
                                <Link to={'/booking'}>
                                <button className="btn btn-size">PEMESANAN</button>
                                </Link>)
                            } else {
                                return (
                                <Link to={'/#'}>
                                <button className="btn btn-size">KOSONG</button>
                                </Link>
                                )
                            }
                          }
                         ) 
                        } */}
                        {/* <Link to={'/initial-balance'}>
                            <button className="btn btn-size">KASIR</button>
                        </Link>
                        <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                        </Link>
                        <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                        </Link> */}
                        {/* {this.doFilter()} */}
                    </Col>
                </Row>
            </Container>
        </section>
        )
    }
}

export default Selection