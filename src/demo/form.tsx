import { z } from "zod"
import { FormFieldBuilder } from "../components/form/builder"
import { FormField, TemboFormLayout } from "../components/form/types"
import { TemboForm } from "../components/form/form"
import { createDescriptionGetter } from "../utils/utils"
import { Form } from "antd"
import { Currency } from "@temboplus/frontend-core"

// FIRST WAY OF CREATING A FORM
// login-data-structure
const loginschema = z.object({
    email: z.string().email().describe("Your email address"),
    password: z.string().min(6).describe("Your password"),
    dob: z.date().describe("Your date of birth"),
    country: z.string().describe("Your country of residence"),
    currency: z.string().describe("Your preferred currency"),
})

type LogInData = z.infer<typeof loginschema>

// building fields
const builder = new FormFieldBuilder<LogInData>()
const getDesc = createDescriptionGetter(loginschema);

const emailField: FormField = builder.createEmailField({
    label: "Email",
    name: "email",
    placeholder: getDesc("email"),
    required: true,
})
const passwordField: FormField = builder.createPasswordField({
    label: "Password",
    name: "password",
    placeholder: getDesc("password"),
    required: true,
})
const dateField: FormField = builder.createDateField({
    label: "Date of Birth",
    name: "dob",
    placeholder: getDesc("dob"),
})
const countryField: FormField = builder.createSingleCountryField({
    label: "Country",
    name: "country",
    placeholder: getDesc("country"),
})
const currencyField: FormField = builder.createCurrencySelect({
    label: "Currency",
    name: "currency",
    placeholder: getDesc("currency"),
})
const fields: Record<keyof LogInData, FormField> = {
    email: emailField,
    password: passwordField,
    dob: dateField,
    country: countryField,
    currency: currencyField,
}

export const SampleForm = () => {
    const [form] = Form.useForm()

    return <div style={{ width: 500 }}>
        <TemboForm
            title="Unstructured Log In Form"
            form={form}
            formFields={fields}
            description="Please below information to continue. It is important that you fill all fields, especially the ones that are required."
        />
    </div>
}


// SECOND WAY
interface Person {
    name: string;
    age: number;
    country: string;
    salary: number;
    phone: string;
}

const form_builder = new FormFieldBuilder<Person>()
const nameField: FormField = form_builder.createTextField({
    label: "Full Name",
    name: "name",
    placeholder: "Full Name",
    required: true,
})
const ageField: FormField = form_builder.createNumberField({
    label: "Age",
    name: "age",
    placeholder: "Person's age",
})
const countryField2: FormField = form_builder.createSingleCountryField({
    label: "Country",
    name: "country",
    placeholder: "Person's country",
})
const salaryField: FormField = form_builder.createAmountField({
    label: "Salary",
    name: "salary",
    placeholder: "Person's salary",
    currency: Currency.fromCode("usd")
})
const phoneField: FormField = form_builder.createPhoneField({
    label: "Phone Number",
    name: "phone",
    placeholder: "Person's phone",
})

const layout: TemboFormLayout<Person> = {
    rows: {
        row1: ["name", "age"],
        row2: ["salary", "country"],
        row3: ["phone"],
    },
    span: 8,
} as const

const form_fields: Record<keyof Person, FormField> = {
    name: nameField,
    age: ageField,
    salary: salaryField,
    country: countryField2,
    phone: phoneField,
}

export const StructuredForm = () => {
    const [form] = Form.useForm()

    const onfinish = (values: Person) => {
        console.log(values)
    }

    return <TemboForm
        title="Employee Data"
        form={form}
        onFinish={onfinish}
        description="Please below information to continue"
        formFields={form_fields}
        formStructure={layout}
    />
}
