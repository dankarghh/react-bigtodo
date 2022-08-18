import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { addDays } from "date-fns";

function Menu(props) {
  const {
    createNewList,
    lists,
    activeListTaskList,
    setActiveList,
    activeList,
    setActiveListTaskList,
  } = useContext(Context);
  const [newListName, setNewListName] = useState("");
  const [toggleMenuOpen, setToggleMenuOpen] = useState(
    window.innerWidth < 600 ? false : true
  );
  const [mobileScreen] = useState(window.innerWidth < 600 ? true : false);
  const navigate = useNavigate();

  const [thisWeeksTasks, setThisWeeksTasks] = useState([]);

  function selectList(list) {
    setActiveList(list);
    setActiveListTaskList(list.taskList);
    if (mobileScreen === true) {
      handleToggleMenu();
    }
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("activeList", JSON.stringify(activeList));
  });

  function handleAddNewList(e, newListItem) {
    createNewList(e, newListName);
    handleToggleMenu();
    setNewListName("");

    navigate("/list");
  }

  function handleToggleMenu(e) {
    if (mobileScreen === true) {
      setToggleMenuOpen(prevState => !prevState);
      document.querySelector(".menu").classList.toggle("menu--open");
      if (!document.querySelector(".menu").classList.contains("menu--open")) {
        document.querySelectorAll(".menu-item__heading").forEach(item => {
          item.classList.add("hidden");
        });
      }
      if (!document.querySelector(".menu").classList.contains("menu--open")) {
        document.querySelector("form").classList.add("hidden");
      }
    }
  }

  function calculateIncompleteTasks(list) {
    let count = 0;
    for (let i = 0; i < list.taskList.length; i++) {
      if (list.taskList[i].completed === false) {
        count = count + 1;
      } else {
        // eslint-disable-next-line no-self-assign
        count = count;
      }
    }
    if (count === 0) {
      return (
        <span className="menu__list-circle menu__list-circle--complete">
          <img className="menu__icon-done" src="./done.svg" alt="icon" />
        </span>
      );
    } else
      return (
        <span className="menu__list-circle menu__list-circle--incomplete">
          {count}
        </span>
      );
  }

  //Calculating incomplete coming up tasks

  useEffect(() => {
    let newList = [];
    lists.forEach(list => {
      list.taskList.forEach(taskList => {
        newList.push(taskList);
      });
    });
    const today = new Date().toISOString().slice(0, 10);
    const totals = newList.filter(task => {
      return (
        (task.completed === false &&
          task.dueDate <
            addDays(new Date(today), 7).toISOString().slice(0, 10)) ||
        (task.completed === false && task.dueDate === today)
      );
    });
    setThisWeeksTasks(totals);
  }, [lists, activeListTaskList]);

  const comingUpTotal =
    thisWeeksTasks.length > 0 ? (
      <span className="menu__list-circle menu__list-circle--coming-up">
        {thisWeeksTasks.length}
      </span>
    ) : null;

  const listElements = lists.map(list => {
    const style =
      window.location.pathname === "/list" && list.id === activeList.id
        ? "menu__item menu__item--active menu__list-item"
        : "menu__item menu__list-item";

    return (
      <Link to="/list">
        <div className={style} onClick={() => selectList(list)} key={list.id}>
          <h2 className="menu__list  menu__item-heading">
            <img
              src="./radiofilled.svg"
              className="menu__list-icon"
              alt="radiobutton"
            />{" "}
            {list.name}
          </h2>

          {calculateIncompleteTasks(list)}
        </div>
      </Link>
    );
  });

  return (
    <div className={mobileScreen ? "menu menu--closed" : "menu"}>
      {!mobileScreen ? null : (
        <div
          className="menu__item menu__item-toggler"
          onClick={e => handleToggleMenu(e)}
        >
          <img alt="menu icon" className="menu__icon" src="./menu.svg" />
        </div>
      )}
      <Link to="/">
        <div
          className={
            window.location.pathname === "/"
              ? "menu__item menu__item--active"
              : "menu__item"
          }
          onClick={toggleMenuOpen ? e => handleToggleMenu() : null}
        >
          <img alt="home icon" className="menu__icon" src="./home.svg" />
          <h2
            className={
              toggleMenuOpen
                ? "menu__item-heading"
                : "menu__item-heading hidden"
            }
          >
            Overview
          </h2>
        </div>
      </Link>
      <Link to="/comingup">
        <div
          className={
            window.location.pathname === "/comingup"
              ? "menu__item menu__item--active"
              : "menu__item"
          }
          onClick={toggleMenuOpen ? e => handleToggleMenu() : null}
        >
          <img
            alt="calender icon"
            className="menu__icon"
            src="./calender.svg"
          />
          <h2
            className={
              toggleMenuOpen && !mobileScreen
                ? "menu__item-heading"
                : "menu__item-heading hidden"
            }
          >
            {" "}
            Coming up
          </h2>
          {comingUpTotal}
        </div>
      </Link>
      {toggleMenuOpen ? (
        <div>
          <div className="menu__item-lists">
            <img alt="list icon" className="menu__icon" src="./list.svg" />
            <h2 className="menu__item-heading">Lists</h2>
          </div>
          {listElements}
          <form onSubmit={e => handleAddNewList(e, newListName)}>
            <div className="menu__new-list">
              <input
                className="menu__new-list-input "
                name={newListName}
                value={newListName}
                placeholder="new list name"
                onChange={e => setNewListName(e.target.value)}
              ></input>
              <img
                onClick={e => handleAddNewList(e, newListName)}
                alt="home icon"
                className="menu__new-list-icon"
                src="./add-new.svg"
              />
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
export default Menu;
