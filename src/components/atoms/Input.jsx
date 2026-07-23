import React, { Component } from "react";

class Input extends Component {
  static defaultProps = {
    type: "text",
    value: "",
    name: "",
    placeholder: "",
    disabled: false,
    readOnly: false,
    onChange: () => {},
    className: "",
  };
  render() {
    const {
      type,
      value,
      name,
      placeholder,
      disabled,
      readOnly,
      onChange,
      className,
    } = this.props;

    return (
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        className={`block w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#0061FF] focus:ring-1 focus:ring-[#0061FF] transition-all ${className}`}
      />
    );
  }
}

export default Input;
