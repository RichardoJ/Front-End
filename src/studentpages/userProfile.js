import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import ProfileForm from './profileForm';
import classes from './userProfile.module.css';


const UserProfile = () => {
  const [customToken, setCustomToken] = useState(null);
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  

  const inputHandler = (event) => {
    
    event.preventDefault();

    fetch('/admin/student-claims/' + authCtx.uid,{
      method: "POST"
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return res.json().then((data) => {
          let errorMessage = "";
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k";
    

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: data.token,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }else{
          return res.json().then((data) => {
            let errorMessage = "";
            if(data && data.error && data.error.message){
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // localStorage.setItem("token", data.idToken);
        authCtx.login(data.idToken);
        console.log(data.idToken);
        navigate("/student/home");
      })
    });

    

  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;