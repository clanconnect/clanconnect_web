import { combineReducers } from 'redux';
import media from './media/reducer';
import projects from './brands/projects/reducer';
import proposals from './brands/proposals/reducer';
import creatives from './brands/creatives/reducer';

export default (reducers) =>
  combineReducers({
    media,
    projects,
    proposals,
    creatives,
  });
