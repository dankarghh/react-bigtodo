import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";

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

  function selectList(list) {
    setActiveList(list);
    setActiveListTaskList(list.taskList);
  }
  // useEffect(() => {
  //   const data = localStorage.getItem("lists");
  //   if (data) {
  //     setLists(JSON.parse(data));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  });

  const listElements = lists.map(list => {
    return (
      <Link to="/list">
        <h2 onClick={() => selectList(list)} key={list.id}>
          {list.name}
        </h2>
      </Link>
    );
  });
  function handleAddNewList(e, newListItem) {
    createNewList(e, newListName);
    setNewListName("");
  }

  return (
    <div className="menu">
      <Link to="/">
        <h2>Overview</h2>
      </Link>
      <Link to="/comingup">
        <h2>Coming up</h2>
      </Link>
      <h2>Lists</h2>
      {listElements}
      <form onSubmit={e => handleAddNewList(e, newListName)}>
        <input
          name={newListName}
          value={newListName}
          placeholder="new list"
          onChange={e => setNewListName(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}
export default Menu;
