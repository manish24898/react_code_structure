import { Routes } from "../Config";

let _history = null;

const setHistoryRef = (history) => {
    _history = history;
}

const pushRoute = routeName => {
    _history.push(routeName);
}

const replaceRoute = routeName => {
    _history.replace(routeName);
}

const gotoHome = () => {
    _history.replace(Routes.HOME);
}

const goBack = () => {
    _history.goBack();
}

export default {
    setHistoryRef,
    pushRoute,
    replaceRoute,
    gotoHome,
    goBack
};