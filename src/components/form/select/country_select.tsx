import { Select, SelectProps } from "antd"
import { useCallback, useMemo } from "react";

import { DefaultOptionType } from "antd/es/select";
import { CountryService } from "@temboplus/frontend-core";

export interface CountryOption extends DefaultOptionType {
    label: string;
    value: string;
}

const getAllCountries = (): CountryOption[] => {
    return CountryService.getInstance().getAll().map(country => ({ label: country.name, value: country.code }));
};

export const MultipleCountriesSelect: React.FC<SelectProps<CountryOption>> = (props) => {
    // Memoize the items and names to prevent unnecessary recalculations
    const items = useMemo(() =>
        getAllCountries().map(c => ({
            label: c.label,
            value: c.value,
            searchText: c.label.toLowerCase() // Pre-compute lowercase for searching
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
        <Select<CountryOption>
            mode="multiple"
            allowClear
            showSearch
            filterOption={filterOption}
            style={{ width: '100%' }}
            placeholder="Please select countries"
            options={items}
            {...props}
        />
    );
};

export const SingleCountrySelect: React.FC<SelectProps<CountryOption>> = (props) => {
    // Memoize the items and names to prevent unnecessary recalculations
    const items = useMemo(() =>
        getAllCountries().map(c => ({
            label: c.label,
            value: c.value,
            searchText: c.label.toLowerCase() // Pre-compute lowercase for searching
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
        <Select<CountryOption>
            allowClear
            showSearch
            filterOption={filterOption}
            style={{ width: '100%' }}
            placeholder="Please select a country"
            options={items}
            {...props}
        />
    );
}
