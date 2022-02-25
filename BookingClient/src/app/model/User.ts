export class User {
  // @ts-ignore
  id: number;
  // @ts-ignore
  name: string;

  constructor(id?: number, name?: string) {
    if (id) {
      this.id = id;
    }
    if (name) {
      this.name = name;
    }
  }
}
