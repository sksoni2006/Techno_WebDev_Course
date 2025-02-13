import React from "react";
import PropTypes from "prop-types";
import "./button.css"; // Ensure you have corresponding CSS for styling

const Button = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Prop types for validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

// Default props
Button.defaultProps = {
  onClick: () => {},
  type: "button",
  className: "",
  disabled: false,
};

export default Button;
