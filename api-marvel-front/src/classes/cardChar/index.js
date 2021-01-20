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
                                    <img src="${hasImg}" class="box box2" width="800" alt="...">
                                </div>
                                <div class="card-body boxtext box box4 h-100 mt-2 mt-lg-0">
                                  <p><h5 class="card-title ml-3 mt-3 fw-bold">${this.name}</h5></p>
                                  <p><span class="fw-bold">Description:</span><p>${comDes.description}</p></p>
                                  <p class="fw-bold">Comics:</p>
                                  <ul class="box">${comDes.comics}</ul>
                                  <a href="http://localhost:8080" class="btn btn-primary box0">Back</a>
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
