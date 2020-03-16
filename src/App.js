import React, { useState, useRef, useCallback } from 'react'
import Images from './images'
import Button from './styled/button'
import Modal from './styled/modal'
import { getPixel, putPixelToMessageImage } from './utils'

import './App.scss'

const App = () => {
  const sourceImageRef = useRef(null)
  const secretImageRef = useRef(null)
  const messageImageRef = useRef(null)

  const [isModalVisible, toggleModal] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const handleShowModal = useCallback(() => {
    toggleModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    toggleModal(false)
  }, [])

  const handleDecode = useCallback(() => {
    setLoading(true)

    setTimeout(() => {
      const width = sourceImageRef.current.clientWidth
      const height = sourceImageRef.current.clientHeight

      const sourceImageContext = sourceImageRef.current.getContext('2d')
      const secretImageContext = secretImageRef.current.getContext('2d')
      const messageImageContext = messageImageRef.current.getContext('2d')

      const messageImageData = messageImageContext.getImageData(0, 0, width, height)

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const sourcePixel = getPixel(sourceImageContext, x, y)
          const secretPixel = getPixel(secretImageContext, x, y)

          putPixelToMessageImage({
            imageData: messageImageData,
            width,
            sourcePixel,
            secretPixel,
            x,
            y,
          })
        }
      }

      messageImageContext.putImageData(messageImageData, 0, 0)

      setLoading(false)
      handleShowModal()
    }, 50)
  }, [handleShowModal])

  return (
    <div className="app">
      <Images sourceImageRef={sourceImageRef} secretImageRef={secretImageRef} />
      <div className="app__button-container">
        <Button isLoading={isLoading} onClick={handleDecode}>
          Decode
        </Button>
      </div>
      <Modal isOpen={isModalVisible} onClose={handleCloseModal}>
        <canvas ref={messageImageRef} width="600" height="400" />
      </Modal>
    </div>
  )
}

export default App
