import { encryptionKey } from './data'

export const getPixel = (context, x, y) => {
  const [r, g, b] = context.getImageData(x, y, 1, 1).data
  return { r, g, b }
}

export const putPixelToMessageImage = ({ imageData, width, sourcePixel, secretPixel, x, y }) => {
  const diff = {
    r: secretPixel.r - sourcePixel.r,
    g: secretPixel.g - sourcePixel.g,
    b: secretPixel.b - sourcePixel.b,
  }

  const encryptedValue = parseInt(
    diff.r.toString(2).padStart(2, '0') +
      diff.g.toString(2).padStart(3, '0') +
      diff.b.toString(2).padStart(3, '0'),
    2,
  )

  const pixelPosition = y * width + x

  const messagePixel =
    encryptedValue ^ encryptionKey[pixelPosition % encryptionKey.length].charCodeAt()

  imageData.data[pixelPosition * 4] = messagePixel
  imageData.data[pixelPosition * 4 + 1] = messagePixel
  imageData.data[pixelPosition * 4 + 2] = messagePixel
  imageData.data[pixelPosition * 4 + 3] = 255
}
