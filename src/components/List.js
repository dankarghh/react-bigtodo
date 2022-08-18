/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../Context";
import { nanoid } from "nanoid";
import ListItem from "./ListItem.tsx";
import { useNavigate } from "react-router";

export default function List() {
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
  const [newTaskForm, setNewTaskForm] = useState(
    activeList.taskList.length > 0 ? true : false
  );
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    setHovered(false);
    setNewTaskForm(activeList.taskList.length > 0 ? false : true);
  }, [activeList]);

  useEffect(() => {
    if (newTaskForm === true) {
      inputRef.current.focus();
    }
  }, [newTaskForm]);

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
      setNewTaskForm(false);
    }
  }

  function toggleTaskForm(e) {
    e.preventDefault();
    setNewTaskForm(prevState => !prevState);
    inputRef.current.focus();
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

  function handleDeleteList(event) {
    deleteList(event);
    navigate("/");
  }

  let taskListElements = "";

  // if (newTaskForm) {
  //   inputRef.current.focus();
  // }

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
          newTaskForm={newTaskForm}
        />
      );
    });
  }

  return (
    <div className="container">
      {activeList ? (
        <div className="list__active-list">
          <h2
            className="list__list-name"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {activeList.name}{" "}
            {hovered && (
              <img
                onClick={event => handleDeleteList(event)}
                src="./delete_list.svg"
                className="task-icon delete-list-icon"
              ></img>
            )}
          </h2>

          {taskListElements}
        </div>
      ) : null}

      {newTaskForm ? (
        <form className="form-new-task">
          <div className="form-new-task-body">
            <div className="form-new-task__top">
              <input
                ref={inputRef}
                className="form-new-task__title"
                placeholder="Add a task"
                onChange={event => setNewTaskName(event.target.value)}
                value={newTaskName}
              />
              <input
                className="form-new-task__date"
                type="date"
                placeholder="due date"
                onChange={event => setNewTaskDate(event.target.value)}
                value={newTaskDate}
              />{" "}
            </div>

            <div className="form-new-task__bottom">
              <input
                className="form-new-task__notes"
                placeholder="notes (optional)"
                onChange={event => setNewTaskNotes(event.target.value)}
                value={newTaskNotes}
              />
              <div className="btn-container">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={e => toggleTaskForm(e)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={event =>
                    createTask(event, newTaskName, newTaskNotes, newTaskDate)
                  }
                >
                  Add task
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <button
          className="btn btn-primary list__new-task-btn"
          onClick={e => setNewTaskForm(e)}
        >
          Add new Task
        </button>
      )}
    </div>
  );
}
