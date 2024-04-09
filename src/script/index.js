import { getNotes, addNote, deleteNote } from './data/noteData.js'; // Mengimpor fungsi yang diperlukan dari file noteData.js

function displayNotes() {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";
    
    const notes = getNotes();
    notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note-item");
        noteElement.setAttribute("data-note-id", note.id); // Tambahkan atribut data-note-id
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.body}, ${note.description}</p>
            <button class="delete-button">Delete</button>
        `;
        noteList.appendChild(noteElement);
    });
}

document.getElementById("formNote").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    
    if (title && description) {
        const newNote = {
            id: `note-${Math.random().toString(36).substr(2, 9)}`,
            title: title,
            description: description
        };
        addNote(newNote);
        displayNotes();
        document.getElementById("formNote").reset();
    } else {
        alert("Judul dan catatan tidak boleh kosong!");
    }
});

displayNotes();

document.getElementById("noteList").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const noteId = event.target.parentElement.getAttribute("data-note-id"); // Ambil ID catatan
        deleteNote(noteId); // Hapus catatan dengan ID yang sesuai
        displayNotes(); // Menampilkan catatan yang diperbarui setelah dihapus
    }
});
