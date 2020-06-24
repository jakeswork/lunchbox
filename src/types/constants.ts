export type Func<R> = ((data: any) => R)

export type User = {
  username: string;
  id: string;
  room: string;
}

export type Location = {
  id: number;
  name: string;
  area: string;
}
