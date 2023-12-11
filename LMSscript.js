

function capitalizeFirstLetter(text) {

  let words = text.split(' ');

  let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());


  return capitalizedWords.join(' ');
}


function addBook(book) {
  Books.push(book);
  let table = $("#bookTable tbody");
  table.append(`
    <tr id="${book.id}" class="book-added">
        <td style="background-color: #c4c2c2;">${book.Student}</td>
        <td style="background-color: #c4c2c2;">${book.Categories}</td>
        <td style="background-color: #c4c2c2;">${capitalizeFirstLetter(book.title)}</td>
        <td style="background-color: #c4c2c2;">${capitalizeFirstLetter(book.author)}</td>
        <td style="background-color: #c4c2c2;">${book.genre}</td>
        <td style="background-color: #c4c2c2;">${book.year}</td>
        <td style="background-color: #c4c2c2;">${book.quantity}</td>
        <td style="background-color: #c4c2c2;">${book.Date}</td>
        <td style="background-color: #c4c2c2;">Available</td>
        <td>
           
            <button class="btn btn-sm btn-success borrowBtn" data-id="${book.id}">
                Borrow
            </button>
        </td>
    </tr>`);
    $(`#${book.id} td:eq(9)`).append(`
<button class="btn btn-sm btn-info returnBtn btn-danger ml-2" data-id="${book.id}" disabled>
    Return Book
</button>
<button class="btn btn-sm btn-danger deleteBtn" data-id="${book.id}">
    Delete
</button>
`);
}

let Books = [];



//BORROW BUTTON
function borrowedBook(book) {
  Books.push(book);
  let table = $("#bookTable tbody");

  table.append(`
<tr id="${book.id}">
    <td style="background-color: #c4c2c2;">${book.Student}</td>
    <td style="background-color: #c4c2c2;">${book.Categories}</td>
    <td style="background-color: #c4c2c2;">${capitalizeFirstLetter(book.title)}</td>
    <td style="background-color: #c4c2c2;">${capitalizeFirstLetter(book.author)}</td>
    <td style="background-color: #c4c2c2;">${book.genre}</td>
    <td style="background-color: #c4c2c2;">${book.year}</td>
    <td style="background-color: #c4c2c2;">${book.quantity}</td>
    <td style="background-color: #c4c2c2;">${book.Date} / ${book.DueDate}</td>
    <td style="background-color: #c4c2c2;">Borrowed</td>
    <td>
        
        
    </td>
</tr>`);


$(`#${book.id} td:eq(9)`).append(`
<button class="btn btn-sm btn-info returnBtn btn-danger ml-2" data-id="${book.id}">
    Return Book
</button>
<button class="btn btn-sm btn-danger deleteBtn" data-id="${book.id}">
    Delete
</button>
`);
}
$(document).on("click", "#borrowBtn", function () {
console.log("Borrow button clicked");
let selectedCategory = $("#Categories").val();
let selectedFictionGenre = $("#Fiction\\ Genre").val();
let selectedNonFictionGenre = $("#Non-Fiction\\ Genre").val();


  if ($("#Student").val() === "" || selectedCategory === null
    || ((selectedCategory === "Fiction" || selectedCategory === "Non-Fiction")
      && (selectedFictionGenre === null && selectedNonFictionGenre === null))
    || $("#bookTitle").val() === "" || $("#author").val() === ""
    || $("#genre").val() === "" || $("#year").val() === "" || $("#quantity").val() === "") {
    alert("Please fill in all required fields.");
    return;
  }

  const currentDate = new Date();
  let selectedGenre = "";
  if (selectedCategory === "Fiction") {
    selectedGenre = selectedFictionGenre;
  } else if (selectedCategory === "Non-Fiction") {
    selectedGenre = selectedNonFictionGenre;
  }

  let book = {
id: generateId(),
Student: $("#Student").val(),
Categories: selectedCategory,
title: capitalizeFirstLetter($("#bookTitle").val()),
author: capitalizeFirstLetter($("#author").val()),
genre: selectedGenre,
year: $("#year").val(),
quantity: $("#quantity").val(),
Date: currentDate.toLocaleDateString(),
DueDate: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
};

  borrowedBook(book);

  clearForm();
  alert("Book borrowed successfully!");
});

