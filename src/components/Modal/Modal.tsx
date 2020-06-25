import React, { FC } from 'react';
import ReactModal from 'react-modal';
import { X } from 'react-feather';
import cx from 'classnames';

import { Classes } from './styles';

interface ModalProps {
  classes: Classes
  closeButton?: boolean;
}

ReactModal.setAppElement('#root')

const Modal: FC<ReactModal.Props & ModalProps> = ({ classes = {}, className, children, closeButton = true, ...props }) => (
  <ReactModal
    className={cx(classes.modal, className)}
    closeTimeoutMS={200}
    contentLabel="Modal"
    style={{
      overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }}
    {...props}
  >
    {closeButton && <X className={classes.closeModal} onClick={props.onRequestClose} />}
    {children}
  </ReactModal>
)

export default Modal
