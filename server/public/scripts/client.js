console.log('JS is sourced!');
getTasks();

function getTasks(){
    axios({
        method: 'GET',
        url: '/todos'
    }).then((response) =>{
        console.log("GET/ tasks", response.data);
        renderToDoList(response.data)
    }).catch((error) => {
        console.log('error with GET', error);
    })

}



function addTask(event){
    event.preventDefault();

    let taskName = document.getElementById("todoItemName").value;
    document.getElementById("todoItemName").value = '';
    console.log(taskName);

    axios({
        method:'POST',
        url: '/todos',
        data:
         {
            taskName: taskName,
         }         
    }).then(function(response){
        getTasks();
    }).catch(function(error){
        console.log('error in post',error);
    })

};

function markAsCompleted(event){
    console.log("mark as completed works!");
    event.preventDefault();
    let todoID = event.target.closest("tr").getAttribute("data-todoid");
    axios({
        method: 'PUT',
        url: `todos/${todoID}`,
    }).then((response) =>{
        getTasks();
    }).catch((error) =>{
        console.log("error in GET",error);
    })
}

function renderToDoList(todoList){

    const viewTodos = document.getElementById("todoBody");
    viewTodos.innerHTML = '';

    for(let todoItem of todoList){
        viewTodos.innerHTML +=
        `
        <tr data-todoid="${todoItem.id}">
        <td data-testid="toDoItem" class= ${todoItem.isComplete ? "task-completed" : "task-not-completed"} >${todoItem.text}</td>
        <td>${todoItem.isComplete}</td>
        <td><button data-testid="completeButton" onclick="markAsCompleted(event)">Ⅹ</button>

          <button data-testid="deleteButton" onclick="deleteTodo(event)">Delete Task</button></td>
            </tr>
        `
    }
}

function deleteTodo(event){
    event.preventDefault();
    let clickedButton = event.target;
    let theTableRow = clickedButton.closest('tr');

    let dataID = theTableRow.getAttribute('data-todoid');
    console.log(dataID);
    axios({
        method: 'DELETE',
        url: `/todos/${dataID}`
    }).then((response) =>{
        getTasks();
    }).catch((error)=>{
        console.log('DELETE /books/:id fail',error);
    })
}



