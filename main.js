const addBtn = document.querySelector("#addBtn");
const userInput = document.querySelector("#addTxt");
const notesDiv = document.querySelector("#notes");
const search = document.querySelector("#search");

addBtn.addEventListener("click", addNote);
search.addEventListener("input", searchNote);

showNotes();

function addNote(e) {
  // store to local storage
  let userText = userInput.value.toLowerCase();
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(userText);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  userInput.value = "";
  showNotes();
}

function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  // get data frome local storage and put into UI.
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick ="deleteItems(this.id)" class="btn btn-primary">Delete Note</button>
              </div>
            </div> `;
  });

  if (notesObj.length != 0) {
    notesDiv.innerHTML = html;
  } else {
    notesDiv.innerHTML = "No notes added!";
  }
}

// delete function
function deleteItems(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// search note function
function searchNote() {
  let inputVal = search.value.toLowerCase();

  let noteCard = document.getElementsByClassName("noteCard");

  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}
