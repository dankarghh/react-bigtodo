import React, { useState } from "react";
import { nanoid } from "nanoid";

const Context = React.createContext();

function ContextProvider(props) {
  const LOCAL_STORAGE_LISTS = JSON.parse(localStorage.getItem("lists"));
  const LOCAL_STORAGE_ACTIVE_LIST = JSON.parse(
    localStorage.getItem("activeList")
  );
  const [lists, setLists] = useState(LOCAL_STORAGE_LISTS || []);
  // const navigate = useNavigate();

  // const [lists, setLists] = useState([]);

  const [activeList, setActiveList] = useState(
    LOCAL_STORAGE_ACTIVE_LIST || null
  );

  const [activeListTaskList, setActiveListTaskList] = useState([]);

  function createNewList(event, newListName) {
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
    // navigate("/list");
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
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