//RETURN BUTTON!!!!
function returnedBook(book, status = "Returned") {
  let table = $("#bookTable tbody");
  table.append(`
<tr id="${book.id}">
    <td>${book.Student}</td>
    <td>${book.Categories}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.year}</td>
    <td>${book.quantity}</td>
    <td>${book.Date}</td>
    <td>${status}</td>
    <td>
        <button class="btn btn-sm btn-warning editBtn" data-id="${book.id}">
            Edit
        </button>
        <button class="btn btn-sm btn-danger deleteBtn" data-id="${book.id}">
            Delete
        </button>
    </td>
</tr>`);

  $(`#${book.id} .returnBtn`).click(function () {
    alert(`Book with ID ${book.id} has been returned.`);
  });
}

$(document).on("click", "#returnBtn", function () {
  ;
  const currentDate = new Date();
  let book = {
    id: generateId(),
    Student: $("#Student").val(),
    Categories: $("#Categories").val(),
    title: $("#bookTitle").val(),
    author: $("#author").val(),
    genre: $("#genre").val(),
    year: $("#year").val(),
    quantity: $("#quantity").val(),
    Date: currentDate.toLocaleDateString(),
    DueDate: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };

  Books.push(book);
  returnedBook(book);

  clearForm();

});


//CLEAR BUTTON
function clearForm() {

        $("#Categories").prop("selectedIndex", 0);
        $("#Fiction\\ Genre").prop("selectedIndex", 0);
        $("#Non-Fiction\\ Genre").prop("selectedIndex", 0);

        $("#Student").val("");
        $("#bookTitle").val("");
        $("#author").val("");
        $("#genre").val("");
        $("#year").val("");
        $("#quantity").val("");


        enableBorrowButton();

        
        $("#author").prop("readonly", true);
        $("#year").prop("readonly", true);
      }

          function generateId() {
            return Math.floor(Math.random() * 100000);
          }

          $(document).on("click", "#clearBtn", function () {
            clearForm();
          });



function deleteBook(id) {
  let confirmation = window.confirm("Are you sure you want to delete this book?");

  if (confirmation) {
    Books = Books.filter(book => book.id !== id);
    $("#" + id).remove();
  } else {
    console.log("Delete operation canceled.");
  }
}


function editBook(id) {

  let book = Books.find(book => book.id === id);
  const currentDate = new Date();

  $("#editStudent").val(book.Student);
  $("#editCategories").val(book.Categories);
  $("#editBookTitle").val(book.title);
  $("#editAuthor").val(book.author);
  $("#editGenre").val(book.genre);
  $("#editYear").val(book.year);
  $("#editQuantity").val(book.quantity);
  $("#editBookId").val(book.id);
  $("#editDate").val(book.Date);

  $("#editModal").modal("show");
}


$(document).on("click", ".deleteBtn", function () {
  let id = $(this).data("id");
  deleteBook(id);
});

$(document).on("click", ".editBtn", function () {
  let id = $(this).data("id");
  editBook(id);
});

$("#editForm").submit(function (e) {
  e.preventDefault();

 
  let id = $("#editBookId").val();
  const currentDate = new Date();
  let editedBook = {
    Date: $("#editStudent").val(),
    Categories: $("#editCategories").val(),
    title: $("#editBookTitle").val(),
    author: $("#editAuthor").val(),
    genre: $("#editGenre").val(),
    year: $("#editYear").val(),
    quantity: $("#editQuantity").val(),
    Date: currentDate.toLocaleDateString(),
    id: id
  };


  let index = Books.findIndex(book => book.id === id);
  Books[index] = editedBook;


  $("#" + id + " td:eq(0)").text(editedBook.Student);
  $("#" + id + " td:eq(1)").text(editedBook.Categories);
  $("#" + id + " td:eq(2)").text(editedBook.title);
  $("#" + id + " td:eq(3)").text(editedBook.author);
  $("#" + id + " td:eq(4)").text(editedBook.genre);
  $("#" + id + " td:eq(5)").text(editedBook.year);
  $("#" + id + " td:eq(6)").text(editedBook.quantity);


  
  $("#editModal").modal("hide");
});

