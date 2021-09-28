import {
  DELETE_SOCIETY,
  ADD_SOCIETY,
  GET_SOCIETIES,
  LOGOUT,
  SELECT_SOCIETY,
  UPDATE_SOCIETY,
} from '../types';

const initialState = {
  // list: [],
  list: [
    {
      createdAt: 1632512257636,
      department: 'CS',
      details: 'Some Description',
      email: 'ieee@comsats.com',
      facebook: 'facebook.com',
      id: '-MkOJ1yQjvRIe8ZzpoqC',
      name: 'IEEE',
      number: '01',
      twitter: 'twitter.com',
    },
  ],
  selected: undefined,
};

const societyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SOCIETIES:
    case SELECT_SOCIETY:
      return {
        ...state,
        ...payload,
      };
    case ADD_SOCIETY:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case UPDATE_SOCIETY:
      return {
        ...state,
        list: state.list.map((val) =>
          val.id === payload.id ? { ...payload, id: payload.id } : val
        ),
      };
    case DELETE_SOCIETY:
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

export default societyReducer;
