import axios from 'axios';
import Char from './classes/char/';
import CardChar from './classes/cardChar';

class App {
  constructor() {
    this.offset = 0;
    this.charContent = document.querySelector('#chars');
    this.name = document.getElementById('input-name');
    this.buttonName = document.getElementById('button-name');
    this.buttonsEvent();
  }

  buttonsEvent() {
    this.buttonName.onclick = () => this.searchCharacter();
  }

  getCharacters() {
    this.urlBack(`http://localhost:3333/characters/${this.offset}`);
  }
  searchCharacter() {
    this.urlBack(`http://localhost:3333/characters/char/${this.name.value}`);
  }
  async urlBack(url) {
    try {
      const result = await axios.get(url);
      this.populate(result.data.results);
      this.paginate(result.data.total);
    } catch (error) {
      console.log(error);
    }
  }

  populate(data) {
    this.charContent.innerHTML = '';
    data.forEach((item) => {
      const character = new Char(item);
      this.charContent.innerHTML += character.createChar();
    });
    for (let img of document.getElementsByClassName('img-button')) {
      img.onclick = (event) => {
        for (const char of data) {
          this.charContent.innerHTML = '';
          if (parseInt(event.target.dataset.id) === char.id) {
            const cardChar = new CardChar(char);
            this.charContent.innerHTML = cardChar.createCardChar();
            return;
          }
        }
      };
    }
  }
  paginate(total) {
    document.querySelector('.pagination').innerHTML = '';
    const pages = Math.ceil(total / 100);
    for (let i = 1; i <= pages; i++) {
      const li = ` <li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      document.querySelector('.pagination').innerHTML += li;
    }
    for (let link of document.getElementsByClassName('page-link')) {
      link.onclick = (event) => {
        event.preventDefault();
        const page = event.target.dataset.page;
        this.offset = (page - 1) * 100;
        this.getCharacters();
      };
    }
  }
}

const app = new App();

app.getCharacters();
