const createBtn = document.querySelector(".create-btn");
const notesList = document.querySelector(".main__container");
let arrayOfNotes = [];

createBtn.addEventListener("click", addNote);

notesList.addEventListener("click", onNoteBtn);

const notes = localStorage.getItem("notes");
if (notes) {
  arrayOfNotes = JSON.parse(notes);
  arrayOfNotes.forEach((note) => renderNote(note));
}

function onNoteBtn(event) {
  const target = event.target;
  const targetId = target.id;
  if (!(targetId === "js-edit-btn" || targetId === "js-delete-btn")) return;
  if (targetId === "js-edit-btn") {
    editNote(target);
  } else {
    deleteNote(target);
  }
}

function addNote() {
  const id = Date.now();
  const newNote = {
    id,
    title: "Title",
    description: "Your note",
  };

  arrayOfNotes.push(newNote);
  saveToLocalStorage();
  renderNote(newNote);
}

function deleteNote(target) {
  const parentNode = getClosestNote(target);
  const parentNodeId = parentNode.id;
  parentNode.remove();

  arrayOfNotes = arrayOfNotes.filter(({ id }) => id !== Number(parentNodeId));
  saveToLocalStorage();
}

function editNote(target) {
  const id = getClosestNote(target).id;
  const noteTitleParagraph = document.querySelector(
    `.note[id="${id}"] .note__title`
  );
  const noteTitleTextarea = document.querySelector(
    `.note[id="${id}"] .note__title_text`
  );
  const noteBodyParagraph = document.querySelector(
    `.note[id="${id}"] .note__main-text`
  );
  const noteBodyTextarea = document.querySelector(
    `.note[id="${id}"] .note__main-text_text`
  );

  toggleHidden(noteTitleParagraph);
  toggleHidden(noteTitleTextarea);
  toggleHidden(noteBodyParagraph);
  toggleHidden(noteBodyTextarea);
}

function renderNote({ id }) {
  const markup = `<div class="note" id="${id}">
            <div class="note__header-thumb">
              <p class="note__title">Title</p>
              <textarea
                name=""
                class="note__title_text hidden"
                placeholder="Title"
              ></textarea>
              <ul class="note__btn-list">
                <li class="note__btn-list-item">
                  <button class="note__btn note__btn_edit" id="js-edit-btn">
                    <svg class="note__icon note__icon_edit" id="js-edit-btn">
                      <use
                        href="./svg/symbol-defs.svg#icon-edit"
                        id="js-edit-btn"
                      ></use>
                    </svg>
                  </button>
                </li>
                <li class="note__btn-list-item">
                  <button class="note__btn note__btn_delete" id="js-delete-btn">
                    <svg
                      class="note__icon note__icon_delete"
                      id="js-delete-btn"
                    >
                      <use
                        href="./svg/symbol-defs.svg#icon-delete"
                        id="js-delete-btn"
                      ></use>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <p class="note__main-text">Your note</p>
            <textarea
              name=""
              class="note__main-text_text hidden"
              placeholder="Your note"
            ></textarea>
          </div>`;

  createBtn.insertAdjacentHTML("beforebegin", markup);
}

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
}

function getClosestNote(target) {
  return target.closest(".note");
}

function toggleHidden(elem) {
  elem.classList.toggle("hidden");
}
