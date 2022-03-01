export class Room {
  // @ts-ignore
  id: number;
  // @ts-ignore
  name: string;
  // @ts-ignore
  location: string;
  capacities: Array<LayoutCapacity>;

  constructor(name?: string, location?: string, id?: number) {
    if (name) {
      this.name = name;
    }
    if (location) {
      this.location = location;
    }
    if (id) {
      this.id = id;
    }
    this.capacities = new Array<LayoutCapacity>();
  }

  addLayoutCapacity(layoutCapacity: LayoutCapacity): void {
    this.capacities.push(layoutCapacity);
  }
}

export class LayoutCapacity {
  layout: Layout;
  capacity: number

  constructor(layout: Layout, capacity: number) {
    this.layout = layout;
    this.capacity = capacity;
  }
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}
