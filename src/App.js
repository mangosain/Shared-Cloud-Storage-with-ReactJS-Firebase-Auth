import Header from "./Components/Header.js";
import Sidebar from "./Components/Sidebar.js";
import Data from "./Components/Data.js";
import logo from "./images/logo.png";
import React, { useState } from "react";
import { auth, provider } from "./Components/firebase.js";

function App() {
  const [ user, setUser ] = useState(null);

  const signIn = () => {
    auth.signInWithPopup(provider).then(({ user} ) => {
      setUser(user);
    }).catch(error => {
      alert(error.message);
    })
  }
  return (
    <>
    {
      user ? (
        <>
          <Header photoURL = { user.photoURL } />
            <div className="App">
              <Sidebar/>
            <Data/>
          </div>
        </>
      ) : (
        <div className="loginwrap">
          <img src={ logo } alt='logo'/>
          <button onClick = { signIn }>Log In</button>
        </div>
      )
    }
      
    </>
  );
}

export default App;
