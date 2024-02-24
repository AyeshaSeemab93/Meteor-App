import React from 'react';
import { useState } from 'react';
import { Task } from './Task.jsx';
// importing hook from package(react-meteor-data) to add reactivity to the component
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';
import { TaskForm } from './TaskForm';

// const tasks = [
//   {_id: 1, text: 'This is task 1'},
//   {_id: 2, text: 'This is task 2'},
//   {_id: 3, text: 'This is task 3'}
// ]
const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteTask = ({_id}) =>{
 TasksCollection.remove(_id);
}
export const App = () => {
 
 const[hideCompleted, setHideCompleted] = useState(false);

  //fetching the data from the collection and passing it to the Task component
  const hideCompletedFilter = {isChecked: {$ne: true}};
//filter to show only the unchecked tasks ($ne:true means not equal to true)
  //useTracker creates a reactive data dependency to render the component when the data changes
  const tasks = useTracker(()=>{
    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {sort: {createdAt: -1}}).fetch();
  })
  //{sort:{createdAt: -1}} to get the newest first(-1 for descending order, 1 for ascending order)
  // {
  //   text: text.trim(),
  //   createdAt: new Date()
  // };
 const pendingTasksCount = useTracker(()=>{
  return TasksCollection.find(hideCompletedFilter).count()
 });
  

  return(
  <div className='app'>
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>TO DO LIST {pendingTasksCount ? `(${pendingTasksCount})`: ""}</h1>
        </div>
      </div>
    </header>

    <div className="main">
     <TaskForm /> 
   <div className='filter'>
      <button onClick={()=> setHideCompleted(!hideCompleted)}> 
      {/* everytime on clicking the button true false true false*/}
        {hideCompleted ? "Show All" : "Hide Completed Tasks"}
      </button>

   </div>
     <ul className='tasks'>
      {tasks.map(task => 
        <Task 
          key={task._id} 
          task={task} 
          onCheckboxClick={toggleChecked} // just the reference so no () after the function name. arguments are passed in the Task component
          onDeleteClick={deleteTask}/>
        )}
      </ul>
      </div>
      <footer>
        Created using Meteor!
      </footer>
  </div>
  )
};
