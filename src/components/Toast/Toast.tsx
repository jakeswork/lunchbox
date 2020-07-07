import React, { FC } from 'react';
import { ToastContainer, Zoom, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Classes } from './styles';

interface ToastProps extends ToastContainerProps {
  classes: Classes
}

const Toast: FC<ToastProps> = ({ classes = {} }) => (
  <ToastContainer
    className={classes.container}
    bodyClassName={classes.body}
    toastClassName={classes.toast}
    progressClassName={classes.progress}
    position="bottom-left"
    transition={Zoom}
  />
);

export default Toast;
