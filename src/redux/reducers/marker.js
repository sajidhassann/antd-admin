import {
  DELETE_MARKER,
  ADD_MARKER,
  GET_MARKERS,
  LOGOUT,
  SELECT_MARKER,
} from '../types';

const initialState = {
  list: [],
  selected: undefined,
};

const markerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MARKERS:
    case SELECT_MARKER:
      return {
        ...state,
        ...payload,
      };
    case ADD_MARKER:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case DELETE_MARKER:
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

export default markerReducer;
