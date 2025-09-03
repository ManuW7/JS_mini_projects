const create_button = document.querySelector(".create_note_button");
const notes_div = document.querySelector(".notes_container_div");
const edit_template = document.getElementById("edit_note_template");
const done_note_template = document.getElementById("done_note_template");

let note_counter = 0;

function create_unique_id(prefix) {
  return `${prefix}_${note_counter++}`;
}

create_button.addEventListener("click", function () {
  const new_note = edit_template.content.cloneNode(true);
  notes_div.append(new_note);

  const form = notes_div.querySelector("form:last-of-type");
  setup_handler(form);
});

function setup_handler(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const new_done_note = done_note_template.content.cloneNode(true);

    const note_name = new_done_note.querySelector(".note_name");
    note_name.textContent = form.querySelector(".note_name").value;

    const note_description = new_done_note.querySelector(".note_description");
    note_description.textContent = form.querySelector(".note_text").value;

    const note_deadline = new_done_note.querySelector(".note_deadline");
    note_deadline.textContent = form.querySelector(".note_deadline").value;

    const label = new_done_note.querySelector(".done_label");
    const checkbox = new_done_note.querySelector(".done_checkbox");
    const uniqueId = create_unique_id("done");
    label.setAttribute("for", uniqueId);
    checkbox.setAttribute("id", uniqueId);

    form.replaceWith(new_done_note);
    saveToLocalStorage();
  });
}
notes_div.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete_btn")) {
    const note = event.target.closest(".note");
    if (note) {
      note.remove();
      saveToLocalStorage();
    }
  }

  if (event.target.classList.contains("edit_btn")) {
    const note = event.target.closest(".note");
    if (note) {
      const new_note = edit_template.content.cloneNode(true);
      note.before(new_note);

      const form = notes_div.querySelector("form:last-of-type");
      form.querySelector(".note_name").value =
        note.querySelector(".note_name").textContent;
      form.querySelector(".note_text").value =
        note.querySelector(".note_description").textContent;
      form.querySelector(".note_deadline").value =
        note.querySelector(".note_deadline").textContent;
      setup_handler(form);
      note.remove();
      saveToLocalStorage();
    }
  }
});

notes_div.addEventListener("change", function (event) {
  if (
    event.target.type === "checkbox" &&
    event.target.classList.contains("done_checkbox")
  ) {
    const note = event.target.closest(".note");
    if (note) {
      toggleNoteCompletion(note, event.target.checked);
      saveToLocalStorage();
    }
  }
});

function toggleNoteCompletion(noteElement, isCompleted) {
  if (isCompleted) {
    noteElement.classList.add("task_done");
  } else {
    noteElement.classList.remove("task_done");
  }
}

function saveToLocalStorage() {
  const notes = [];
  document.querySelectorAll(".note.done").forEach(function (item) {
    notes.push({
      name: item.querySelector(".note_name").textContent,
      text: item.querySelector(".note_description").textContent,
      date: item.querySelector(".note_deadline").textContent,
      completed: item.classList.contains("task_done"),
    });
  });
  localStorage.setItem("saved_notes", JSON.stringify(notes));
}

function loadFromLocalStorage() {
  const saved_notes = JSON.parse(localStorage.getItem("saved_notes")) || [];

  saved_notes.forEach(function (item) {
    const new_done_note = done_note_template.content.cloneNode(true);

    new_done_note.querySelector(".note_name").textContent = item.name;
    new_done_note.querySelector(".note_description").textContent = item.text;
    new_done_note.querySelector(".note_deadline").textContent = item.date;

    const checkbox = new_done_note.querySelector(".done_checkbox");
    const label = new_done_note.querySelector(".done_label");
    const uniqueId = create_unique_id("done");

    label.setAttribute("for", uniqueId);
    checkbox.setAttribute("id", uniqueId);

    if (item.completed) {
      checkbox.checked = true;
      const noteElement = new_done_note.querySelector(".note");
      noteElement.classList.add("task_done");
    }

    notes_div.appendChild(new_done_note);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
});
