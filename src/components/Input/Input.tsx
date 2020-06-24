import React, {
  useState,
  ReactElement,
  KeyboardEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  forwardRef,
} from "react";
import classNames from "classnames";
import { Classes } from "jss";

export interface InputProps extends
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  classes: Classes;
  placeholder?: string;
  width?: string;
  className?: string;
  icon?: ReactElement;
  type?: string;
  inputIsFocused?(arg0: boolean): void;
  onEnterPressed?: Function;
  value?: any;
  ref?: RefObject<HTMLInputElement>;
  ignoreTab?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  classes = {},
  placeholder,
  className,
  icon,
  inputIsFocused = () => {},
  onEnterPressed = () => {},
  value = '',
  width = '',
  ignoreTab = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={classNames(classes.root, className)}>
      {placeholder && (
        <span
          data-test-id="placeholder"
          className={classNames(classes.placeholder, {
            [classes.placeholderActive]: isFocused
          })}
        >
          {placeholder}
        </span>
      )}
      {icon && React.cloneElement(icon, { className: classes.inputIcon })}
      <input
        ref={ref}
        onFocus={() => {
          setIsFocused(true);

          return inputIsFocused && inputIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(value.length > 0);

          return inputIsFocused && inputIsFocused(false);
        }}
        className={classNames(classes.input, {
          [classes.inputActive]: isFocused
        })}
        value={value}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          if (e.keyCode === 13) onEnterPressed()

          if (e.keyCode === 9 && ignoreTab) return e.preventDefault()
        }}
        {...props}
      />
    </div>
  )}
)

export default Input;
