import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getFriendsAPI, getUsersAPI, postFriendAPI } from "../actions";
import UserModal from "./userModal";
import { useNavigate } from "react-router-dom";
import ContactModal from "./contactModal";
function Search(props) {
  const navigator = useNavigate();
  const [showUser, setShowUser] = useState();
  const [showContact, setShowContact] = useState();
  const [userParams, setUserParams] = useState();
  useEffect(() => {
    props.getUsers();
  }, []);
  const postFriend = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      target: e.target.value,
      sender: props.user.email,
    };
    console.log(payload);
    props.postFriend(payload);
  };
  const handleClick = (e, v, setter) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (v) {
      case "open":
        setter("close");
        break;
      case "close":
        setter("open");
        break;
      default:
        setter("close");
        break;
    }
  };
  return (
    <>
      {!props.user && navigator("/")}
      <Container>
        <Section></Section>
        <Layout>
          <Content>
            {props.loading && (
              <img src="/images/loading-svgrepo-com.svg" alt="" width="50px" />
            )}
            {props.users.length > 0 &&
              props.users.map(
                (user, key) =>
                  (user.username || user.email) !== props.user.email && (
                    <Article key={key}>
                      <SharedActor>
                        <a>
                          <img src={user.image} alt="" id="userimg" />
                          <div>
                            <h2>{user.displayName}</h2>
                            <img src="images/email-icon.svg" alt="" />
                            <span>{user.username || user.email}</span>
                          </div>
                        </a>
                        <button
                          value={user.username || user.email}
                          onClick={(e) => {
                            postFriend(e);
                          }}
                        >
                          <img
                            src="/images/add-friend-icon.svg"
                            alt=""
                            id="addfr"
                          />
                        </button>
                        <button
                          value={JSON.stringify(user)}
                          onClick={(e) => {
                            setUserParams(JSON.parse(e.target.value));
                            handleClick(e, showUser, setShowUser);
                          }}
                        >
                          Show More
                        </button>
                        <button
                          value={JSON.stringify(user)}
                          onClick={(e) => {
                            setUserParams(JSON.parse(e.target.value));
                            handleClick(e, showContact, setShowContact);
                          }}
                        >
                          Contact
                        </button>
                      </SharedActor>
                    </Article>
                  )
              )}
          </Content>
        </Layout>
        <UserModal
          userModal={showUser}
          handleClick={(e) => handleClick(e, showUser, setShowUser)}
          user={userParams}
        />
        <ContactModal
          showModal={showContact}
          handleClick={(e) => handleClick(e, showContact, setShowContact)}
          target={userParams}
        />
      </Container>
    </>
  );
}
const Section = styled.div`
  min-height: 50px;
  padding: 16px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "lp main rp";
  grid-template-columns: 150px, 1fr, 150px;
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  #addfr {
    width: 20px;
    height: 20px;
  }
  button {
    position: inherit;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
  }
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    #userimg {
      width: 10%;
      height: 10%;
      padding-right: 20px;
    }

    img {
      width: 20px;
      height: 20px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 6px;
      overflow: hidden;
      span {
        position: relative;
        text-align: left;
        &:first-child {
          font-size: 20px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  h2 {
    text-align: left;
    font-size: 28px;
  }
`;

const Content = styled.div`
  grid-area: main;
  text-align:center & > img {
    width: 30px;
  }
`;
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userState.user,
    users: state.userState.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsersAPI()),
  postFriend: (payload) => dispatch(postFriendAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
