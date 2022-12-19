// Start changing backgroundImage depend on reponsivity
    let mode ="light"
    let media= window.matchMedia("(max-width: 40em)");

    // changing the backgroundImage src depend on screen width 
    if(media.matches){
        if(mode=="light"){
            document.body.style.backgroundImage="url('./images/bg-mobile-light.jpg')"
        }else{
            document.body.style.backgroundImage="url('./images/bg-mobile-dark.jpg')"
        }
    }else{
        if(mode=="light"){
            document.body.style.backgroundImage="url('./images/bg-desktop-light.jpg')"
        }else{
            document.body.style.backgroundImage="url('./images/bg-desktop-dark.jpg')"
        }
    }
    // some changes for phone users
    if(media.matches){
        // decrease the height of the "header & backgroundImage" for phone users
        let header = document.querySelector(".header");
        header.style.minHeight="15vh";
        document.body.style.backgroundSize="100vw 30vh";
    }
// End changing backgroundImage depend on reponsivity
// Start light/dark mode chnanes
    let send_picture = document.querySelector(".fa-paper-plane")
    let light_dark_modeButton =document.querySelector(".header__light-dark-modeButton");
    let light_dark_modeButton__img =document.querySelector(".header__light-dark-modeButton img");
    let root = document.documentElement;
    let [LT_veryLightGray,LT_white,LT_lightGraishBlue,LT_darkGraishBlue,LT_veryDarkGraishBlue]=
    [getComputedStyle(document.documentElement).getPropertyValue("--LT-veryLightGray"),
    getComputedStyle(document.documentElement).getPropertyValue("--LT-white"),
    getComputedStyle(document.documentElement).getPropertyValue("--LT-lightGraishBlue"),
    getComputedStyle(document.documentElement).getPropertyValue("--LT-darkGraishBlue","var(--DT-veryDarkGrayishBlue)"),
    getComputedStyle(document.documentElement).getPropertyValue("--LT-veryDarkGraishBlue","var(--DT-lightGrayishBlue)")]
    
    function darkModeTheme(){
        send_picture.style.color="white";

            localStorage.mode= "dark"

            light_dark_modeButton__img.setAttribute("src","./images/icon-sun.svg");
            if(media.matches){
                document.body.style.backgroundImage='url("./images/bg-mobile-dark.jpg")'
                
            }else{
                document.body.style.backgroundImage='url("./images/bg-desktop-dark.jpg")';
            }
            root.style.setProperty("--LT-veryLightGray","var(--DT-veryDarkBlue)");
            root.style.setProperty("--LT-white","var(--DT-vertDarDesaturatedBlue)");
            root.style.setProperty("--LT-lightGraishBlue","var(--DT-veryDarkGrayishBlue)");
            root.style.setProperty("--LT-darkGraishBlue","var(--DT-veryDarkGrayishBlue)");
            root.style.setProperty("--LT-veryDarkGraishBlue","var(--DT-lightGrayishBlue)");
    }
    function lightModeTheme(){
        send_picture.style.color="black";

            localStorage.mode= "light"

            light_dark_modeButton__img.setAttribute("src","./images/icon-moon.svg");
            if(media.matches){
                document.body.style.backgroundImage='url("./images/bg-mobile-light.jpg")'
            }else{
                document.body.style.backgroundImage='url("./images/bg-desktop-light.jpg")';
            }
            root.style.setProperty("--LT-veryLightGray",LT_veryLightGray);
            root.style.setProperty("--LT-white",LT_white);
            root.style.setProperty("--LT-lightGraishBlue",LT_lightGraishBlue);
            root.style.setProperty("--LT-darkGraishBlue",LT_darkGraishBlue);
            root.style.setProperty("--LT-veryDarkGraishBlue",LT_veryDarkGraishBlue);
    }
    light_dark_modeButton.addEventListener("click",function(){
        mode=="light"?mode="dark":mode="light";
        if(mode=="dark"){
            darkModeTheme()
        }else{
            lightModeTheme()
        }
    })
