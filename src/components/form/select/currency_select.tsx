import { Currency, CurrencyService } from "@temboplus/frontend-core";
import { SelectProps, Select } from "antd";
import { useMemo, useCallback } from "react";

/**
 * Type for the complete currencies object
 * Keys are currency codes (e.g., 'USD', 'CAD')
 */
export type Currencies = Record<string, Currency>;

const getAllCurrencies = (): Currency[] => {
    return CurrencyService.getInstance().getAll()
}

export const CurrencySelect: React.FC<SelectProps<Currency>> = (props) => {
    // Memoize the items and names to prevent unnecessary recalculations
    const items = useMemo(() =>
        getAllCurrencies().map(c => ({
            label: c.name,
            value: c.code,
            searchText: c.name.toLowerCase() // Pre-compute lowercase for searching
        })),
        [] // Empty dependency array since getAllCountries is presumably static
    );

    const filterOption = useCallback((input: any, option: any) => {
        if (!input || !option?.label) return false;

        const lowerInput = input.toLowerCase();
        const searchText = option.label.toString().toLowerCase();

        return (
            searchText === lowerInput ||           // Exact match
            searchText.startsWith(lowerInput) ||   // Starts with
            searchText.includes(lowerInput)        // Contains
        );
    }, []);

    return (
        <Select<Currency>
            allowClear
            showSearch
            filterOption={filterOption}
            style={{ width: '100%' }}
            placeholder="Please select a currency"
            options={items}
            {...props}
        />
    );
}

export default CurrencySelect