import React, { HTMLAttributes } from "react";
import cx from 'classnames';

import { Classes } from "./styles";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  bold?: boolean;
  primaryColor?: boolean;
  secondaryColor?: boolean;
  classes: Classes;
  children?: any;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  caption?: boolean;
  className?: string;
  red?: boolean;
  green?: boolean;
  grey?: boolean;
}

const Text: React.FC<TextProps> = ({
  bold = false,
  classes,
  children,
  h1,
  h2,
  h3,
  h4,
  caption,
  style,
  className,
}) => {
  let styleOverride = style;

  if (bold) styleOverride = { fontWeight: "bold", ...style };

  if (h1)
    return (
      <h1 style={styleOverride} className={cx(classes.h1, className)}>
        {children}
      </h1>
    );

  if (h2)
    return (
      <h2 style={styleOverride} className={cx(classes.h2, className)}>
        {children}
      </h2>
    );

  if (h3)
    return (
      <h3 style={styleOverride} className={cx(classes.h3, className)}>
        {children}
      </h3>
    );

  if (h4)
    return (
      <h4 style={styleOverride} className={cx(classes.h4, className)}>
        {children}
      </h4>
    );

  if (caption)
    return (
      <span style={styleOverride} className={cx(classes.caption, className)}>
        {children}
      </span>
    );

  return (
    <p style={styleOverride} className={cx(classes.p, className)}>
      {children}
    </p>
  );
};

export default Text;
