import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { addDays } from "date-fns";

import ComingUpListItem from "./ComingUpListItem";

function ComingUp() {
  const { lists, markTaskComplete } = useContext(Context);
  const [allTasks, setAllTasks] = useState([]);



  useEffect(() => {
    let newList = [];
    lists.forEach(list => {
      list.taskList.forEach(taskList => {
        newList.push(taskList);
      });
    });
    setAllTasks(newList);
  }, [lists]);

  const today = new Date().toISOString().slice(0, 10);

  const todaysTasks = allTasks.filter(task => {
    return task.dueDate === today;
  });

  const tomorrowsTasks = allTasks.filter(task => {
    return (
      task.dueDate === addDays(new Date(today), 1).toISOString().slice(0, 10)
    );
  });

  const thisWeeksTasks = allTasks.filter(task => {
    return (
      task.dueDate < addDays(new Date(today), 7).toISOString().slice(0, 10) &&
      task.dueDate > addDays(new Date(today), 2).toISOString().slice(0, 10)
    );
  });

  return (
    <div className="container">
      <div className="home__coming-up">
        <h1 className="section-heading">Coming up this week</h1>
        <h2 className="home__list-name">Today</h2>
        {todaysTasks.length === 0 ? <p>No tasks due today</p> : null}
        {todaysTasks.map(task => {
          const icon = task.completed
            ? "./complete_task.svg"
            : "./incomplete_task.svg";
          return (
            <ComingUpListItem
              taskName={task.taskName}
              completed={task.completed}
              id={task.id}
              markTaskComplete={markTaskComplete}
              icon={icon}
            />
          );
        })}
      </div>
      <div className="home__coming-up">
        <h2 className="home__list-name">Tomorrow</h2>
        {tomorrowsTasks.length === 0 ? <p>No tasks due tomorrow</p> : null}
        {tomorrowsTasks.map(task => {
          const icon = task.completed
            ? "./complete_task.svg"
            : "./incomplete_task.svg";
          return (
            <ComingUpListItem
              taskName={task.taskName}
              completed={task.completed}
              id={task.id}
              markTaskComplete={markTaskComplete}
              icon={icon}
            />
          );
        })}
      </div>

      <div className="home__coming-up">
        <h2 className="home__list-name">Later this week</h2>
        {thisWeeksTasks.length === 0 ? (
          <p>Nothing coming up later in the week</p>
        ) : null}
        {thisWeeksTasks.map(task => {
          const icon = task.completed
            ? "./complete_task.svg"
            : "./incomplete_task.svg";
          return (
            <ComingUpListItem
              taskName={task.taskName}
              completed={task.completed}
              id={task.id}
              markTaskComplete={markTaskComplete}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ComingUp;
