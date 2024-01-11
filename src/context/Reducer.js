function Reducer(state, action) {
    switch (action.type) {
      case "create_form":
        return {
          ...state,
          formData: action.payload,
        };
      case "submit_form":
        return {
          ...state,
          submitData: action.payload,
        }
      default:
        return state;
    }
  }
  export default Reducer;