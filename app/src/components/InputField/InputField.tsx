import React from "react";

interface InputFieldProps {
  placeholder: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <input type="text" placeholder={placeholder} onChange={handleChange} />
    </div>
  );
};

export default InputField;
