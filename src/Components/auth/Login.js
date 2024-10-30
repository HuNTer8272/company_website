import React, { useEffect, useState } from 'react';
import { auth, firestore, firebase } from '../Server/Firebase';
import { useAsyncError } from 'react-router-dom';
import { AiOutlineColumnHeight } from 'react-icons/ai';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(()=>{
    const isUserRegistered =async()=>{
      const isUserRegistered = await firebase.auth().signInWithEmailAndPassword(email,password);
      if(isUserRegistered){
        console.log("they are");
        const user = auth.currentUser;
        console.log(user.uid)
        const userRef = firestore.collection('users');
        const query = userRef.where('id','==',user.uid).limit(1);
        const snapshot = await query.get();
        // console.log(query);
        if(snapshot.empty){
          
        }else{
          const userData = snapshot.docs[0].data();
          console.log(userData);
          console.log(userData.role);
          console.log(typeof(userData.role));
          if(userData.role === 'admin'){
            console.log('They are the admin ');
            setIsAdmin(true);
            console.log(isAdmin);
          }else{
            console.log("Just a user");
          }
        }

      }
    }
    isUserRegistered();
  },[email,password])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
      const isUserRegistered = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (isUserRegistered) {
        console.log("yup they are registered ");
        const user = auth.currentUser;
        const userRef = firestore.collection('users');
        const query = userRef.where('id','==',user.uid).limit(1);
        const snapshot = query.get();
        if(snapshot.empty){
          alert("Please Sign in first")
          setIsLoggedin(false);
        }else{
          const userData = (await snapshot).docs[0].data();
          console.log(userData);
          console.log(userData.role);
          if(userData.role==='admin'){
             console.log('they are admin')
             setIsLoggedin(true);
             setIsAdmin(true);
          }else{
            console.log('they are user')
            setIsLoggedin(true);
            setIsCustomer(true);
          }
        }
      }
   
  };
  

  const redirectToAdminWebsite = () => {
    window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  const redirectToMainWebsite = () => {
    window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  useEffect(()=>{
    if(isCustomer){
     const redirectUser = setTimeout(()=>{
         window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      },2000)
    }
  },[isCustomer])

  return (
    <div>
      {isLoggedin === false ? (
        <div className="auth-wrapper  ">
          <div className="auth-inner  ">
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right">
                <a href="/sign-up">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {isAdmin ? (
            <div className="alert alert-success" role="alert">
              You have been successfully verified. Where do you want to be redirected?
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary" onClick={redirectToAdminWebsite}>
                  Go to Admin Website
                </button>
                <button className="btn btn-secondary" onClick={redirectToMainWebsite}>
                  Go to Main Website
                </button>
              </div>
            </div>
          ) : (
            <div className="alert alert-success" role="alert">
              You have been successfully verified. Redirecting...
              <script>
                window.location.href = '/main';
              </script>
            </div>
          )}
        </div>
      )
      }
    </div>

  );
}
