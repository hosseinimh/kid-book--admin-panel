import { useSelector } from "react-redux";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import { general, storiesPage as strings } from "../../../constants/strings";
import { Story as Entity } from "../../../http/entities";
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
let _storyCategoryId;
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

    setStoryCategoryId(params?.storyCategoryId);

    if (_storyCategoryId > 0) {
        fillForm();
    } else {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _navigate(`${basePath}/story_categories`);
    }
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
        case "STORY_ITEMS":
            storyItemsAction(_ls?.pageProps?.item);

            return;
        case "EDIT":
            editAction(_ls?.pageProps?.item);

            return;
    }
};

export const loadModals = (modals) => {
    _modals = modals;
};

const setStoryCategoryId = (storyCategoryId) => {
    _storyCategoryId =
        !isNaN(storyCategoryId) && storyCategoryId > 0 ? storyCategoryId : 0;
};

export const onAdd = () => {
    _dispatch(setPagePropsAction({ action: "ADD" }));
};

export const onStoryItems = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "STORY_ITEMS",
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

const storyItemsAction = (item) => {
    if (!isNaN(item?.id) && item.id > 0) {
        _navigate(`${basePath}/story_items/${item.id}`);
    }
};

const editAction = (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _modals.editForm.setValue("title", item.title);
        _modals.edit?.show();
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchStories(data);

    _dispatch(setLoadingAction(false));
};

const fetchStories = async (data = null) => {
    let result = await _entity.paginate(_storyCategoryId);

    if (result === null) {
        _dispatch(
            setPagePropsAction({
                items: null,
                authors: null,
                authorsList: null,
                translators: null,
                translatorsList: null,
                speakers: null,
                speakersList: null,
                selectedAuthor: null,
                selectedTranslator: null,
                selectedSpeaker: null,
            })
        );
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
        setPagePropsAction({
            items: result.items,
            authors: result.authors,
            authorsList: getAuthors(result.authors),
            translators: result.translators,
            translatorsList: getTranslators(result.translators),
            speakers: result.speakers,
            speakersList: getSpeakers(result.speakers),
            authors: result.authors,
            authorsList: getAuthors(result.authors),
            selectedAuthor: { value: 0, label: "-------" },
            selectedTranslator: { value: 0, label: "-------" },
            selectedSpeaker: { value: 0, label: "-------" },
        })
    );
};

const getAuthors = (authors) => {
    let items = [{ value: 0, label: "-------" }];

    authors.forEach((item) => {
        items.push({
            value: item.id,
            label: `${item.name} ${item.family}`,
        });
    });

    return items;
};

const getTranslators = (translators) => {
    let items = [{ value: 0, label: "-------" }];

    translators.forEach((item) => {
        items.push({
            value: item.id,
            label: `${item.name} ${item.family}`,
        });
    });

    return items;
};

const getSpeakers = (speakers) => {
    let items = [{ value: 0, label: "-------" }];

    speakers.forEach((item) => {
        items.push({
            value: item.id,
            label: `${item.name} ${item.family}`,
        });
    });

    return items;
};

export const onChangeAuthor = (option) => {
    let selectedItem = { value: 0, label: "-------" };

    if (!isNaN(option?.value)) {
        selectedItem = {
            value: option?.value,
            label: option?.label,
        };
    }

    _dispatch(
        setPagePropsAction({
            selectedAuthor: selectedItem,
        })
    );
};

export const onChangeTranslator = (option) => {
    let selectedItem = { value: 0, label: "-------" };

    if (!isNaN(option?.value)) {
        selectedItem = {
            value: option?.value,
            label: option?.label,
        };
    }

    _dispatch(
        setPagePropsAction({
            selectedTranslator: selectedItem,
        })
    );
};

export const onChangeSpeaker = (option) => {
    let selectedItem = { value: 0, label: "-------" };

    if (!isNaN(option?.value)) {
        selectedItem = {
            value: option?.value,
            label: option?.label,
        };
    }

    _dispatch(
        setPagePropsAction({
            selectedSpeaker: selectedItem,
        })
    );
};

export const onAddSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());
    console.log(data);

    let result = await _entity.store(
        _storyCategoryId,
        data.title,
        _ls?.pageProps?.selectedAuthor?.value ?? 0,
        _ls?.pageProps?.selectedTranslator?.value ?? 0,
        _ls?.pageProps?.selectedSpeaker?.value ?? 0
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
