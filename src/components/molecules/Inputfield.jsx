import Input from "../atoms/Input";
import Label from "../atoms/Label";

const InputField = ({
  id,
  label,
  type = "text",
  value,
  name,
  placeholder,
  disabled = false,
  readOnly = false,
  onChange,
  className = '',
  inputClassName = '',
  labelClassName = '',
}) => {
  return (
    <div className={`input-field-group ${className}`}>
      {label && <Label htmlFor={id} className={labelClassName}></Label>}
      <Input
        id={id}
        type={type}
        value={value}
        name={name} 
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        inputClassName={inputClassName}
      />
    </div>
  );
}

export default InputField;