import { City, Cuisine, Restaurant } from '../types/constants';
import isLocalhost from '../utils/isLocalhost';

const serverUrl = isLocalhost ? 'http://localhost:5000' : 'https://appetite-server.herokuapp.com'

interface SearchParams {
  [k: string]: string
}

interface RestaurantMetaData {
  totalResults: number;
  hasMoreResults: boolean;
  nextPageStart: number;
}

export interface RestaurantListWithMetaData {
  metadata: RestaurantMetaData;
  restaurants: Restaurant[];
}

class Zomato {
  static async get (endpoint: string, params: SearchParams): Promise<Response | null | undefined> {
    const url = new URL(`${serverUrl}${endpoint}`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    try {
      const response = await fetch(url.toString())

      return response || null
    } catch (error) {
      console.error(error)
    }
  }

  static async searchCities (query: string): Promise<City[]> {
    const response = await Zomato.get('/api/v1/cities', {
      searchQuery: query
    })

    if (!response) return []

    return response.json()
  }

  static async getCuisinesByCityId (cityId: string): Promise<Cuisine[]> {
    const response = await Zomato.get('/api/v1/cuisines', { cityId })

    if (!response) return []

    return response.json()
  }

  static async getRestaurants (
    cityId: string,
    cuisines?: number[],
    query?: string,
    paginationStart?: number,
  ): Promise<RestaurantListWithMetaData | null> {
    const params: SearchParams = {
      cityId,
    };

    if (cuisines) params.cuisines = cuisines.toString();

    if (query) params.searchQuery = query;

    if (paginationStart) params.paginationStart = paginationStart.toString();

    const response = await Zomato.get('/api/v1/restaurants/search', params)

    if (!response) return null

    return response.json()
  }
}

export default Zomato