// End light / dark mode chnages
// Start "add task" button                 
//  remarque="it was easier to use template.content.cloneNode instead of creating custom js DOM but i wanna change the way this time"
    let form = document.querySelector(".createNewTask")
    let newTask= document.querySelector(".createNewTask__text");
    let ToDoList__managementBar = document.querySelector(".ToDoList__management-bar")
    
    function addNewTask(completed,textContent){
        let section = document.createElement("section");
        let div = document.createElement("div");
        let span = document.createElement("span");
        let ToDoList__task__check__button = document.createElement("button");
        let ToDoList__task__text__span = document.createElement("span");
        let ToDoList__task__deleteButton__button = document.createElement("button");
        let img = document.createElement("img");
        
        section.classList.add("ToDoList__task");
        section.setAttribute("draggable","true")
        
        div.classList.add("task-container","flex-space-between");
        section.appendChild(div);
        
        div.appendChild(span);
        span.classList.add("|","flex-space-between");
        span.classList.add("ToDoList__task__check-text")
        
        ToDoList__task__check__button.classList.add("ToDoList__task__check");
        if(completed)ToDoList__task__check__button.classList.add("ToDoList__task__check--clicked");
        span.appendChild(ToDoList__task__check__button);
        
        ToDoList__task__text__span.classList.add("ToDoList__task__text");
        span.appendChild(ToDoList__task__text__span);
        
        ToDoList__task__deleteButton__button.classList.add("ToDoList__task__deleteButton");
        span.after(ToDoList__task__deleteButton__button);
        
        img.setAttribute("src","./images/icon-cross.svg");
        img.setAttribute("alt","close button");
        ToDoList__task__deleteButton__button.appendChild(img)
       
        ToDoList__task__check__button.addEventListener("click",function(){
            this.classList.toggle("ToDoList__task__check--clicked")
            this.parentElement.querySelector(".ToDoList__task__text").classList.toggle("completed")
            updateItemsLeftNumber()
            taksListStorage()
        })

        let check = textContent || ""
    
        if(textContent){
            section.querySelector(".ToDoList__task__text").textContent=textContent;
            ToDoList__managementBar.before(section)          
        }else{
            section.querySelector(".ToDoList__task__text").textContent=newTask.value;
            ToDoList__managementBar.before(section)
            newTask.value="";
        }
    }
    
    form.addEventListener("submit",e=>{
        e.preventDefault();
            if(newTask.value!==""){
                addNewTask(false)
                removeTask()
                updateItemsLeftNumber()
                dragAndDrop()
                taksListStorage()
            }
        })
// End add task button 
// start remove task button
    function removeTask(){
        let removeTask = [...document.querySelectorAll(".ToDoList__task__deleteButton")];
        removeTask.forEach(deleteButton =>{
            deleteButton.addEventListener("click",function(){
                this.parentNode.parentNode.remove();
                updateItemsLeftNumber()
                taksListStorage()
            })
        })
    }
    setTimeout(removeTask,0)
// End remove task button

// Start number of items left
    function updateItemsLeftNumber(){
        let itemsLeftNumberAndOne = [...document.querySelectorAll(".ToDoList__task__check:not(.ToDoList__task__check--clicked)")]
        let itemsLeftNumber = itemsLeftNumberAndOne.length - 1;
        let itemsLeftDiv = document.querySelector(".itemsLeft__number");
        itemsLeftDiv.textContent=itemsLeftNumber;
    }
    setTimeout(updateItemsLeftNumber,0)
// End number of items left

// Start completed tasks
    // ToDoList__task__check--clicked;
    function selectCompleted(){
        let ToDoList__tasks__check = [...document.querySelectorAll(".ToDoList__task__check:not(.notActive)")];
        ToDoList__tasks__check.forEach(ToDoList__task__check =>{
            ToDoList__task__check.addEventListener("click",function(){
                this.classList.toggle("ToDoList__task__check--clicked")
                this.parentElement.querySelector(".ToDoList__task__text").classList.toggle("completed")
                updateItemsLeftNumber()
                taksListStorage()
            })
        })
    }
    selectCompleted();
