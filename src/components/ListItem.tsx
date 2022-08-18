import React from "react";
import { useEffect, useState, useContext, FC } from "react";
import { Context } from "../Context";

interface Props {
  id: string;
  taskName: string;
  notes: string;
  icon: string;
  dueDate: string;
  markTaskComplete: (
    e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLDivElement>,
    id: string
  ) => void;
  deleteTask: (e: React.MouseEvent<HTMLImageElement>, id: string) => void;
  handleChangeTask: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  newTaskForm: boolean;
}

const ListItem: FC<Props> = props => {
  const [editListItem, setEditListItem] = useState(false);

  const { activeList } = useContext(Context);

  useEffect(() => {
    setEditListItem(false);
  }, [activeList, props.newTaskForm]);

  return (
    <div className="task-wrapper">
      {editListItem ? (
        <form>
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
            value={props.notes}
          ></input>
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
};
export default ListItem;
