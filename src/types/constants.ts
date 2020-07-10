export type Func<R> = ((data: any) => R)

export type UserVote = {
  hasConfirmedSelection: boolean;
  selection: Restaurant[];
}

export type User = {
  username?: string;
  id: string;
  room: Room;
  vote: UserVote;
}

export type City = {
  id: number;
  name: string;
  area: string;
}

export type Room = {
  id: string;
  city: City;
  cuisines: number[];
  users?: string[];
  messages?: Message[];
}

export type Message = {
  from: string;
  displayName?: string;
  timestamp: string;
  content: string;
}

export type Cuisine = {
  id: number;
  name: string;
}

export type Restaurant = {
  id: number;
  name: string;
  address?: string,
  averageCostForTwo?: number;
  priceRange?: number;
  image?: string;
  thumbnail?: string;
  menuUrl?: string;
  hasOnlineDelivery?: boolean;
  hasTableBooking?: boolean;
  url?: string;
  cuisines?: string;
  highlights?: string[];
  phoneNumbers?: string;
  openHours?: string;
  deliveryOpen?: boolean;
  takeawayOpen?: boolean;
  totalReviews?: number;
  averageRating?: number;
  photosUrl?: string;
}
