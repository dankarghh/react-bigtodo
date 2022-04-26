/* eslint-disable jsx-a11y/alt-text */
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { nanoid } from "nanoid";
import ListItem from "./ListItem";

export default function List() {
  console.log(new Date().toISOString().slice(0, 10));

  const {
    activeList,
    markTaskComplete,
    deleteList,
    activeListTaskList,
    setActiveListTaskList,
  } = useContext(Context);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  // const [activeListTaskList, setActiveListTaskList] = useState([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(false);
  }, [activeList]);

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
  function handleChangeTask(e, id) {
    const { name, value } = e.target;
    const updatedTaskList = [...activeListTaskList];
    const selectedList = updatedTaskList.find(list => {
      return list.id === id;
    });
    selectedList[name] = value;
    setActiveListTaskList(updatedTaskList);
  }

  let taskListElements = "";

  if (activeList && activeList.taskList.length > 0) {
    taskListElements = activeList.taskList.map(task => {
      const icon = task.completed
        ? "./complete_task.svg"
        : "./incomplete_task.svg";
      return (
        <ListItem
          id={task.id}
          taskName={task.taskName}
          notes={task.notes}
          icon={icon}
          dueDate={task.dueDate}
          markTaskComplete={markTaskComplete}
          deleteTask={deleteTask}
          handleChangeTask={handleChangeTask}
        />
      );
    });
  }

  return (
    <div>
      {activeList ? (
        <div>
          <h2
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {activeList.name}{" "}
            {hovered && (
              <img
                onClick={event => deleteList(event)}
                src="./delete_list.svg"
              ></img>
            )}
          </h2>

          {taskListElements}
        </div>
      ) : null}

      <form className="form-new-task">
        <input
          placeholder="task name"
          onChange={event => setNewTaskName(event.target.value)}
          value={newTaskName}
        />
        <input
          placeholder="notes (optional)"
          onChange={event => setNewTaskNotes(event.target.value)}
          value={newTaskNotes}
        />
        <label>
          Due Date
          <input
            type="date"
            placeholder="due date"
            onChange={event => setNewTaskDate(event.target.value)}
            value={newTaskDate}
          />
        </label>
        <button
          onClick={event =>
            createTask(event, newTaskName, newTaskNotes, newTaskDate)
          }
        >
          CREATE NEW TASK
        </button>
      </form>
    </div>
  );
}
