import { notification } from 'antd';
import axios from 'axios';
import {
  DELETE_EVENT,
  ADD_EVENT,
  GET_EVENTS,
  SELECT_EVENT,
  UPDATE_EVENT,
} from '../types';

export const getEvents = () => async (dispatch) => {
  // try {
  //   const res = await axios.get('/event/get');
  //   const { Events, success } = res.data;
  //   if (success) {
  //     dispatch({
  //       type: GET_EVENTS,
  //       payload: { list: Object.values(Events) },
  //     });
  //   }
  // } catch (err) {
  //   console.log({ err });
  //   notification.error({ message: err?.response?.data?.message });
  // }
};

export const selectEvent = (selected) => ({
  type: SELECT_EVENT,
  payload: { selected },
});

export const addEvent = (event) => async (dispatch) => {
  try {
    // const res = await axios.post('/event/add', event);
    // const { success, data, message } = res.data;
    // if (success) {
    dispatch({
      type: ADD_EVENT,
      // payload: data,
      payload: event,
    });
    notification.success({ message: 'Added succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};

export const updateEvent = (event) => async (dispatch) => {
  try {
    // const res = await axios.put('/event/edit/' + event.id, event);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: UPDATE_EVENT,
      payload: event,
    });
    notification.success({ message: 'Updated succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    // const res = await axios.delete('/event/delete/' + id);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: DELETE_EVENT,
      payload: id,
    });
    notification.success({ message: 'Deleted succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};
