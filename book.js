// Отримуємо параметр id з URL, напр. book.html?id=kobzar
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

const books = {
  kobzar: {
    title: "Тарас Шевченко — Кобзар",
    image: "images/covers/kobzar.jpg",
    description: `Збірка віршів Тараса Шевченка, що стала символом української літератури. 
    Тут ви знайдете поезію, яка формувала національну свідомість, закликає до свободи і справедливості.`,
  },
  lisova_pisnya: {
    title: "Леся Українка — Лісова пісня",
    image: "images/covers/lisova_pisnya.jpg",
    description: `Драматична поема про кохання, природу та дух свободи. 
    Лірична історія, що переплітає людські почуття із чарівністю української природи.`,
  },
  zakhar_berkut: {
    title: "Іван Франко — Захар Беркут",
    image: "images/covers/zakhar_berkut.jpg",
    description: `Історичне оповідання про героїчний спротив монголам. 
    Розповідь про честь, відвагу і єдність у боротьбі за свободу.`,
  },
  tini: {
    title: "Михайло Коцюбинський — Тіні забутих предків",
    image: "images/covers/tini.jpg",
    description: `Містична історія гуцульського кохання й фольклору. 
    Глибокий занурення в життя Карпат та традиції їх мешканців.`,
  },
  zemlya: {
    title: "Ольга Кобилянська — Земля",
    image: "images/covers/zemlya.jpg",
    description: `Соціально-психологічна драма про село, землю та гріх. 
    Гострий погляд на конфлікти між поколіннями і долю простих людей.`,
  },
};

const container = document.getElementById('book-details');

if (bookId && books[bookId]) {
  const book = books[bookId];
  container.innerHTML = `
    <img src="${book.image}" alt="${book.title}" />
    <h2>${book.title}</h2>
    <p class="description">${book.description}</p>
  `;
} else {
  container.innerHTML = `<p>Вибрана книга не знайдена.</p>`;
}
