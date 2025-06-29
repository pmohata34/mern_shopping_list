import React,{ Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingLIst';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store'; // Assuming you have a store.js file that exports your Redux store
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Provider>
    );
  }
}

export default App;
