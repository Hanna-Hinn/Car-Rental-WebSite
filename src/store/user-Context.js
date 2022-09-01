/**
 *  User Context that will Do the following :
 *    1.) Read the email from the Authentication component
 *    2.) Add the email to the local Storage to save the user
 *    3.) save the user data by retrieving the email or the local Storage
 *    4.) Empty the user information
 *    5.) set user
 */
import React, { useEffect, useContext, useState } from "react";

// Creating the Context and Intiliazing it's values
const UserContext = React.createContext({
  email: "",
  user: {},
  setNewEmail: () => {},
  emptyUser: () => {},
  setUser: {},
});

// User Context Provider
export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");

  //setting from where to read the Email
  const readEmail = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : email;

  //setting new User
  const setNewUser = (newUser) => {
    setUser(newUser);
  };

  //setting new Email
  const setNewEmail = (newEmail) => {
    setEmail(newEmail);
  };

  //Emptying the user details
  const emptyUser = () => {
    setUser(null);
  };

  //fetching the users
  useEffect(() => {
    fetch(
      "https://car-rental-ac864-default-rtdb.firebaseio.com/users.json"
    ).then((response) => {
      response.json().then((data) => {
        setUser(
          Object.values(data).find((obj) => {
            return obj.email === readEmail;
          })
        );
      });
    });
  }, [readEmail]);

  useEffect(() => {
    let n = readEmail.search("@");
    !user &&
      setUser({
        email: readEmail,
        name: readEmail.slice(0, n),
      });
  }, [readEmail, user]);

  // Passing the Context Values
  const contextValue = {
    email: readEmail,
    user,
    emptyUser,
    setNewEmail,
    setNewUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;
