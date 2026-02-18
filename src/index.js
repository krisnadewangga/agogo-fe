import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Subscribe } from 'unstated'
import {Modal} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.scss';
import './sass/Forms.scss';

import RootContainer from './containers/RootContainer'
import ModalsContainer from './containers/ModalsContainer'
import CartsContainer from './containers/CartsContainer'
import ProductsContainer from './containers/ProductsContainer'

import Modals from './components/modals/Modals';
import App from './App';

import * as serviceWorker from './serviceWorker';
// Modal.setAppElement('#root');

ReactDOM.render(
  <Provider>

    <Subscribe to={[RootContainer, ModalsContainer, CartsContainer, ProductsContainer]}>
      {(rootStore, modalStore, cartStore, productStore) => (
        <React.Fragment>
          
          <App 
            rootStore={rootStore} 
            modalStore={modalStore} 
            cartStore={cartStore}
            productStore={productStore}
            myModal={
            <Modals 
              where={modalStore.state.modalWhere}
              type={modalStore.state.modalType} 
              modal={modalStore.state.modal} 
              toggle={() => modalStore.toggleModal(modalStore.state.modalType, modalStore.state.modalSize)} 
              toggleModal={modalStore.toggleModal} 
              size={modalStore.state.modalSize} 
              message={modalStore.state.modalMessage} 
              // className="text-center" 
              rootStore={rootStore} 
              modalStore={modalStore} 
              cartStore={cartStore}
              productStore={productStore}
            />
          }
          />
          

        </React.Fragment>

      )}
    </Subscribe>

  </Provider>, 
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();