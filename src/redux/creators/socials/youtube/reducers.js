import { ACTIONS } from "./actions";

const initialState = {
  data: {},
  countryCategoriesYoutubeResponse: {},
  // title: "",
  // tags: [],
  // description: "",
  // country: "",
  // category: "",
  // countrySpecificCategories: [],
  // defaultLanguage: "en",
  // license: "youtube",
  // privacyStatus: "public",
  // publicStatsVisible: "true",
  // madeForKids: false,
  // notifySubscribers: true,
  // scheduleDate: null,
  // scheduleTime: null,
  // videoMediaId: "",
  // thumbnailMediaId: "",
  // approvalStatus: false,
  // uploadStatus: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return initialState;
  }
}
