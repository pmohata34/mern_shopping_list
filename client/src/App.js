import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingLIst';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './actions/authActions';
import { LOGIN_SUCCESS } from './actions/types';
import './App.css';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      // Manually dispatch token to Redux auth reducer
      store.dispatch({
        type: LOGIN_SUCCESS,
        payload: { token }
      });

      // Load user with token
      store.dispatch(loadUser());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container className="main-content">
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