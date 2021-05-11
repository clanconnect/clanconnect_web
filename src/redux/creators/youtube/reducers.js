import { ACTIONS } from "./actions";

const initialState = {
    title: "",
    description: "",
    thumbnail: "",
    tags: [],
    selfDeclaredMadeForKids: true,
    scheduleDate: null,
    scheduleTime: null
};

const returnState = {
    title: "This is a test title",
    description: "This is a test description. Lorem Ipsum Dolar Sit Amet.",
    thumbnail: "https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png",
    tags: ["hello", "this", "is", "test"],
    selfDeclaredMadeForKids: true,
    scheduleDate: new Date("Tue May 25 2021 15:51:53 GMT+0530 (India Standard Time)"),
    scheduleTime: new Date("Mon May 10 2021 04:04:00 GMT+0530 (India Standard Time)"),
    comments: ["this is a comment", "this is another comment"]
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case ACTIONS.SET_FORM:
        return { ...state, ...action.payload };

      case ACTIONS.SET_FORM_ADMIN:
        const { comments } = returnState;
        comments.push(action.payload.comments);
        return { ...returnState};

      case ACTIONS.GET_FORM:
        return { ...state };

      case ACTIONS.GET_FORM_ADMIN:
        return { ...returnState };

      case ACTIONS.SET_SCHEDULE:
        return { ...state, scheduleDate: action.payload.date, scheduleTime: action.payload.time };

      default:
        return state;
    }
  }