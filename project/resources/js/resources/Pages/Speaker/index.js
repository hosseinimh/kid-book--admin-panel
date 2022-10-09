import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";

import { speakersPage as strings, general } from "../../../constants/strings";
import * as funcs from "./funcs";
import {
    AddList,
    InputTextAreaColumn,
    InputTextColumn,
    TableItems,
} from "../../components";
import {
    addSpeakerSchema as addSchema,
    editSpeakerSchema as editSchema,
} from "../../validations";

const Speakers = () => {
    const _columnsCount = 4;
    const _ls = useSelector((state) => state.layoutReducer);
    const defaultValues = { name: "", family: "", description: "" };
    const addForm = useForm({
        defaultValues,
        resolver: yupResolver(addSchema),
    });
    const editForm = useForm({
        defaultValues,
        resolver: yupResolver(editSchema),
    });

    const renderAddModal = () => (
        <div
            className="modal fade"
            id="addModal"
            tabIndex={"-1"}
            aria-labelledby="addModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addModalCenterTitle">
                            {strings.addModalTitle}
                        </h5>
                        <button
                            className="btn-close"
                            type="button"
                            data-coreui-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <InputTextColumn
                            field="name"
                            register={addForm.register}
                            strings={strings}
                            msgErrors={addForm.formState.errors}
                        />
                        <InputTextColumn
                            field="family"
                            register={addForm.register}
                            strings={strings}
                            msgErrors={addForm.formState.errors}
                        />
                        <InputTextAreaColumn
                            field="description"
                            register={addForm.register}
                            strings={strings}
                            msgErrors={addForm.formState.errors}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            title={general.add}
                            className="btn btn-primary"
                            type="button"
                            onClick={addForm.handleSubmit(funcs.onAddSubmit)}
                        >
                            {general.add}
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            data-coreui-dismiss="modal"
                        >
                            {general.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEditModal = () => (
        <div
            className="modal fade"
            id="editModal"
            tabIndex={"-1"}
            aria-labelledby="editModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalCenterTitle">
                            {strings.editModalTitle}
                        </h5>
                        <button
                            className="btn-close"
                            type="button"
                            data-coreui-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <InputTextColumn
                            field="name"
                            register={editForm.register}
                            strings={strings}
                            msgErrors={editForm.formState.errors}
                        />
                        <InputTextColumn
                            field="family"
                            register={editForm.register}
                            strings={strings}
                            msgErrors={editForm.formState.errors}
                        />
                        <InputTextAreaColumn
                            field="description"
                            register={editForm.register}
                            strings={strings}
                            msgErrors={addForm.formState.errors}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            title={general.edit}
                            className="btn btn-primary"
                            type="button"
                            onClick={editForm.handleSubmit(funcs.onEditSubmit)}
                        >
                            {general.edit}
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            data-coreui-dismiss="modal"
                        >
                            {general.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col">{`${strings.name} / ${strings.family}`}</th>
            <th scope="col">{strings.description}</th>
            <th scope="col" style={{ width: "150px", textAlign: "center" }}>
                {general.actions}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = _ls?.pageProps?.items?.map((item, index) => (
            <tr key={item.id}>
                <td scope="row">{index + 1}</td>
                <td>{`${item.name}/${item.family}`}</td>
                <td>{item.description}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => funcs.onEdit(item)}
                        title={general.edit}
                        disabled={_ls?.loading}
                    >
                        <CIcon icon={cilPencil} size="sm" />
                    </button>
                </td>
            </tr>
        ));

        return <TableItems columnsCount={_columnsCount} children={children} />;
    };

    return (
        <>
            <AddList
                page={"Speakers"}
                renderHeader={renderHeader}
                renderItems={renderItems}
                addForm={addForm}
                editForm={editForm}
                funcs={funcs}
            />
            {renderAddModal()}
            {renderEditModal()}
        </>
    );
};

export default Speakers;
