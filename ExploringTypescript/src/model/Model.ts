export enum SubjectArea {
  ART,
  HISTORY,
  SCIENCE,
  LITERATURE
}

export enum CustomSubjectArea {
  ART = 'Arts and Crafts',
  HISTORY = 'History',
  SCIENCE = 'Science and Maths',
  LITERATURE = 'Classic Literature'
}

export class Book {
  readonly id: number = 101;
  title: string;
  author: string;
  private _price: number;

  constructor(author: string, title?: string) {
    this.author = author;
    if (title) {  // optional parameter
      this.title = title;
    }
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      console.log('Price must be > 0');
    }
  }

  toString(): string {
    return `title: "${this.title}", author: "${this.author}"`;
  }

  priceWithTax(taxRate: number): number {
    return this._price * (1 + taxRate);
  }
}

export class Video {
  title: string;
  author: string;
  price: number;
}
