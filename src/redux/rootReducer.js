import { combineReducers } from 'redux';
import user from './reducers/user';
import student from './reducers/student';
import visitor from './reducers/visitor';
import problem from './reducers/problem.js';
import feedback from './reducers/feedback';
import society from './reducers/society';
import event from './reducers/event';
import marker from './reducers/marker';

const rootReducer = combineReducers({
  user,
  student,
  marker,
  event,
  society,
  feedback,
  problem,
  visitor,
});

export default rootReducer;
