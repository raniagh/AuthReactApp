import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  //It will be called from outside of this component
  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    // return elements that we want to be accessible for other components
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.valid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});
export default Input;
