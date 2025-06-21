// cart.js

// Получаем элементы
const cartContainer = document.getElementById("cart-container");

const ordersKey = "orders";
const cartKey = "cart";

// Функция получения корзины из localStorage
function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// Сохраняем корзину в localStorage
function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

// Обновляем отображение корзины
function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Кошик порожній.</p>`;
    return;
  }

  let totalSum = 0;

  cart.forEach((item, index) => {
    totalSum += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <p><strong>${item.title}</strong></p>
      <p>Ціна: <strong>${item.price} грн</strong></p>
      <div class="quantity-control">
        <button class="minus" data-index="${index}">−</button>
        <input class="quantity" type="text" value="${item.quantity}" readonly />
        <button class="plus" data-index="${index}">+</button>
        <button class="remove-item" data-index="${index}" title="Видалити товар">×</button>
      </div>
    `;

    cartContainer.appendChild(itemDiv);
  });

  // Добавляем итоговую сумму и форму заказа
  const totalBlock = document.createElement("div");
  totalBlock.id = "total-block";
  totalBlock.innerHTML = `<p>Всього до оплати: <strong>${totalSum} грн</strong></p>`;
  cartContainer.appendChild(totalBlock);

  renderOrderForm(totalSum);
  setupEventListeners();
}

// Рендер формы заказа (если она ещё не в DOM)
function renderOrderForm(totalSum) {
  if (document.getElementById("order-form")) return;

  const form = document.createElement("form");
  form.id = "order-form";
  form.innerHTML = `
    <label for="name">Ім'я:</label>
    <input type="text" id="name" placeholder="Ваше ім'я" required />

    <label for="contact">Контакт (телефон або email):</label>
    <input type="text" id="contact" placeholder="Ваш контакт" required />

    <button type="submit" id="submit-order">Оформити замовлення</button>
    <button type="button" id="clear-cart">Очистити кошик</button>
  `;

  cartContainer.appendChild(form);

  form.addEventListener("submit", handleSubmitOrder);
  document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem(cartKey);
    renderCart();
  });
}

// Обработчики кнопок +, − и удаления
function setupEventListeners() {
  document.querySelectorAll("button.plus").forEach(btn => {
    btn.onclick = () => {
      const index = +btn.dataset.index;
      const cart = getCart();
      cart[index].quantity++;
      saveCart(cart);
      renderCart();
    };
  });

  document.querySelectorAll("button.minus").forEach(btn => {
    btn.onclick = () => {
      const index = +btn.dataset.index;
      const cart = getCart();
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart(cart);
        renderCart();
      }
    };
  });

  document.querySelectorAll("button.remove-item").forEach(btn => {
    btn.onclick = () => {
      const index = +btn.dataset.index;
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    };
  });
}

// Обработка оформления заказа
function handleSubmitOrder(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const contactInput = document.getElementById("contact");
  const cart = getCart();

  if (cart.length === 0) {
    alert("Ваш кошик порожній!");
    return;
  }
  if (!nameInput.value.trim() || !contactInput.value.trim()) {
    alert("Будь ласка, заповніть всі поля.");
    return;
  }

  // Формируем заказ
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    name: nameInput.value.trim(),
    contact: contactInput.value.trim(),
    items: cart,
    total,
    createdAt: new Date().toISOString(),
  };

  // Сохраняем заказ в localStorage
  const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  orders.push(order);
  localStorage.setItem(ordersKey, JSON.stringify(orders));

  // Очищаем корзину и форму
  localStorage.removeItem(cartKey);
  alert("Дякуємо за замовлення!");
  renderCart();
}

// Инициализация
renderCart();
