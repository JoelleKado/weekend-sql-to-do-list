$(document).ready(function(){
  console.log('jQ is READY');
  taskRefresh();
  $('#taskList').on('click', '.deleteButton', removeTask);
  $('#taskList').on('click', '.checkButton', checkFunction);
  $('#submitButton').on('click', submitTask);
});

function checkFunction() {
  console.log('enter checkFunction');
  let idToUpdate = $(this).closest('tr').data('id');
  
  console.log('idToUpdate', idToUpdate);
  let checkObject = {
    complete : 'true'
  }
  console.log(checkObject);
  
  $.ajax({
    method: 'PUT', //update
    url: `/task/${idToUpdate}`,//req.params
    data: checkObject //req.body
  }).then(function(response){
    console.log(response);
    taskRefresh();
  }).catch(function(){
    console.log('something went wrong.');
  })
}

function removeTask() {
  console.log('Removing task');
  console.log($(this));
  let idToDelete = $(this).closest('tr').data('id');
  console.log(idToDelete);
  $.ajax({
        method: 'DELETE',
        url: `/task/${idToDelete}` //add id to the url
    }).then( function(response) {
      console.log(response);
        taskRefresh();
    }).catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    })
}

//update task list displayed on dom
function taskRefresh() {
  console.log('Refreshing Tasks');
  $.ajax({
    type: 'GET',
    url: '/task'
  }).then(function(result) {
    console.log('SERVER responded with', result);
    
    $('#taskList').empty();
        
    for(let i=0; i<result.length; i++) {
        $('#taskList').append(
          `<tr data-id=${result[i].id}>
          <td>${result[i].task}</td>
          <td>${result[i].date}</td>
          <td>${result[i].duration}</td>
          <td class="yellow"><button class="checkButton">check</button></td>
          <td><button class="deleteButton">Delete</button></td>`)   
}
    //taskRender(result);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}
//render updated tasks to the dom
//--we are going to call our 'response' 'taskArray' 
function taskRender(taskArray) {//ENTER taskRender
  console.log('Rendering Tasks');
  console.log('Here is our taskArray:', taskArray);
  //clear old task list from dom to prevent multilogging
};//EXIT taskRender

function submitTask() {//ENTER submitTask
  console.log('ENTER submitTask');
  //collect inputs
  let task = $('#taskInput').val();
  let date = $('#dateInput').val();
  let time = $('#durationInput').val();
  //put inputs into an object
  let taskObject = {
    keyOne : task,
    keyTwo : date,
    keyThree : time
  }
  console.log('Here is your taskobject', taskObject);
  //send object to server
  $.ajax({
        method: 'POST',
        url: '/task',
        data: taskObject
  }).then(function (response) {
        //then is run if we get a good response from server
        console.log('server says', response);
        //refresh our task list to reflect our latest POST
        taskRefresh();
        //clear inputs
        $('#taskInput').val('');
        $('#dateInput').val('');
        $('#durationInput').val('');
  
    }).catch(function (error) {
        //catch is run if there is a bad response from server
        //log th error and alert the user
        console.log('Error', error);
        alert('Something went wrong.')
    })
};//EXIT submitTask