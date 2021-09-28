import {
  DELETE_STUDENT,
  GET_STUDENTS,
  LOGOUT,
  SELECT_STUDENT,
  UPDATE_STUDENT,
} from '../types';

const initialState = {
  // list: [],
  list: [
    {
      email: 'andrew@gmail.com',
      id: '-MkODbsB94K14KhiVL-c',
      name: 'Andrew Simons',
      phoneNumber: '03088931183',
      regNo: 'BCS-018',
    },
    {
      email: 'adam@gmail.com',
      id: '-MkODnTQKHxuIXHuQJdG',
      name: 'Adam Gill',
      phoneNumber: '090078601',
      regNo: 'BCS-013',
    },
    {
      email: 'miller@gmail.com',
      id: '-MkOIg3u0i8LdwUdCs-h',
      name: 'Mathew Miller',
      phoneNumber: '090078601',
      regNo: 'BCS-045',
    },
  ],
  selected: undefined,
};

const studentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STUDENTS:
    case SELECT_STUDENT:
      return {
        ...state,
        ...payload,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        list: state.list.map((val) =>
          val.id === payload.id ? { ...payload, id: payload.id } : val
        ),
      };
    case DELETE_STUDENT:
      return {
        ...state,
        list: state.list.filter((val) => val.id !== payload),
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default studentReducer;
