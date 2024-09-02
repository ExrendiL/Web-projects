const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You should write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute('contenteditable', 'true'); 

       if (listContainer.firstChild) {
        listContainer.insertBefore(li, listContainer.firstChild);
        } 
        else {
        listContainer.appendChild(li);
        }

        let span = document.createElement("span"); 
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // span.onclick = function() {
        //     li.remove();
        //     saveData();
        // };  
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
       e.target.parentElement.remove();
       saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    let listItems = listContainer.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].setAttribute('contenteditable', 'true');
        listItems[i].onblur = function() { 
            saveData();
        };
    }
}
showTask();