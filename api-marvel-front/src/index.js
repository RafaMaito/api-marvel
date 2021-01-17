import axios from 'axios';

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
  async getCharacters() {
    try {
      const url = `http://localhost:3333/characters/${this.offset}`;
      const result = await axios.get(url);
      this.populate(result.data.characters);
      this.paginate(result.data.total);
    } catch (error) {
      console.log(error);
    }
  }
  async searchCharacter() {
    try {
      console.log('teste');
      const url = `http://localhost:3333/characters/char/${this.name.value}`;
      console.log(url);
      const result = await axios.get(url);
      console.log(result);
      this.populate(result.data);
      this.paginate(result.data.total);
    } catch (error) {
      console.log(error);
    }
  }
  populate(data) {
    this.charContent.innerHTML = '';

    data.forEach((item) => {
      if (item.thumbnail.path.includes('image_not_available')) {
        const tr = `<input type="image" class="img-button" width="100" data-id="${item.id}" src="./img/marvel_logo.jpg">`;
        this.charContent.innerHTML += tr;
      } else {
        const tr = `<input type="image" class="img-button" width="100" data-id="${item.id}"src="${item.thumbnail.path}.${item.thumbnail.extension}">`;
        this.charContent.innerHTML += tr;
      }
    });
    for (let img of document.getElementsByClassName('img-button')) {
      img.onclick = (event) => {
        console.log(event.target.dataset.id);
        for (const char of data) {
          this.charContent.innerHTML = '';
          if (parseInt(event.target.dataset.id) === char.id) {
            if (char.thumbnail.path.includes('image_not_available')) {
              let comics = '';
              let description = '';

              for (let index = 0; index < char.comics.items.length; index++) {
                comics += `<li class="card-text">${char.comics.items[index].name}</li>`;
              }
              if (char.description === '') {
                description = 'Not Informed';
              } else {
                description = char.description;
              }
              const output = `<div class="col-12 d-flex" >
                                <div>
                                    <img src="./img/marvel_logo.jpg"  width="800" alt="...">
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title">${char.name}</h5>
                                  <p><span class="fw-bold">Description: </span>${description}</p>
                                  <p class="fw-bold">Comics:</p>
                                  <ul>${comics}</ul>
                                  <a href="http://localhost:8080" class="btn btn-primary">Back</a>
                                </div>
                              </div>`;
              this.charContent.innerHTML += output;

              return;
            } else {
              let comics = '';
              let description = '';

              for (let index = 0; index < char.comics.items.length; index++) {
                comics += `<li class="card-text">${char.comics.items[index].name}</li>`;
              }

              if (char.description === '') {
                description = 'Not Informed';
              } else {
                description = char.description;
              }
              const output = `<div class="col-12 d-flex" >
                                <div>
                                    <img src="${char.thumbnail.path}.${char.thumbnail.extension}" class="card-img-top" alt="...">
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title">${char.name}</h5>
                                  <p><span class="fw-bold">Description: </span>${description}</p>
                                  <p class="fw-bold">Comics:</p>
                                  <ul>${comics}</ul>
                                  <a href="http://localhost:8080" class="btn btn-primary">Back</a>
                                </div>
                              </div>`;
              this.charContent.innerHTML += output;

              return;
            }
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
