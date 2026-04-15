import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, Subscribe } from './lib/unstated-compat'

import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.scss';
import './sass/Forms.scss';

import RootContainer from './containers/RootContainer'
import ModalsContainer from './containers/ModalsContainer'
import CartsContainer from './containers/CartsContainer'
import ProductsContainer from './containers/ProductsContainer'

import Modals from './components/modals/Modals';
import App from './App';
// Modal.setAppElement('#root');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
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

  </Provider>
);
