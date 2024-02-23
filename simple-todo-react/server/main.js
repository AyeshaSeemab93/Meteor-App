// Importing collection  from api folder and adding data to into it

import {Meteor} from 'meteor/meteor';
import {TasksCollection} from '/imports/api/TasksCollection';


const insertTask = (taskText) =>{
  TasksCollection.insert({text: taskText})
}

// Code to run when the server starts up
Meteor.startup(() => 
{
  if(TasksCollection.find().count() === 0)
  {
    [
      '1 task',
      '2 task',
      '3 task'
    ].forEach(insertTask)

  }
});
//if no data is present in the collection then add this default data to the collection
