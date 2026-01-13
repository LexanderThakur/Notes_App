console.log("connected");

let csrftoken = document.getElementById("csrf-token").value;
let notes = [];
async function saveNote() {
  let note = document.getElementsByClassName("notes_input")[0].value;

  try {
    let response = await fetch("/notes/save/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        note: note,
      }),
    });
    console.log(response.text());

    // let result = await response.json();
    // console.log("result");
  } catch (err) {
    alert(err || "Network error");
  }
}

async function render_notes() {
  try {
    let response = await fetch("/notes/get_notes/", {
      method: "GET",
      headers: {
        "X-CSRFToken": csrftoken,
      },
    });

    let result = await response.json();
    notes = result["notes"];
    console.log(notes);
  } catch (err) {
    alert(err || "network err");
  }
  document.querySelector(".read_tab").style.display = "flex";
  render();
}
function render() {
  let list = document.querySelector(".list-group");

  let str = ``;
  notes.forEach((i) => {
    str += `
      <li class="list-group-item note" data-id="${i.id}" onclick="display_note(${i.id})">${i["created_at"]}</li>
      
      `;
  });
  list.innerHTML = str;
}

function drop_down() {
  let box = document.querySelector(".create_tab");

  box.classList.add("animate");
  box.addEventListener(
    "animationend",
    () => {
      box.classList.remove("animate");
      box.style.display = "none";
      render_notes();
    },
    { once: true }
  );
}

function display_note(note_id) {
  let content = ``;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == note_id) {
      content = notes[i].content;
    }
    document
      .querySelector(`[data-id="${notes[i].id}"]`)
      .classList.remove("note-active");
  }

  let note = document.querySelector(`[data-id="${note_id}"]`);
  note.classList.add("note-active");
  let read_area = document.querySelector(".read_notes");
  read_area.innerHTML = `
    <span class="txt">
    ${content}
    </span>
  
  `;
}

function create_notes_tab() {
  document.querySelector(".read_tab").style.display = "none";
  document.querySelector(".create_tab").style.display = "flex";
}