function updateBookStatus(id, status) {
  let bookStatus = $("#" + id + " td:eq(8)");
  bookStatus.text(status);
}



//LOGOUT

function logout() {
  window.location.href = 'index.html';
}


//INPUT NUMBER ONLY

function validateInput(inputElement) {
  const inputValue = inputElement.value;
  const isValid = /^\d+$/.test(inputValue);
  if (!isValid) {
    alert("Please enter a valid number.");
    inputElement.value = "";
  }
}


document.getElementById("Student").addEventListener("input", function () {
  validateInput(this);
});

document.getElementById("quantity").addEventListener("input", function () {
  validateInput(this);
});

document.getElementById("year").addEventListener("input", function () {
  validateInput(this);
});

//REQUIRED FOR FILLUP

$(document).on("click", "#addBtn", function () {
  let selectedCategory = $("#Categories").val();
  let selectedFictionGenre = $("#Fiction\\ Genre").val();
  let selectedNonFictionGenre = $("#Non-Fiction\\ Genre").val();

  if ($("#Student").val() === "" || selectedCategory === null
    || ((selectedCategory === "Fiction" || selectedCategory === "Non-Fiction")
      && (selectedFictionGenre === null && selectedNonFictionGenre === null))
    || $("#bookTitle").val() === "" || $("#author").val() === ""
    || $("#genre").val() === "" || $("#year").val() === "" || $("#quantity").val() === "") {
    alert("Please fill in all required fields.");
    return;
  }

  const currentDate = new Date();
  let selectedGenre = "";
  if (selectedCategory === "Fiction") {
    selectedGenre = selectedFictionGenre;
  } else if (selectedCategory === "Non-Fiction") {
    selectedGenre = selectedNonFictionGenre;
  }

  let book = {
    id: generateId(),
    Student: $("#Student").val(),
    Categories: selectedCategory,
    title: $("#bookTitle").val(),
    author: $("#author").val(),
    genre: selectedGenre,
    year: $("#year").val(),
    quantity: $("#quantity").val(),
    Date: currentDate.toLocaleDateString(),
    DueDate: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };

  Books.push(book);
  addBook(book);

  clearForm();

  alert("Book added successfully!");
});



//FICTION (DISABLE)
$(document).ready(function () {

  $("#Fiction\\ Genre, #Non-Fiction\\ Genre").prop("disabled", true);


  $("#Categories").change(function () {
    var selectedCategory = $(this).val();


    if (selectedCategory === "Fiction") {
      $("#Fiction\\ Genre").prop("disabled", false);
      $("#Non-Fiction\\ Genre").prop("disabled", true);
    } else if (selectedCategory === "Non-Fiction") {
      $("#Fiction\\ Genre").prop("disabled", true);
      $("#Non-Fiction\\ Genre").prop("disabled", false);
    } else {

      $("#Fiction\\ Genre, #Non-Fiction\\ Genre").prop("disabled", true);
    }
  });
});

$(document).on("change", "#editCategories", function () {
  var selectedCategory = $(this).val();

  if (selectedCategory === "Fiction") {
    $("#editFiction").prop("disabled", false);
    $("#editNon-Fiction").prop("disabled", true);
  } else if (selectedCategory === "Non-Fiction") {
    $("#editFiction").prop("disabled", true);
    $("#editNon-Fiction").prop("disabled", false);
  } else {
    $("#editFiction, #editNon-Fiction").prop("disabled", true);
  }
});

$(document).on("change", "#editCategories", function () {
  var selectedCategory = $(this).val();

  if (selectedCategory === "Fiction") {
    $("#editFiction").prop("disabled", false);
    $("#editNon-Fiction").prop("disabled", true);
  } else if (selectedCategory === "Non-Fiction") {
    $("#editFiction").prop("disabled", true);
    $("#editNon-Fiction").prop("disabled", false);
  } else {
    $("#editFiction, #editNon-Fiction").prop("disabled", true);
  }
});


