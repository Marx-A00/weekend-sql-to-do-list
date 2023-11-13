// on start function, is called when the program is run, which calls 
// to the getTasks() function 
onStart();

// function that makes a GET request, then calls to the render function
function getTasks(){
    axios({
        method: 'GET',
        url: '/todos'
    }).then((response) =>{
        renderToDoList(response.data)
    }).catch((error) => {
        console.log('error with GET', error);
    })
}

// on start function, for instructions when program is started
function onStart(){
    getTasks();
}


// function that handles adding a task from client side
// makes a POST request which updates database
function addTask(event){
    event.preventDefault();

    // let taskName = document.getElementById("todoItemName").value;
    let taskName;

    //clearing 
    document.getElementById("todoItemName").value = '';
    // thinking that I need to check if task is a subtask
    // if it is then 
    // make sure subtask is disabled

    if(document.getElementById("todoItemSubTask").value != ""){
        let parentID = event.target.closest("tr").getAttribute("data-todoid");
        taskName = document.getElementById("todoItemSubTask").value; 

        console.log("hi babe");
        axios({
            method:'POST',
            url: '/todos',
            data:
             {
                taskName: taskName,
                isSubTask: true,
                connectedTaskId: parentID
             }        
    
        }).then(function(response){
            // after post is made, we render again to show new data on client
            getTasks();
        }).catch(function(error){
            console.log('error in post',error);
        })

    }
    else{
        taskName = document.getElementById("todoItemName").value;

    axios({
        method:'POST',
        url: '/todos',
        data:
         {
            taskName: taskName,
         }        

        }).then(function(response){
        // after post is made, we render again to show new data on client
        getTasks();
        }).catch(function(error){
        console.log('error in post',error);
        })
    }
};

function markAsCompleted(event){
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

        // input field for subtask, check about hitting enter to add task
        // sub task must be disabled if length or whatever = 0
        //class="btn btn-outline-primary btn-sm"

        // if !isSubTask -> display text as regular task
        // else display as subtask <dd> in relation to connected task


        // if(todoItem.isSubTask == false){
        //     viewTodos.innerHTML += 
        //     `
        //     <tr data-todoid="${todoItem.id}">
        //         <td data-testid="toDoItem" class= ${todoItem.isComplete ? "completed" : "task-not-completed"}>
        //         <dl>
        //             </dl>
        //         </tr>
        

        //     `
        // }
        viewTodos.innerHTML +=
        `


        <tr data-todoid="${todoItem.id}">
            <td data-testid="toDoItem" class= ${todoItem.isComplete ? "completed" : "task-not-completed"} >
            <dl>
            <dt> ${todoItem.text} </dt>
            <dd class="todosubTaskName"> <input id="todoItemSubTask" type="text" placeholder="Enter subtask here!">
            <button class="btn btn-outline-primary btn-sm" onclick="addTask(event)">Add Subtask</button></dd>
            </dl>
                </td>

          <td><button class="btn btn-outline-danger" data-testid="deleteButton" onclick="deleteTodo(event)">Del</button>
          <button class="btn btn-outline-success" data-testid="completeButton" onclick="markAsCompleted(event)">✅</button></td>
            </tr>
        `
    }
    // add ternary operator for ✅ emoji 
}

function addSubTask(event){
    event.preventDefault();
    let subTaskName = document.getElementById("todosubTaskName").value;

    axios({
        method:'POST',
        url: '/todos',
        data:
         {
            subTaskName : subTaskName
         }        

    }).then(function(response){
        // after post is made, we render again to show new data on client
        getTasks();
    }).catch(function(error){
        console.log('error in post',error);
    })

}

function deleteTodo(event){
    
    event.preventDefault();
    let clickedButton = event.target;
    let theTableRow = clickedButton.closest('tr');
    let dataID = theTableRow.getAttribute('data-todoid');
    axios({
        method: 'DELETE',
        url: `/todos/${dataID}`
    }).then((response) =>{
        getTasks();
    }).catch((error)=>{
        console.log('DELETE /todos/:id fail',error);
    })
}



