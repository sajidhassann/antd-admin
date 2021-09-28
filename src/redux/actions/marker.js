import { notification } from 'antd';
import axios from 'axios';
import {
  DELETE_MARKER,
  ADD_MARKER,
  GET_MARKERS,
  SELECT_MARKER,
} from '../types';

export const getMarkers = () => async (dispatch) => {
  try {
    const res = await axios.get('/arMarker/get');
    const { AR_Markers, success } = res.data;
    if (success) {
      dispatch({
        type: GET_MARKERS,
        payload: { list: Object.values(AR_Markers) },
      });
    }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};

export const selectMarker = (selected) => ({
  type: SELECT_MARKER,
  payload: { selected },
});

export const addMarker = (marker) => async (dispatch) => {
  try {
    const res = await axios.post('/arMarker/add', marker);
    const { success, data, message } = res.data;
    if (success) {
      dispatch({
        type: ADD_MARKER,
        payload: data,
      });
      notification.success({ message });
    }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};

export const deleteMarker = (id) => async (dispatch) => {
  try {
    const res = await axios.delete('/arMarker/delete/' + id);
    const { success, message } = res.data;
    if (success) {
      dispatch({
        type: DELETE_MARKER,
        payload: id,
      });
      notification.success({ message });
    }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};
