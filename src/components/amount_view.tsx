// deno-lint-ignore verbatim-module-syntax
import React from 'react';
import { Typography } from 'antd';
import { useMemo } from "react";
import type { GetProps } from "antd";
import { Amount } from '@temboplus/frontend-core';

export interface AmountViewProps extends GetProps<typeof Typography.Text> {
    amount: number;
    currency?: string;
    className?: string;
    type?: 'success' | 'warning' | 'danger' | 'secondary';
}

const AmountView: React.FC<AmountViewProps> = (props) => {
    const { amount, currency, className, type, ...other } = props
    const _amount = useMemo(() => Amount.from(amount, currency), [amount, currency]);
    if (!_amount) return null

    const getTextType = () => {
        switch (type) {
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            case 'danger':
                return 'danger';
            case 'secondary':
                return 'secondary';
            default:
                return undefined;
        }
    };

    return (
        <Typography.Text className={className} type={getTextType()} {...other}>
            {_amount.label}
        </Typography.Text>
    );
};

export default AmountView