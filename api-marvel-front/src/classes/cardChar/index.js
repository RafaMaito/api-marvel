export default class CardChar {
  constructor(data) {
    const { thumbnail, comics, name, description } = data;
    this.name = name;
    this.thumbnail = thumbnail;
    this.comics = comics;
    this.description = description;
  }
  createCardChar() {
    let comics = '';
    let description = '';
    let output = '';
    let hasImg = '';
    if (this.thumbnail.path.includes('image_not_available')) {
      hasImg = `./img/marvel_logo.jpg`;
    } else {
      hasImg = `${this.thumbnail.path}.${this.thumbnail.extension}`;
    }
    const comDes = this.hasComicsDescription(comics, description);
    output = `<div class="col-12 d-flex" >
                                <div>
                                    <img src="${hasImg}"  width="800" alt="...">
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title">${this.name}</h5>
                                  <p><span class="fw-bold">Description: </span>${comDes.description}</p>
                                  <p class="fw-bold">Comics:</p>
                                  <ul>${comDes.comics}</ul>
                                  <a href="http://localhost:8080" class="btn btn-primary">Back</a>
                                </div>
                              </div>`;

    return output;
  }

  hasComicsDescription(comics, description) {
    for (let index = 0; index < this.comics.items.length; index++) {
      comics += `<li class="card-text">${this.comics.items[index].name}</li>`;
    }

    if (this.description === '') {
      description = 'Not Informed';
    } else {
      description = this.description;
    }
    return {
      comics: comics,
      description: description,
    };
  }
}
