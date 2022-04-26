import { Context } from "../Context";
import { useContext } from "react";

export default function Home(props) {
  const { lists, markTaskComplete, setActiveList } = useContext(Context);

  const homeElements = lists.map(list => {
    return (
      <div onMouseEnter={e => setActiveList(list)}>
        <h2 className="home-list-name">{list.name}</h2>
        {list.taskList.map(task => {
          return (
            <div className="home-task">
              <div className="home-task-details">
                {task.completed ? (
                  <h3
                    onClick={e => markTaskComplete(e, task.id)}
                    className="home-task-completed"
                  >
                    {task.taskName}
                  </h3>
                ) : (
                  <h3 onClick={e => markTaskComplete(e, task.id)}>
                    {task.taskName}
                  </h3>
                )}
                <h4>{task.dueDate}</h4>
              </div>
              <div className="home-task-notes">{task.notes}</div>
            </div>
          );
        })}
      </div>
    );
  });

  return <div className="home-container"> {homeElements} </div>;
}
