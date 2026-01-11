console.log("connected");

async function saveNote() {
  let note = document.getElementsByClassName("notes_input").value;

  try {
    let response = await fetch("notes/save/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
