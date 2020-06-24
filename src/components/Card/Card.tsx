import React, { HTMLAttributes } from "react";
import classNames from "classnames";
import { Classes } from "jss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  classes: Classes;
  className?: string;
  children?: any;
}

const Card: React.FC<CardProps> = ({
  classes = {},
  children = null,
  className = "",
  ...props
}) => (
  <div className={classNames(classes.root, className)} {...props}>
    {children}
  </div>
);

export default Card;
