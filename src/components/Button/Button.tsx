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
      { children }
      {(icon && !loading) && (
        <div className={classes.buttonIcon}>
          { React.cloneElement(icon, { size: 20 }) }
        </div>
      )}
      {loading && (
        <div className={classes.buttonIcon}>
          <ClassicSpinner size={16} />
        </div>
      )}
    </button>
  );
};

export default Button;
