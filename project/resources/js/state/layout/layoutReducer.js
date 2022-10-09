import * as layoutActions from "./layoutActions";

const initialState = {
    page: null,
    title: "",
    loading: false,
    pageProps: null,
};

const layoutReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case layoutActions.CHANGE_PAGE_ACTION:
            return { ...state, page: payload };
        case layoutActions.SET_PAGE_PROPS_ACTION:
            return { ...state, pageProps: { ...state.pageProps, ...payload } };
        case layoutActions.CHANGE_TITLE_ACTION:
            return { ...state, title: payload };
        case layoutActions.SET_LOADING_ACTION:
            return {
                ...state,
                loading: payload.loading,
            };
        default:
            return state;
    }
};

export default layoutReducer;
