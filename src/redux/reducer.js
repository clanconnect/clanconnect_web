import { combineReducers } from 'redux';
import media from './media/reducer';

export default (reducers) =>
  combineReducers({
    media,
  });
