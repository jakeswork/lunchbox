import React, { FC } from 'react';
import ReactModal from 'react-modal';
import { X } from 'react-feather';
import cx from 'classnames';

import { Classes } from './styles';
import { Text } from '../';

interface ModalProps {
  classes: Classes
  closeButton?: boolean;
  title?: string;
}

ReactModal.setAppElement('#root')

const Modal: FC<ReactModal.Props & ModalProps> = ({
  classes = {},
  className,
  children,
  closeButton = true,
  title,
  ...props
}) => (
  <ReactModal
    className={cx(classes.modal, className)}
    closeTimeoutMS={200}
    contentLabel={title || 'modal'}
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
    { title && <Text primaryColor className={classes.title} h3>{title}</Text>}
    {children}
  </ReactModal>
)

export default Modal
