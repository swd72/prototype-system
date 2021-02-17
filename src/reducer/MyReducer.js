const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

export default reducer;