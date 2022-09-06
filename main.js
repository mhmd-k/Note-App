const addLogo = document.querySelector(".add");
const container = document.querySelector(".container");
const addNotBtn = document.querySelector(".full .input button");
let storageArr = [];
// creat new note function
function creatNote(noteTitle, noteDescription, noteDate) {
  if (noteTitle === "") {
    return;
  } else if (noteDescription === "") {
    return;
  } else {
    let notes = Array.from(
      document.querySelectorAll(".container .note h3")
    ).filter((e) => e.innerText === noteTitle);
    if (notes.length === 0) {
      let box = document.createElement("div");
      box.classList.add("note");
      let title = document.createElement("h3");
      title.innerText = noteTitle;
      let para = document.createElement("p");
      para.innerText = noteDescription;
      let hr = document.createElement("hr");
      let footer = document.createElement("div");
      footer.classList.add("note-footer");
      let date = document.createElement("div");
      date.classList.add("date");
      date.innerText = noteDate;
      let del = document.createElement("button");
      del.innerText = "Delete";
      del.id = "delete";
      footer.append(date, del);
      box.append(title, para, hr, footer);
      document.querySelector(".container").append(box);
      document.querySelector(".full").classList.remove("clicked");
      saveData(noteTitle, noteDescription, noteDate);
      document.querySelector(".full .input input").value = "";
      document.querySelector(".full .input textarea").value = "";
      del.addEventListener("click", () => {
        storageArr.forEach((e) => {
          if (
            e.title.toLowerCase().split(" ").join("") ===
            title.innerText.toString().toLowerCase().split(" ").join("")
          ) {
            e.completed = true;
            box.remove();
            console.log(storageArr);
            localStorage.setItem("notes", JSON.stringify(storageArr));
          }
        });
      });
    }
  }
}
// save data to localstorage function
function saveData(t, d, da) {
  let obj = {
    id: new Date().getTime(),
    title: t,
    description: d,
    date: da,
    completed: false,
  };
  storageArr.push(obj);
  localStorage.setItem("notes", JSON.stringify(storageArr));
}

addLogo.addEventListener("click", () => {
  document.querySelector(".full").classList.add("clicked");
  document.querySelector(".full .input input").focus();
});

addNotBtn.addEventListener("click", () => {
  let d = new Date();
  creatNote(
    document.querySelector(".full .input input").value,
    document.querySelector(".full .input textarea").value,
    `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`
  );
});

document.querySelector("span.close").addEventListener("click", () => {
  document.querySelector(".full").classList.remove("clicked");
});

if (window.localStorage.getItem("notes") !== "") {
  let notes = JSON.parse(localStorage.getItem("notes"));
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].completed === false) {
      creatNote(notes[i].title, notes[i].description, notes[i].date);
    }
  }
}
