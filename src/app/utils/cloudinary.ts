const cloudinary = require('cloudinary').v2;
const { Readable } = require("stream");

const options = {
    resource_type: "video",
  };

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadStream(buffer) {
    return new Promise((res:any, rej) => {
      const theTransformStream = cloudinary.uploader.upload_stream(
        options,
        (err, result) => {
          if (err) return rej(err);
          res(result);
        }
      );
      let str = Readable.from(buffer);
      str.pipe(theTransformStream);
    });
}


export { cloudinary, uploadStream };