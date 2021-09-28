import { notification } from 'antd';
import axios from 'axios';
import {
  DELETE_STUDENT,
  GET_STUDENTS,
  SELECT_STUDENT,
  UPDATE_STUDENT,
} from '../types';

export const getStudents = () => async (dispatch) => {
  // try {
  //   const res = await axios.get('/student/get');
  //   const { Students, success } = res.data;
  //   if (success) {
  //     dispatch({
  //       type: GET_STUDENTS,
  //       payload: { list: Object.values(Students) },
  //     });
  //   }
  // } catch (err) {
  //   console.log({ err });
  //   notification.error({ message: err?.response?.data?.message });
  // }
};

export const selectStudent = (selected) => ({
  type: SELECT_STUDENT,
  payload: { selected },
});

export const updateStudent = (student) => async (dispatch) => {
  try {
    // const res = await axios.put('/student/edit/' + student.id, student);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: UPDATE_STUDENT,
      payload: student,
    });
    notification.success({ message: 'Updated succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    // const res = await axios.delete('/student/delete/' + id);
    // const { success, message } = res.data;
    // if (success) {
    dispatch({
      type: DELETE_STUDENT,
      payload: id,
    });
    notification.success({ message: 'Deleted succefully' });
    // }
  } catch (err) {
    console.log({ err });
    notification.error({ message: err?.response?.data?.message });
  }
};
