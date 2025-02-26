import { Meta, StoryFn } from "@storybook/react";
import { FormField, TemboFormProps } from "../components/form/types";
import { TemboForm } from "../components/form/form";
import { FormFieldBuilder } from "../components/form/builder";
import { z } from "zod";
import { createDescriptionGetter } from "../utils/utils";

export default {
    title: "Components/Form",
    component: TemboForm,
    parameters: {
        docs: {
            description: {
                component:
                    "The `currency` prop is the ISO currency code and can be either in lowercase or uppercase.",
            },
        },
    },
} as Meta<TemboFormProps>;

const Template: StoryFn<TemboFormProps> = (args: TemboFormProps) => <TemboForm {...args} />;

// login-data-structure
const loginschema = z.object({
    email: z.string().email().describe("Your email address"),
    password: z.string().min(6).describe("Your password"),
})

type LogInData = z.infer<typeof loginschema>

// building fields
const builder = new FormFieldBuilder<LogInData>()
const getDesc = createDescriptionGetter(loginschema);

const emailField: FormField = builder.createEmailField({
    label: "Email",
    name: "email",
    placeholder: getDesc("email"),
})
const passwordField: FormField = builder.createPasswordField({
    label: "Password",
    name: "password",
    placeholder: getDesc("password"),
})
const fields: Record<keyof LogInData, FormField> = {
    email: emailField,
    password: passwordField
}

// default form
export const Default = Template.bind({});
Default.args = {
    title: "Log In",
    formFields: fields,
};
