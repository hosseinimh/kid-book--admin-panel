export const CHANGE_PAGE_ACTION = "CHANGE_PAGE_ACTION";
export const SET_PAGE_PROPS_ACTION = "SET_PAGE_PROPS_ACTION";
export const CHANGE_TITLE_ACTION = "CHANGE_TITLE_ACTION";
export const SET_LOADING_ACTION = "SET_LOADING_ACTION";

export const setPageAction = (page) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_PAGE_ACTION, payload: page });
};

export const setPagePropsAction = (pageProps) => async (dispatch, getState) => {
    dispatch({ type: SET_PAGE_PROPS_ACTION, payload: pageProps });
};

export const setTitleAction = (title) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_TITLE_ACTION, payload: title });
};

export const setLoadingAction = (loading) => async (dispatch, getState) => {
    dispatch({
        type: SET_LOADING_ACTION,
        payload: { loading },
    });
};
