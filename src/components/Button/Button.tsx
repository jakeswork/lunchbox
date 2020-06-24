import React, { ButtonHTMLAttributes, ReactElement, DetailedHTMLProps } from "react";
import { ClassicSpinner } from "react-spinners-kit";
import cx from 'classnames';

import { Classes } from './styles';

export interface ButtonProps extends
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  classes: Classes;
  secondary?: boolean;
  flat?: boolean;
  icon?: ReactElement;
  success?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  classes = {},
  secondary = false,
  flat = false,
  children = null,
  icon = null,
  success = false,
  danger = false,
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  let cN = classes.button;

  if (secondary) cN = classes.secondary;

  if (flat) cN = classes.flat;

  return (
    <button
      disabled={disabled || loading || success}
      {...props}
      className={cx(cN, className)}
    >
      {loading ? (
        <ClassicSpinner size={16} />
      ) : danger ? (
        "Error"
      ) : success ? (
        "Success!"
      ) : (
        children
      )}
      {icon && React.cloneElement(icon, { className: cx(classes.buttonIcon, icon.props?.className) })}
    </button>
  );
};

export default Button;
