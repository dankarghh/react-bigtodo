import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { addDays } from "date-fns";
import ListItem from "./ListItem";

function ComingUp() {
  const { lists } = useContext(Context);
  const [allTasks, setAllTasks] = useState([]);
  let sortedList;
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
  console.log(today);
  console.log(addDays(new Date(today), 1).toISOString().slice(0, 10));

  const todaysTasks = allTasks.filter(task => {
    return task.dueDate === today;
  });
  console.log(allTasks);
  console.log(todaysTasks);

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
    <div>
      {/* <h1>Today</h1>
      {todaysTasks.map(task => {
        return <h4>{task.taskName}</h4>;
      })} */}
      <h1>Today</h1>
      {todaysTasks.map(task => {
        return (
          <ListItem
            id={task.id}
            taskName={task.taskName}
            notes={task.notes}
            // icon={icon}
            dueDate={task.dueDate}
            // markTaskComplete={markTaskComplete}
            // deleteTask={deleteTask}
            // handleChangeTask={handleChangeTask}
          />
        );
      })}
      <h2>Tomorrow</h2>
      {tomorrowsTasks.map(task => {
        return <h4>{task.taskName}</h4>;
      })}
      <h2>Later this week</h2>
      {thisWeeksTasks.map(task => {
        return <h4>{task.taskName}</h4>;
      })}
    </div>
  );
}

export default ComingUp;
