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

import { Text } from '../';

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
  error?: string;
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
  onFocus = () => {},
  onBlur = () => {},
  error = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className={classNames(classes.root, className)}>
        {placeholder && (
          <span
            data-test-id="placeholder"
            className={classNames(classes.placeholder, {
              [classes.placeholderActive]: isFocused,
              [classes.error]: Boolean(error),
            })}
          >
            {placeholder}
          </span>
        )}
        {icon && React.cloneElement(icon, { className: classes.inputIcon })}
        <input
          {...props}
          ref={ref}
          onFocus={(event) => {
            setIsFocused(true);

            inputIsFocused && inputIsFocused(true);

            return onFocus && onFocus(event)
          }}
          onBlur={(event) => {
            setIsFocused(value.length > 0);

            inputIsFocused && inputIsFocused(false);

            return onBlur && onBlur(event)
          }}
          className={classNames(classes.input, {
            [classes.inputActive]: isFocused,
            [classes.error]: Boolean(error),
          })}
          value={value}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.keyCode === 13) onEnterPressed()

            if (e.keyCode === 9 && ignoreTab) return e.preventDefault()
          }}
        />
      </div>
      { error && <Text bold red>{error}</Text>}
    </>
  )}
)

export default Input;
