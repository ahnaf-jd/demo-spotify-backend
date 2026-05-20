const { ImageKit } = require("@imagekit/nodejs")

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
  const result = await ImageKitClient.files.upload({
    file,
    fileName: "music_" + Date.now(),
    folder: "backend/demo-spotify-system"
  })
  return result;
}
module.exports = uploadFile;