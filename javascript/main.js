// Start changing backgroundImage depend on reponsivity
    let mode ="light"
    let media= window.matchMedia("(max-width: 40em)");

    if(media.matches){
        if(mode=="light"){
            console.log("kbir")
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
// End changing backgroundImage depend on reponsivity
// Start light / dark mode chnages
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
    
    
    