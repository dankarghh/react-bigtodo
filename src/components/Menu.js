import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { Link, useNavigate } from "react-router-dom";

function Menu(props) {
  const {
    createNewList,
    lists,

    setActiveList,
    activeList,
    setActiveListTaskList,
  } = useContext(Context);
  const [newListName, setNewListName] = useState("");
  const [toggleMenuOpen, setToggleMenuOpen] = useState(
    window.innerWidth < 600 ? false : true
  );
  const [mobileScreen, setMobileScreen] = useState(
    window.innerWidth < 600 ? true : false
  );
  const navigate = useNavigate();

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
