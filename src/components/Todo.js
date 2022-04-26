import { useState } from "react";

function Todo() {
  const [lists, setLists] = useState([]);

  const [activeList, setActiveList] = useState(null);
  const [activeListTaskList, setActiveListTaskList] = useState([]);

  const [home, setHome] = useState(false);
  const [newListModal, setNewListModal] = useState(false);

  function createTask(event, newTaskName, newTaskNotes, newTaskDate) {
    event.preventDefault();
    if (newTaskName === "") {
      return;
    } else {
      const task = {
        taskName: newTaskName,
        notes: newTaskNotes,
        dueDate: newTaskDate,
        completed: false,
        id: nanoid(),
      };
      if (activeList.taskList.length > 0) {
        activeList.taskList.push(task);
      } else {
        activeList.taskList = [task];
      }
      setActiveListTaskList(activeList.taskList);
      setNewTaskName("");
      setNewTaskDate("");
      setNewTaskNotes("");
    }
  }

  function deleteTask(event, id) {
    const newTaskList = activeListTaskList.filter(task => task.id !== id);
    activeList.taskList = newTaskList;
    setActiveListTaskList(prev => prev.filter(task => task.id !== id));
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
    console.log(modifiedList);
    activeList.taskList = modifiedList;
    setActiveListTaskList(modifiedList);
  }

  function createNewList(event, newListName) {
    event.preventDefault();

    // // THIS NEXT LINE DOESN"T WORK
    // if (activeList === [] || activeList === null) {
    //   return;
    // }
    if (newListName === "") {
      return;
    }

    const newListItem = {
      name: newListName,
      taskList: [],
      id: nanoid(),
    };

    setNewListModal(false);
    setLists([...lists, newListItem]);
    setNewListName("");
    setActiveList(newListItem);
    setActiveListTaskList([]);
    setHome(false);
  }

  function selectActiveList(event, id) {
    const selecetedListItem = lists.find(list => list.id === id);
    setActiveList(selecetedListItem);

    if (selecetedListItem.taskList.length === 0) {
      setActiveListTaskList([]);
    } else {
      setActiveListTaskList(selecetedListItem.taskList);
    }
    setHome(false);
    setNewTaskForm(false);
  }

  // const menuListItems = lists.map(list => {
  //   return (
  //     <Menu id={list.id} name={list.name} selectActiveList={selectActiveList} />
  //   );
  // });

  function deleteList(event) {
    const updatedLists = lists.filter(list => {
      return list.id !== activeList.id;
    });
    setLists(updatedLists);
    setActiveList(null);
  }
}

export default Todo;
