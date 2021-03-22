import { combineReducers } from "redux";
import media from "./media/reducer";
import projects from "./brands/projects/reducer";
import proposals from "./brands/proposals/reducer";
import creatives from "./brands/creatives/reducer";
import comments from "./brands/comments/reducer";
import CreatorProjects from "./creators/projects/reducers";
import CreatorCreatives from "./creators/creatives/reducers";
import user from "./users/reducers";

const func = () =>
  combineReducers({
    media,
    projects,
    proposals,
    creatives,
    comments,

    // Creator's Reducers
    CreatorProjects,
    CreatorCreatives,

    // User Reducer
    user,
  });

export default func;
