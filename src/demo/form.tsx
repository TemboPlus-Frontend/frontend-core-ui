import { z } from "zod"
import { FormFieldBuilder } from "../components/form/builder"
import { FormField, TemboFormLayout } from "../components/form/types"
import { TemboForm } from "../components/form/form"
import { createDescriptionGetter } from "../utils/utils"
import { Form } from "antd"

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

export const SampleForm = () => {
    const [form] = Form.useForm()

    return <div style={{ width: 500 }}>
        <TemboForm
            title="Unstructured Log In Form"
            form={form}
            formFields={fields}
            description="Please below information to continue"
        />
    </div>
}

const layout: TemboFormLayout<LogInData> = {
    rows: {
        row1: ["email"],
        row2: ["password"],
    },
    span: 8,
} as const

export const StructuredForm = () => {
    const [form] = Form.useForm()

    return <TemboForm
        title="Structured Log In Form"
        form={form}
        description="Please below information to continue"
        formFields={fields}
        formStructure={layout}
    />
}
