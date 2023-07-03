const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const toDoList = JSON.parse(localStorage.getItem("toDoList"));

if(toDoList) {
    toDoList.forEach(toDo => {
        addToDo(toDo);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(input.value);
    addToDo();
});

// TODOリストを作成する関数
function addToDo(toDo) {
    let toDoText = input.value;
    // すでにtodoを登録している場合、
    if (toDo) {
        toDoText = toDo;
    }

    // 暗黙的型変換で真偽値の条件は入れなくても良い
    if(toDoText) {
        const li = document.createElement("li");
        li.innerText = toDoText;
        li.classList.add("list-group-item");

        li.addEventListener("contextmenu", function(event) {
            event.preventDefault();
            li.remove();
            saveDate();
        });

        li.addEventListener("click", function() {
            li.classList.toggle("text-decoration-line-through");
        })

        ul.appendChild(li);
        // TODOリストを作ったら、登録フォームの文字を空にする
        input.value = "";
        savaDate();
    }

    // ローカルストレージにデータを保存するための関数
function savaDate() {
    // フォームに入力したデータを配列に格納する
    const lists = document.querySelectorAll("li");
    let toDoList = [];
    lists.forEach(list => {
        toDoList.push(list.innerText);
    });
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
}