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
            <img
              alt="complete icon"
              src={props.icon}
              onClick={e => props.markTaskComplete(e, props.id)}
            ></img>
            <input
              onChange={e => props.handleChangeTask(e, props.id)}
              name="taskName"
              value={props.taskName}
            ></input>
            <input
              onChange={e => props.handleChangeTask(e, props.id)}
              name="dueDate"
              value={props.dueDate}
              type="date"
            ></input>
            <img
              alt="edit icon"
              src="./edit.svg"
              onClick={e => setEditListItem(!editListItem)}
            ></img>
            <img
              alt="delete icon"
              src="./delete.svg"
              onClick={e => props.deleteTask(e, props.id)}
            ></img>
          </div>
          <input
            onChange={e => props.handleChangeTask(e, props.id)}
            name="notes"
            value={props.notes}
          ></input>
        </form>
      ) : (
        <div>
          <div className="task__main-elements">
            <img
              alt="complete icon"
              src={props.icon}
              onClick={e => props.markTaskComplete(e, props.id)}
            ></img>
            <h3 className="task__task-name">{props.taskName}</h3>
            <h3>{props.dueDate}</h3>
            <img
              alt="edit icon"
              src="./edit.svg"
              onClick={e => setEditListItem(!editListItem)}
            ></img>
            <img
              alt="delete icon"
              src="./delete.svg"
              onClick={e => props.deleteTask(e, props.id)}
            ></img>
          </div>
          <p className="task__task-notes">{props.notes}</p>
        </div>
      )}
    </div>
  );
}
