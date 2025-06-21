document.addEventListener("DOMContentLoaded", () => {
  const books = document.querySelectorAll(".book");

  books.forEach(book => {
    const minusBtn = book.querySelector(".minus");
    const plusBtn = book.querySelector(".plus");
    const quantityInput = book.querySelector(".quantity");
    const addToCartBtn = book.querySelector(".add-to-cart");

    minusBtn.addEventListener("click", () => {
      let current = parseInt(quantityInput.value);
      if (current > 1) quantityInput.value = current - 1;
    });

    plusBtn.addEventListener("click", () => {
      let current = parseInt(quantityInput.value);
      quantityInput.value = current + 1;
    });

    addToCartBtn.addEventListener("click", () => {
      const title = book.querySelector("h2").innerText;
      const price = parseInt(book.dataset.price) || 0;
      const quantity = parseInt(quantityInput.value);

      addToCart(title, price, quantity);

      alert(`Додано ${quantity} шт. "${title}" до кошика.`);
      window.location.href = "cart.html";
    });
  });

  function addToCart(title, price, quantity) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.title === title);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ title, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
