import React from 'react';
import { Task } from './Task.jsx';
// importing hook from package(react-meteor-data) to add reactivity to the component
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';

// const tasks = [
//   {_id: 1, text: 'This is task 1'},
//   {_id: 2, text: 'This is task 2'},
//   {_id: 3, text: 'This is task 3'}
// ]

export const App = () => {
  //fetching the data from the collection and passing it to the Task component
  //useTracker creates a reactive data dependency to render the component when the data changes
  const tasks = useTracker(()=>{ 
    return TasksCollection.find({}).fetch()
  });

  return(
  <div>
    <h1>Welcome to Meteor!</h1>
    <ul>
      {tasks.map(task => <Task key={task._id} task={task} />)}
    </ul>
  </div>
  )
};
