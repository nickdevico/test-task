import React, { memo } from 'react'
import cx from 'classnames'

import './index.scss'

const Button = memo(({ children, isLoading, disabled, onClick }) => {
  return (
    <div
      className={cx('button', {
        'button--loading': isLoading,
      })}
      onClick={onClick}
    >
      {isLoading ? 'Loading...' : children}
    </div>
  )
})

export default Button
