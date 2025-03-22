import { combineReducers } from "@reduxjs/toolkit";
// Tự động import tất cả các store từ thư mục store
const modules = import.meta.glob("../store/*.js", { eager: true });

const reducers = Object.keys(modules).reduce((acc, path) => {
    const slice = modules[path]?.default;
    if (slice && slice.name && slice.reducer) {
        acc[slice.name] = slice.reducer;
    }
    return acc;
}, {});

const rootReducer = combineReducers(reducers);

export default rootReducer;