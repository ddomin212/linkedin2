import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { ChatEngineAPIkey, ChatEnginePrivatekey } from "../fbc";
import { useEffect, useState } from "react";
import axios from "axios";
import "../chat.css";
import { setLoading } from "../actions";

function Chat(props) {
  const [chatLoad, setChatLoad] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": ChatEngineAPIkey,
          "user-name": props.user.email,
          "user-secret": props.user.uid,
        },
      })
      .then(() => {
        setChatLoad(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", props.user.email);
        formdata.append("username", props.user.email);
        formdata.append("secret", props.user.uid);

        axios
          .post("https://api.chatengine.io/users", formdata, {
            headers: { "private-key": ChatEnginePrivatekey },
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
      });
  }, [props.user]);
  return (
    <>
      {!props.user && <Navigate to="/" />}
      <div className="chats-page">
        <ChatEngine
          height="calc(100vh-66px)"
          projectID={ChatEngineAPIkey}
          userName={props.user.email}
          userSecret={props.user.uid}
        />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Chat);
