import { LOGOUT, GET_FEEDBACKS, DELETE_FEEDBACK } from '../types';

const initialState = {
  // list: [],
  list: [
    {
      id: '-MkOJdv7TcaB-icckYkV',
      student: {
        email: 'andrew@gmail.com',
        id: '-MkODbsB94K14KhiVL-c',
        name: 'Andrew Simons',
        phoneNumber: '03088931183',
        regNo: 'BCS-018',
      },
      text: 'Good Experience',
    },
  ],
};

const feedbackReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        ...payload,
      };
    case DELETE_FEEDBACK:
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

export default feedbackReducer;
