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
    let viewTodos = document.getElementById("viewTodoList");
    console.log(document.querySelector("[data-todoid='1']"));
    console.log(viewTodos);
    console.log(viewTodos.attributes);
    let root = viewTodos.childNodes;
    console.log(root);
    viewTodos.innerHTML = '';
 
    for(let todoItem of todoList){

     
        if(todoItem.isSubTask == false){
        viewTodos.innerHTML +=
        `
            <dl data-todoid="${todoItem.id}" id="toDoItem" class= ${todoItem.isComplete ? "completed" : "task-not-completed"}> ${todoItem.text}</dl>
        `;

        }
        else if(todoItem.isSubTask == true){
            //.querySelector
        //closest dt id is the same as todoItem.connectedTaskId
        // get child
            let mainTodoTaskElement = document.querySelector(`[data-todoid="${todoItem.connectedTaskId}"]`);
            
            mainTodoTaskElement.innerHTML+=
            `
            <dd>${todoItem.text}</dd>
            
            `
            
    //         let mainTodoTaskElement = document.getElementById("data-todoid");
    //         let mainTodoTaskElementid = mainTodoTaskElement.getAttribute("data-todoid");
    //         if (todoItem.connectedTaskId == mainTodoTaskElementid){
    //         mainTodoTaskElement.innerHTML +=
    //         `
    //         <dd>${todoItem.text}</dd>
    //         `
    //         }
    //         // might have to be dd already made in viewTodos above where class = todosubtaskname
    //     }
        }    
    // add ternary operator for ✅ emoji 
    }
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



