import { City } from '../types/constants';

const serverUrl = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:5000'

interface SearchParams {
  [k: string]: string
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

  static async searchCities (query: string): Promise<Array<City> | null> {
    const response = await Zomato.get('/api/v1/cities', {
      searchQuery: query
    })

    if (!response) return null

    return response.json()
  }
}

export default Zomato
