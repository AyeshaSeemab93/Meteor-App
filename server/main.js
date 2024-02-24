// 1 Importing collection  from api folder and adding data to into it
// 2 Creating user accounts

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {TasksCollection} from '/imports/api/TasksCollection';

const SEED_USERNAME = 'ayesha123'; //SEED means default
const SEED_PASSWORD = 'password';

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
Meteor.startup(()=>{
  if(!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
  }
});