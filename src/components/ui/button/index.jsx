import React from "react";
import PropTypes from "prop-types";

const Button = ({
  width,
  border,
  backgroundColor,
  textColor,
  borderRadius,
  onClick,
  children,
  padding,
  className,
  cursor,
  type,
}) => {
  const buttonStyle = {
    width,
    border,
    backgroundColor,
    color: textColor,
    borderRadius,
    padding,
    cursor,
  };

  return (
    <button
      style={buttonStyle}
      type={type}
      onClick={onClick}
      className={`${className} lg:text-lg md:text-base text-xs font-semibold px-[10px] hover:scale-95 transition-all py-[30px]`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  width: PropTypes.string,
  border: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderRadius: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  padding: PropTypes.string,
};

Button.defaultProps = {
  border: "1px solid #5343af",
  backgroundColor: "#5343af",
  textColor: "#ffffff",
  borderRadius: "5px",
  height: "100%",
  padding: '10px 30px',
  width: "",
};

export default Button;
