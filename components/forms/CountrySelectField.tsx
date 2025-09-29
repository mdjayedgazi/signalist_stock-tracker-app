'use client';

import { useState, useMemo } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';

type CountrySelectProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
};

type CountryOption = {
    value: string; // country code like "US", "BD"
    label: string; // country name like "United States", "Bangladesh"
};

// Helper function to get flag image URL
const getFlagUrl = (countryCode: string) =>
    `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;

const CountrySelect = ({
                           value,
                           onChange,
                       }: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const countries: CountryOption[] = useMemo(() => countryList().getData(), []);

    // Prioritized search: countries starting with search term first
    const filteredCountries = useMemo(() => {
        if (!search) return countries;

        const searchLower = search.toLowerCase();
        const startsWithMatches = countries.filter((c) =>
            c.label.toLowerCase().startsWith(searchLower)
        );
        const includesMatches = countries.filter((c) =>
            c.label.toLowerCase().includes(searchLower) &&
            !c.label.toLowerCase().startsWith(searchLower)
        );
        return [...startsWithMatches, ...includesMatches];
    }, [search, countries]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="country-select-trigger w-full flex justify-between items-center bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                >
                    {value ? (
                        <span className="flex items-center gap-2">
                            <img
                                src={getFlagUrl(value)}
                                alt={value}
                                className="w-6 h-4 rounded-sm"
                            />
                            <span>{countries.find((c) => c.value === value)?.label}</span>
                        </span>
                    ) : (
                        'Select your country...'
                    )}
                    <ChevronsUpDown className="ml-2 h-2 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-full p-0 bg-gray-800 border-gray-600"
                align="start"
            >
                <div className="flex flex-col max-h-60 overflow-y-auto bg-gray-800">
                    <input
                        type="text"
                        placeholder="Search country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-3 py-2 border-b border-gray-600 bg-gray-800 text-white outline-none"
                    />
                    {filteredCountries.map((country) => (
                        <button
                            key={country.value}
                            onClick={() => {
                                onChange(country.value);
                                setOpen(false);
                                setSearch('');
                            }}
                            className={cn(
                                'flex items-center gap-2 px-3 py-2 hover:bg-gray-700',
                                value === country.value ? 'bg-gray-700' : ''
                            )}
                        >
                            <img
                                src={getFlagUrl(country.value)}
                                alt={country.value}
                                className="w-6 h-4 rounded-sm"
                            />
                            <span>{country.label}</span>
                            {value === country.value && (
                                <Check className="ml-auto h-4 w-4 text-yellow-500" />
                            )}
                        </button>
                    ))}
                    {filteredCountries.length === 0 && (
                        <p className="px-3 py-2 text-gray-400">No countries found</p>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export const CountrySelectField = ({
                                       name,
                                       label,
                                       control,
                                       error,
                                       required = false,
                                   }: CountrySelectProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label text-white">
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => <CountrySelect value={field.value} onChange={field.onChange} />}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
            <p className="text-xs text-gray-400">
                Helps us show market data and news relevant to you.
            </p>
        </div>
    );
};
