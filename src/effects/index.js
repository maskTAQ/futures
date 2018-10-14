import { all } from "redux-saga/effects";
import login from "./login";
import data from "./data";
import store from "../store";

const clearEffectsTask = function(id) {
    if (id) {
        id.type += "/cancel";
        store.dispatch(id);
    }
};

export default function* root() {
    yield all([login(), data()]);
}
export { clearEffectsTask };
