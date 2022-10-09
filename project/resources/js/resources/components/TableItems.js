import React from "react";
import { useSelector } from "react-redux";

import { imgPath } from "../../constants";
import { general } from "../../constants/strings";

const TableItems = ({ children, columnsCount }) => {
    const _ls = useSelector((state) => state.layoutReducer);

    if (children?.length > 0) {
        return children;
    } else if (_ls?.loading) {
        return (
            <tr>
                <td colSpan={columnsCount} className="img-loading-wrapper">
                    <img
                        src={`${imgPath}/loading-form.gif`}
                        className="img-loading"
                    />
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td colSpan={columnsCount}>{general.noDataFound}</td>
        </tr>
    );
};

export default TableItems;
