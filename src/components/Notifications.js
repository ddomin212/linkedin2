import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getFriendsAPI, getArticlesAPI, getContactsAPI } from "../actions";
import UserModal from "./userModal";
import { useNavigate } from "react-router-dom";

function Notifications(props) {
  const navigator = useNavigate();
  useEffect(() => {
    props.getFriends(props.user);
    props.getArticles();
    props.getContacts(props.user);
  }, []);
  return (
    <>
      {!props.user && navigator("/")}
      {props.articles.length === 0 ? (
        <NoArt>No notifications</NoArt>
      ) : (
        <Container>
          <Layout>
            <ContentArt>
              <h1>Posts</h1>
              {props.loading && (
                <img
                  src="/images/loading-svgrepo-com.svg"
                  alt=""
                  width="50px"
                />
              )}
              {props.articles.length > 0 &&
                props.articles.map(
                  (article, key) =>
                    props.friends.indexOf(article.actor.description) !== -1 && (
                      <Article key={key}>
                        <SharedActor>
                          <a>
                            <img src={article.actor.image} alt="" />
                            <div>
                              <span>{article.actor.title}</span>
                              <span>{article.actor.description}</span>
                              <span>
                                {article.actor.date
                                  .toDate()
                                  .toLocaleDateString()}
                              </span>
                            </div>
                          </a>
                        </SharedActor>
                        <Descritpion>{article.description}</Descritpion>
                      </Article>
                    )
                )}
            </ContentArt>
            <ContentCon>
              <h1>Offers</h1>
              {props.loading && (
                <img
                  src="/images/loading-svgrepo-com.svg"
                  alt=""
                  width="50px"
                />
              )}
              {props.contacts.length > 0 &&
                props.contacts.map((contact, key) => (
                  <Article key={key}>
                    <SharedActor>
                      <a>
                        <img src={contact.sender.image} alt="" />
                        <div>
                          <span>{contact.sender.title}</span>
                          <span>{contact.sender.description}</span>
                          <span>
                            {contact.date.toDate().toLocaleDateString()}
                          </span>
                        </div>
                      </a>
                    </SharedActor>
                    <Descritpion>{contact.description}</Descritpion>
                  </Article>
                ))}
            </ContentCon>
          </Layout>
        </Container>
      )}
    </>
  );
}

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
  max-width: 1152px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const ShareBox = styled.div`
  display: flex;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  border-radius: 8px;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      min-height: 48px;
      line-height: 1.5;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      align-items: center;
      display: flex;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        margin-right: 8px;
        border-radius: 50%;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      flex-wrap: wrap;
      display: flex;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #ec0000;
        }
      }
    }
  }
`;
const NoArt = styled.div`
  font-size: 2rem;
  margin-bottom: 25px;
  text-align: center;
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
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 6px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Descritpion = styled.div`
  padding: 0 16px;
  padding-bottom: 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "lp rp";
  grid-template-columns: 125px, minmax(0, 12fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const ContentArt = styled.div`
  text-align:center & > img {
    width: 30px;
  }
  grid-area: lp;
  h1 {
    font-size: 30px;
    margin-bottom: 16px;
  }
`;
const ContentCon = styled.div`
  text-align:center & > img {
    width: 30px;
  }
  grid-area: rp;
  h1 {
    font-size: 30px;
    margin-bottom: 16px;
  }
`;
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userState.user,
    friends: state.friendsState.friends,
    articles: state.articleState.articles,
    contacts: state.contactState.contacts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getContacts: (payload) => dispatch(getContactsAPI(payload)),
  getArticles: () => dispatch(getArticlesAPI()),
  getFriends: (payload) => dispatch(getFriendsAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
