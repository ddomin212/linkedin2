import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import Chat from "./components/Chat";
import Jobs from "./components/Jobs";
import Me from "./components/Me";
import Network from "./components/Network";
import Search from "./components/Search";
import Notifications from "./components/Notifications";
function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/messages"
            element={
              <>
                <Header />
                <Chat />
              </>
            }
          ></Route>
          <Route
            path="/jobs"
            element={
              <>
                <Header />
                <Jobs />
              </>
            }
          ></Route>
          <Route
            path="/me"
            element={
              <>
                <Header />
                <Me />
              </>
            }
          ></Route>
          <Route
            path="/network"
            element={
              <>
                <Header />
                <Network />
              </>
            }
          ></Route>
          <Route
            path="/search"
            element={
              <>
                <Header />
                <Search />
              </>
            }
          ></Route>
          <Route
            path="/notifications"
            element={
              <>
                <Header />
                <Notifications />
              </>
            }
          ></Route>
          <Route path="/"></Route>
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
