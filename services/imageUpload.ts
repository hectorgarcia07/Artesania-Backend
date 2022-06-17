/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv from "dotenv";
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWSKEY,
  accessKeyId: process.env.AWSID,
});

const s3 = new aws.S3();

//will validate the file type
const fileFilter = (_req:any, file:any, cb: (arg0: Error | null, arg1: boolean) => void) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG, JPG, and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: process.env.BUCKETNAME,
    metadata: function (_req: Express.Request, file: Express.Multer.File, cb: (error: any, metadata?: any) => void) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (_req: Express.Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
      const re = /(?:\.([^.]+))?$/;
      //const filename = file?.originalname;
      const ext = re.exec(file.originalname);
      if(Array.isArray(ext) && ext[0] != undefined && ext[0] != null){
        cb(null, `${Date.now().toString()}${ext[0]}`);
      }else{
        cb(null, `${Date.now().toString()}`);
      }
    },
  }),
});

export default upload;