import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { Task } from './Task.jsx';
import { Meteor } from 'meteor/meteor';
// importing useTracker hook from package(react-meteor-data) to add reactivity to the component
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../db/TasksCollection.js';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm.jsx';



//: Updates the isChecked field in the task  when a task's checkbox is clicked(Task Component).
const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call('tasks.setIsChecked', _id, !isChecked);
  // TasksCollection.update(_id, {
  //   $set: {
  //     isChecked: !isChecked
  //   }
  // })
};

const deleteTask = ({_id}) =>{
//  TasksCollection.remove(_id);
  Meteor.call('tasks.remove', _id);
}




export const App = () => {
  
   const user = useTracker(()=> Meteor.user());
  //Meteor.user() returns the current user, if no user then null
  
 
 const[hideCompleted, setHideCompleted] = useState(false);

  //fetching the data from the collection and passing it to the Task component
  const hideCompletedFilter = {isChecked: {$ne: true}};//filter to show only the unchecked tasks ($ne:true means not equal to true)
  const userFilter = user ? {userId: user._id} : {}; //if user exist then create an object with userId else empty object.  filter tasks based on the userId
  const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter}; // merge two filters into a single filter using spread syntax(...)

  //useTracker creates a reactive data dependency to render the component when the data changes
  // >>const tasks = useTracker(()=>{
  //   return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {sort: {createdAt: -1}}).fetch();
  // })
  //  const tasks = useTracker(()=>{
  //   return TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {sort: {createdAt: -1}}).fetch();
  // })
  
  //{sort:{createdAt: -1}} to get the newest first(-1 for descending order, 1 for ascending order)
  // {
  //   text: text.trim(),
  //   createdAt: new Date()
  // };

//  const pendingTasksCount = useTracker(()=>{
//   return TasksCollection.find(hideCompletedFilter).count()
//  });
  // >>const pendingTasksCount = useTracker(()=>{
  //   if(!user){
  //     return 0;
  //   }
  //   return TasksCollection.find(pendingOnlyFilter).count()
  // });
//activatin subscription to get the data from the server(to use publications)
  // >>const isLoading = useTracker(()=>{
  //   const noDataAvailable = {
  //     tasks: [],
  //     pendingTasksCount: 0
  //   }
  //   const handler = Meteor.subscribe('tasks');
  //     if(!handler.ready()){
  //       return{...noDataAvailable, isLoading: true}; 
  //   }
  //   return false;

  // } );

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
   
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });


  const pendingTasksTitle = `${
      pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;
    
  //for debugging


  //1 by writing directly
  console.log("User object1:", user);
  console.log("Pending tasks count1:", pendingTasksCount);
  //2 by using useEffect
  useEffect(() => {
    console.log("User object2:", user);
    console.log("User username2:", user?.username || user?.profile?.name);
  }, [user]);
 // useEffect is better because it runs after the component is rendered and the user object is updated

 const logout = () => Meteor.logout();// logout function called  when the button is clicked
  return(
  <div className='app'>
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>TO DO LIST {pendingTasksCount ? `(${pendingTasksCount})`: ""}</h1>
          {/* if task count true(1,2,3)show count if 0 means false, show empty string */}
        </div>
      </div>
    </header>

    <div className="main">
      {/* if user is correct then show fragment portion else show login form*/}
   {user ? (<Fragment>
    <div className="user" onClick={logout}>
   
    {user.username || user.profile.name} 🚪
      </div>
      <TaskForm /> 

      <div className='filter'>
          <button onClick={()=> setHideCompleted(!hideCompleted)}> 
          {/* everytime on clicking the button true false true false*/}
            {hideCompleted ? "Show All" : "Hide Completed Tasks"}
          </button>
      </div>
      {isLoading && <div className="loading">loading...</div>}

      <ul className='tasks'>
      {tasks.map(task => 
        <Task 
          key={task._id} 
          task={task} 
          onCheckboxClick={toggleChecked} // just the reference so no () after the function name. arguments are passed in the Task component
          onDeleteClick={deleteTask}/>
        )}
      </ul>
    </Fragment> ):(<LoginForm/>)}
    </div>
       
      <footer>
        Created using Meteor!
      </footer>
  </div>
  )
};
