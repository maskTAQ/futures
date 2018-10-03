import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import rootReducer, { preloadedState } from "../reducers/index";

const sagaMiddleware = createSagaMiddleware({});

// Storage.getJson("historySearch")
//   .then(res => {
//     Object.assign(preloadedState.stock, { historySearch: res || [] });
//   })
//   .catch(e => {
//     Object.assign(preloadedState.stock, { historySearch: [] });
//   });

// Storage.batchGet(["date", "siteIndex"]).then(localConfig => {
//   let siteIndex = 0;
//   if (localConfig.siteIndex !== null && /^\d*$/.test(localConfig.siteIndex)) {
//     siteIndex = parseInt(localConfig.siteIndex);
//   }
//   Object.assign(preloadedState.auth, { ...localConfig }, { siteIndex });
// });

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);

const store = {
    ...createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(sagaMiddleware, navigationMiddleware)
    ),
    runSaga: sagaMiddleware.run
};
export default store;
