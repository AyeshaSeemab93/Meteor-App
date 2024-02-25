// 1 Importing collection  from api folder and adding data into it
// 2 Creating user accounts

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {TasksCollection} from '/imports/api/TasksCollection';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id, //adding id of current user to the task
    createdAt: new Date(),
  });


const SEED_USERNAME = 'ayesha123'; //SEED means default
const SEED_PASSWORD = 'password';

const user = Accounts.findUserByUsername(SEED_USERNAME);

Meteor.startup(()=>{
  if(!user){
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
    console.log(user._id);
  }
});



//if no data is present in the collection then add this default data to the collection
  if(TasksCollection.find().count() === 0)
  {
    [
      '1 task',
      '2 task',
      '3 task'
    ].forEach(insertTask)

  }


