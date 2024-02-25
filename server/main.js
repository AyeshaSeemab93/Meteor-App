// 1 Importing collection  from api folder and adding data into it
// 2 Creating user accounts
// 3 Adding github login service

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';//for creating user accounts
import {TasksCollection} from '/imports/api/TasksCollection';
import {ServiceConfiguration} from 'meteor/service-configuration';//for github login
import '/imports/api/tasksMethods';//importing the methods.this will register the methods on the server

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id, //adding id of current user to the task
    createdAt: new Date(),
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


//configure our server to fully connect to Github
  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: '7d0ff7a96b556b6dfcf9', // insert your clientId here(we get this from github developer settings)
        secret: '78207ab49abe5ef5823150ea1cbd1ce838e2c94f', // insert your secret here
      },
    }
  );
