//to publish(show )the tasks on browser, after removing the default autopublish package (which publishes all the data to the client)

import {Meteor} from "meteor/meteor";
import { TasksCollection } from "/db/TasksCollection";

Meteor.publish("tasks", function publishTasks(){
  return TasksCollection.find({userId: this.userId});
});
//if using "this", dont use arrow function, as it will not work with arrow function

// tasks = name of collection in the DB(check db/TasksCollection.js)