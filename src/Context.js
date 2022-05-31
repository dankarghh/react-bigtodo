import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { db, auth, provider } from "./firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Link } from "react-router-dom";

const Context = React.createContext();

function ContextProvider(props) {
  const [user, setUser] = useState("");
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [activeListTaskList, setActiveListTaskList] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser.user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function saveListData() {
      const userListRef = doc(db, `users/${user?.uid}/lists`, "lists");
      await setDoc(userListRef, { lists });
    }
    try {
      saveListData();
    } catch (err) {
      console.log(err);
    }
  }, [lists, activeListTaskList, activeList.taskList, activeList]);

  useEffect(() => {
    const getLists = async () => {
      const userListRef = await doc(db, `users/${user?.uid}/lists`, "lists");
      const document = await getDoc(userListRef);
      const data = document.data();
      setLists(data.lists);
    };
    getLists();
  }, [user]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);

  async function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(result => {
        setUser(result.user);
        localStorage.setItem("user", result.user);
      })
      .catch(err => console.log(err));
  }

  function handleSignOut() {
    setUser(null);
    signOut(auth);
  }

  async function createNewList(event, newListName) {
    event.preventDefault();
    if (newListName === "") {
      return;
    }
    const newListItem = {
      name: newListName,
      taskList: [],
      id: nanoid(),
    };

    setActiveList(newListItem);
    setLists([...lists, newListItem]);
  }

  function markTaskComplete(event, id) {
    const selectedTask = activeList.taskList.find(task => task.id === id);
    const modifiedList = activeList.taskList.map(task => {
      if (task.id === selectedTask.id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    activeList.taskList = modifiedList;
    setActiveListTaskList(modifiedList);
  }

  function deleteList(event) {
    const updatedLists = lists.filter(list => {
      return list.id !== activeList.id;
    });
    setLists(updatedLists);
    setActiveList(null);
  }

  return (
    <Context.Provider
      value={{
        createNewList,
        lists,
        setLists,
        setActiveList,
        activeList,
        markTaskComplete,
        deleteList,
        activeListTaskList,
        setActiveListTaskList,
        signInWithGoogle,
        user,
        handleSignOut,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
