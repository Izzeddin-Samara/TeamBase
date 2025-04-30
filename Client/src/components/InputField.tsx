import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
}

const InputField: React.FC<InputProps> = ({ type, placeholder, value, onChange, name}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full border border-gray-300 outline-none focus:ring-2 p-2 rounded-lg focus:ring-blue-800 mt-4"

    />
  );
};

export default InputField;
