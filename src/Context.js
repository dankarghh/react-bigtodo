import React, { useState } from "react";
import { nanoid } from "nanoid";

const Context = React.createContext();

function ContextProvider(props) {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("lists") || [])
  );

  const [activeList, setActiveList] = useState(null);
  const [activeListTaskList, setActiveListTaskList] = useState([]);

  // React.useEffect(() => {
  //   const data = localStorage.getItem("lists");
  //   if (data) {
  //     setLists(JSON.parse(data));
  //   }
  // });

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