//YEAR INPUT LIMIT limit
function validateYearInput(inputElement) {
  const inputValue = inputElement.value;

  if (inputValue === "") {
    return;
  }

  const isValidYear = /^\d{0,4}$/.test(inputValue);

  if (!isValidYear) {
    alert("Please enter a valid 4-digit year.");

    inputElement.value = inputValue.replace(/\D/g, '').slice(0, 4);
  }
}

document.getElementById("year").addEventListener("input", function (event) {
  validateYearInput(event.target);
});


//QUAITY INPUT limit
function validateQuantityInput(event) {
  const inputElement = event.target;
  const inputValue = inputElement.value;

  const isValidQuantity = /^\d{0,2}$/.test(inputValue) && inputValue[0] !== '0';

  if (!isValidQuantity) {
    alert("Please enter a valid quantity (1-99).");
    inputElement.value = inputValue.slice(0, -1);
  }
}

document.getElementById("quantity").addEventListener("input", function (event) {
  validateQuantityInput(event);
});

// RETURNING THE BOOK STATUS VALUE
$(document).on("click", ".returnBtn", function () {
  let button = $(this);
  let confirmation = window.confirm("Are you sure you want to return this book?");

  if (confirmation) {
    let id = button.data("id");
    updateBookStatus(id, "Returned");

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    $("#" + id + " td:eq(7)").text(formattedDate);

    button.prop("disabled", true);
    alert("Book has been returned successfully.");
  } else {
    console.log("Return operation canceled.");
  }
});


// AFTER ADDING BE ABLE TO BORROW IT
function handleBorrowButtonClick(bookId) {
  let book = Books.find(book => book.id === bookId);


  if (book && book.status !== "Borrowed") {

    updateBookStatus(bookId, "Borrowed");

    const currentDate = new Date();


    book.Date = currentDate.toLocaleDateString();
    book.DueDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString();

    $("#" + bookId + " .returnBtn").prop("disabled", false);
    $("#" + bookId + " td:eq(7)").text(`${book.Date} / ${book.DueDate}`);


    alert(`Book borrowed successfully!\nDue date: ${book.DueDate}`);
  } else {
    console.log("Book is not available for borrowing.");
  }
}

$(document).on("click", ".borrowBtn", function () {
  let bookId = $(this).data("id");

  let confirmation = window.confirm("Are you sure you want to borrow this book?");

  if (confirmation) {
    handleBorrowButtonClick(bookId);

    $(this).prop("disabled", true);
  } else {
    console.log("Borrow operation canceled.");
  }
});


