import React, { Component } from "react";

class Label extends Component {
  static defaultProp = {
    htmlFor: "",
    children: "",
    className: "",
  };

  render() {
    const { htmlFor, children, className } = this.props;
    return (
      <label
        htmlFor={htmlFor}
        className={`block text-sky-100 text-lg text-start font-bold mb-2 ${className}`}
      >
        {children}
      </label>
    );
  }
}
export default Label;
