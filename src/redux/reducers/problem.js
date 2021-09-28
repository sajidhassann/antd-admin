import { LOGOUT, GET_PROBLEMS, DELETE_PROBLEM } from '../types';

const initialState = {
  // list: [],
  list: [
    {
      id: '-MkOJl1uYcjL6anu9ZGz',
      student: {
        email: 'andrew@gmail.com',
        id: '-MkODbsB94K14KhiVL-c',
        name: 'Andrew Simons',
        phoneNumber: '03088931183',
        regNo: 'BCS-018',
      },
      text: 'Slow Internet',
    },
  ],
};

const problemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROBLEMS:
      return {
        ...state,
        ...payload,
      };
    case DELETE_PROBLEM:
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

export default problemReducer;
