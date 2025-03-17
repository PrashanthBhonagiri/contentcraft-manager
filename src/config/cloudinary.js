import { Cloudinary } from "@cloudinary/url-gen";
// import 'dotenv/config';

const cloudinaryConfig = {
  cloudName: 'nitaivani',
  uploadPreset: 'contentcraft', // Create an unsigned upload preset in your Cloudinary dashboard
  // apiKey: process.env.CLOUDINARY_API_KEY
};

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudinaryConfig.cloudName
  }
});

export default cloudinaryConfig;
