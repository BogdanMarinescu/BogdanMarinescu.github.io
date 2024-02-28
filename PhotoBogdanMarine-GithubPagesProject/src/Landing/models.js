export class MovieItem {
    constructor(id, title, year, description, image, author, bookmarked) {
      this.id = id;
      this.title = title;
      this.year = year;
      this.description = description;
      this.image = image;
      this.author = author;
      this.bookmarked = bookmarked;
    }

    bookmark(bookmarked) {
      this.bookmarked = bookmarked;
    }
  }