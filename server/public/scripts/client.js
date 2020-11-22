$(document).ready(function(){
  console.log('jQ is READY');
  taskRefresh();
  //addClickHandlers();
  $('#bookShelf').on('click', '.deleteButton', deleteBook);
  $('#bookShelf').on('click', '.markReadButton', markRead);
  $('#submitButton').on('click', submitTask);

});
//update task list displayed on dom
function taskRefresh() {
  console.log('Refreshing Tasks');
  $.ajax({
    type: 'GET',
    url: '/task'
  }).then(function(response) {
    console.log('SERVER responded with', response);
    taskRender(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}
//render updated tasks to the dom
function taskRender(taskArray) {//ENTER taskRender
  console.log('Rendering Tasks');
  console.log('Here is our taskArray:', taskArray);
  //clear old task list from dom to prevent multilogging
  $('#taskList').empty();
  
   for(let task of taskArray) {
     
   // For each task, append a new row to our table
let $tr = $(`<tr data-id="${task.id}"></tr>`);
     $tr.data('task', task);
     $tr.append(`<td>${task.task}</td>`);
   $tr.append(`<td>${task.date}</td>`);
    $tr.append(`<td class="center">${task.duration}</td>`);
    $tr.append(`<td>(Check = True) <input type="checkbox" id="check"></td>`);
     $tr.append(`<td><button class="deleteButton">Delete</button></td>`);     

    $('#taskList').append($tr);
  }
// 
  
  
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

function markRead() {
  console.log('enter markRead');
  let idToUpdate = $(this).closest('tr').data('id');
console.log('idToUpdate', idToUpdate);
  let readObject = {
    read : 'yes'
  }
  
  $.ajax({
    method: 'PUT', //update
    url: `/books/${idToUpdate}`,//req.params
    data: readObject //req.body
  }).then(function(response){
    console.log(response);
    refreshBooks();
  }).catch(function(){
    
  })
  
  
}

//delete a book from the database
function deleteBook() {
  console.log('ENTER deleteBook');
  console.log($(this));
  //need id of song i wish to delete
let idToDelete = $(this).closest('tr').data('id')
  console.log('idToDelete', idToDelete);

  $.ajax({
        method: 'DELETE',
        url: `/books/${idToDelete}` //add id to the url
    }).then( function(response) {
      console.log(response);
        refreshBooks();
    }).catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    })
}

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);

  // TODO - Add code for edit & delete buttons
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server ln48.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  console.log('ENTER renderBooks');
  $('#bookShelf').empty();

  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
let $tr = $(`<tr data-id="${book.id}"></tr>`);
    $tr.data('book', book);
    $tr.append(`<td>${book.title}</td>`);
    $tr.append(`<td>${book.author}</td>`);
    $tr.append(`<td>${book.status}</td>`);

    $tr.append(`<button class="deleteButton">Delete</button>`);
    $tr.append(`<button class="markReadButton">Mark Read</button>`);

    $('#bookShelf').append($tr);
  }
}
