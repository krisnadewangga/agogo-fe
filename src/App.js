import React, { Component } from 'react';
import { Route, BrowserRouter, Routes, Navigate, useLocation, useParams } from 'react-router-dom'
import Modal from 'react-modal'

import UsersContainer from './containers/UsersContainer';
import Login from './components/logins/Login';
import InitialBalance from './components/balances/InitialBalance';
import Selection from './components/selection/Selection'
import Cashier from './components/cashier/Cashier';
import Booking from './components/booking/Booking'

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Production from './components/production/Production';
import Invoice from './components/cashier/PrintArea';

Modal.setAppElement("#root");

const isTokenExpired = (token) => {
  try {
     
      var tgltoken = new Date(token).getHours()
      var today = new Date();
      var hour = today.getHours();

      var tokentime =  parseInt(tgltoken || 0) + 2
      if(hour > tokentime){
         sessionStorage.clear();
        return false

      }else{
        return false
      }

    
      
  }
  catch (err) {
      return false;
  }
}

const isLoggedIn = () => {
  // Checks if there is a saved token and it's still valid
  // return true
       
  const token = sessionStorage.getItem('tokenex') // GEtting token from localstorage
  return !!token && !isTokenExpired(token) // handwaiving here
}

const whatRole = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("usernow"))
    const raw = user && user.role
    if(!raw) return false

    const roles = Array.isArray(raw) ? raw.map(r => String(r).toLowerCase()) : [String(raw).toLowerCase()]
    const has = (r) => {
      const rs = String(r).toLowerCase()
      if(roles.includes(rs)) return true
      const map = { '2': 'admin', '3': 'kasir', '4': 'produksi', '5': 'pemesanan' }
      const mapped = map[rs]
      if(mapped && roles.includes(mapped)) return true
      return false
    }

    if(has(3) && has(4) && has(5)) return 'all'
    if(has(3) && has(5)) return 'kasirpemesanan'
    if(has(3) && has(4)) return 'kasirproduksi'
    if(has(5) && has(4)) return 'pemesananproduksi'
    if(has(3)) return 'kasir'
    if(has(5)) return 'pemesanan'
    if(has(4)) return 'produksi'
    return false
  } catch (err) {
    return false
  }
}

const FullScreenWrapper = ({ isFull, onChange, children }) => {
  const handle = useFullScreenHandle();

  React.useEffect(() => {
    if (isFull && !handle.active) {
      handle.enter();
    }

    if (!isFull && handle.active) {
      handle.exit();
    }
  }, [isFull, handle]);

  return (
    <FullScreen
      handle={handle}
      onChange={(state) => onChange(state)}
    >
      {children}
    </FullScreen>
  );
};

const cashierAccessRoles = ['all', 'kasirpemesanan', 'kasirproduksi', 'kasir'];
const bookingAccessRoles = ['all', 'kasirpemesanan', 'pemesananproduksi', 'pemesanan'];
const productionAccessRoles = ['all', 'pemesananproduksi', 'kasirproduksi', 'produksi'];

const RootRoute = ({ rootStore, activePath }) => {
  const location = useLocation();

  if (isLoggedIn() && cashierAccessRoles.includes(whatRole())) {
    return <Navigate to="/selection" replace state={{ from: location }} />;
  }

  return <UsersContainer rootStore={rootStore} activePath={location.pathname} />;
};

const LoginRoute = ({ rootStore, modalStore, activePath }) => {
  const location = useLocation();
  const params = useParams();

  if (isLoggedIn()) {
    return <Navigate to="/initial-balance" replace state={{ from: location }} />;
  }

  return (
    <Login
      match={{ params, path: location.pathname }}
      rootStore={rootStore}
      modalStore={modalStore}
    />
  );
};

const SelectionRoute = ({ rootStore, modalStore, activePath }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Selection
      rootStore={rootStore}
      modalStore={modalStore}
      activePath={location.pathname}
    />
  );
};

const InitialBalanceRoute = ({ modalStore, activePath }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/cashier" replace state={{ from: location }} />;
  }

  return <InitialBalance modalStore={modalStore} activePath={location.pathname} />;
};

const InvoiceRoute = ({ cartStore, rootStore, modalStore, activePath }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Invoice
      cartStore={cartStore}
      rootStore={rootStore}
      modalStore={modalStore}
      activePath={location.pathname}
    />
  );
};

const CashierRoute = ({ rootStore, modalStore, cartStore, productStore, activePath }) => {
  const location = useLocation();

  if (!isLoggedIn() || !cashierAccessRoles.includes(whatRole())) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Cashier
      rootStore={rootStore}
      modalStore={modalStore}
      cartStore={cartStore}
      productStore={productStore}
      activePath={location.pathname}
    />
  );
};

const BookingRoute = ({ rootStore, modalStore, cartStore, productStore, activePath, saldo, onLogout }) => {
  const location = useLocation();
  const isAllowed = isLoggedIn() && bookingAccessRoles.includes(whatRole());

  React.useEffect(() => {
    if (isAllowed && !saldo) {
      modalStore.toggleModal('alert', '', '', 'Saldo kasir belum diinput!');
      onLogout();
    }
  }, [isAllowed, modalStore, onLogout, saldo]);

  if (!isAllowed || !saldo) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Booking
      rootStore={rootStore}
      modalStore={modalStore}
      cartStore={cartStore}
      productStore={productStore}
      activePath={location.pathname}
    />
  );
};