// End completed tasks

// Start clear completed
    let clearCompleted = document.querySelector(".clearCompleted");
    clearCompleted.addEventListener("click",function(){
        let completedtasks = [...document.querySelectorAll(".ToDoList__task__check--clicked")];
        completedtasks.forEach(completedtask =>{
            completedtask.parentElement.parentElement.parentElement.remove();
        })
        taksListStorage()
    })
// End clear completed

// Start show all/active/completed tasks function
function allActiveCompleted(buttonmanagementClass,activeTasksDisplay,completedTasksDisplay){
    let allActiveCompleted_buttons = [...document.querySelectorAll(buttonmanagementClass)];
    allActiveCompleted_buttons.forEach(allActiveCompleted_button =>{
        allActiveCompleted_button.addEventListener("click",function(){
            let ToDoList__task__check_list = [...document.querySelectorAll(".main .ToDoList__task__check")];
            ToDoList__task__check_list.forEach(ToDoList__task__check => {
                ToDoList__task__check.parentElement.parentElement.parentElement.style.display=activeTasksDisplay;
            })
            let ToDoList__task__check__clicked_list = [...document.querySelectorAll(".main .ToDoList__task__check--clicked")];
            ToDoList__task__check__clicked_list.forEach(ToDoList__task__check__clicked=>{
                ToDoList__task__check__clicked.parentElement.parentElement.parentElement.style.display=completedTasksDisplay;
            })

            let ToDoList__management_bar__buttons = [...document.querySelectorAll(".ToDoList__management-bar__buttons")]
            ToDoList__management_bar__buttons.forEach(ToDoList__management_bar__button =>{
                ToDoList__management_bar__button.style.color="var(--LT-darkGraishBlue)"
            })
            allActiveCompleted_button.style.color="var(--c-brightBlue)";  
        })
    })
}
// End show all/active/completed tasks funciton

// Start show only completed 
    allActiveCompleted(".completed-button","none","block");
// End show only completed 

// Start show only active
    allActiveCompleted(".active-button","block","none");
// End show only active

// Start show all 
    allActiveCompleted(".all-button","block","block");
// End show all 

