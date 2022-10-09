import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { general } from "../../constants/strings";
import { InsertPage } from "../Pages/_layout";

const SubmitCancelForm = ({
    children,
    page,
    funcs,
    handleSubmit,
    errors,
    setValue = null,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _ls = useSelector((state) => state.layoutReducer);
    const [params, setParams] = useState({});
    const newParams = useParams();

    funcs.init(dispatch, navigate, setValue);

    if (JSON.stringify(params) !== JSON.stringify(newParams)) {
        setParams(newParams);
    }

    useEffect(() => {
        funcs.onLayoutState();
    }, [_ls]);

    useEffect(() => {
        funcs.onLoad(params);
    }, [params]);

    return (
        <InsertPage page={page} errors={errors}>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">{children}</div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-12">
                                    <button
                                        className="btn btn-success px-4 ml-2"
                                        type="button"
                                        onClick={handleSubmit(funcs.onSubmit)}
                                        disabled={_ls?.loading}
                                    >
                                        {general.submit}
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={funcs.onCancel}
                                        disabled={_ls?.loading}
                                    >
                                        {general.cancel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InsertPage>
    );
};

export default SubmitCancelForm;
