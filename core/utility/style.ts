const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuPropsSelect = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.25 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MenuPropsSelectSmall = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.25 + ITEM_PADDING_TOP,
      width: 250,
      
    },
    className:'small-dropdown-menu'
  },
};

export const MenuPropsAutoComplete = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 7.25 + ITEM_PADDING_TOP, 
      },
    },
  };

  export const MenuPropsAutoCompleteNoCheckBox = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP, 
      },
    },
  };