import { useSelector } from "react-redux";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import { storyCategoriesPage as strings } from "../../../constants/strings";
import { StoryCategory as Entity } from "../../../http/entities";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageActions";

let _dispatch;
let _navigate;
let _ls;
let _modals;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;

    _ls = useSelector((state) => state.layoutReducer);
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
    _dispatch(
        setPagePropsAction({
            item: null,
            items: null,
            action: null,
        })
    );

    fillForm();
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }

    let { action } = _ls?.pageProps;

    if (_ls?.pageProps?.action) {
        _dispatch(setPagePropsAction({ action: null }));
    }

    switch (action) {
        case "ADD":
            addAction();

            return;
        case "STORIES":
            storiesAction(_ls?.pageProps?.item);

            return;
        case "EDIT":
            editAction(_ls?.pageProps?.item);

            return;
    }
};

export const loadModals = (modals) => {
    _modals = modals;
};

export const onAdd = () => {
    _dispatch(setPagePropsAction({ action: "ADD" }));
};

export const onStories = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "STORIES",
            item,
        })
    );
};

export const onEdit = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "EDIT",
            item,
        })
    );
};

const addAction = () => {
    _modals.add?.show();
};

const storiesAction = (item) => {
    if (!isNaN(item?.id) && item.id > 0) {
        _navigate(`${basePath}/stories/${item.id}`);
    }
};

const editAction = (item) => {
    if (!isNaN(item?.id) && item.id > 0) {
        _modals.editForm.setValue("title", item.title);
        _modals.edit?.show();
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchStoryCategories(data);

    _dispatch(setLoadingAction(false));
};

const fetchStoryCategories = async (data = null) => {
    let result = await _entity.paginate();

    if (result === null) {
        _dispatch(setPagePropsAction({ items: null }));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(setPagePropsAction({ items: result.items }));
};

export const onAddSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.store(data.title);

    if (result === null) {
        _dispatch(setLoadingAction(false));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(
        setMessageAction(
            strings.addSubmitted,
            MESSAGE_TYPES.SUCCESS,
            MESSAGE_CODES.OK,
            false
        )
    );

    await fillForm();
    _modals.add?.hide();
};

export const onEditSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.update(_ls?.pageProps?.item?.id, data.title);

    if (result === null) {
        _dispatch(setLoadingAction(false));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(
        setMessageAction(
            strings.editSubmitted,
            MESSAGE_TYPES.SUCCESS,
            MESSAGE_CODES.OK,
            false
        )
    );

    await fillForm();
    _modals.edit?.hide();
};
