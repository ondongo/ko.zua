import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Sélectionnez une option",
  onChange,
  className = "",
  defaultValue = "",
  disabled = false,
}) => {
  // Gérer la valeur sélectionnée
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // Déclencher le gestionnaire parent
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ${
        selectedValue ? "text-gray-800" : "text-gray-400"
      } ${className}`}
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled} 
    >
      {/* Option de placeholder */}
      <option value="" disabled className="text-gray-700">
        {placeholder}
      </option>
      {/* Mapper les options */}
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-700">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
