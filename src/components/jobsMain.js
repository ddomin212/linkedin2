import { useState } from "react";
import styled from "styled-components";
import JobModal from "./jobModal";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getJobsAPI, postCVAPI } from "../actions";
import { Timestamp } from "firebase/firestore";
function Main(props) {
  const [jobModal, setJobModal] = useState();
  const [shareCV, setShareCV] = useState();
  const [showText, setShowText] = useState();

  const handleChange = (e) => {
    const CV = e.target.files[0];
    if (CV === "" || CV === undefined) {
      alert(`not an pdf, the file is a ${typeof CV}`);
      return;
    }
    setShareCV(CV);
  };

  const postCV = (e) => {
    e.preventDefault();
    const jobPost = JSON.parse(e.target.value);
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      CV: shareCV,
      jobPosting: jobPost,
      timestamp: Timestamp.now(),
      user: props.user,
    };
    props.postCV(payload);
    setShareCV("");
  };

  useEffect(() => {
    props.getJobs();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (jobModal) {
      case "open":
        setJobModal("close");
        break;
      case "close":
        setJobModal("open");
        break;
      default:
        setJobModal("close");
        break;
    }
  };
  return (
    <>
      {props.jobs.length === 0 ? (
        console.log("No bitches")
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
              ) : (
                <img src="/images/user.svg"></img>
              )}
              <button onClick={handleClick} disabled={props.loading}>
                Job posting
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && (
              <img src="/images/loading-svgrepo-com.svg" alt="" width="50px" />
            )}
            {props.jobs.length > 0 &&
              props.jobs.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img
                        src={article.sharedImg || article.actor.image}
                        alt=""
                        id="userimg"
                      />
                      <div>
                        <h2>{article.pos}</h2>
                        <img
                          src="images/building-icon.svg"
                          alt=""
                          width="15px"
                        />
                        <span>{article.comp}</span>
                        <img
                          src="images/location-icon.svg"
                          alt=""
                          width="15px"
                        />
                        <span>{article.location}</span>
                        <img
                          src="images/briefcase-icon.svg"
                          alt=""
                          width="15px"
                        />
                        <span>{article.type}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                  </SharedActor>
                  <Descritpion>
                    <textarea
                      hidden={showText !== `${key}-show`}
                      rows="50"
                      disabled={true}
                    >
                      {article.description}
                    </textarea>
                  </Descritpion>
                  <SocialActions>
                    <button>
                      <img src="/images/share-icon.svg" alt="" width="20px" />
                    </button>
                    <button>
                      <img src="/images/send-icon.svg" alt="" width="20px" />
                    </button>
                    <button
                      value={key}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowText(`${e.target.value}-show`);
                      }}
                    >
                      Show more...
                    </button>
                  </SocialActions>
                  <input
                    type="file"
                    accept=".pdf"
                    name="cv"
                    id="cv"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="cv">
                      Select your CV and send it straight away.
                    </label>
                  </p>
                  <ApplyButton
                    value={JSON.stringify(article)}
                    onClick={(e) => {
                      postCV(e);
                    }}
                  >
                    Apply
                  </ApplyButton>
                </Article>
              ))}
          </Content>
          <JobModal jobModal={jobModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  grid-area: main;
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
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
  h2 {
    text-align: left;
    font-size: 28px;
  }
`;
const Descritpion = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 16px;
  text-align: left;
  textarea {
    border: none;
    flex: 1;
    font-size: 14px;
    padding: 16px;
    background-color: white;
    animation: fadeIn 0.3s;
  }
`;
const ApplyButton = styled.button`
  min-width: 40px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  border-radius: 10px;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  background-color: red;
  color: white;
  &:hover {
    background: #ec0000;
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  min-height: 40px;
  padding: 4px 8px;
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
    @media (min-width: 768px) {
      img {
        padding: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align:center & > img {
    width: 30px;
  }
`;
const mapStateToProps = (state) => {
  return {
    jobs: state.jobsState.jobs,
    loading: state.jobsState.loading,
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getJobs: () => dispatch(getJobsAPI()),
  postCV: (payload) => dispatch(postCVAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
