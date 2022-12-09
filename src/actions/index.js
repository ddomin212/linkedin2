import { auth, provider, storage } from "../fb";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import db from "../fb";
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function postJobAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const upload = uploadBytesResumable(storageRef, payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          addDoc(collection(db, "articles"), {
            actor: {
              poster: payload.user.email,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            comp: payload.company,
            type: payload.type,
            location: payload.location,
            description: payload.description,
          });
        }
      );
    }
    dispatch(setLoading(false));
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const upload = uploadBytesResumable(storageRef, payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          const downloadURL = await getDownloadURL(upload.snapshot.ref);
          addDoc(collection(db, "articles"), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,
          });
        }
      );
    } else if (payload.video) {
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
    }
    dispatch(setLoading(false));
  };
}

export function getArticlesAPI() {
  return (dispatch) => {
    let payload;
    let q = query(collection(db, "articles"), orderBy("actor.date", "desc"));
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      console.log(payload);
      dispatch(getArticles(payload));
    });
  };
}

export function getJobsAPI() {
  return (dispatch) => {
    let payload;
    let q = query(collection(db, "jobs"), orderBy("actor.date", "desc"));
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      console.log(payload);
      dispatch(getArticles(payload));
    });
  };
}
