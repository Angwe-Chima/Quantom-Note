const allOf1 = document.querySelector('.allOf1');
const allOf2 = document.querySelector('.allOf2');
const addNote = document.querySelector('.plus-div');
const dateElement = document.querySelector('.date');
const timeElement = document.querySelector('.time');
const allCards = document.querySelector('.all-notes');
const checkArr = document.querySelector('.fa-check');
const noteTitle = document.querySelector('.note-title');
const noteText = document.querySelector('.note-txt');
const section2 = document.querySelector('.section2');
const backArr = document.querySelector('.thBackArrow');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const yesBtn = document.querySelector('.yesbtn');
const noBtn = document.querySelector('.nobtn');
const closeApp = document.querySelector('.fa-xmark');

let currentEditingIndex = -1;
let noteArray = [];

const welcomeNote = {
  noteTitle: 'Welcome to Quantum Notes',
  noteText: `🌟 Hello and thank you for choosing our notepad application! We're thrilled to have you on board. Whether you're a seasoned note-taker or just starting your journey into the world of digital notepads, we're here to make your experience smooth, intuitive, and enjoyable.

📝 Your thoughts, ideas, and inspirations are valuable, and we've designed Quantum Note to be the perfect canvas for capturing them. Whether it's meeting notes, creative brainstorming, or personal reflections, our notepad is here to be your reliable companion.

🎉 Explore the features we've carefully crafted for you:
- Intuitive Interface: We believe in simplicity. Our user-friendly interface ensures that you can focus on your thoughts without any distractions.
- Customization: Personalize your notepad with themes and fonts to create an environment that suits your style.
- Organizational Tools: Stay organized effortlessly with folders, tags, and a powerful search function.
- Cross-Platform Sync: Access your notes anytime, anywhere. Our synchronization feature ensures that your notes are available on all your devices.

🚀 We're continuously working to enhance your notetaking experience. Your feedback is invaluable, so don't hesitate to let us know how we can make Quantum Note even better for you.

👨‍💻 Thank you for being part of our notepad community. Get ready to embark on a journey of creativity, productivity, and seamless notetaking!

Happy noting! - The Infallible Team 🚀✨`,
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
};

function formatDate(date) {
  return date.toLocaleDateString();
}

function formatTime(date) {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function loadNotesFromStorage() {
  const stored = localStorage.getItem('quantumNotes');
  if (stored) {
    noteArray = JSON.parse(stored);
  } else {
    noteArray = [welcomeNote];
    saveNotesToStorage();
  }
}

function saveNotesToStorage() {
  localStorage.setItem('quantumNotes', JSON.stringify(noteArray));
}

function switchPage(page1, page2) {
  page1.style.display = 'none';
  page2.style.display = 'flex';
}

function displayCards() {
  allCards.innerHTML = '';
  noteArray.forEach((item, index) => {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.dataset.index = index;

    newCard.innerHTML = `
      <div class="card-sec1">
        <p>${item.date} ${item.time}</p>
        <i class="fa-regular fa-trash-can delete-icon" style="color:black;" data-index="${index}"></i>
      </div>
      <div class="card-sec2">
        <h1>${item.noteTitle}</h1>
        <p>${item.noteText}</p>
      </div>
    `;

    allCards.appendChild(newCard);
  });

  attachCardListeners();
  attachDeleteListeners();
}

function attachCardListeners() {
  const cardSec2s = document.querySelectorAll('.card-sec2');
  cardSec2s.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentEditingIndex = index;
      switchPage(allOf1, allOf2);

      const note = noteArray[index];
      noteTitle.value = note.noteTitle;
      noteText.value = note.noteText;
      dateElement.innerText = note.date;
      timeElement.innerText = note.time;

      checkArr.classList.remove('js-not-checked');
      checkArr.classList.add('js-checked');
    });
  });
}

function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll('.delete-icon');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      currentEditingIndex = index;
      overlay.style.display = 'flex';
    });
  });
}

backArr.addEventListener('click', () => {
  switchPage(allOf2, allOf1);
  currentEditingIndex = -1;
});

yesBtn.addEventListener('click', () => {
  if (currentEditingIndex !== -1) {
    noteArray.splice(currentEditingIndex, 1);
    saveNotesToStorage();
    displayCards();
    overlay.style.display = 'none';
    switchPage(allOf2, allOf1);
    currentEditingIndex = -1;
  }
});

noBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

function checkNoteChanges() {
  noteTitle.addEventListener('input', updateCheckStatus);
  noteText.addEventListener('input', updateCheckStatus);
}

function updateCheckStatus() {
  const note = noteArray[currentEditingIndex];
  if (currentEditingIndex === -1) {
    checkArr.classList.remove('js-not-checked');
    checkArr.classList.add('js-checked');
    return;
  }

  if (noteTitle.value !== note.noteTitle || noteText.value !== note.noteText) {
    checkArr.classList.remove('js-checked');
    checkArr.classList.add('js-not-checked');
  } else {
    checkArr.classList.remove('js-not-checked');
    checkArr.classList.add('js-checked');
  }
}

function saveNote() {
  let isProcessing = false;
  
  checkArr.addEventListener('click', () => {
    if (isProcessing) return;
    
    if (noteTitle.value.trim() && noteText.value.trim()) {
      isProcessing = true;
      const now = new Date();

      if (currentEditingIndex !== -1) {
        // Updating existing note
        noteArray[currentEditingIndex] = {
          noteTitle: noteTitle.value,
          noteText: noteText.value,
          date: formatDate(now),
          time: formatTime(now)
        };
      } else {
        // Creating new note
        noteArray.push({
          noteTitle: noteTitle.value,
          noteText: noteText.value,
          date: formatDate(now),
          time: formatTime(now)
        });
      }

      saveNotesToStorage();
      switchPage(allOf2, allOf1);
      displayCards();
      currentEditingIndex = -1;
      isProcessing = false;
    } else {
      alert('Input fields cannot be empty');
    }
  });
}

addNote.addEventListener('click', () => {
  currentEditingIndex = -1;
  switchPage(allOf1, allOf2);
  noteTitle.value = '';
  noteText.value = '';
  dateElement.innerText = formatDate(new Date());
  timeElement.innerText = formatTime(new Date());
  checkArr.classList.remove('js-not-checked');
  checkArr.classList.add('js-checked');
});

closeApp.addEventListener('click', () => {
  console.log('Close button clicked');
});

// Initialize
allOf2.style.display = 'none';
loadNotesFromStorage();
displayCards();
checkNoteChanges();
saveNote();