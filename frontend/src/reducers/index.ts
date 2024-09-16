import { combineReducers } from 'redux';
import formReducer from './formReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  form: formReducer,
  alert: alertReducer,
});
