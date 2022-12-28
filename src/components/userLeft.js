import styled from "styled-components";
import { React, useState } from "react";
import { connect } from "react-redux";
import { updateImageAPI } from "../actions";
import { useNavigate } from "react-router-dom";
function Left(props) {
  const [shareImage, setShareImage] = useState();
  const navigator = useNavigate();

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
    console.log(shareImage);
  };

  const updateImage = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      uid: props.user.uid,
    };
    props.updateImage(payload);
    setShareImage("");
  };
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo>
              <img src={props.user.photoURL || "/images/photo.svg"}></img>
            </Photo>
            <Link>{props.user ? props.user.displayName : "there"}</Link>
          </a>
          <a>
            <AddPhotoText>
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                name="image"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p>
                <label htmlFor="file">Add a photo</label>
              </p>
              <button onClick={(e) => updateImage(e)}>Change Photo</button>
            </AddPhotoText>
          </a>
        </UserInfo>
        <Widget
          onClick={(e) => {
            e.preventDefault();
            navigator("/search");
          }}
        >
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
        </Widget>
        <Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </Item>
      </ArtCard>

      <CommunityCard>
        <a>
          <span>Group</span>
        </a>
        <a>
          <span>
            Events <img src="/images/plus-icon.svg" alt="" />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </CommunityCard>
    </Container>
  );
}

const Container = styled.div`
  grid-area: leftside;
`;
const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: 5px;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px;
  word-wrap: break-word;
  word-break: break-word;
`;
const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;
const Photo = styled.div`
  box-shadow: none;
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  margin: -38px auto 12px;
  border: 2px solid cyan;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;
const AddPhotoText = styled.div`
  color: #ec0000;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

const Widget = styled.div`
  border-bottom: 1px;
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
          font-weight: 600;
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;
const Item = styled.div`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
const CommunityCard = styled(ArtCard)`
  padding: 8px;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: "black";
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    &:hover {
      color: #ec0000;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;
const mapDispatchToProps = (dispatch) => ({
  updateImage: (payload) => dispatch(updateImageAPI(payload)),
});

export default connect(mapDispatchToProps)(Left);
