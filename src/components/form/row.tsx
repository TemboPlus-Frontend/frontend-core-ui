import React from "react";
import { FormRowProps } from "./types";
import { Form, Row, Col } from "antd";

export const FormRow: React.FC<FormRowProps> = ({ 
    fields, 
    fieldDefinitions,
    columnSpan = 8 
}) => {
    return (
        <Row gutter={24}>
            {fields.map(fieldName => {
                const { render, ...fieldProps } = fieldDefinitions[fieldName];
                return (
                    <Col key={fieldName} span={columnSpan}>
                        <Form.Item key={fieldName} {...fieldProps}>
                            {render()}
                        </Form.Item>
                    </Col>
                );
            })}
        </Row>
    );
};
