import "./styles.css";
import { useState, useEffect, useSearchParams } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";

import awsconfig from "./aws-export";

Amplify.configure(awsconfig);

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [info, setInfo] = useState("");

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
    const infoMsg = searchParams.get("info");
    if (infoMsg) {
      setInfo(infoMsg);
      setSearchParams({});
      setShow(true);
    }
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
    <div className="App">
         <Toast onClose={() => {setInfo("");setShow(false)}} show={show} delay={10000} autohide>
          <Toast.Header closeButton={false} / >
          <Toast.Body>{infoMsg}</Toast.Body>
        </Toast>
      <div style={{ position: "absolute", top: "48%" }}>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>{user && user.attributes ? <USER user={user} /> : <LOGIN />}</div>
        )}
      </div>
    </div>
  );
}
