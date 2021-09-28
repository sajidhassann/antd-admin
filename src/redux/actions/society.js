import { notification } from 'antd';
import axios from 'axios';
import {
  DELETE_SOCIETY,
  ADD_SOCIETY,
  GET_SOCIETIES,
  SELECT_SOCIETY,
  UPDATE_SOCIETY,
} from '../types';

export const getSocieties = () => async (dispatch) => {
  // try {
  //   const res = await axios.get('/society/get');
  //   const { Societies, success } = res.data;
  //   if (success) {
  //     dispatch({
  //       type: GET_SOCIETIES,
  //       payload: { list: Object.values(Societies) },
  //     });
  //   }
  // } catch (err) {
  //   console.log({ err });
  //   notification.error({ message: err?.response?.data?.message });
  // }
};

export const selectSociety = (selected) => ({
  type: SELECT_SOCIETY,
  payload: { selected },
});

export const addSociety = (society) => async (dispatch) => {
  try {
    // const res = await axios.post('/society/add', society);
    // const { success, data, message } = res.data;
    // if (success) {
    dispatch({
      type: ADD_SOCIETY,
      // payload: data,
      payload: { id: Math.floor(Math.random() * 1000), ...society },
    });
    notification.success({ message: 'Added succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};

export const updateSociety = (society) => async (dispatch) => {
  try {
    // const res = await axios.put('/society/edit/' + society.id, society);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: UPDATE_SOCIETY,
      payload: society,
    });
    notification.success({ message: 'Updated succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};

export const deleteSociety = (id) => async (dispatch) => {
  try {
    // const res = await axios.delete('/society/delete/' + id);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: DELETE_SOCIETY,
      payload: id,
    });
    notification.success({ message: 'Deleted succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};
