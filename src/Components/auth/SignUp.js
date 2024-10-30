import React, { useState, useEffect } from 'react';
import { auth, firestore, firebase, storage } from '../Server/Firebase';
import { createCanvas } from 'canvas';
import './style/signin.css';
import { ref, uploadBytes, getDownloadURL,uploadString } from 'firebase/storage';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    CreateUserProfilePic();
    const user = auth.currentUser;
    console.log(user.uid);
  }, [username]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const CreateUserProfilePic = () => {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
  
    // Generate a random background color
    const backgroundColor = getRandomColor();
  
    // Clear the canvas with the background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Set the text style
    ctx.font = '80px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  
    // Draw the first letter of the username in the center of the canvas
    ctx.fillText(username.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2);
  
    // Convert the canvas to a data URL
    const profileImageURL = canvas.toDataURL('image/png');
    setImage(profileImageURL);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!email || !username || !password) {
        alert('Please provide all required information');
        return;
      }

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Send email verification
      await user.sendEmailVerification();
      setVerificationSent(true);
    } catch (error) {
      console.error('Signup failed:', error);
      alert(`Signup failed ${error.message}`);
    }
  };

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const isUserRegistered = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (isUserRegistered) {
          const user = auth.currentUser;
          console.log(user.uid);
          console.log('User is registered');
          const userRef = firestore.collection('users').doc(user.uid); // Use the user's uid as the document ID
          const snapshot = await userRef.get();
  
           if(!snapshot.exists){
            try {
              if (image) {
                console.log(user.uid);
                const file = image;
                const timestamp = Date.now().toString();
                const randomString = Math.random().toString(36).substring(2);
                const fileName = `profileImage/${email}_${timestamp}_${randomString}`;
                const storageRef = ref(storage,fileName);              
                // await uploadBytes(storageRef, file);
                await uploadString(storageRef, file, 'data_url', { contentType: 'image/png' });
                const imageUrl = await getDownloadURL(storageRef);
                // const usersRef = firestore.collection('users');
                const userData = {
                  photoURL: imageUrl,
                  userName: username,
                  email:email,
                  id: user.uid,
                  role:"user",
                };
                await userRef.set(userData);
  
                setImage(null); // Reset the image state after successful upload
                setVerificationComplete(true)

              }
            } catch (error) {
              console.log('An error occurred:', error);
            }
          }else{
            console.log('yeah they do exist in the database');
            setVerificationComplete(true)
          }
         
        } else {
          console.log('User is not registered');
        }
      } catch (err) {
        console.log(`An error occurred while checking for the email: ${err}`);
      }
    };

    checkEmailVerification();
  }, [email,password]);

  useEffect(() => {
    if (verificationComplete) {
      setTimeout(() => {
        window.location.href = 'https://www.example.com'; // Replace with your desired redirect URL
      }, 1000); // Redirect after 1 second
    }
  }, [verificationComplete]);

  return (
    <>
      {image && (
        <div className="userPic">
          <img src={image} alt="Profile" />
        </div>
      )}

      <div className="auth-wrapper">
        <div className="auth-inner">
          {!verificationComplete && (
            <form onSubmit={handleRegister}>
              <h3>Sign Up</h3>

              <div className="mb-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
              </p>

              {verificationSent && (
                <div className="alert alert-success" role="alert">
                  Verification email sent. Please check your email to complete the signup process.
                </div>
              )}
            </form>
          )}

          {isLoading && (
            <div className="alert alert-info" role="alert">
              Loading...
            </div>
          )}

          {verificationComplete && (
            <div className="alert alert-success" role="alert">
              You have been successfully verified. Redirecting...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
