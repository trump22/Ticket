import { combineReducers } from "@reduxjs/toolkit";

// Tự động import tất cả các reducers từ thư mục store/
const modules = import.meta.glob("../store/*.js", { eager: true });

const reducers = {};

for (const path in modules) {
    const mod = modules[path];
    const reducer = mod.default;
    const name = mod.sliceName || path.split("/").pop().replace(".js", "");

    if (reducer && typeof reducer === "function") {
        reducers[name] = reducer;
    }
}

const rootReducer = combineReducers(reducers);
export default rootReducer;
