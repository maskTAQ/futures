import { put, cancelled, call } from "redux-saga/effects";

const actionWrapper = function(params) {
    const { type, status = "success", ...other } = params;
    // console.log(JSON.stringify({ type: `${type}/${status}`, status, ...other }));
    return { type: `${type}/${status}`, status, ...other };
};
const taskWrapper = ({ module, field, type, saveDataToRedux, params = {} }) =>
    function* taskWrappe() {
        try {
            yield put(
                actionWrapper({ module, field, type, status: "request" })
            );
            const res = yield call(saveDataToRedux, params, {
                handleCatch: false
            });
            yield put(actionWrapper({ module, field, type, payload: res }));
        } catch (e) {
            //登录失败
            yield put(actionWrapper({ module, field, type, status: "error" }));
        } finally {
            //取消登录
            if (yield cancelled())
                yield put(
                    actionWrapper({ module, field, type, status: "cancel" })
                );
        }
    };

const saveActon = ({ module, field, type, payload }) =>
    actionWrapper({ module, field, type, payload });
export default taskWrapper;
export { actionWrapper, saveActon };
