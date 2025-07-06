import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Get Items (from server)
export const getItems = () => (dispatch) => {
  dispatch(setItemLoading());
  axios
    .get('/api/items')
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.error('Error fetching items:', err);
    });
};

// Add Item
export const addItem = (newItem) => (dispatch, getState) => {
  axios
    .post('/api/items', newItem, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) => {
      const msg =
        err.response?.data?.error ||
        err.response?.data ||
        err.message ||
        'Unknown error';
      console.error('Error adding item:', msg);
    });
};
// Delete Item
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch(err => console.error('Error deleting item:', err));
};

// Set loading state
export const setItemLoading = () => { 
  return {
    type: ITEM_LOADING,
  };
};
