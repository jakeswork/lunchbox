import React, { FC, Fragment, useEffect, useState } from 'react';
import { Search } from 'react-feather';
import InfiniteScroll from 'react-infinite-scroll-component';

import Zomato, { RestaurantListWithMetaData } from '../../../../services/Zomato';
import { User } from '../../../../types/constants';
import { Input } from '../../../../components';
import { Classes } from './styles';
import RestaurantCard from './components/RestaurantCard';
import LoadingCard from './components/LoadingCard';

interface SearchRestaurantsProps {
  user: User;
  classes: Classes;
}

const SearchRestaurants: FC<SearchRestaurantsProps> = ({ user, classes = {} }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantCatalogue, setRestaurantCatalogue] = useState<RestaurantListWithMetaData | null>(null)

  useEffect(() => {
    async function fetchData () {
      const { room: { city: { id }, cuisines } } = user;
      const response = await Zomato.getRestaurants(id.toString(), cuisines)

      if (!response) return null;

      setRestaurantCatalogue(response);

      return setIsLoading(false)
    }

    if (user && user.room) fetchData()
  }, [user])

  const searchRestaurants = async () => {
    setRestaurantCatalogue(null)
    setIsLoading(true);

    const { room: { city: { id }, cuisines } } = user;
    const response = await Zomato.getRestaurants(id.toString(), cuisines, searchQuery)

    setIsLoading(false);

    if (!response) return null;

    return setRestaurantCatalogue(response)
  }

  const paginate = async () => {
    const { room: { city: { id }, cuisines } } = user;
    const response = await Zomato.getRestaurants(
      id.toString(),
      cuisines,
      undefined,
      restaurantCatalogue?.metadata.nextPageStart
    )

    if (!response) return null;

    const existingResults = restaurantCatalogue?.restaurants

    if (existingResults) {
      const mergedLists = existingResults.concat(response.restaurants);

      return setRestaurantCatalogue({
        ...response,
        restaurants: mergedLists
      })
    }

    return setRestaurantCatalogue(response)
  }

  return (
    <Fragment>
      <Input
        width="100%"
        placeholder="Search for a restaurant"
        icon={<Search style={{ cursor: 'pointer' }} onClick={searchRestaurants} />}
        onEnterPressed={searchRestaurants}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.currentTarget.value)

          searchQuery.length > 3 && searchRestaurants()
        }}
      />
      <div className={classes.container}>
        {
          isLoading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            <InfiniteScroll
              dataLength={restaurantCatalogue ? restaurantCatalogue.restaurants.length : 0}
              next={paginate}
              hasMore={restaurantCatalogue ? restaurantCatalogue.metadata.hasMoreResults : false}
              loader={<LoadingCard />}
            >
              { restaurantCatalogue && restaurantCatalogue.restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </InfiniteScroll>
          )
        }
      </div>
    </Fragment>
  )
}

export default SearchRestaurants;
