import * as yup from "yup";
import {
    validation,
    storyItemsPage as strings,
} from "../../../constants/strings";

const addStoryItemSchema = yup.object().shape({
    content: yup
        .string(validation.stringMessage.replace(":field", strings.content))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.content)
                .replace(":min", "3")
        )
        .max(
            2000,
            validation.maxMessage
                .replace(":field", strings.content)
                .replace(":max", "2000")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.content)
        ),
});

export default addStoryItemSchema;
