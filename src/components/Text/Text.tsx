import React, { HTMLAttributes } from "react";

import { Classes } from "./styles";

interface TextProps extends HTMLAttributes<HTMLElement> {
  bold?: boolean;
  primaryColor?: boolean;
  classes: Classes;
  children?: any;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  caption?: boolean;
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
  style
}) => {
  let styleOverride = style;

  if (bold) styleOverride = { fontWeight: "bold", ...style };

  if (h1)
    return (
      <h1 style={styleOverride} className={classes.h1}>
        {children}
      </h1>
    );

  if (h2)
    return (
      <h2 style={styleOverride} className={classes.h2}>
        {children}
      </h2>
    );

  if (h3)
    return (
      <h3 style={styleOverride} className={classes.h3}>
        {children}
      </h3>
    );

  if (h4)
    return (
      <h4 style={styleOverride} className={classes.h4}>
        {children}
      </h4>
    );

  if (caption)
    return (
      <span style={styleOverride} className={classes.caption}>
        {children}
      </span>
    );

  return (
    <p style={styleOverride} className={classes.p}>
      {children}
    </p>
  );
};

export default Text;
