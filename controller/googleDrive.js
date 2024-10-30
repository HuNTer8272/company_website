
  import fs from "fs";
  import { google } from "googleapis";
  import dotenv from "dotenv";

  dotenv.config();

  const googleDriveController = {
    uploadImg: async (req, res) => {
      try {
        const auth = new google.auth.GoogleAuth({
          keyFile: "d:/Vs code/Ecommerce/backend/jsonKey.json",
          scopes: ["https://www.googleapis.com/auth/drive"],
        });

        const driveService = google.drive({
          version: "v3",
          auth: await auth.getClient(),
        });

        const fileMetaData = {
          name: 'img.jpg', // Assuming req.body.filename contains the name of the file
          parents: [process.env.DRIVE_ID],
        };

        const media = {
          mimeType: "image/jpeg",
          body: req.body.file, // This should be modified
        };
        const response = await driveService.files.create({
          resource: fileMetaData,
          media: media,
          fields: "id",
        });

        res.send(response.data.id);
        console.log("Image has been successfully stored into the google drive");
        return response.data.id;
      } catch (err) {
        console.log(`An error occurred while uploading the image: ${err}`);
        res.status(500).send("Error uploading image");
      }
    },
  };


  export default googleDriveController;

  // import fs from "fs";
  // import { google } from "googleapis";
  // import dotenv from "dotenv";
  
  // dotenv.config();
  
  // const googleDriveController = {
  //   uploadImg: async (req, res) => {
  //     try {
  //       const file = req.body;
  
  //       // Save the file on the server
  //       const filePath = `d:/Vs code/Ecommerce/backend/`;
  //       fs.writeFileSync(filePath, file);
  
  //       // Upload the file to Google Drive
  //       const auth = new google.auth.GoogleAuth({
  //         keyFile: "d:/Vs code/Ecommerce/backend/jsonKey.json",
  //         scopes: ["https://www.googleapis.com/auth/drive"],
  //       });
  
  //       const driveService = google.drive({
  //         version: "v3",
  //         auth: await auth.getClient(),
  //       });
  
  //       const fileMetaData = {
  //         name: "image.jpg",
  //         parents: [process.env.DRIVE_ID],
  //       };
  
  //       const media = {
  //         mimeType: "image/jpeg",
  //         body: fs.createReadStream(filePath),
  //       };
  
  //       const response = await driveService.files.create({
  //         requestBody: fileMetaData,
  //         media: media,
  //         fields: "id",
  //       });
  
  //       // Delete the file from the server
  //       fs.unlinkSync(filePath);
  
  //       res.send(response.data.id);
  //       console.log("Image has been successfully stored into the Google Drive");
  //       return response.data.id;
  //     } catch (err) {
  //       console.log(`An error occurred while uploading the image: ${err}`);
  //       res.status(500).send("Error uploading image");
  //     }
  //   },
  // };
  
  // export default googleDriveController;
  



// import Multer from "multer";
// import { google } from "googleapis";
// import dotenv from "dotenv";
// import fs from "fs";
// import express from "express";

// const driveRouter = express.Router()

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 200 * 1024 * 1024,
//     fieldNameLength: 100,
//   },
// });
// dotenv.config();

// const authenticateGoogle = () => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: `d:/Vs code/Ecommerce/backend/jsonKey.json`,
//     scopes: "https://www.googleapis.com/auth/drive",
//   });
//   return auth;
// };

// const uploadToGoogleDrive = async (file, auth) => {
//   const fileMetadata = {
//     name: file.originalname,
//     parents: [process.env.DRIVE_ID],
//   };

//   const media = {
//     mimeType: file.mimetype,
//     body: fs.createReadStream(file.path),
//   };

//   const driveService = google.drive({ version: "v3", auth });

//   const response = await driveService.files.create({
//     requestBody: fileMetadata,
//     media: media,
//     fields: "id",
//   });
//   return response;
// };

// const deleteFile = (filePath) => {
//   fs.unlink(filePath, (error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("File deleted");
//     }
//   });
// };

// driveRouter.post(
//   "/uploadImg",
//   multer.single("image"),
//   async (req, res) => {
//     try {
//       if (!req.image) {
//         res.status(400).send("No file uploaded.");
//         return;
//       }
//       const fileName = req.file.originalname;
//       if (fileName.length > 100) {
//         res.status(400).send("File name too long.");
//         return;
//       }
//       const auth = authenticateGoogle();
//       const response = await uploadToGoogleDrive(req.file, auth);
//       deleteFile(req.file.path);
//       res.status(200).json({ response });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Error uploading file to Google Drive.");
//     }
//   }
// );

// export default driveRouter;



// import Multer from "multer";
// import { google } from "googleapis";
// import dotenv from "dotenv";
// import fs from "fs";
// import express from "express";

// const driveRouter = express.Router();

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 200 * 1024 * 1024,
//     fieldNameLength: 100,
//   },
// });
// dotenv.config();

// const authenticateGoogle = () => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: `d:/Vs code/Ecommerce/backend/jsonKey.json`,
//     scopes: "https://www.googleapis.com/auth/drive",
//   });
//   return auth;
// };

// const uploadToGoogleDrive = async (file, auth) => {
//   const fileMetadata = {
//     name: file.originalname,
//     parents: [process.env.DRIVE_ID],
//   };

//   const media = {
//     mimeType: file.mimetype,
//     body: fs.createReadStream(file.path),
//   };

//   const driveService = google.drive({ version: "v3", auth });

//   const response = await driveService.files.create({
//     requestBody: fileMetadata,
//     media: media,
//     fields: "id",
//   });
//   return response;
// };

// const deleteFile = (filePath) => {
//   fs.unlink(filePath, (error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("File deleted");
//     }
//   });
// };

// driveRouter.post("/uploadImg", multer.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       res.status(400).send("No file uploaded.");
//       return;
//     }
//     const fileName = req.file.originalname;
//     if (fileName.length > 100) {
//       res.status(400).send("File name too long.");
//       return;
//     }
//     const auth = authenticateGoogle();
//     const response = await uploadToGoogleDrive(req.file, auth);
//     deleteFile(req.file.path);
//     res.status(200).json({ response });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error uploading file to Google Drive.");
//   }
// });

// export default driveRouter;