const ProductionRoute = ({ rootStore, modalStore, cartStore, productStore, activePath }) => {
  const location = useLocation();

  if (!isLoggedIn() || !productionAccessRoles.includes(whatRole())) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Production
      rootStore={rootStore}
      modalStore={modalStore}
      cartStore={cartStore}
      productStore={productStore}
      activePath={activePath}
    />
  );
};

const LogoutRoute = ({ onLogout }) => {
  React.useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/" replace />;
};

class App extends Component {

  state = {
    activePath: '/',
    saldo: true
  }
  modal = React.createRef()

  logout = () => {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('idKas', '');
    sessionStorage.clear();
  }

  activePath = (props) => {
    if(props && props !== this.state.activePath){
      this.setState({
        activePath: props
      })
    }
  }

  escFunction = (event) => {
    if(event.keyCode === 121) {
      const iframe = document.createElement('iframe')
      document.body.appendChild(iframe)
      var pri = iframe.contentWindow
      pri.focus();
      pri.print();
    }
  }

  // componentDidMount(){
  //   document.addEventListener("keydown", this.escFunction, false);
  //  const user_id = JSON.parse(sessionStorage.getItem("usernow"))

  //  alert(user_id.id)
  //   axios.get(DefaultIP + '/api/cekKass')
  //   .then(res => {
  //       if(res.data.status === 'counted'){
  //         this.setState({saldo: false})
  //       }else{
  //         this.setState({saldo: true})
  //       }
  //   })
  //   .catch(res => {
  //     // console.log('catch', res.response)
  //   })
  // }
  
  render() {

    return (

      <FullScreenWrapper
        isFull={this.props.rootStore.state.isFull}
        onChange={(isFull) => this.props.rootStore.setState({ isFull })}
      >
        <div className="device-gate" role="status" aria-live="polite">
          <div className="device-gate-card">
            <h2>Aplikasi Hanya Untuk Tablet &amp; PC</h2>
            <p>Silakan gunakan perangkat dengan lebar layar minimal 768px agar pengalaman tetap nyaman.</p>
          </div>
        </div>

        <div className="app-shell">
          <BrowserRouter>
            <div className="App" style={{position: "relative",}}>

              <Routes>
                <Route
                  path="/"
                  element={
                    <RootRoute
                      rootStore={this.props.rootStore}
                      activePath="/"
                    />
                  }
                />

              <Route
                path="/login/:user_index"
                element={
                  <LoginRoute
                    rootStore={this.props.rootStore}
                    modalStore={this.props.modalStore}
                    activePath="/login/:user_index"
                  />
                }
              />

              <Route
                path="/selection"
                element={
                  <SelectionRoute
                    rootStore={this.props.rootStore}
                    modalStore={this.props.modalStore}
                    activePath="/selection"
                  />
                }
              />

              <Route
                path="/initial-balance"
                element={
                  <InitialBalanceRoute
                    modalStore={this.props.modalStore}
                    activePath="/initial-balance"
                  />
                }
              />

              <Route
                path="/invoice"
                element={
                  <InvoiceRoute
                    cartStore={this.props.cartStore}
                    rootStore={this.props.rootStore}
                    modalStore={this.props.modalStore}
                    activePath="/invoice"
                  />
                }
              />

              <Route
                path="/cashier"
                element={
                  <CashierRoute
                    rootStore={this.props.rootStore}
                    modalStore={this.props.modalStore}
                    cartStore={this.props.cartStore}
                    productStore={this.props.productStore}
                    activePath="/cashier"
                  />
                }
              />

              <Route
                path="/booking"
                element={
                  <BookingRoute
                    rootStore={this.props.rootStore}
                    modalStore={this.props.modalStore}
                    cartStore={this.props.cartStore}
                    productStore={this.props.productStore}
                    activePath="/booking"
                    saldo={this.state.saldo}
                    onLogout={this.logout}
                  />
                }
              />

              <Route
                path="/production"
                element={
                  <ProductionRoute
                    rootStore={this.props.rootStore}
                    modalStore={this.props.modalStore}
                    cartStore={this.props.cartStore}
                    productStore={this.props.productStore}
                    activePath="/production"
                  />
                }
              />

              <Route
                path="/logout"
                element={<LogoutRoute onLogout={this.logout} />}
              />
              </Routes>
              
            </div>
          </BrowserRouter>
          <footer className="Footer right">                    
            <button type="button" className="btn-fullscreen" onClick={this.props.rootStore.goFull}>
              <i className="fas fa-expand-arrows-alt"></i>
            </button>

            {/* {this.state.activePath === '/initial-balance' &&
            <a href="#" className="btn-logout" onClick={() => this.props.modalStore.toggleModal('saldo', '')} >
              <i className="fas fa-power-off"></i>
            </a>
            } */}
          </footer>
          <div ref={this.root} id="myModal">{this.props.myModal}</div>
        </div>
      </FullScreenWrapper>
    );
  }
}

export default App;
