import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import board from '../board/reducers';

export default combineReducers({
  board,
  form,
});
