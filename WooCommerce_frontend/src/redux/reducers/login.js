const initialState = {
};

export default function login(state = initialState, action) {
  switch (action.type) {
      case 'USER_LOGIN':
       return {
         ...state,
         loginResponse:action.data,
       };
       case 'USER_SECURITY_QUESTION':
        return {
          ...state,
          userDataResponse:action.data,
        };

    default:
      return state;
  }
}
