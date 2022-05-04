import React from "react";

function ComingUpListItem(props) {
  const styles = props.completed
    ? "home__task-name home__task-name--complete"
    : "home__task-name";
  return (
    <div className="coming-up">
      <img
        className="menu__list-icon"
        alt="task icon"
        src="radiofilled.svg"
        onClick={e => props.markTaskComplete(e, props.id)}
      ></img>
      <p className={styles}>{props.taskName}</p>
    </div>
  );
}

export default ComingUpListItem;
