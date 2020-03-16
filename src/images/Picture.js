import React, { memo, useRef, useEffect, forwardRef, useCallback } from 'react'

const Picture = memo(
  forwardRef(({ src }, ref) => {
    const rootRef = useRef(null)

    useEffect(() => {
      const img = new Image()
      img.src = src
      img.addEventListener('load', () => {
        rootRef.current.getContext('2d').drawImage(img, 0, 0)
      })
    }, [src])

    const setRef = useCallback(
      el => {
        ref.current = el
        rootRef.current = el
      },
      [ref],
    )

    return <canvas ref={setRef} width="600" height="400" />
  }),
)

export default Picture
