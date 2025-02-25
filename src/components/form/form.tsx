import { Form } from "antd";
import { DynamicFormProps } from "./types";
import { FormRow } from "./row";

export const DynamicForm = <T extends object>({
    title,
    formFields,
    formStructure,
    form,
    onFinish,
    submitButtonText,
    loading,
    extra,
    hideSubmitButton,
    ...formProps
}: DynamicFormProps<T>) => {
    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            {...formProps}
        >

            {Object.values(formStructure).map((fields, index) => (
                <FormRow
                    key={index}
                    fields={fields}
                    fieldDefinitions={formFields}
                />
            ))}
        </Form>
    );
};
