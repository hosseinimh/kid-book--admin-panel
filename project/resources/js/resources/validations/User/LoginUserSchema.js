import * as yup from "yup";
import { validation, loginPage as strings } from "../../../constants/strings";

const loginUserSchema = yup.object().shape({
    mobile: yup
        .string(validation.stringMessage.replace(":field", strings.mobile))
        .min(
            11,
            validation.minMessage
                .replace(":field", strings.mobile)
                .replace(":min", "11")
        )
        .max(
            11,
            validation.maxMessage
                .replace(":field", strings.mobile)
                .replace(":max", "11")
        )
        .required(validation.requiredMessage.replace(":field", strings.mobile)),
    password: yup
        .string(validation.stringMessage.replace(":field", strings.password))
        .min(
            4,
            validation.minMessage
                .replace(":field", strings.password)
                .replace(":min", "4")
        )
        .max(
            4,
            validation.maxMessage
                .replace(":field", strings.password)
                .replace(":max", "4")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.password)
        ),
});

export default loginUserSchema;
