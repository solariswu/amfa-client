import "./styles.css";
import { useState, useEffect } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";

import awsconfig from "./aws-export";

Amplify.configure(awsconfig);

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setLoading(false);
          setUser(data);
          break;
        case "signOut":
          setLoading(false);
          setUser(null);
          break;
        default:
          break;
      }
    });

    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setUser(currentUser);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("Not signed in");
      });

    return unsubscribe;
  }, []);

  const USER = ({ user }) => {
    return (
      <div>
        <span>User: {user.attributes.email}</span>
        <br />
        <button className="button-paper" onClick={() => Auth.signOut()}>
          Logout
        </button>
      </div>
    );
  };

  const LOGIN = () => {
    return (
      <button
        className="button-paper"
        onClick={() => Auth.federatedSignIn({ provider: "amfa" })}
      >
        Login
      </button>
    );
  };

  return (
    <div className="App">
      {isLoading ? (
        "Loading..."
      ) : (
        <div style={{ position: "absolute", top: "48%" }}>
          {user && user.attributes ? <USER user={user} /> : <LOGIN />}
        </div>
      )}
    </div>
  );
}
