import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { Page } from "../Pages/_layout";
import Table from "./Table";
import { general } from "../../constants/strings";
import { setPagePropsAction } from "../../state/layout/layoutActions";

const AddList = ({
    page,
    funcs,
    renderHeader,
    renderItems,
    addForm,
    editForm,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _ls = useSelector((state) => state.layoutReducer);
    const [params, setParams] = useState({});
    const newParams = useParams();

    funcs.init(dispatch, navigate);

    if (JSON.stringify(params) !== JSON.stringify(newParams)) {
        setParams(newParams);
    }

    useEffect(() => {
        funcs.onLayoutState();
    }, [_ls]);

    useEffect(() => {
        funcs.onLoad(params);
    }, [params]);

    useEffect(() => {
        loadModals();
    }, []);

    const loadModals = () => {
        let modals = {};
        const addModalElement = document.getElementById("addModal");
        const editModalElement = document.getElementById("editModal");

        if (addModalElement) {
            let addModal = new coreui.Modal(addModalElement);

            addModalElement.addEventListener("hidden.coreui.modal", () => {
                dispatch(
                    setPagePropsAction({
                        item: null,
                        action: null,
                    })
                );
                addForm.reset();
            });

            modals = { add: addModal, addForm, ...modals };
        }

        if (editModalElement) {
            let editModal = new coreui.Modal(editModalElement);

            editModalElement.addEventListener("hidden.coreui.modal", () => {
                dispatch(
                    setPagePropsAction({
                        item: null,
                        action: null,
                    })
                );
                editForm.reset();
            });

            modals = { edit: editModal, editForm, ...modals };
        }

        funcs.loadModals(modals);
    };

    return (
        <Page page={page}>
            <div className="row mb-2">
                <div className="col-sm-12 mb-4">
                    <button
                        className="btn btn-success px-4"
                        type="button"
                        title={general.add}
                        onClick={funcs.onAdd}
                        disabled={_ls?.loading}
                    >
                        {_ls?.loading}
                        {general.add}
                    </button>
                </div>
            </div>
            <div className="row mb-4">
                <Table renderHeader={renderHeader} renderItems={renderItems} />
            </div>
        </Page>
    );
};

export default AddList;
