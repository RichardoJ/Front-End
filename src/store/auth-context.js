import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  idDB: 0,
  uid:'',
  role:'',
  validation: false,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
}

const retrieveStoreToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if(remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime
  }
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoreToken();

  let initialToken;
  if(tokenData){
    initialToken = tokenData.token;
  }
  
  const [userToken, setToken] = useState(initialToken);

  const [idDB, setID] = useState(localStorage.getItem('idDB'));

  const initialStatus = localStorage.getItem('status');
  const [status, setStatus] = useState(initialStatus);

  const initialuID = localStorage.getItem('uID');
  const [uid, setUID] = useState(initialuID);

  const initialrole = localStorage.getItem('role');
  const [role, setRole] = useState(initialrole);

  const userIsLoggedIn = !!userToken;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setID(null);
    setUID(null);
    setStatus(null);
    localStorage.removeItem('token');
    localStorage.removeItem('idDB');
    localStorage.removeItem('uID');
    localStorage.removeItem('status');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('courses');
    localStorage.removeItem('cobacourses');
    localStorage.removeItem('role');

    if(logoutTimer){
      clearTimeout(logoutTimer)
    }
  }, []);

  const loginHandler = (token, uid, expirationTime) => {
    console.log(token);
    setToken(token);
    setUID(uid);
    localStorage.setItem('token',token);
    localStorage.setItem('uID', uid);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const validateToken = () => {
    console.log("dipanggil gan");
    setStatus(true);
    localStorage.setItem('status', true);
  }

  const idHandler = (idDB) => {
    setID(idDB);
    localStorage.setItem('idDB', idDB);
  }

  const roleHandler = (role) => {
    setRole(role);
    localStorage.setItem('role', role);
  }

  useEffect(() => {
    if(tokenData){
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);


  const contextValue = {
    token: userToken,
    idDB: idDB,
    uid: uid,
    role: role,
    validation: status,
    isLoggedIn: userIsLoggedIn,
    setRole: roleHandler,
    valid: validateToken,
    setID: idHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;