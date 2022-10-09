import React from "react";
import { useSelector } from "react-redux";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/fa";

const InputTextCKEditorColumn = ({
    field,
    placeholder = null,
    columnClassName = "col-12 pb-4",
    strings,
    content = null,
    setContent,
}) => {
    const _ms = useSelector((state) => state.messageReducer);

    placeholder = placeholder ? placeholder : strings[`${field}Placeholder`];

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            <CKEditor
                editor={ClassicEditor}
                data={content ? content : "<p></p>"}
                config={{
                    language: "fa",
                    toolbar: ["bold", "italic"],
                }}
                onChange={(event, editor) => {
                    setContent(editor.getData());
                }}
            />
            {_ms?.messageField === field && (
                <div className="invalid-feedback">{_ms?.message}</div>
            )}
        </div>
    );
};

export default InputTextCKEditorColumn;
