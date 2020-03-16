import React, { memo } from 'react'
import { sourceImage, secretImage } from '../data'
import Picture from './Picture'
import './index.scss'

const Images = memo(({ sourceImageRef, secretImageRef }) => {
  return (
    <div className="images">
      <div className="images__container">
        <Picture ref={sourceImageRef} src={sourceImage} />
      </div>
      <div className="images__container">
        <Picture ref={secretImageRef} src={secretImage} />
      </div>
    </div>
  )
})

export default Images
