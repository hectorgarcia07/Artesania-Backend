import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI
const BUCKETNAME = process.env.BUCKETNAME
const SECRET = process.env.SECRET
const AWSID = process.env.AWSID
const AWSKEY = process.env.AWSKEY
const AWSCLOUDFRONT = process.env.AWSCLOUDFRONT
const PORT = process.env.PORT

export default {
  MONGODB_URI,
  BUCKETNAME,
  SECRET,
  AWSID,
  AWSKEY,
  AWSCLOUDFRONT,
  PORT
}