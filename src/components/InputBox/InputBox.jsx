import React from "react";
import "./InputBox.css";
import Form from "react-bootstrap/Form";

export const InputBox = ({
  className,
  type,
  name,
  placeholder,
  required,
  changeFunction,
  blurFunction,
}) => {
  return (
    <>
      <Form.Control
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => {changeFunction(e)}}
        onBlur={(e)=>blurFunction(e)}
      />
    </>
  );
};