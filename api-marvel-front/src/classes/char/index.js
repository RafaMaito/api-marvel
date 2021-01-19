export default class Char {
  constructor(data) {
    const { id, name, thumbnail } = data;
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
  }

  createChar() {
    let newChar = ``;
    let hasImg = ``;
    if (this.thumbnail.path.includes('image_not_available')) {
      hasImg = `./img/marvel_logo.jpg`;
    } else {
      hasImg = `${this.thumbnail.path}.${this.thumbnail.extension}`;
    }
    newChar = `<div class="card box1 boxtext col-md-3 ">
    <input type="image" class="img-button mt-3 box" width="100" data-id="${this.id}" title="${this.name}" src="${hasImg}">
    </div>`;
    return newChar;
  }
}

// `<li class="card box1 boxtext col-md-3 ">
//         <input type="image" class="img-responsive mt-3 box"  width="100" data-id="${this.id}"src="./img/marvel_logo.jpg">

//         ;
