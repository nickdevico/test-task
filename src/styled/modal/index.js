import React, { memo } from 'react'
import cx from 'classnames'
import Button from '../button'

import './index.scss'

const Modal = memo(({ children, isOpen, onClose }) => (
  <div
    className={cx('modal', {
      'modal--open': isOpen,
    })}
  >
    <div className="modal__dimmer" onClick={onClose} />
    <div className="modal__content">
      <div className="modal__content-inner">{children}</div>
      <div className="modal__actions">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  </div>
))

export default Modal
