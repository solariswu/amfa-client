import "./styles.css";
import { useState, useEffect } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";

import awsconfig from "./aws-export";

Amplify.configure(awsconfig);

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(null);

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

    const queryParams = new URLSearchParams(window.location.search)
    const amfaOperation = queryParams.get("amfa")

    if (amfaOperation === 'relogin') {
      Auth.federatedSignIn({ provider: "aPersona" });
      setShow(false);
      return;
    }
    setShow(true);
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
        onClick={() => { setLoading(true); Auth.federatedSignIn({ provider: "amfa" }); }}
      >
        Login
      </button>
    );
  };

  return (
    <div style={{ height: "100%"}}>
      {show && (<div className="App">
        <div style={{ margin: "auto"}}>
          {isLoading ? (
            "Loading..."
          ) : (
            <div>{user && user.attributes ? <USER user={user} /> : <LOGIN />}</div>
          )}
        </div>
      </div>)}
    </div>
  );
}
