import {Mongo} from 'meteor/mongo';


//create a collection(named task) in mongoDB to store the tasks
export const TasksCollection = new Mongo.Collection('tasks');