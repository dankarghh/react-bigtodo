import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../Context";
import { Link, useNavigate } from "react-router-dom";

function Menu(props) {
  const {
    createNewList,
    lists,
    setLists,
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

  const windowSize = useRef(window.innerWidth);
  console.log(windowSize);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
      console.log("resized");
    }
  }, [windowSize]);

  function handleToggleMenu(e) {
    if (mobileScreen === true) {
      setToggleMenuOpen(prevState => !prevState);
      document.querySelector(".menu").classList.toggle("menu-open");
      if (!document.querySelector(".menu").classList.contains("menu-open")) {
        document.querySelectorAll(".menu-item__heading").forEach(item => {
          item.classList.add("hidden");
        });
      }
      if (!document.querySelector(".menu").classList.contains("menu-open")) {
        document.querySelector("form").classList.add("hidden");
      }
    }
  }

  const listElements = lists.map(list => {
    const style =
      window.location.pathname == "/list" && list.id === activeList.id
        ? "menu-item menu-item--active menu-list-item"
        : "menu-item menu-list-item";

    return (
      <Link to="/list">
        <div className={style} onClick={() => selectList(list)} key={list.id}>
          <h2 className="menu-list  menu-item__heading">
            <img src="./radiofilled.svg" className="menu-list-icon" />{" "}
            {list.name}
          </h2>
        </div>
      </Link>
    );
  });

  return (
    <div className={mobileScreen ? "menu menu-closed" : "menu"}>
      {!mobileScreen ? null : (
        <div
          className="menu-item menu-item-toggler"
          onClick={e => handleToggleMenu(e)}
        >
          <img alt="menu icon" className="menu-icon" src="./menu.svg" />
        </div>
      )}
      <Link to="/">
        <div
          className={
            window.location.pathname == "/"
              ? "menu-item menu-item--active"
              : "menu-item"
          }
          onClick={toggleMenuOpen ? e => handleToggleMenu() : null}
        >
          <img alt="home icon" className="menu-icon" src="./home.svg" />
          <h2
            className={
              toggleMenuOpen
                ? "menu-item__heading"
                : "menu-item__heading hidden"
            }
          >
            Overview
          </h2>
        </div>
      </Link>
      <Link to="/comingup">
        <div
          className={
            window.location.pathname == "/comingup"
              ? "menu-item menu-item--active"
              : "menu-item"
          }
          onClick={toggleMenuOpen ? e => handleToggleMenu() : null}
        >
          <img alt="calender icon" className="menu-icon" src="./calender.svg" />
          <h2
            className={
              toggleMenuOpen && !mobileScreen
                ? "menu-item__heading"
                : "menu-item__heading hidden"
            }
          >
            {" "}
            Coming up
          </h2>
        </div>
      </Link>
      {toggleMenuOpen ? (
        <div>
          <div className="menu-item">
            <img alt="list icon" className="menu-icon" src="./list.svg" />
            <h2 className="menu-item__heading">Lists</h2>
          </div>
          {listElements}
          <form onSubmit={e => handleAddNewList(e, newListName)}>
            <div className="menu-new-list">
              <input
                className="menu-new-list-input "
                name={newListName}
                value={newListName}
                placeholder="new list name"
                onChange={e => setNewListName(e.target.value)}
              ></input>
              <img className="menu-new-list-icon" src="./add-new.svg" />
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
export default Menu;
