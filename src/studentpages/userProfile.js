import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import ProfileForm from './profileForm';
import classes from './userProfile.module.css';


const UserProfile = () => {
  const authCtx = useContext(AuthContext);

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;