//change
$(document).ready(function () {
$('#Categories, #Fiction\\ Genre, #Non-Fiction\\ Genre').change(updateBookOptions);
$('#bookTitle').change(updateBookDetails);

function updateBookOptions() {
  const selectedCategory = $('#Categories').val();
  const selectedFictionGenre = $('#Fiction\\ Genre').val();
  const selectedNonFictionGenre = $('#Non-Fiction\\ Genre').val();

  $('#bookTitle option').each(function () {
    const bookGenre = $(this).data('genre');
    $(this).toggle(
      bookGenre === selectedFictionGenre && selectedCategory === 'Fiction' ||
      bookGenre === selectedNonFictionGenre && selectedCategory === 'Non-Fiction' ||
      selectedCategory === ''
    );
  });
}

function updateBookDetails() {
  const selectedBookTitle = $('#bookTitle').val();
  const bookDetails = bookDetailsMap[selectedBookTitle];

  // Set the value of #author, #year, and #genre
  $('#author').val(bookDetails.author);
  $('#year').val(bookDetails.year);
  $('#genre').val(bookDetails.genre);
}
});
const bookDetailsMap = {
//ACTION AND ADVENTURE
'The Count of Monte Cristo': { author: 'Alexandre Dumas', year: '1844', genre: 'Action and adventure' },
'Adventures of Huckleberry Finn': { author: 'Mark Twain', year: '1884', genre: 'Action and adventure' },
'Gulliver\'s Travels': { author: 'Jonathan Smith', year: '1726', genre: 'Action and adventure'},
'Around the World in Eighty Days': { author: 'Jules Verne', year: '1872', genre: 'Action and adventure'},
'The Call of the Wild': { author: 'Jack London', year: '1903', genre: 'Action and adventure'},

//CHILDREN'S

'Where the Wild Things Are': { author: "Maurice Sendak", year: '1963' , genre:  "Children's" },
'Charlotte\'s Web': { author:  "Garth Williams", year: '1952', genre:  "Children's" },
'The Tale of Peter Rabbit': { author: 'The Tale of Peter Rabbit', year: '1990', genre:  "Children's"},
'A Wrinkle in Time': { author: 'Madeleine L\'Engle', year: '1962', genre:  "Children's"},
'Anne of Green Gables': { author: 'Lucy Maud Montgomery', year: '1908', genre:  "Children's"},

//Comic book
  'Marvels': { author: 'Kurt Busiek', year: 2017, genre: 'Comic book'},
  'Batman: Year One': { author: 'Frank Miller', year: 2007, genre: 'Comic book' },
  'The Walking Dead: Compendium One': { author: 'Robert Kirkman', year: 2009, genre: 'Comic book' },
  'X-Men: The Dark Phoenix Saga': { author: 'Chris Claremont', year: 2018, genre: 'Comic book' },
  'Superman Smashes the Klan': { author: 'Gene Luen Yang', year: 2020, genre: 'Comic book' },
  'The Amazing SpiderMan': { author: 'Nick Spencer', year: 1963, genre: 'Comic book' },
  'The Batman Who Laughs': { author: 'Scott Snyder', year: 2018, genre: 'Comic book' },


//CRIME
'Make the Panty-Ripper': { author: 'KanyeInterruptedMe', year: '2015', genre: 'Crime' },
'No Body, No Crime-Rafe Cameron': { author: 'Qwenstacysbrokenback', year: '2022', genre: 'Crime' },
'Over My Dead Body': { author: 'RebelleFleur00', year: '2018', genre: 'Crime' },
'Redemption | Mafia Romance': { author: 'Queen_Of_Desires', year: '2021', genre: 'Crime' },
'Hustle': { author: 'Jclairechilton', year: '2019', genre: 'Crime' },

'Hamlet': { author: 'William Shakespeare', year: 1601, genre: 'Drama' },
'Othello': { author: 'William Shakespeare', year: 1603, genre: 'Drama' },
'The Tempest': { author: 'William Shakespeare', year: 1611, genre: 'Drama' },
'Doctor Faustus': { author: 'Christopher Marlowe', year: 1593, genre: 'Drama' },

//FANTASY
'Pick The Second Male Lead': { author: 'harui30', year: 2018, genre: 'Fantasy' },
'Another Life, Another Me': { author: 'Ktphm2005', year: 2019, genre: 'Fantasy' },
'Ten Lifetimes': { author: 'Eliza Elson', year: 2018, genre: 'Fantasy' },
'The Villainess who has Reborn Five Times': { author: 'butterfly_effect', year: 2022, genre: 'Fantasy' },
'Reincarnated with a deities Harem': { author: 'seojun237', year: 2023, genre: 'Fantasy' },

//HORROR

'Frankenstein': { author: 'Mary Shelley', year: 1818, genre: 'Horror' },
'Hell House': { author: 'Richard Matheson', year: 1971, genre: 'Horror' },
'Ghost Story': { author: 'Peter Straub', year: 1979, genre: 'Horror' },
'The Woman in Black': { author: 'Susan Hill', year: 1983, genre: 'Horror' },

//Mystery
'In the Woods': { author: 'Tana French', year: 2007, genre: 'Mystery' },
'Murder on the Orient Express': { author: 'Agatha Christie', year: 1934, genre: 'Mystery' },
'Shutter Island': { author: 'Dennis Lehane', year: 2003, genre: 'Mystery' },
'The Silent Patient': { author: 'Celadon Books', year: 2019, genre: 'Mystery' },

//POETRY

'12 am': { author: 'sushitae', year: 2015, genre: 'Poetry' },
'love & nostalgia': { author: 'flowerbinsh', year: 2018, genre: 'Poetry' },
'It Isn\'t Love': { author: 'megan', year: 2017, genre: 'Poetry' },
'letters to no one': { author: 'bruisedmelodies', year: 2019, genre: 'Poetry' },
'locutions': { author: 'spicytofuu', year: 2015, genre: 'Poetry' },

//ROMANCE

'Knock, Knock, Professor': { author: 'irshwndy', year: 2022, genre: 'Romance' },
'POSSESSIVE 1: Tyron Zapanta': { author: 'CeCeLib', year: 2015, genre: 'Romance' },
'Temptation Island: Sinful Desire': { author: 'CeCeLib', year: 2018, genre: 'Romance' },
'Darkest Touch': { author: 'CeCeLib', year: 2016, genre: 'Romance' },
'Danger, Danger, Mr.Stranger': { author: 'irshwndy', year: 2023, genre: 'Romance' },

//SCIENCE
'Earthrise: 2176': { author: 'WillFlyForFood', year: 2014, genre: "Science Fiction" },
'Float': { author: 'ToastedBagels', year: 2022, genre: "Science Fiction" },
'Instability': { author: 'scifiwriter', year: 2014, genre: "Science Fiction" },
'Parallel': { author: 'Renoe_k', year: 2013, genre: "Science Fiction" },
'Mechanical Gods': { author: 'DAlecLyle', year: 2018, genre: "Science Fiction" },

//THRILLER
'THE VISION': { author: 'Frank Herbert', year: 1965, genre: 'Thriller' },
'A Brilliant Plan': { author: 'Joshua', year: 2019, genre: 'Thriller' },
'Invisible Armies': { author: 'alexames', year: 2016, genre: 'Thriller' },
'The Accidental Siren': { author: 'JakeVanderArk', year: 2012, genre: 'Thriller' },
'The Whole Truth': { author: 'jacharlow', year: 2021, genre: 'Thriller' },

//SHORT STORY
'Honey: Theo Nott': { author: 'PleasingMalfoy', year: 2020, genre: 'Short Story' },
'Kaklase': { author: 'jkatesanjose', year: 2022, genre: 'Short Story' },
'The Girl He Never Noticed': { author: 'sweetdreamer33', year: 2014, genre: 'Short Story' },
'REPLACEMENT WIFE': { author: 'Rachayetria', year: 2023, genre: 'Short Story' },
'Lover\'s Guilt: An Erotic': { author: 'RainFlower22', year: 2017, genre: 'Short Story' },
//YOUNG ADULT

'Alessandro': { author: 'onlyshannon', year: 2022, genre: 'Young Adult' },
'Coincidentally': { author: 'authorMayLynn', year: 2018, genre: 'Young Adult' },
'Dominic': { author: 'onlyshannon', year: 2022, genre: 'Young Adult' },
'A Touch of Sin': { author: 'onlyshannon', year: 2022, genre: 'Young Adult' },
'Bulletproof': { author: 'TahliePurvis', year: 2015, genre: 'Young Adult' },

//NONFICTION

//AUDIOBIOGRAPHY
"The Diary of a Young Girl": { author: "Anne Frank", year: 1947, genre: "Autobiography" },
"Autobiography of a Yogi": { author: "Paramahansa Yogananda", year: 1946, genre: "Autobiography" },
"I Am Malala: The Girl Who Stood Up for Education and was Shot by the Taliban": { author: "Malala Yousafzai", year: 2013, genre: "Autobiography" },
"Becoming A Visible Man": { author: "Jamison Green", year: 2004, genre: "Autobiography" },

//BIOGRAPHY
"Alexander Hamilton": { author: "Ron Chernow", year: 2020, genre: "Biography" },
"The Immortal Life of Henrietta Lacks": { author: "Rebecca Skloot", year: 2001, genre: "Biography" },
"The Mayor of Castro Street: The Life and Times of Harvey Milk": { author: "Randy Shilts", year: 1982, genre: "Biography" },
"Wong Kar-Wai: Auteur of Time": { author: "Stephen Teo", year: 2005, genre: "Biography" },

//BUSINESS/ECONOMICS

"Freakonomics": { author: "Steven Levitt, Stephen Dubner", year: 2005, genre: "Business/Economics" },
"Capital in the Twenty-First Century": { author: "Thomas Piketty", year: 2011, genre: "Business/Economics" },
"The World is Flat": { author: "Thomas Friedman", year: 2015, genre: "Business/Economics" },
"The Second Machine Age": { author: "Erik Brynjolfsson", year: 2014, genre: "Business/Economics" },

//CRAFT AND HOBBIES

'A Step-by-Step Guide to Creative Skills': { author: 'Daniel Weiss', year: 1980, genre: 'Crafts and Hobbies' },
'An Adventure Brewing': { author: 'Jolly Jupiter', year: 2023, genre: 'Crafts and Hobbies' },
'The Forgotten Arts and Crafts': { author: 'John Seymour', year: 1984, genre: 'Crafts and Hobbies' },
"A Stash of One's Own: Knitters on Loving, Living with, and Letting Go of Yarn": { author: 'Clara Parkes', year: 2017, genre: 'Crafts and Hobbies' },

//COOKBOOKS

"Magnolia Table": { author: 'Garth Williams', year: 1952, genre: 'Cookbooks' },
"The Tale of Peter Rabbit": { author: 'Joanna Gaines', year: 2018, genre: 'Cookbooks' },
"How To Make The Best Coffee At Home": { author: 'James Hoffmann', year: 2022, genre: 'Cookbooks' },
"Real Superfoods: Everyday Ingredients to Elevate Your Health": { author: 'Ocean Robbins', year: 2023, genre: 'Cookbooks' },

//DICTIONARY

"The Dictionary People: The Unsung Heroes Who Created the Oxford English Dictionary": { author: 'Sarah Ogilvie', year: 2023, genre: 'Dictionary' },
"The Professor and the Madman: A Tale of Murder, Insanity and the Making of the Oxford English Dictionary": { author: 'Simon Winchester', year: 1998, genre: 'Dictionary' },
"Merriam-Webster's Collegiate Dictionary": { author: 'Merriam-Webster', year: 2022 , genre: 'Dictionary' },
"The Unabridged Devil's Dictionary": { author: 'Ambrose Bierce', year: 1911, genre: 'Dictionary' },

//ENCYCLOPEDIA

"The Know-It-All (Paperback)": { author: 'A.J. Jacobs', year: 2004, genre: 'Ency' },
"The Philosophy Book: Big Ideas Simply Explained (Hardcover)": { author: 'Will Buckingham', year: 2010, genre: 'Ency' },
"A Tolkien Bestiary (Hardcover)": { author: 'David Day', year: 1978, genre: 'Ency' },
"The DC Comic book Encyclopedia (Hardcover)": { author: 'Scott Beatty', year: 2004, genre: 'Ency' },

//HISTORY

'A City on Mars: Can We Settle Space, Should We Settle Space, and Have We Really Thought This Through?': { author: 'Kelly Weinersmith', year: 2023 },
'Endgame: Inside the Royal Family and the Monarchy\'s Fight for Survival': { author: 'Omid Scobie', year: 2023 },
'Gator Country: Deception, Danger, and Alligators in the Everglades': { author: 'Rebecca Renner', year: 2023 },

//JOURNAL

'Self-Love Workbook for Women: Release Self-Doubt, Build Self-Compassion, and Embrace Who You Are': { author: 'Megan Logan', year: 2020 },
'Step by Step: The Life In My Journeys': { author: 'Simon Reeve', year: 2018 },
'Draw Your Day: An Inspiring Guide to Keeping a Sketch Journal': { author: 'Samantha Dion Baker', year: 2018 },
'The Untethered Soul Guided Journal: Practices to Journey Beyond Yourself': { author: 'Michael A. Singer', year: 2020 },

//PHILOSOPHY
'Greenlights': { author: 'Matthew McConaughey', year: 2020 },
'The Boy, the Mole, the Fox and the Horse': { author: 'Charlie Mackesy', year: 2019 },
'The Stranger in the Lifeboat': { author: 'Mitch Albom', year: 2021 },
'Can\'t Hurt Me: Master Your Mind and Defy the Odds': { author: 'David Goggins', year: 2018 },

//TEXTBOOK

'Fundamentals of Software Architecture: An Engineering Approach': { author: 'Mark Richards', year: 2020 },
'180 Days: Two Teachers and the Quest to Engage and Empower Adolescents': { author: 'Kelly Gallagher', year: 2018 },
'The Gay Agenda: A Modern Queer History & Handbook': { author: 'Ashley Molesso', year: 2020 },
'Advances in Financial Machine Learning': { author: 'Marcos López de Prado', year: 2018 },

//TRUECRIMEBOOKS

'Among the Bros: A Fraternity Crime Story': { author: 'Max Marshall', year: 2023 },
'In the Pines: A Lynching, A Lie, A Reckoning': { author: 'Grace Elizabeth Hale', year: 2023 },
'Gator Country: Deception, Danger, and Alligators in the Everglades': { author: 'Rebecca Renner', year: 2023 },
'Becoming the Boogeyman': { author: 'Richard Chizmar', year: 2023 },

//SCIENCE
'Breaking Through: My Life in Science': { author: 'Katalin Karikó', year: 2023 },
'Most Delicious Poison: The Story of Nature\'s Toxins―From Spices to Vices': { author: 'Noah Whiteman', year: 2023 },
'Blood Memory: The Tragic Decline and Improbable Resurrection of the American Buffalo': { author: 'Dayton Duncan', year: 2023 },
'Poison: The History of Potions, Powders and Murderous Practitioners': { author: 'Ben Hubbard', year: 2023 },

//SPORTS AND LEISURE
'Ted Williams at War (Hardcover)': { author: 'Bill Nowlin', year: 2006 },
'The Teammates: A Portrait of a Friendship (Paperback)': { author: 'David Halberstam', year: 2003 },
'All In: An Autobiography (Hardcover)': { author: 'Billie Jean King', year: 2021 },
'I Came As a Shadow: An Autobiography (Hardcover)': { author: 'John Thompson', year: 2020 }
};



