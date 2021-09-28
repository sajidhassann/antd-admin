import { notification } from 'antd';
import axios from 'axios';
import { GET_VISITORS, DELETE_VISITOR } from '../types';

export const getVisitors = () => async (dispatch) => {
  // try {
  //   const res = await axios.get('/visitor/get');
  //   const { Visitors, success } = res.data;
  //   if (success) {
  //     dispatch({
  //       type: GET_VISITORS,
  //       payload: { list: Object.values(Visitors) },
  //     });
  //   }
  // } catch (err) {
  //   console.log({ err });
  //   notification.error({ message: err?.response?.data?.message });
  // }
};

export const deleteVisitor = (id) => async (dispatch) => {
  try {
    // const res = await axios.delete('/visitor/delete/' + id);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: DELETE_VISITOR,
      payload: id,
    });
    notification.success({ message: 'Deleted succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};
