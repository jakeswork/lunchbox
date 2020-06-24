export type Func<R> = ((data: any) => R)

export type User = {
  username?: string;
  id?: string;
  room?: Room;
}

export type Location = {
  id: number;
  name: string;
  area: string;
}

export type Room = {
  id: string;
  location: Location;
}
