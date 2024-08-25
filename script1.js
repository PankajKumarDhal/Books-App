
let list = document.querySelector(".list");
let card = document.querySelector(".card");

// Load categories and display all books when the page loads
window.addEventListener("load", () => {
  loadCategories();
  displayAllBooks();
});

// Load book categories
async function loadCategories() {
  try {
    let response = await fetch("https://books-backend.p.goit.global/books/category-list");
    let categories = await response.json();
    displayCategories(categories);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

// Display categories in the list
function displayCategories(categories) {
  list.innerHTML = `<p class="list_item active" onclick="displayAllBooks()">All Categories</p>`;
  categories.forEach(category => {
    list.innerHTML += `<p class="list_item" onclick="displayCategory('${category.list_name}')">${category.list_name}</p>`;
  });
}

// Display all books
async function displayAllBooks() {
  try {
    let response = await fetch("https://books-backend.p.goit.global/books/top-books");
    let books = await response.json();
    displayBooks(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Display books for a specific category
async function displayCategory(categoryName) {
  try {
    let response = await fetch("https://books-backend.p.goit.global/books/top-books");
    let books = await response.json();
    let categoryBooks = books.find(book => book.list_name === categoryName);
    if (categoryBooks) {
      displayBooks([categoryBooks]);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Display books on the page
function displayBooks(books) {
  card.innerHTML = "";
  books.forEach(category => {
    let categorySection = document.createElement('div');
    categorySection.classList.add('category-section');
    categorySection.innerHTML = `<h2 class="category-title">${category.list_name}</h2>`;
    let booksContainer = document.createElement('div');
    booksContainer.classList.add('books-container');
    
    category.books.slice(0, 4).forEach(book => {
      booksContainer.appendChild(createBookCard(book));
    });
    
    categorySection.appendChild(booksContainer);
    
    if (category.books.length > 4) {
      categorySection.appendChild(addShowMoreButton(category.list_name));
    }
    
    card.appendChild(categorySection);
  });
  addCardClickListeners();
}

// Create a card for a book
function createBookCard(book) {
  let bookCard = document.createElement('div');
  bookCard.classList.add('cards');
  bookCard.innerHTML = `
    <img src="${book.book_image}" alt="${book.title}">
    <div class="detail">
      <h4>${book.author}</h4>
      <p><i>${book.title}</i></p>
    </div>
  `;
  return bookCard;
}

// Add "Show More" button
function addShowMoreButton(categoryName) {
  let button = document.createElement('button');
  button.textContent = "See more";
  button.classList.add('show-more-btn');
  button.onclick = () => displayCategory(categoryName);
  return button;
}

// Add click listeners to book cards
function addCardClickListeners() {
  document.querySelectorAll(".cards").forEach(card => {
    card.addEventListener("click", () => {
      let img = card.querySelector("img").src;
      let author = card.querySelector("h4").textContent;
      let title = card.querySelector("p").textContent;
      showBookDetails(img, author, title);
    });
  });
}

// Show book details
function showBookDetails(img, author, title) {
  let detailsElement = document.querySelector(".card-detail");
  detailsElement.innerHTML = `
    <div class="card-detail-content">
      <span class="close-card-detail">&times;</span>
      <img src="${img}" alt="${title}">
      <h3>${title}</h3>
      <h4>${author}</h4>
      <p class="book-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <button class="add-to-shopping-list">Add to Shopping List</button>
    </div>
  `;
  detailsElement.style.display = "block";
  
  detailsElement.querySelector(".close-card-detail").onclick = () => {
    detailsElement.style.display = "none";
  };

  let addToShoppingListBtn = detailsElement.querySelector(".add-to-shopping-list");
  addToShoppingListBtn.onclick = () => {
    addToShoppingListBtn.textContent = "Added to Shopping List";
    addToShoppingListBtn.classList.add("added");
    addToShoppingListBtn.disabled = true;
  };
}