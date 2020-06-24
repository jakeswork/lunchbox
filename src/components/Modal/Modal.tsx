import React, { FC } from 'react';
import ReactModal from 'react-modal';
import { X } from 'react-feather';

import { Classes } from './styles';
import './react-modal.css';

interface ModalProps {
  classes: Classes
}

ReactModal.setAppElement('#root')

const Modal: FC<ReactModal.Props & ModalProps> = ({ classes = {}, children, ...props }) => (
  <ReactModal
    className={classes.modal}
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
    <X className={classes.closeModal} onClick={props.onRequestClose} />
    {children}
  </ReactModal>
)

export default Modal
