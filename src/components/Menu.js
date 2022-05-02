import React, { useState, useContext, useEffect } from "react";
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

  const navigate = useNavigate();

  function selectList(list) {
    setActiveList(list);
    setActiveListTaskList(list.taskList);
  }

  // useEffect(() => {
  //   activeList.classList.add("menu-list-item--active");
  // }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("activeList", JSON.stringify(activeList));
  });

  const listElements = lists.map(list => {
    return (
      <Link to="/list">
        <div className="menu-item menu-list-item">
          <h2
            className="menu-list"
            onClick={() => selectList(list)}
            key={list.id}
          >
            <img src="./radiofilled.svg" className="menu-list-icon" />{" "}
            {list.name}
          </h2>
        </div>
      </Link>
    );
  });
  function handleAddNewList(e, newListItem) {
    createNewList(e, newListName);
    setNewListName("");
    navigate("/list");
  }

  return (
    <div className="menu">
      <Link to="/">
        <div className="menu-item">
          <h2>
            <img alt="home icon" className="menu-icon" src="./home.svg" />
            Overview
          </h2>
        </div>
      </Link>
      <Link to="/comingup">
        <div className="menu-item">
          <h2>
            {" "}
            <img
              alt="calender icon"
              className="menu-icon"
              src="./calender.svg"
            />
            Coming up
          </h2>
        </div>
      </Link>
      <div className="menu-item">
        <h2>
          {" "}
          <img alt="list icon" className="menu-icon" src="./list.svg" />
          Lists
        </h2>
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
  );
}
export default Menu;
