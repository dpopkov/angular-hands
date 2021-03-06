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

  isNew(): boolean {
    return this.id == null;
  }

  static fromHttp(room: Room) : Room {
    let newRoom = new Room(room.name, room.location, room.id);
    for (const lcData of room.capacities) {
      newRoom.addLayoutCapacity(LayoutCapacity.fromHttp(lcData));
    }
    return newRoom;
  }
}

export class LayoutCapacity {
  // @ts-ignore
  layout: Layout;
  // @ts-ignore
  capacity: number

  constructor(layout?: Layout, capacity?: number) {
    if (layout) {
      this.layout = layout;
    }
    if (capacity) {
      this.capacity = capacity;
    }
  }

  static fromHttp(lcData: LayoutCapacity) : LayoutCapacity {
    return new LayoutCapacity(Layout[lcData.layout], lcData.capacity);
  }
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}
