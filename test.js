import crypto from "crypto";


const generateSecretKey = () => {
    return crypto.randomBytes(64).toString("hex");
  };
  
  // Call this function to generate a secret key
  console.log(generateSecretKey());
  