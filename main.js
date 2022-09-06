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
      let title = document.createElement("input");
      title.setAttribute("readonly", true);
      title.setAttribute("value", noteTitle);
      let para = document.createElement("textarea");
      para.setAttribute("readonly", true);
      para.value = noteDescription;
      let hr = document.createElement("hr");
      let footer = document.createElement("div");
      footer.classList.add("note-footer");
      let date = document.createElement("div");
      date.classList.add("date");
      date.innerText = noteDate;
      let edit = document.createElement("button");
      edit.innerText = "Edit";
      edit.id = "edit";
      let del = document.createElement("button");
      del.innerText = "Delete";
      del.id = "delete";
      footer.append(date, edit, del);
      box.append(title, para, hr, footer);
      document.querySelector(".container").append(box);
      document.querySelector(".full").classList.remove("clicked");
      saveData(noteTitle, noteDescription, noteDate);
      document.querySelector(".full .input input").value = "";
      document.querySelector(".full .input textarea").value = "";
      // delete button
      del.addEventListener("click", () => {
        storageArr.forEach((e) => {
          if (
            e.title.toLowerCase().split(" ").join("") ===
            title.value.toString().toLowerCase().split(" ").join("")
          ) {
            e.completed = true;
            box.remove();
            localStorage.setItem("notes", JSON.stringify(storageArr));
          }
        });
      });
      // edit button
      edit.addEventListener("click", () => {
        editNote(edit, title, para);
      });
    }
  }
}
// edit btn functino
function editNote(editbtn, title, para) {
  editButtons = document.querySelectorAll("#edit");
  if (editbtn.innerText === "Edit") {
    editbtn.innerText = "Done";
    title.focus();
    editButtons.forEach((eb) => {
      if (eb !== editbtn) eb.style.setProperty("pointer-events", "none");
    });
    Array.from(storageArr).forEach((e) => {
      if (
        e.title.toLowerCase().split(" ").join("") ===
          title.value.toString().toLowerCase().split(" ").join("") &&
        e.description.toLowerCase().split(" ").join("") ===
          para.value.toString().toLowerCase().split(" ").join("")
      ) {
        e.completed = true;
        title.removeAttribute("readonly");
        para.removeAttribute("readonly");
      }
    });
  } else {
    editbtn.innerText = "Edit";
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
    saveData(
      title.value,
      para.value,
      `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} at ${hour}:${minut}`
    );
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
  let hour = d.getHours();
  let minut = d.getMinutes();
  if (parseInt(hour) < 10) {
    hour = `0${hour}`;
  }
  if (parseInt(minut) < 10) {
    minut = `0${minut}`;
  }
  creatNote(
    document.querySelector(".full .input input").value,
    document.querySelector(".full .input textarea").value,
    `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} at ${hour}:${minut}`
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

console.log(JSON.parse(localStorage.getItem("notes")));
