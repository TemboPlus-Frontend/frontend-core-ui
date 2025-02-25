import { FormInstance, FormProps } from "antd";
import { ReactNode } from "react";

export interface FormField {
    render: () => ReactNode;
    [key: string]: any;
}

export interface FormLayout {
    [key: string]: string[];
}

export interface DynamicFormProps<T = any> extends Omit<FormProps, "onFinish"> {
    title?: string;
    formFields: Record<string, FormField>;
    formStructure: FormLayout;
    form: FormInstance<T>;
    onFinish: (values: T) => Promise<void> | void;
    submitButtonText?: string;
    loading?: boolean;
    extra?: ReactNode;
    hideSubmitButton?: boolean;
}

// Updated interfaces to support sections
export interface FormSection {
    title: string;
    fields: string[];
    description?: string;
    extra?: ReactNode;
}

export interface SectionedFormLayout {
    [sectionKey: string]: FormSection;
}

// Updated form props to support sections
export interface SectionedFormProps<T = any>
    extends Omit<DynamicFormProps<T>, "formStructure"> {
    formStructure: SectionedFormLayout;
}

// Form Section component
export interface FormSectionProps {
    title: string;
    description?: string;
    extra?: ReactNode;
    children: ReactNode;
}

export interface FormRowProps {
    fields: string[];
    fieldDefinitions: Record<string, FormField>;
    columnSpan?: number;
}
