export type Func<R> = ((data: any) => R)

export type User = {
  username?: string;
  id: string;
  room: Room;
}

export type City = {
  id: number;
  name: string;
  area: string;
}

export type Room = {
  id: string;
  city: City;
  cuisines: number[]
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
}
