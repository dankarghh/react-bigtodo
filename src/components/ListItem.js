import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

export default function ListItem(props) {
  const [editListItem, setEditListItem] = useState(false);

  const { activeList } = useContext(Context);

  useEffect(() => {
    setEditListItem(false);
  }, [activeList, props.newTaskForm]);

  return (
    <div className="task-wrapper">
      {editListItem ? (
        <form onSubmit={e => setEditListItem(!editListItem)}>
          <div className="task__main-elements">
            <div className="task__main-elements-left">
              <img
                alt="complete icon"
                className="task__icon"
                src={props.icon}
                onClick={e => props.markTaskComplete(e, props.id)}
              ></img>
              <input
                onChange={e => props.handleChangeTask(e, props.id)}
                name="taskName"
                value={props.taskName}
              ></input>
            </div>

            <div className="task__main-elements-right">
              <input
                onChange={e => props.handleChangeTask(e, props.id)}
                className="task__task-date"
                name="dueDate"
                value={props.dueDate}
                type="date"
              ></input>
              <img
                alt="edit icon"
                className="task__icon"
                src="./edit.svg"
                onClick={e => setEditListItem(!editListItem)}
              ></img>
              <img
                alt="delete icon"
                className="task__icon"
                src="./delete.svg"
                onClick={e => props.deleteTask(e, props.id)}
              ></img>
            </div>
          </div>
          <input
            className="task__task-notes"
            onChange={e => props.handleChangeTask(e, props.id)}
            name="notes"
            placeholder="notes (optional)"
            value={props.notes}
          ></input>
          <button
            onClick={e => setEditListItem(!editListItem)}
            className="btn btn-secondary btn--save"
          >
            Save
          </button>
        </form>
      ) : (
        <div>
          <div className="task__main-elements">
            <div
              className="task__main-elements-left"
              onClick={e => props.markTaskComplete(e, props.id)}
            >
              <img
                alt="complete icon"
                className="task__icon"
                src={props.icon}
              ></img>
              <p className="task__task-name">{props.taskName}</p>
            </div>

            <div className="task__main-elements-right">
              <p className="task__task-date">{props.dueDate}</p>
              <img
                alt="edit icon"
                className="task__icon"
                src="./edit.svg"
                onClick={e => setEditListItem(!editListItem)}
              ></img>
              <img
                alt="delete icon"
                className="task__icon"
                src="./delete.svg"
                onClick={e => props.deleteTask(e, props.id)}
              ></img>
            </div>
          </div>
          <p className="task__task-notes">{props.notes}</p>
        </div>
      )}
    </div>
  );
}
