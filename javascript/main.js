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
        // decrease the width of the backgroundImage height
        let header = document.querySelector(".header");
        header.style.minHeight="15vh";
        document.body.style.backgroundSize="100vw 30vh";
        
        // display the remove__task button for phones devices
        let deleteTaskButton = [...document.querySelectorAll(".ToDoList__task__deleteButton")];
        // deleteTaskButton.style.display= "inline-flex";
        // console.log(deleteTaskButton)
        deleteTaskButton
    }
    // End changing backgroundImage depend on reponsivity
    // Start light / dark mode chnages
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
    
    light_dark_modeButton.addEventListener("click",function(){
        mode=="light"?mode="dark":mode="light";
        if(mode=="dark"){
            send_picture.style.color="white";

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
            
        }else{
            send_picture.style.color="black";

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
    })
// End light / dark mode chnages
// Start add task button 
    let form = document.querySelector(".createNewTask")
    let newTask= document.querySelector(".createNewTask__text");
    let ToDoList__managementBar = document.querySelector(".ToDoList__management-bar")
    // let newTask_template = document.querySelector("#ToDoList__task")
    // function addNewTask(){
    //     let newTask_template_content= newTask_template.content.cloneNode(true);
    //     newTask_template_content.querySelector(".ToDoList__task__text").textContent=newTask.value;
    //     ToDoList__managementBar.before(newTask_template_content)
    //     newTask.value=""
    // }
    function addNewTask(){
        let section = document.createElement("section");
        section.classList.add("ToDoList__task");
        let div = document.createElement("div");
        div.classList.add("task-container","flex-space-between");
        section.appendChild(div);
        let span = document.createElement("span");
        span.classList.add("ToDoList__task__check-text","flex-space-between");
        div.appendChild(span);
        let ToDoList__task__check__button = document.createElement("button");
        ToDoList__task__check__button.classList.add("ToDoList__task__check");
        span.appendChild(ToDoList__task__check__button);
        let ToDoList__task__text__span = document.createElement("span");
        ToDoList__task__text__span.classList.add("ToDoList__task__text");
        span.appendChild(ToDoList__task__text__span);
        let ToDoList__task__deleteButton__button = document.createElement("button");
        ToDoList__task__deleteButton__button.classList.add("ToDoList__task__deleteButton");
        span.after(ToDoList__task__deleteButton__button);
        let img = document.createElement("img");
        img.setAttribute("src","./images/icon-cross.svg");
        img.setAttribute("alt","close button");
        ToDoList__task__deleteButton__button.appendChild(img)


        ToDoList__task__check__button.addEventListener("click",function(){
            this.classList.toggle("ToDoList__task__check--clicked")
            this.parentElement.querySelector(".ToDoList__task__text").classList.toggle("completed")
            updateItemsLeftNumber()
        })

        section.querySelector(".ToDoList__task__text").textContent=newTask.value;
        ToDoList__managementBar.before(section)
        newTask.value=""
    }
    form.addEventListener("submit",e=>{
        e.preventDefault();
        addNewTask()
        removeTask()
        updateItemsLeftNumber()
    })
// End add task button 
// start remove task button
    function removeTask(){
        let removeTask = [...document.querySelectorAll(".ToDoList__task__deleteButton")];
        removeTask.forEach(deleteButton =>{
            deleteButton.addEventListener("click",function(){
                this.parentNode.parentNode.remove();
                updateItemsLeftNumber()
            })
        })
    }
    removeTask()
// End remove task button

// Start number of items left
    function updateItemsLeftNumber(){
        let itemsLeftNumberAndOne = [...document.querySelectorAll(".ToDoList__task__check:not(.ToDoList__task__check--clicked)")]
        let itemsLeftNumber = itemsLeftNumberAndOne.length - 1;
        let itemsLeftDiv = document.querySelector(".itemsLeft__number");
        itemsLeftDiv.textContent=itemsLeftNumber;
    }
    updateItemsLeftNumber()
// End number of items left

// Start completed tasks
    // ToDoList__task__check--clicked;
    function selectCompleted(){
        let ToDoList__tasks__check = [...document.querySelectorAll(".ToDoList__task__check")];
        ToDoList__tasks__check.forEach(ToDoList__task__check =>{
            ToDoList__task__check.addEventListener("click",function(){
                this.classList.toggle("ToDoList__task__check--clicked")
                this.parentElement.querySelector(".ToDoList__task__text").classList.toggle("completed")
                updateItemsLeftNumber()
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
    })
// End clear completed

// Start show only completed
    let completed_buttons = [...document.querySelectorAll(".completed-button")];
    completed_buttons.forEach(completed_button =>{
        completed_button.addEventListener("click",function(){
            let ToDoList__task__check_list = [...document.querySelectorAll(".main .ToDoList__task__check")];
            ToDoList__task__check_list.forEach(ToDoList__task__check => {
                ToDoList__task__check.parentElement.parentElement.parentElement.style.display="none";
            })
            let ToDoList__task__check__clicked_list = [...document.querySelectorAll(".main .ToDoList__task__check--clicked")];
            ToDoList__task__check__clicked_list.forEach(ToDoList__task__check__clicked=>{
                ToDoList__task__check__clicked.parentElement.parentElement.parentElement.style.display="block";
            })

            let ToDoList__management_bar__buttons = [...document.querySelectorAll(".ToDoList__management-bar__buttons")]
            ToDoList__management_bar__buttons.forEach(ToDoList__management_bar__button =>{
                ToDoList__management_bar__button.style.color="var(--LT-darkGraishBlue)"
            })
            completed_button.style.color="var(--c-brightBlue)";  
        })
    })
// End show only completed

// Start show only active
    let active_buttons = [...document.querySelectorAll(".active-button")];
    active_buttons.forEach(active_button =>{
        active_button.addEventListener("click",function(){
            let ToDoList__task__check_list = [...document.querySelectorAll(".main .ToDoList__task__check")];
            ToDoList__task__check_list.forEach(ToDoList__task__check => {
                ToDoList__task__check.parentElement.parentElement.parentElement.style.display="block";
            })
            let ToDoList__task__check__clicked_list = [...document.querySelectorAll(".main .ToDoList__task__check--clicked")];
            ToDoList__task__check__clicked_list.forEach(ToDoList__task__check__clicked=>{
                ToDoList__task__check__clicked.parentElement.parentElement.parentElement.style.display="none";
            })

            let ToDoList__management_bar__buttons = [...document.querySelectorAll(".ToDoList__management-bar__buttons")]
            ToDoList__management_bar__buttons.forEach(ToDoList__management_bar__button =>{
                ToDoList__management_bar__button.style.color="var(--LT-darkGraishBlue)"
            })
            active_button.style.color="var(--c-brightBlue)";  
        })
    })
// End show only active

// Start show all 
    let all_buttons = [...document.querySelectorAll(".all-button")];
    all_buttons.forEach(all_button =>{
        all_button.addEventListener("click",function(){
            let ToDoList__task__check_list = [...document.querySelectorAll(".main .ToDoList__task__check")];
            ToDoList__task__check_list.forEach(ToDoList__task__check => {
                ToDoList__task__check.parentElement.parentElement.parentElement.style.display="block";
            })
            
            let ToDoList__management_bar__buttons = [...document.querySelectorAll(".ToDoList__management-bar__buttons")]
            ToDoList__management_bar__buttons.forEach(ToDoList__management_bar__button =>{
                ToDoList__management_bar__button.style.color="var(--LT-darkGraishBlue)"
            })
            all_button.style.color="var(--c-brightBlue)";  
        })
    })
// End show all 