console.log("connected");

async function saveNote() {
  let note = document.getElementsByClassName("notes_input")[0].value;
  let csrftoken = document.getElementById("csrf-token").value;
  try {
    let response = await fetch("notes/save/", {
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
