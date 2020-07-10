import React, { FC } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus, TransitionProps } from 'react-transition-group/Transition';

import { transitionStyles, Classes } from './styles';


interface FadeTransitionProps {
  classes: Classes;
}

const FadeTransition: FC<FadeTransitionProps & TransitionProps> = ({ classes = {}, children, ...props }) => (
  <Transition {...props}>
    {
      state => (
        <div className={classes.root} style={{ ...transitionStyles[state as TransitionStatus] }}>
          { children }
        </div>
      )
    }
  </Transition>
)

export default FadeTransition;
