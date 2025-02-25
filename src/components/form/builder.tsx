import { DatePicker, Input, FormItemProps, InputNumber } from "antd";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import { MultipleCountriesSelect, SingleCountrySelect } from "./select";
import CurrencySelect from "./select/currency_select";

interface BaseFieldConfig {
    label: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export class FormFieldBuilder<T extends object> {
    private createField(
        config: Omit<FormItemProps<T>, 'children'> & {
            render: () => React.ReactNode;
        }
    ): FormItemProps<T> & { render: () => React.ReactNode } {
        return config;
    }

    private createRequiredRule(message?: string): Rule {
        return {
            required: true,
            message: message || "This field is required"
        };
    }

    createTextField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T, initialValue?: any }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule());
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            initialValue: config.initialValue,
            rules: [
                ...rules,
                { type: "string" }
            ],
            render: () => (
                <Input
                    disabled={config.disabled}
                    placeholder={config.placeholder}
                    data-testid={`${String(config.name)}-input`}
                />
            )
        });
    }

    createAmountField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T, initialValue?: any }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule());
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            initialValue: config.initialValue,
            rules: [
                ...rules,
            ],
            render: () => (
                <InputNumber
                    style={{ width: "100%" }}
                    disabled={config.disabled}
                    placeholder={config.placeholder}
                    data-testid={`${String(config.name)}-input`}
                />
            )
        });
    }

    createTextAreaField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T, rows?: number }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule());
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules: [
                ...rules,
                { type: "string" }
            ],
            render: () => (
                <Input.TextArea
                    disabled={config.disabled}
                    rows={config?.rows}
                    placeholder={config.placeholder}
                    data-testid={`${String(config.name)}-textarea`}
                />
            )
        });
    }

    createDateField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule());
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules: [
                ...rules,
                { type: "date" }
            ],
            getValueProps: (value) => ({
                value: value ? dayjs(value) : undefined,
                placeholder: config.placeholder || "Select date"
            }),
            render: () => (
                <DatePicker
                    style={{ width: "100%" }}
                    disabled={config.disabled}
                    data-testid={`${String(config.name)}-date-picker`}
                />
            )
        });
    }

    createEmailField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule("Email is required"));
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules: [
                ...rules,
                {
                    type: "email",
                    message: "Please enter a valid email address"
                }
            ],
            render: () => (
                <Input
                    type="email"
                    disabled={config.disabled}
                    placeholder={config.placeholder || "Enter email"}
                    data-testid={`${String(config.name)}-input`}
                />
            )
        });
    }

    createPhoneField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule("Phone number is required"));
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules: [
                ...rules,
                {
                    pattern: /^[+]?[\d\s-()]*$/,
                    message: "Please enter a valid phone number"
                }
            ],
            render: () => (
                <Input
                    disabled={config.disabled}
                    placeholder={config.placeholder || "Enter phone number"}
                    data-testid={`${String(config.name)}-input`}
                />
            )
        });
    }

    createURLField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule("URL is required"));
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules: [
                ...rules,
                {
                    type: "url",
                    message: "Please enter a valid URL"
                }
            ],
            render: () => (
                <Input
                    disabled={config.disabled}
                    placeholder={config.placeholder || "Enter URL"}
                    data-testid={`${String(config.name)}-input`}
                />
            )
        });
    }

    createSingleCountryField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule("Country is required"));
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules,
            render: () => (
                <SingleCountrySelect
                    disabled={config.disabled}
                    placeholder={config.placeholder}
                    data-testid={`${String(config.name)}-select`}
                />
            )
        });
    }

    createMultipleCountriesField(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule("At least one country must be selected"));
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules: [
                ...rules,
                { type: "array" }
            ],
            render: () => (
                <MultipleCountriesSelect
                    disabled={config.disabled}
                    placeholder={config.placeholder}
                    data-testid={`${String(config.name)}-select`}
                />
            )
        });
    }

    createCurrencySelect(config: Omit<BaseFieldConfig, 'name'> & { name: keyof T }) {
        const rules: Rule[] = [];
        if (config.required) {
            rules.push(this.createRequiredRule("Currency is required"));
        }

        return this.createField({
            label: config.label,
            name: config.name as any,
            rules,
            render: () => (
                <CurrencySelect
                    disabled={config.disabled}
                    placeholder={config.placeholder}
                    data-testid={`${String(config.name)}-select`}
                />
            )
        });
    }
}
