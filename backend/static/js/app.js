console.log("connected");

let csrftoken = document.getElementById("csrf-token").value;
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
  let notes = [];
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
  let list = document.querySelector(".list-group");
  let str = ``;
  notes.forEach((i) => {
    str += `
      <li class="list-group-item note" id="${i.id}">${i["created_at"]}</li>
      
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
    },
    { once: true }
  );

  render_notes();
}
