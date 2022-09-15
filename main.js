const addLogo = document.querySelector(".add");
const container = document.querySelector(".container");
const addNotBtn = document.querySelector(".full .input button");
const titleInput = document.querySelector('.full .input input[name="title"]');
const descreptionArea = document.querySelector(
  '.full .input textarea[name="description"]'
);
let storageArr = [];
let colors = [
  "#f44336",
  "#e91e63",
  "#673ab7",
  "#2196f3",
  "#8bc34a",
  "#ffc107",
  "#cbbb2c",
  "#607d8b",
  "#ff5722",
  "#4caf50",
];
let noteId = 1;
// creat new note function
function creatNote(noteTitle, noteDescription, noteDate) {
  if (noteTitle === "") {
    titleInput.style.setProperty("border", `red 1px solid`);
    titleInput.focus();
    return;
  } else if (noteDescription === "") {
    descreptionArea.style.setProperty("border", `red 1px solid`);
    descreptionArea.focus();
    return;
  } else {
    let notes = Array.from(
      document.querySelectorAll(".container .note h3")
    ).filter((e) => e.innerText === noteTitle);
    if (notes.length === 0) {
      let box = document.createElement("div");
      box.classList.add("note");
      let random = Math.floor(Math.random() * colors.length);
      box.style.setProperty("background-color", `${colors[random]}`);
      let tinput = document.createElement("input");
      tinput.setAttribute("readonly", true);
      tinput.setAttribute("value", noteTitle);
      let para = document.createElement("textarea");
      para.setAttribute("readonly", true);
      para.value = noteDescription;
      let hr = document.createElement("hr");
      let footer = document.createElement("div");
      footer.classList.add("note-footer");
      let date = document.createElement("div");
      date.classList.add("date");
      date.innerText = noteDate;
      let optoins = document.createElement("div");
      optoins.classList.add("options");
      optoins.innerText = "...";
      let edit = document.createElement("button");
      edit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Edit';
      edit.style.setProperty("background-color", `${colors[random]}`);
      edit.id = "edit";
      let del = document.createElement("button");
      del.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i> Delete';
      del.style.setProperty("background-color", `${colors[random]}`);
      del.id = "delete";
      optoins.append(edit, del);
      footer.append(date, optoins);
      box.append(tinput, para, hr, footer);
      document.querySelector(".container").append(box);
      document.querySelector(".full").classList.remove("clicked");
      // push to localstorage
      let obj = {
        id: noteId,
        title: noteTitle,
        description: noteDescription,
        date: noteDate,
        completed: false,
      };
      noteId++;
      storageArr.push(obj);
      localStorage.setItem("notes", JSON.stringify(storageArr));
      // end of push to localstorage
      box.setAttribute("data-id", `${obj.id}`);
      document.querySelector(".full .input input").value = "";
      document.querySelector(".full .input textarea").value = "";
      // options click
      optoins.addEventListener("click", (e) => {
        e.stopPropagation();
        del.classList.toggle("visible");
        edit.classList.toggle("visible");
      });
      document.addEventListener("click", () => {
        del.classList.remove("visible");
        edit.classList.remove("visible");
      });
      // delete button
      del.addEventListener("click", () => {
        storageArr.forEach((e) => {
          if (e.id === parseInt(box.getAttribute("data-id"))) {
            e.completed = true;
            box.remove();
            localStorage.setItem("notes", JSON.stringify(storageArr));
          }
        });
      });
      // edit button
      edit.addEventListener("click", () => {
        editNote(edit, tinput, para, parseInt(box.getAttribute("data-id")));
      });
    }
  }
}
// edit btn functino
function editNote(editbtn, title, para, eleId) {
  editButtons = document.querySelectorAll("#edit");
  if (editbtn.innerText === "Edit") {
    editbtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Done';
    title.focus();
    title.parentElement.style.setProperty("border", "1px solid white");
    editButtons.forEach((eb) => {
      if (eb !== editbtn) eb.style.setProperty("pointer-events", "none");
    });
    title.removeAttribute("readonly");
    para.removeAttribute("readonly");
  } else {
    editbtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Edit';
    title.parentElement.style.setProperty("border", "0");
    editButtons.forEach((eb) => {
      eb.style.setProperty("pointer-events", "visible");
    });
    title.setAttribute("readonly", true);
    para.setAttribute("readonly", true);
    let d = new Date();
    let hour = d.getHours();
    let minut = d.getMinutes();
    if (parseInt(hour) < 10) {
      hour = `0${hour}`;
    }
    if (parseInt(minut) < 10) {
      minut = `0${minut}`;
    }
    Array.from(storageArr).forEach((e) => {
      if (e.id === eleId) {
        e.title = title.value;
        e.description = para.value;
        localStorage.setItem("notes", JSON.stringify(storageArr));
      }
    });
  }
}

addLogo.addEventListener("click", () => {
  document.querySelector(".full").classList.add("clicked");
  document.querySelector(".full .input input").focus();
});

addNotBtn.addEventListener("click", () => {
  let d = new Date();
  let hour = d.getHours();
  let minut = d.getMinutes();
  if (parseInt(hour) < 10) {
    hour = `0${hour}`;
  }
  if (parseInt(minut) < 10) {
    minut = `0${minut}`;
  }
  creatNote(
    titleInput.value,
    descreptionArea.value,
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} at ${hour}:${minut}`
  );
});

titleInput.addEventListener("input", () => {
  titleInput.style.setProperty("border", "none");
});
descreptionArea.addEventListener("input", () => {
  descreptionArea.style.setProperty("border", "none");
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
