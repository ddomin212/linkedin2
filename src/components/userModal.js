import { React } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Main from "./userMain";
function userModal(props) {
  const reset = (e) => {
    props.handleClick(e);
  };
  return (
    <>
      {props.userModal === "open" && (
        <Container>
          <Content>
            <Header>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <ContainerModal>
              <Layout>
                <Main user={props.user}></Main>
              </Layout>
            </ContainerModal>
          </Content>
        </Container>
      )}
    </>
  );
}
const ContainerModal = styled.div`
  padding-top: 52px;
  max-width: 100%;
  max-height: 100%;
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr), minmax(0, 12fr), minmax(300px, 7fr);
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
  width: 70%;
  max-width: 90%;
  background-color: white;
  overflow: scroll;
  border-radius: 5px;
  max-height: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  padding: 16px 26px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  position: fixed;
  display: inherit;
  justify-content: end;
  button {
    height: 50px;
    width: 40px;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    svg,
    img {
      pointer-events: none;
      width: 20px;
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

export default userModal;
