/**
 * ブラウザが webp をサポートしているかどうか
 * @see https://white-space.work/css-background-using-webp/
 * @returns webp をサポートしているなら true そうでないなら false
 */
export const supportsWebp = async (): Promise<boolean> => {
  const { createImageBitmap } = self
  if (!createImageBitmap) return false
  // webp の仮データ
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
  const blob = await fetch(webpData).then((r) => r.blob())
  return createImageBitmap(blob).then(
    () => true,
    () => false
  )
}
