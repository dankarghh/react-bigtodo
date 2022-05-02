import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

export default function ListItem(props) {
  const [editListItem, setEditListItem] = useState(false);

  const { activeList } = useContext(Context);

  useEffect(() => {
    setEditListItem(false);
    console.log(activeList);
  }, [activeList]);

  return (
    <div className="task-wrapper">
      {editListItem ? (
        <form>
          <div className="task__main-elements">
            <div className="task__main-elements-left">
              <img
                alt="complete icon"
                className="task-icon"
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
                className="task-icon"
                src="./edit.svg"
                onClick={e => setEditListItem(!editListItem)}
              ></img>
              <img
                alt="delete icon"
                className="task-icon"
                src="./delete.svg"
                onClick={e => props.deleteTask(e, props.id)}
              ></img>
            </div>
          </div>
          <input
            className="task__task-notes"
            onChange={e => props.handleChangeTask(e, props.id)}
            name="notes"
            value={props.notes}
          ></input>
        </form>
      ) : (
        <div>
          <div className="task__main-elements">
            <div className="task__main-elements-left">
              <img
                alt="complete icon"
                className="task-icon"
                src={props.icon}
                onClick={e => props.markTaskComplete(e, props.id)}
              ></img>
              <p className="task__task-name">{props.taskName}</p>
            </div>

            <div className="task__main-elements-right">
              <p className="task__task-date">{props.dueDate}</p>
              <img
                alt="edit icon"
                className="task-icon"
                src="./edit.svg"
                onClick={e => setEditListItem(!editListItem)}
              ></img>
              <img
                alt="delete icon"
                className="task-icon"
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
