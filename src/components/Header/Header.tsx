import React, { FC } from 'react';

import logo from '../../images/appetite-logotype-transparent.png';
import { Classes } from './styles';

interface HeaderProps {
  classes: Classes;
}

const Header: FC<HeaderProps> = ({ classes = {} }) => (
  <header className={classes.root}>
    <img src={logo} alt="Appetite Logo" />
  </header>
)

export default Header;
