function renderOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const container = document.getElementById("orders-container");
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>Замовлень поки немає.</p>";
    return;
  }

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.classList.add("order-block");

    div.innerHTML = `
      <h3>Замовлення #${index + 1}</h3>
      <p><strong>Ім'я:</strong> ${order.name}</p>
      <p><strong>Контакт:</strong> ${order.contact}</p>
      <p><strong>Книги:</strong></p>
      <ul>${order.items.map(book => `<li>${book.title} — ${book.price} грн × ${book.quantity}</li>`).join("")}</ul>
      <p><strong>Сума:</strong> ${order.total} грн</p>
      <button class="delete-order-btn" data-index="${index}">Видалити замовлення</button>
    `;
    
    container.appendChild(div);
  });

  document.querySelectorAll(".delete-order-btn").forEach(button => {
    button.addEventListener("click", () => {
      const idx = +button.dataset.index;
      deleteOrder(idx);
    });
  });
}

function deleteOrder(index) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

function clearOrders() {
  if (confirm("Ви впевнені, що хочете очистити всі замовлення?")) {
    localStorage.removeItem("orders");
    renderOrders();
  }
}

document.getElementById("clear-orders-btn").addEventListener("click", clearOrders);

renderOrders();
