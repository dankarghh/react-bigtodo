import { Context } from "../Context";
import { useContext } from "react";

export default function Home() {
  const { lists, markTaskComplete, setActiveList } = useContext(Context);

  const homeElements = lists.map(list => {
    return (
      <div
        key={list.id}
        className="home__list"
        onMouseEnter={e => setActiveList(list)}
      >
        <h2 className="home__list-name">{list.name}</h2>
        {list.taskList.length < 1 ? (
          <p className="home__no-task">No tasks yet</p>
        ) : null}
        {list.taskList.map(task => {
          const icon = task.completed
            ? "./complete_task.svg"
            : "./incomplete_task.svg";
          return (
            <div className="home__task">
              <div className="home__task-details">
                <div
                  className="home__task-details--left"
                  onClick={e => markTaskComplete(e, task.id)}
                >
                  <img className="task__icon" alt="icon" src={icon}></img>
                  <p className="home__task-name">{task.taskName}</p>
                </div>
                <p className="home__task-date">{task.dueDate}</p>
              </div>
              <p className="home__task-notes">{task.notes}</p>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="container">
      <h1 className="section-heading">All tasks</h1>
      {!homeElements && <p>hey</p>}
      {homeElements}
    
    </div>
  );
}
