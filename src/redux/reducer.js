import { combineReducers } from "redux";
import media from "./media/reducer";
import projects from "./brands/projects/reducer";
import proposals from "./brands/proposals/reducer";
import creatives from "./brands/creatives/reducer";
import comments from "./brands/comments/reducer";
import CreatorProjects from "./creators/projects/reducers";
import CreatorCreatives from "./creators/creatives/reducers";
import CreatorYoutube from "./creators/socials/youtube/reducers";
import CreatorInstagram from "./creators/socials/instagram/reducers";
import BrandYoutube from "./brands/socials/youtube/reducers";
import BrandInstagram from "./brands/socials/instagram/reducers";
import user from "./users/reducers";
import mobileToggleReducer from './common-reducer/mobileToggleReducer'

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

    //Youtube Reducer
    CreatorYoutube,
    BrandYoutube,

    //Instagram Reducer
    BrandInstagram,
    CreatorInstagram,

    // User Reducer
    user,
    // Mobile Toggle Reducer
    mobileToggleReducer
  });

export default func;
