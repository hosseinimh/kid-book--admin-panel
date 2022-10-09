import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { MESSAGE_CODES } from "../../constants";

const InputTextAreaColumn = ({
    field,
    placeholder = null,
    register,
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
            <textarea
                {...register(`${field}`)}
                className={
                    msgError?.type === field || _ms?.messageField === field
                        ? "form-control is-invalid"
                        : "form-control"
                }
                id={field}
                placeholder={placeholder}
                disabled={_ls?.loading}
            />
            {(msgError?.type === field || _ms?.messageField === field) && (
                <div className="invalid-feedback">
                    {msgError?.message ?? _ms?.message}
                </div>
            )}
        </div>
    );
};

export default InputTextAreaColumn;
