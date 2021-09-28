import {
  DELETE_EVENT,
  ADD_EVENT,
  GET_EVENTS,
  LOGOUT,
  SELECT_EVENT,
  UPDATE_EVENT,
} from '../types';

const initialState = {
  // list: [],
  list: [
    {
      description: 'No Cheating',
      duration: '2 hrs',
      eventDate: '30-09-2021',
      eventTime: '12:39PM',
      id: '-MkOJF_6uwonvIzG4KBA',
      name: 'Hackerthon',
      society: {
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
      venue: 'No Cheating',
    },
    {
      description: 'No Cheating',
      duration: '3 hrs',
      eventDate: '30-09-2021',
      eventTime: '12:41AM',
      id: '-MkOJNuCTlsjFPUF5D1L',
      name: 'Speed Programming',
      society: {
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
      venue: 'No Cheating',
    },
  ],
  selected: undefined,
};

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EVENTS:
    case SELECT_EVENT:
      return {
        ...state,
        ...payload,
      };
    case ADD_EVENT:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        list: state.list.map((val) =>
          val.id === payload.id ? { ...payload, id: payload.id } : val
        ),
      };
    case DELETE_EVENT:
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

export default eventReducer;
