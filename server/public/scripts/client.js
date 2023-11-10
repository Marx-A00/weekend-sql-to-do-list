console.log('JS is sourced!');
getTasks();






// function submitTask(){}

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

// function isComplete(){}


// function refreshToDoList(){}


function renderToDoList(todoList){
    const viewTodos = document.getElementById("todoBody");
    viewTodos.innerHTML = '';

    for(let todoItem of todoList){
        viewTodos.innerHTML +=
        `
        <tr data-todoid="${todoItem.id}">
        <td>${todoItem.text}</td>
        <td>${todoItem.isComplete}</td>
            </tr>
        `
    }
}

// function deleteTodo(){}



