const addForm= document.querySelector('.add-form');
const addTaskInput= document.querySelector('.add-form__input');
const addTaskBtn= document.querySelector('.add-form__btn');
const searchForm= document.querySelector('.search-form');
const searchTaskInput= document.querySelector('.search-form__input');
const searchTaskBtn= document.querySelector('.search-form__btn');
const list = document.querySelector('.list');
const doneBtn=document.querySelector('.done-btn');
const removeBtn=document.querySelector('.remove-btn');

const tasksList=[];

function addTasK(e){
  e.preventDefault();
  const taskName = addTaskInput.value.toLowerCase();
  if(taskName){
    let task=document.createElement('li');
    task.className='newTask';
    task.innerHTML=`${taskName}<button class='done-btn btn'>&#10004;</button><button class='remove-btn btn'>&#10006;</button>`
    task.dataset.id=tasksList.length;
    tasksList.push(task);
    localStorage.setItem(JSON.stringify(tasksList),taskName);
    task.querySelector('.remove-btn').addEventListener('click', removeTask);
    task.querySelector('.done-btn').addEventListener('click', e=>{
      const doneTask = e.target.parentNode;
      const doneBtns = e.target;
      doneBtns.style.color='magenta';
      doneTask.style.textDecoration = 'line-through';
      doneTask.style.color = 'magenta'
    });
    tasksList.forEach(task=>{
      list.appendChild(task);
    })
  }else{
    alert('Wpisz nazwę zadania')
  }
  addTaskInput.value = '';
 }

 function removeTask(e){
   const taskToRemove = e.target.parentNode.dataset.id
   tasksList.splice(taskToRemove,1);
   localStorage.removeItem('task')
   list.textContent='';
   tasksList.forEach((task,id)=>{
     task.dataset.id = id;
     list.appendChild(task)
   })
  }

  function searchTask(e){
    e.preventDefault();
    const searchedTxt= searchTaskInput.value.toLowerCase();
   if(searchedTxt){
     let tasksListClone=[...tasksList];
     tasksListClone=tasksListClone.filter(task=>task.textContent.includes(searchedTxt))
     list.textContent = '';
    tasksListClone.forEach(task=>{
      list.appendChild(task)
    })
  }else{
    tasksList.forEach(task=>{
      list.appendChild(task)
    })
  }
  searchTaskInput.value='';
 }
addForm.addEventListener('submit', addTasK)
searchForm.addEventListener('submit',searchTask);