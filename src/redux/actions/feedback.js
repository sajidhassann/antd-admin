import { notification } from 'antd';
import axios from 'axios';
import { GET_FEEDBACKS, DELETE_FEEDBACK } from '../types';

export const getFeedbacks = () => async (dispatch) => {
  // try {
  //   const res = await axios.get('/feedback/get');
  //   const { Feedback, success } = res.data;
  //   if (success) {
  //     dispatch({
  //       type: GET_FEEDBACKS,
  //       payload: { list: Object.values(Feedback) },
  //     });
  //   }
  // } catch (err) {
  //   console.log({ err });
  //   notification.error({ message: err?.response?.data?.message });
  // }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    // const res = await axios.delete('/feedback/delete/' + id);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: DELETE_FEEDBACK,
      payload: id,
    });
    notification.success({ message: 'Deleted succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};
