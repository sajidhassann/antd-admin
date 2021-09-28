import { LOGOUT, GET_VISITORS, DELETE_VISITOR } from '../types';

const initialState = {
  // list: [],
  list: [
    {
      email: 'malfoy@gmail.com',
      id: '-MkOEBNfWRXXnN2pO8Pn',
      name: 'Malfoy Growd',
    },
    {
      email: 'mindy@gmail.com',
      id: '-MkOIraHiB04l5foWVXt',
      name: 'Mindy Miller',
    },
  ],
};

const visitorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VISITORS:
      return {
        ...state,
        ...payload,
      };
    case DELETE_VISITOR:
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

export default visitorReducer;
