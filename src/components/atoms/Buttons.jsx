import React from "react";

const Button = (props) => {
  const {
    children,
    styles,
    onClick,
    type = "button",
    disabled = false,
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        relative
        py-2 px-4 rounded-lg text-base md:text-lg lg:text-xl 
        shadow-xl
        group cursor-pointer
        disabled:opacity-70 disabled:cursor-not-allowed
        ${styles} 
    `}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
