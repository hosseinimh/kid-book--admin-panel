import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import { MESSAGE_CODES } from "../../constants";

const ReactSelectColumn = ({
    field,
    placeholder = null,
    options,
    values,
    onChange,
    columnClassName = "col-12 pb-4",
    strings,
    msgErrors,
}) => {
    const [msgError, setMsgError] = useState(null);
    const _ls = useSelector((state) => state.layoutReducer);
    const _ms = useSelector((state) => state.messageReducer);

    placeholder = placeholder ? placeholder : strings[`${field}Placeholder`];

    useEffect(() => {
        const hasKeys = !!Object.keys(msgErrors).length;

        if (hasKeys) {
            setMsgError({
                code: MESSAGE_CODES.FORM_INPUT_INVALID,
                type: Object.keys(msgErrors)[0],
                message: msgErrors[Object.keys(msgErrors)[0]].message,
            });
        } else {
            setMsgError(null);
        }
    }, [msgErrors]);

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            <div
                className={
                    _ms?.messageField === field
                        ? "form-control is-invalid"
                        : "form-control"
                }
                style={{ border: "none", padding: "0" }}
            >
                <Select
                    aria-label={`select ${field}`}
                    options={options}
                    value={values}
                    isMulti={false}
                    onChange={(e) => {
                        if (onChange) onChange(e);
                    }}
                    disabled={_ls?.loading}
                />
            </div>
            {(msgError?.type === field || _ms?.messageField === field) && (
                <div className="invalid-feedback">
                    {msgError?.message ?? _ms?.message}
                </div>
            )}
        </div>
    );
};

export default ReactSelectColumn;
