import { LOGIN, SIGNUP, LOGOUT, AUTH_LOADING, UPDATE } from '../types';

const initialState = {
  // user: JSON.parse(localStorage.getItem('user')),
  // token: localStorage.getItem('token'),
  // loading: false,
  user: {
    email: 'guy@freecity.com',
    id: '-MkOjixVosk4coTtRLCl',
    name: 'Free Guy',
  },
  token: false,
  loading: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case UPDATE:
      return {
        ...state,
        user: { ...state.user, ...payload },
      };
    case SIGNUP:
      return {
        ...state,
        loading: false,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { user: undefined, token: undefined, loading: false };
    default:
      return state;
  }
};

export default userReducer;

const store = {
  user: {
    user: {
      email: 'sajid@mail3.com',
      id: '-MkOjixVosk4coTtRLCl',
      name: 'Sajid Hassan',
      password: '$2b$10$b/51tsVvaojmeabO3pPJq.QyBuknLzrpoi0qkcB09wYYpr92l2S/u',
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoic2FqaWRAbWFpbDMuY29tIiwicGFzc3dvcmQiOiIxMTIyIn0sImlhdCI6MTYzMjU1NzExMX0.bg57SF4RIwMyxWrtMsW3gn1RU1JPIdfZzDed-C0zTos',
    loading: false,
  },
  student: {
    list: [
      {
        email: 'aamirafzal9669@gmail.com',
        id: '-MkODbsB94K14KhiVL-c',
        name: 'Aamir Afzal',
        phoneNumber: '03088931183',
        regNo: 'SP17-BCS-018',
      },
      {
        email: 'sajidhassan1997@gmail.com',
        id: '-MkODnTQKHxuIXHuQJdG',
        name: 'Sajid Hassan',
        phoneNumber: '090078601',
        regNo: 'SP17-BCS-013',
      },
      {
        email: 'sherry@gmail.com',
        id: '-MkOIg3u0i8LdwUdCs-h',
        name: 'Shaiharyaar Ahmad',
        phoneNumber: '090078601',
        regNo: 'SP17-BCS-045',
      },
    ],
  },
  marker: {
    list: [],
  },
  event: {
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
  },
  society: {
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
  },
  feedback: {
    list: [
      {
        id: '-MkOJdv7TcaB-icckYkV',
        student: {
          email: 'aamirafzal9669@gmail.com',
          id: '-MkODbsB94K14KhiVL-c',
          name: 'Aamir Afzal',
          phoneNumber: '03088931183',
          regNo: 'SP17-BCS-018',
        },
        text: 'Good Experience',
      },
    ],
  },
  problem: {
    list: [
      {
        id: '-MkOJl1uYcjL6anu9ZGz',
        student: {
          email: 'aamirafzal9669@gmail.com',
          id: '-MkODbsB94K14KhiVL-c',
          name: 'Aamir Afzal',
          phoneNumber: '03088931183',
          regNo: 'SP17-BCS-018',
        },
        text: 'Slow Internet',
      },
    ],
  },
  visitor: {
    list: [
      {
        email: 'bilalzahid400@gmail.com',
        id: '-MkOEBNfWRXXnN2pO8Pn',
        name: 'Bilal Zahid',
      },
      {
        email: 'zeeshanyasin200gmail.com',
        id: '-MkOIraHiB04l5foWVXt',
        name: 'Zeeshan Yasin',
      },
    ],
  },
};
