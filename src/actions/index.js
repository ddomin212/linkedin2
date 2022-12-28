import { auth, provider, storage } from "../fb";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  SET_USER,
  SET_LOADING_STATUS,
  GET_ARTICLES,
  GET_JOBS,
  GET_USERS,
  GET_FRIENDS,
  GET_CONTACTS,
} from "./actionType";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  Timestamp,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../fb";
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export function updateImageAPI(payload) {
  console.log(payload);
  const storageRef = ref(storage, `cvs/${payload.image.name}`);
  const upload = uploadBytesResumable(storageRef, payload.image);
  upload.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Progress: ${progress}%`);
      if (snapshot.state === "RUNNING") {
        console.log(`Progress: ${progress}%`);
      }
    },
    (error) => {
      console.log(error.code);
    },
    async () => {
      try {
        const dbRef = doc(db, "users", payload.uid);
        const docDB = await getDoc(dbRef);
        console.log(docDB.data());
        if (docDB.data() === undefined) {
          console.log("User does not exist");
        } else {
          const downURL = await getDownloadURL(upload.snapshot.ref);
          let currUser = auth.currentUser;
          updateDoc(dbRef, {
            date: Timestamp.now(),
            image: downURL,
          });
          updateProfile(currUser, {
            photoURL: downURL,
          }).catch((e) => {
            console.log(e);
          });
        }
      } catch (e) {
        console.log("Error getting document:", e);
      }
    }
  );
}

async function editPostHelper(payload) {
  const dbRef = doc(db, "articles", payload.id);
  try {
    const doc = await getDoc(dbRef);
    console.log(doc.data());
    if (doc.data() === undefined) {
      console.log("Document missing");
    } else {
      updateDoc(dbRef, {
        description: payload.textedit,
        date: payload.date,
      });
    }
  } catch (e) {
    console.log("Error getting document:", e);
  }
}

export function editPostAPI(payload) {
  return (dispatch) => {
    editPostHelper(payload);
  };
}

async function setUserDB(payload) {
  const dbRef = doc(db, "users", payload.uid);
  //const q = doc(db, "username", payload.email);
  try {
    const doc = await getDoc(dbRef);
    console.log(doc.data());
    if (doc.data() === undefined) {
      setDoc(dbRef, {
        displayName: payload.displayName,
        email: payload.email,
        user_secret: payload.uid,
        date: Timestamp.now(),
        image: payload.photoURL,
      });
    }
  } catch (e) {
    console.log("Error getting document:", e);
  }
}
export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
        setUserDB(payload.user);
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

export const getContacts = (payload) => ({
  type: GET_CONTACTS,
  payload: payload,
});

export const getFriends = (payload) => ({
  type: GET_FRIENDS,
  payload: payload,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export const getJobs = (payload) => ({
  type: GET_JOBS,
  payload: payload,
});

export const getUsers = (payload) => ({
  type: GET_USERS,
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

export function postCVAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    console.log(payload);
    if (payload.CV !== "") {
      const storageRef = ref(storage, `cvs/${payload.CV.name}`);
      const upload = uploadBytesResumable(storageRef, payload.CV);
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
          addDoc(collection(db, "cvs"), {
            actor: {
              poster: payload.user.email,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            CV: downloadURL,
            jobPosting: payload.jobPosting,
          });
        }
      );
    }
    dispatch(setLoading(false));
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
          const downloadURL = await getDownloadURL(upload.snapshot.ref);
          addDoc(collection(db, "jobs"), {
            actor: {
              poster: payload.user.email,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            pos: payload.position,
            sharedImg: downloadURL,
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
          const docRef = doc(collection(db, "articles"));
          setDoc(docRef, {
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
            docid: docRef.id,
          });
        }
      );
    } else if (payload.video) {
      const docRef = doc(collection(db, "articles"));
      setDoc(docRef, {
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
        docid: docRef.id,
      });
    }
    dispatch(setLoading(false));
  };
}
export function postResponseAPI(payload) {
  const docRef = doc(collection(db, "contacts"));
  setDoc(docRef, {
    sender: {
      description: payload.user.email,
      title: payload.user.displayName,
      image: payload.user.photoURL,
    },
    date: payload.timestamp,
    description: payload.description,
    target: {
      description: payload.target.email,
      title: payload.target.displayName,
      image: payload.target.image,
    },
  });
}
export function getUserArticlesAPI(user) {
  return (dispatch) => {
    let payload;
    console.log(user);
    let q = query(
      collection(db, "articles"),
      where("actor.description", "==", user.email || user.username)
    );
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      console.log(payload);
      dispatch(getArticles(payload));
    });
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
async function removePostHelper(id) {
  const docRef = doc(db, "articles", id);
  try {
    deleteDoc(docRef);
  } catch (e) {
    console.log(e);
  }
}
export function removePostAPI(id) {
  return (dispatch) => {
    removePostHelper(id);
  };
}
async function postFriendHelper(payload) {
  if (payload.target !== payload.sender) {
    const dbRef = doc(db, "friendships", `${payload.target}-${payload.sender}`);
    try {
      const doc = await getDoc(dbRef);
      console.log(doc.data());
      if (doc.data() === undefined) {
        setDoc(dbRef, {
          target: payload.target,
          sender: payload.sender,
        });
      } else {
        console.log("Document already present");
      }
    } catch (e) {
      console.log("Error getting document:", e);
    }
  }
}
export function postFriendAPI(payload) {
  return (dispatch) => {
    postFriendHelper(payload);
  };
}

export function getUsersAPI() {
  return (dispatch) => {
    let payload;
    let q = query(collection(db, "users"), orderBy("date", "desc"));
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      console.log(payload);
      dispatch(getUsers(payload));
    });
  };
}

export function getContactsAPI(user) {
  return (dispatch) => {
    let payload;
    let q = query(
      collection(db, "contacts"),
      where("target.description", "==", user.email)
    );
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      console.log(payload);
      dispatch(getContacts(payload));
    });
  };
}

export function getFriendsAPI(user) {
  return (dispatch) => {
    let payload;
    let q = query(
      collection(db, "friendships"),
      where("target", "==", user.email)
    );
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data().sender);
      console.log(payload);
      dispatch(getFriends(payload));
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
      dispatch(getJobs(payload));
    });
  };
}
