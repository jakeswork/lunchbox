export type Func<R> = ((data: any) => R)

export type User = {
  username?: string;
  id?: string;
  room?: Room;
}

export type City = {
  id: number;
  name: string;
  area: string;
}

export type Room = {
  id: string;
  city: City;
}

export type Cuisine = {
  id: number;
  name: string;
}
