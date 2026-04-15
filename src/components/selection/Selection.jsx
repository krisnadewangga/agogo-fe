import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DefaultIP from '../../containers/DefaultIP'

import './Selection.css'

class Selection extends Component {
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
      }

    componentDidMount(){


        const user = JSON.parse(sessionStorage.getItem('usernow'))
            this.setState({userLoggedIn: user}, () => this.checkRole())
            axios.get(DefaultIP + '/api/cekKas/'+user.id)
            .then(res => {
                this.setState({where: res.data})
            })
        
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

        if(this.state.userLoggedIn.role.includes(3) && this.state.userLoggedIn.role.includes(4) && this.state.userLoggedIn.role.includes(5)){
            this.setState({all: !this.state.all})
        }
        else if(this.state.userLoggedIn.role.includes(3) && this.state.userLoggedIn.role.includes(5)){
            this.setState({kasirpemesanan: !this.state.kasirpemesanan})
        }
        else if(this.state.userLoggedIn.role.includes(3) && this.state.userLoggedIn.role.includes(4)){
            this.setState({kasirproduksi: !this.state.kasirproduksi})
        }
        else if(this.state.userLoggedIn.role.includes(4) && this.state.userLoggedIn.role.includes(5)){
            this.setState({produksipemesanan: !this.state.produksipemesanan})
        }
        else if(this.state.userLoggedIn.role.includes(3)){
            this.setState({kasir: !this.state.kasir})
        }
        else if(this.state.userLoggedIn.role.includes(4)){
            this.setState({stok: !this.state.stok})
        }
        else if(this.state.userLoggedIn.role.includes(5)){
            this.setState({pemesanan: !this.state.pemesanan})
        }
        else if(this.state.userLoggedIn.role.includes(2)){
            this.setState({admin: !this.state.admin})
        }
        else if(this.state.userLoggedIn.role.includes(2)){
            this.setState({admin: !this.state.admin})
        }
    }

    render() {

        return (
    <section className="Selection centered">
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