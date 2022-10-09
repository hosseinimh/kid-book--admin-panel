import { useSelector } from "react-redux";

import { MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import { speakersPage as strings } from "../../../constants/strings";
import { Speaker as Entity } from "../../../http/entities";
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
let _ls;
let _modals;
let _entity = new Entity();

export const init = (dispatch, _) => {
    _dispatch = dispatch;

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

export const onEdit = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "EDIT",
            item,
        })
    );
};

const addAction = () => {
    _modals.add.show();
};

const editAction = (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _modals.editForm.setValue("name", item.name);
        _modals.editForm.setValue("family", item.family);
        _modals.editForm.setValue("description", item.description);
        _modals.edit?.show();
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchSpeakers(data);

    _dispatch(setLoadingAction(false));
};

const fetchSpeakers = async (data = null) => {
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
    console.log(data);
    let result = await _entity.store(data.name, data.family, data.description);

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

    let result = await _entity.update(
        _ls?.pageProps?.item?.id,
        data.name,
        data.family,
        data.description
    );

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
