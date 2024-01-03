let allOf1 = document.querySelector('.allOf1');
let allOf2 = document.querySelector('.allOf2');
let addNote = document.querySelector('.plus-div');
let dateElement = document.querySelector('.date');
let timeElement = document.querySelector('.time');
let allCards = document.querySelector('.all-notes');
let checkArr = document.querySelector('.fa-check');
let noteTitle = document.querySelector('.note-title');
let noteText = document.querySelector('.note-txt');
let card = document.querySelector('.card');
let section2 = document.querySelector('.section2');
let backArr = document.querySelector('.thBackArrow');
let overlay = document.querySelector('.overlay')
let modal = document.querySelector('.modal')
let yesBtn = document.querySelector('.yesbtn')
let noBtn = document.querySelector('.nobtn');
// let delCount = document.querySelector('.del-count');
let closeApp = document.querySelector('.fa-xmark');

// date and time
const newDate = new Date()
const dateTme = {
  time : `${newDate.getHours()}:${newDate.getMinutes()}`,
  date : `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
}


// the note array declearation 
const noteArray = [
  {
    noteTitle: 'Welcome to Quantum Notes',
    noteText: `
    🌟 Hello and thank you for choosing our notepad application! We're thrilled to have you on board. Whether you're a seasoned note-taker or just starting your journey into the world of digital notepads, we're here to make your experience smooth, intuitive, and enjoyable.

    📝 Your thoughts, ideas, and inspirations are valuable, and we've designed Quantum Note to be the perfect canvas for capturing them. Whether it's meeting notes, creative brainstorming, or personal reflections, our notepad is here to be your reliable companion.

    🎉 Explore the features we've carefully crafted for you # comming soon:

      Intuitive Interface: We believe in simplicity. Our user-friendly interface ensures that you can focus on your thoughts without any distractions.
      Customization: Personalize your notepad with themes and fonts to create an environment that suits your style.
      Organizational Tools: Stay organized effortlessly with folders, tags, and a powerful search function. Finding that important note has never been easier.
      Cross-Platform Sync: Access your notes anytime, anywhere. Our synchronization feature ensures that your notes are available on all your devices.

    🚀 We're continuously working to enhance your notetaking experience. Your feedback is invaluable, so don't hesitate to let us know how we can make Quantum Note even better for you.

    👨‍💻 Thank you for being part of our notepad community. Get ready to embark on a journey of creativity, productivity, and seamless notetaking!

    Happy noting!

    The Infaliable Team 🚀✨`,
    date: dateTme.date,
    time: dateTme.time
  }
];



allOf2.style.display = 'none';
function switchPage(page1, page2) {
  page1.style.display = 'none';
  page2.style.display = 'flex';
}


function compareNoteChanges(){
  let oldNoteTitle = noteTitle.value;
  let oldNoteText = noteText.value;
  checkArr.classList.add('js-checked');

  section2.addEventListener('keyup', () => {
    let newNoteTitle = noteTitle.value;
    let newNoteText = noteText.value;
    if (newNoteTitle !== oldNoteTitle || newNoteText !== oldNoteText) {
      checkArr.classList.add('js-not-checked');
    }
  });
}


backArr.onclick = ()=>{
  switchPage(allOf2, allOf1)
}

function displayCards() {
  // Clear existing cards
  allCards.innerHTML = '';
  
  noteArray.forEach((item) => {
    const newCard = document.createElement('div');
    newCard.className = 'card';

    newCard.innerHTML = `
      <div class="card-sec1">
        <p>${item.date} ${item.time}</p>
        <i class="fa-regular fa-trash-can" style="color:black;"></i>           
      </div>
      <div class="card-sec2">
        <h1>${item.noteTitle}</h1>
        <p>${item.noteText}</p>
      </div>
    `;

    allCards.appendChild(newCard);
  });
}

displayCards();
viewCard();
compareNoteChanges();


// this keeps track of if the check box has been clicked
let count = 0;

function viewCard() {
  allCards.innerHTML = '';
  console.log(noteArray);

  // display the card when you check
  displayCards();

  // makes the elements clickable ad viewale
  let thecards = document.querySelectorAll('.card-sec2')
  thecards.forEach((item, index)=>{
    item.addEventListener('click',()=>{
      switchPage(allOf1, allOf2);
      let itemDate = item.parentElement.children[0].children[0].innerText
      let itemTitle = item.parentElement.children[1].children[0].innerText
      let itemText =  item.parentElement.children[1].children[1].innerText
      noteTitle.value = itemTitle;
      noteText.value = itemText;
      dateElement.innerHTML = itemDate
      timeElement.innerHTML = `${newDate.getHours()} :: ${newDate.getMinutes()}`;

      console.log(item, index);
      if(itemText == '' && itemTitle == ''){
        console.log('eeorking');
      }

    });
  });
}


// make the cards deletable
// let countDel = 5
const deletCard = ()=>{
  let deleteBtn = document.querySelectorAll('.card-sec1 i');
  deleteBtn.forEach((item, index)=>{
    item.addEventListener('click', ()=>{
      overlay.style.display = 'flex';

    //  let theInterval = setInterval(()=>{
    //       countDel--
    //       delCount.innerHTML = countDel
    //       console.log(delCount.innerHTML);
    //       if(delCount.innerText == 0){
    //         noteArray.splice(index, 1);
    //         item.parentElement.parentElement.remove();
    //         overlay.remove()
    //         clearInterval(theInterval);
    //       }
    //     }, 1000)

       yesBtn.addEventListener('click', ()=>{
         noteArray.splice(index, 1);
         item.parentElement.parentElement.remove();
         overlay.remove()
        //  clearInterval(theInterval);
       });

       noBtn.addEventListener('click', ()=>{
        overlay.remove()
       })
    })
  })
}
deletCard();


// the green or red check button that makes the card
const checkNote = ()=>{
  checkArr.addEventListener('click', ()=>{
    if(noteTitle.value  && noteText.value){
      checkArr.classList.remove('js-not-checked');
      // instance of a new card object
      noteArray.push(
        {
          noteTitle : noteTitle.value,
          noteText : noteText.value,
          date :dateTme.date,
          time : dateTme.time
        }
      );
    
      // 1 awitch the page
      switchPage(allOf2, allOf1);
      // 2 Display the card
      displayCards();
      // 3 make the card viewable
      viewCard();
      // 4 make the card deletable
      deletCard();
  
      count++;
    }
    else{
      alert('input feilds cannont be enpty');
      return;
    }

  })
}

// count = 0
checkNote();


addNote.addEventListener('click', ()=>{
  // switch the pages
  switchPage(allOf1, allOf2);

  // makes the input fields empty
  noteTitle.value = '';
  noteText.value = '';
  
  // Compare changes in form inputs
  compareNoteChanges()
  
})