// Get DOM Element within which data will be rendered
const notes = document.getElementById("notes");

// Get form
const form = document.getElementById("add-note-form");

// Render data in DOM
function renderNote(data) {
  // Create elements
  const li = document.createElement("li");
  const title = document.createElement("span");
  const body = document.createElement("span");
  const cross = document.createElement("div");
  const plus = document.createElement("div");

  // Add attributes to elements
  title.setAttribute("class", "note-title");
  body.setAttribute("class", "note-body");
  cross.setAttribute("class", "cross");
  plus.setAttribute("class", "plus");

  // Add data to elements
  li.id = data.id;
  title.textContent = data.data().title;
  body.textContent = `${data.data().body.toString().substring(0, 100)}...`;
  cross.textContent = "x";
  plus.textContent = "+";

  // Add elements to DOM
  li.appendChild(title);
  li.appendChild(body);
  li.appendChild(cross);
  li.appendChild(plus);
  notes.appendChild(li);

  // Let cross delete not on click
  cross.addEventListener("click", function (e) {
    e.stopPropagation();
    const id = e.target.parentElement.getAttribute("id");

    // Delete from collection
    db.collection("notes").doc(id).delete();
  });

  // Update note
  plus.addEventListener("click", function (e) {
    e.stopPropagation();
    const id = e.target.parentElement.getAttribute("id");
    console.log("Note will be updated...");
  });
}

// Get all documents at once
/*
db.collection("notes")
  .get()
  .then(function (snapshots) {
    snapshots.forEach(function (doc) {
      console.log(doc);
      renderNote(doc);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
*/

// Get realtime updates with cloud firestore
db.collection("notes")
  .orderBy("title")
  .onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type == "removed") {
        let li = document.getElementById(change.doc.id);
        notes.removeChild(li);
      } else if (change.type == "modified") {
        let li = document.getElementById(change.doc.id);
        li.childNodes[0].innerText = change.doc.data().title;
        li.childNodes[1].innerText = change.doc.data().title;
      } else {
        renderNote(change.doc);
      }
    });
  });

//   Listen for form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = form.title.value;
  const body = form.body.value;
  if (title.length >= 3 && body.length >= 3) {
    const note = {
      title,
      body,
    };
    addNewDocument(note);
  } else {
    console.log("All fields must contain at least 3 characters.");
  }
});

//   Add to document to collection
function addNewDocument(data) {
  db.collection("notes")
    .add(data)
    .then(function (doc) {
      // console.log(doc);
      console.log("Note added successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Update document
function updateNote(id, data) {
  db.collection("notes")
    .doc(id)
    .update(data)
    .then(function () {
      console.log("Note updated successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
}
