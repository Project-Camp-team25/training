// 할 일 목록 만들기 

// 내가 생각한 프로세스 
// input칸에 입력 -> 추가 버튼을 누르면 입력한 목록값이 <ul>안에 <li>생성 ->
// 목록값에 삭제버튼도 같이 생긴다. -> 삭제버튼을 누르면 <li>가 사라진다.

// 각 id별 변수 설정 
const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const list = document.querySelector(".form-list");

// form에서 "submit" 하면 입력한 값을 받아 addTask함수 실행 
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(input.value);
    const task = input.value
    addTask(task);
})

function addTask(task){
    const taskItem = document.createElement("li");
    // createElement로 li 태그 생성 
    taskItem.classList.add("task-item");
    // taskItem의 li 태그에 클래스명 추가
    taskItem.textContent = task;
    // li 태그에 task값 입력
    list.appendChild(taskItem);
    // taskItem값을 list안의 자식으로 추가 

    const deletebutton = document.createElement("button");
    // button 태그 생성
    deletebutton.textContent = "삭제";
    // button안에 "삭제" 입력
    taskItem.appendChild(deletebutton);
    // taskItem안의 자식 부분에 deletebutton 추가 
}

list.addEventListener("click", (e)=>{
    if(e.target.tagName === "BUTTON"){
        deleteTask(e.target.parentElement);
    };
})

function deleteTask(taskItem){
    list.removeChild(taskItem);
}

