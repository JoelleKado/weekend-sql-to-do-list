Create a front end experience that allows a user to create a Task.
  [X] create inputs: 'task', 'due date', 'surmised duration(minutes'})'
When the Task is created, it should be stored inside of a database (SQL)
  [] get server running
  [] POST
      [] create a clicker function that....
          [X] collect inputs
          [] Does a POST
  [] create a completedObject and sent it in a post request to the db
Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
  [] do a refreshFunction
Each Task should have an option to 'Complete' or 'Delete'.
  []
  TASK COMPLETED...
When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be  'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
  [] 
Whether or not a Task is complete should also be stored in the database.
  []
Deleting a Task should remove it both from the front end as well as the Database.
  []
[]create a db `weekend-to-do-app`

[]Please include a `database.sql` text file in your repo that includes all of your `CREATE TABLE` queries. This is so we can re-create your database while testing your app.