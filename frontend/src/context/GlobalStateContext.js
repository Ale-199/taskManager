import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

export const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_ISEDITING":
      return {
        ...state,
        isEditing: action.payload,
      };
    case "ALL_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "CREATE_TASK":
      if (state.tasks)
        return {
          ...state,
          tasks: [action.payload, ...state.tasks],
        };
      break;
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    isEditing: false,
    tasks: [],
  });

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
