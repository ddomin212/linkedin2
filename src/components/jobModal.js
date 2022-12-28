import { React, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { postJobAPI } from "../actions";
import { Timestamp } from "firebase/firestore";
function JobModal(props) {
  const [position, setPosition] = useState();
  const [editorText, setEditorText] = useState();
  const [company, setCompany] = useState();
  const [location, setLocation] = useState();
  const [type, setType] = useState();
  const [shareImage, setShareImage] = useState();

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const postJob = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      company: company,
      location: location,
      type: type,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
      position: position,
    };
    props.postJob(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setCompany("");
    setLocation("");
    setType("");
    props.handleClick(e);
  };
  return (
    <>
      {props.jobModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a job listing</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close-icon.svg" alt="" width="15px" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}

                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Position"
                  autoFocus={true}
                />
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Name of your company"
                  autoFocus={true}
                />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where is your company located?"
                />
                <input
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Set your job type (intern, full-time...)"
                />
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="Job description..."
                />
                <UploadImage>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="file">Select your company logo</label>
                  </p>
                  {shareImage && (
                    <img src={URL.createObjectURL(shareImage)} alt="" />
                  )}
                </UploadImage>
              </Editor>
            </SharedContent>
            <SharedCreation>
              <PostButton
                disabled={!editorText || !company || !type}
                onClick={(event) => {
                  postJob(event);
                }}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  overflow: initial;
  border-radius: 5px;
  max-height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  span {
    margin-left: 5px;
    font-weight: 600;
    font-size: 16px;
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;
const Header = styled.div`
  display: block;
  padding: 16px 26px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 50px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    svg,
    img {
      pointer-events: none;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 25%;
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#ec0000")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postJob: (payload) => dispatch(postJobAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobModal);
