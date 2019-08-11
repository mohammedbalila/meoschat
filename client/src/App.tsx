import React from "react";
import Router from "./components/router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
const App: React.FC = () => {
  return (
    <Provider store={store}>
        <Router />
    </Provider>
  );
};

export default App;
