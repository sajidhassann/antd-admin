import { notification } from 'antd';
import axios from 'axios';
import { GET_PROBLEMS, DELETE_PROBLEM } from '../types';

export const getProblems = () => async (dispatch) => {
  // try {
  //   const res = await axios.get('/problem/get');
  //   const { Problem, success } = res.data;
  //   if (success) {
  //     dispatch({
  //       type: GET_PROBLEMS,
  //       payload: { list: Object.values(Problem) },
  //     });
  //   }
  // } catch (err) {
  //   console.log({ err });
  //   notification.error({ message: err?.response?.data?.message });
  // }
};

export const deleteProblem = (id) => async (dispatch) => {
  try {
    // const res = await axios.delete('/problem/delete/' + id);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: DELETE_PROBLEM,
      payload: id,
    });
    notification.success({ message: 'Deleted succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};
