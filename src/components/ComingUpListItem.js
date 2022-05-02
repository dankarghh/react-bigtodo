import React from "react";

function ComingUpListItem(props) {
  return (
    <div className="coming-up">
      <img
        className="task-icon"
        src={props.icon}
        onClick={e => props.markTaskComplete(e, props.id)}
      ></img>
      <p className=" home__task-name">{props.taskName}</p>
    </div>
  );
}

export default ComingUpListItem;
