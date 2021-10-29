
const initialState = {
  isMobileMenuOpen: false,
};

export default function mobileToggleReducer(state = initialState, action) {
  if (action.type === "MOBILE_TOGGLE") {
    return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
  }
  return state;
}