$('#bookTitle').on('change', function () {

const selectedBookTitle = $(this).val();


const bookDetails = bookDetailsMap[selectedBookTitle];

$('#author').val(bookDetails.author);
$('#year').val(bookDetails.year);
$('#genre').val(bookDetails.genre);


const selectedGenre = $('#genre').val();
$('#bookTitle option').each(function () {
  const bookTitle = $(this).val();
  const bookGenre = bookDetailsMap[bookTitle].genre;
  $(this).toggle(bookGenre === selectedGenre || selectedGenre === '');
});
});


$('#bookTitle').change();

//FOR ADDBOOK
      function checkSelection() {
      var selectElement = document.getElementById("bookTitle");
      var selectedValue = selectElement.options[selectElement.selectedIndex].value;


      var authorInput = document.getElementById("author");
      var yearInput = document.getElementById("year");

      if (selectedValue === "addBook") {

            var bookTitle = prompt("Enter the title of the new book:");
            if (bookTitle !== null && bookTitle.trim() !== "") {
            
              var capitalizedTitle = capitalizeWords(bookTitle);
              alert("Book added successfully: " + capitalizedTitle);
            
              var newOption = document.createElement("option");
              newOption.value = capitalizedTitle;
              newOption.text = capitalizedTitle;


              selectElement.add(newOption);

            
              newOption.selected = true;

              authorInput.removeAttribute("readonly");
              yearInput.removeAttribute("readonly");


              disableBorrowButton();
            } else {
          
              selectElement.value = "";

              authorInput.setAttribute("readonly", true);
              yearInput.setAttribute("readonly", true);

              enableBorrowButton();
            }
          }
        }

        function disableBorrowButton() {
          document.getElementById("borrowBtn").disabled = true;
        }

        function enableBorrowButton() {
          document.getElementById("borrowBtn").disabled = false;
        }

        function capitalizeWords(str) {
          return str.replace(/\b\w/g, function (match) {
            return match.toUpperCase();
          });
        }

        function capitalizeWords(str) {
          return str.replace(/\b\w/g, function (match) {
            return match.toUpperCase();
          });
        }
        
