const video = document.querySelector('video')
const shot = document.querySelector('button')
const image = document.querySelector('img') 
function getBase64ByVideo(video) {
    const canvas = document.createElement("canvas")
    const w = video.videoWidth
    const h = video.videoHeight
    canvas.width = w
    canvas.height = h
    return new Promise((resolve, reject) => { // 由于toBlob方法是异步的，所以这里用Promise
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, w, h)
      canvas.toBlob((blob) => {
        // 通过FileReader将Blob转化为DataURL
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => {
          const imageUrl = reader.result
          resolve(imageUrl)
        }
      }, 'image/webp', 1) 
    })
}

 shot.addEventListener('click', async function() {
    const dataUrl = await getBase64ByVideo(video)
    console.log(dataUrl)
    image.src = dataUrl
})