// start drag and drop script
function dragAndDrop(){
    if(isTouchEnabled()){
        let draggables = [...document.querySelectorAll(".main > *:not(:last-child)")];
        let containerItems = [...document.querySelectorAll(".main > *:not(:last-child)")];
        draggables.forEach(draggable => {
            let touchHold;
            draggable.addEventListener("touchstart",function(e){
                touchHold="true"
                draggable.addEventListener("touchend",function(){
                    touchHold= false;
                    draggable.classList.remove("draggable");
                    containerItems.forEach(containerItem =>{
                        containerItem.removeEventListener("touchmove",rankOnTheList)
                    })
                })
                function rankOnTheList(e){
                    e.preventDefault()
                    let cursorY = e.targetTouches[0].clientY;
                    if(afterElement(cursorY)===undefined){
                        document.querySelector(".main > *:last-child").before(document.querySelector(".draggable"));
                    }else{
                        afterElement(cursorY).before(document.querySelector(".draggable"))
                    }
                    taksListStorage()
                }
                setTimeout(function(){
                    if(touchHold!==false){
                        draggable.classList.add("draggable")
                        containerItems.forEach(containerItem =>{
                            containerItem.addEventListener("touchmove",rankOnTheList)
                        })
                    }
                },1000)
            })
        })

    }else{

        let draggables = [...document.querySelectorAll(".main > *:not(:last-child)")];
        draggables.forEach(draggable => {
            draggable.addEventListener("dragstart",function(){
                draggable.classList.add("draggable")
            })
            draggable.addEventListener("dragend",function(){
                draggable.classList.remove("draggable")
            })
        })
        let container = document.querySelector(".main");
        container.addEventListener("dragover",e => {
            if(!container.querySelector(".draggable"))return/* So that this function run only when we drag some todolist_task (neasted in the main block) not something else*/
            e.preventDefault();
            let cursorY = e.clientY;
            if(afterElement(cursorY)===undefined){
                document.querySelector(".main > *:last-child").before(document.querySelector(".draggable"));
            }else{
                afterElement(cursorY).before(document.querySelector(".draggable"))
            }
            taksListStorage()
        })
        function afterElement(cursorY){
            let containerItems = [...document.querySelectorAll(".main > :not(:last-child):not(.draggable)")];
            let result = containerItems.reduce((nearest,item)=>{
                let containerItemBox = item.getBoundingClientRect();
                let  distanceBetweenBoxAndCurosr = containerItemBox.top + (containerItemBox.height / 2) - cursorY;
                if(nearest.offset > distanceBetweenBoxAndCurosr && distanceBetweenBoxAndCurosr > 0){
                    return {offset: distanceBetweenBoxAndCurosr,item: item}
                }else{
                    return nearest
                }
            },{offset: 9999999999999999999999})
            return result.item;
        }
    }

    // function to return the element that will drop before it the element draggable
    function afterElement(cursorY){
        let containerItems = [...document.querySelectorAll(".main > :not(:last-child):not(.draggable)")];
        let result = containerItems.reduce((nearest,item)=>{
            let containerItemBox = item.getBoundingClientRect();
            let  distanceBetweenBoxAndCurosr = containerItemBox.top + (containerItemBox.height / 2) - cursorY;
            if(nearest.offset > distanceBetweenBoxAndCurosr && distanceBetweenBoxAndCurosr > 0){
                return {offset: distanceBetweenBoxAndCurosr,item: item}
            }else{
                return nearest
            }
        },{offset: 9999999999999999999999})
        return result.item;
    }
    // function to test if the screen touchable or not
    function isTouchEnabled() {
        return ( 'ontouchstart' in window ) ||
               ( navigator.maxTouchPoints > 0 ) ||
               ( navigator.msMaxTouchPoints > 0 );
    }
}
setTimeout(dragAndDrop,0)
// End drag and drop script 

// Start local storage script
// light/dark mode local Storage
if(localStorage.mode){
    mode = localStorage.mode;
    mode=="light"?lightModeTheme():darkModeTheme();
}
// End local storage script 
// start tasks local Storage
function taksListStorage(){
    let container = [...document.querySelectorAll(".main > *:not(:last-child)")]
    let tasks ={}
    for(let i=0;i<container.length;i++){
        let completed=container[i].querySelector(".ToDoList__task__check--clicked")?true:false;
        let text= container[i].querySelector(".ToDoList__task__text").textContent;
        tasks[i]=[completed,text]
    }
    localStorage.tasksList = JSON.stringify(tasks)
}

if(localStorage.tasksList){
    let mainContent = [...document.querySelectorAll(".main > *:not(:last-child)")]
    mainContent.forEach(contentItem =>{
        contentItem.remove();
    })
    let result= JSON.parse(localStorage.tasksList)
    for (let i=0;i< Object.keys(result).length;i++){
        addNewTask(result[i][0],result[i][1])
    }
}
// End tasks local Storage

// start on click the x button to exit the page

// function saveOrDeleteData(){
//     Swal.fire({
//         title: 'Do you want to save the changes?',
//         showDenyButton: true,
//         showCancelButton: true,
//         confirmButtonText: 'Save',
//         denyButtonText: `Don't save`,
//       }).then((result) => {
//         /* Read more about isConfirmed, isDenied below */
//         if (result.isConfirmed) {
//           Swal.fire('Saved!', '', 'success')
//         } else if (result.isDenied) {
//           Swal.fire('Changes are not saved', '', 'info')
//         }
//       })
// }

// window.onbeforeunload = function() {
//     saveOrDeleteData()
//     return "d"
// }
// function myfun(){
//     // Write your business logic here
//     alert ("do you wanna save your changes or not bro")
//     console.log('hello');
// }
// window.onbeforeunload = function(){
//     return "Your Data will be saved";
//   };
// window.onbeforeunload = function () {
//     return 'please save your setting before leaving the page';
// }

// End on click the x button to exit the page
// delete localStorage.tasksList