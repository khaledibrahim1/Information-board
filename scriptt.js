document.addEventListener('DOMContentLoaded', function() {
    const notesList = document.getElementById('notes-list');
    const addNoteButton = document.getElementById('add-note');
    const noteText = document.getElementById('note-text');

    // Load notes from local storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const displayNotes = () => {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');

            const noteContent = document.createElement('p');
            noteContent.textContent = note.text;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editNote(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteNote(index));

            noteDiv.appendChild(noteContent);
            noteDiv.appendChild(editButton);
            noteDiv.appendChild(deleteButton);
            notesList.appendChild(noteDiv);
        });
    };

    const addNote = () => {
        const text = noteText.value.trim();
        if (text) {
            notes.push({ text });
            noteText.value = '';
            saveNotes();
            displayNotes();
        }
    };

    const editNote = (index) => {
        const newText = prompt('Edit your note:', notes[index].text);
        if (newText) {
            notes[index].text = newText;
            saveNotes();
            displayNotes();
        }
    };

    const deleteNote = (index) => {
        notes.splice(index, 1);
        saveNotes();
        displayNotes();
    };

    addNoteButton.addEventListener('click', addNote);

    displayNotes();
});

const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})


Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});




