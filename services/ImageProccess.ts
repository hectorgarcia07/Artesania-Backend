import dotenv from "dotenv";
import AWS from 'aws-sdk'
import sharp from 'sharp'
dotenv.config();

export const sharpify = async (originalFile: Express.Multer.File) => {
  try {
    console.log('in Sharpify')

    const image = sharp(originalFile.buffer)
    const meta = await image.metadata()
    if(!meta || !meta.format){
      throw new Error("Unable to get the format of the image.")
    }
    const { format } = meta
    const config = {
      quality: 80
    }

    if(format == 'jpeg' || format == 'jpg'){ 
      const newFile = await image.jpeg(config)
      .resize({ width: 1000, withoutEnlargement: true })
      return newFile
    }
    else if(format == 'png'){
      const newFile = await image.png(config)
      .resize({ width: 1000, withoutEnlargement: true })
      return newFile
    }
    throw new Error("Unable to sharpify due to invalid file type.")
  } catch (err) {
    if(err instanceof Error)
      throw new Error(err.message)
    throw new Error('Shapify failed')
  }
}

export const uploadToAWS = (props: AWS.S3.PutObjectRequest) => {
  console.log('in AWS')
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWSID,
      secretAccessKey: process.env.AWSKEY
    })
    s3.upload(props, (err: any, data: unknown) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}