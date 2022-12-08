import styled from "styled-components";
import Left from "./Left";
import Main from "./Main";
import Right from "./Right";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
function Home(props) {
  return (
    <Container>
      {!props.user && <Navigate to="/"></Navigate>}
      <Section>
        <h5>
          <a href="">Hiring in a hurry?</a>
        </h5>
        <p>
          Find talented pros in record time with UpWork and keep buisness moving
        </p>
      </Section>
      <Layout>
        <Left></Left>
        <Main></Main>
        <Right></Right>
      </Layout>
    </Container>
  );
}
const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.div`
  min-height: 50px;
  padding: 16px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #ec0000;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
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

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
export default connect(mapStateToProps)(Home);
