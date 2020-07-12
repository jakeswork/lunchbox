import React, { FC, Fragment, useEffect, useState } from 'react';
import { Search } from 'react-feather';
import InfiniteScroll from 'react-infinite-scroll-component';

import Zomato, { RestaurantListWithMetaData } from '../../../../services/Zomato';
import WebSockets from '../../../../services/WebSockets';
import { User, Restaurant } from '../../../../types/constants';
import { Input } from '../../../../components';
import { emit } from '../../../../components/Toast';
import { Classes } from './styles';
import RestaurantCard from '../RestaurantCard';
import LoadingCard from '../RestaurantCard/components/LoadingCard';
import { OptionalUserPayload } from '../../../../reducers/user/types';

interface SearchRestaurantsProps {
  user: User;
  classes: Classes;
  setUser: (arg0: OptionalUserPayload) => void
}

const SearchRestaurants: FC<SearchRestaurantsProps> = ({ user, classes = {}, setUser = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantCatalogue, setRestaurantCatalogue] = useState<RestaurantListWithMetaData | null>(null)

  useEffect(() => {
    async function getRestaurants () {
      const { room: { city: { id }, cuisines } } = user;
      const response = await Zomato.getRestaurants(id.toString(), cuisines)

      if (!response) return null;

      setRestaurantCatalogue(response);

      return setIsLoading(false)
    }

    if (user && user.room) getRestaurants()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchRestaurants = async () => {
    setRestaurantCatalogue(null)
    setIsLoading(true);

    const { room: { city: { id }, cuisines } } = user;
    const response = await Zomato.getRestaurants(id.toString(), cuisines, searchQuery)

    setIsLoading(false);

    if (!response) return null;

    return setRestaurantCatalogue(response)
  }

  const onSelectRestaurant = async (restaurant: Restaurant) => {
    try {
      const updatedUser = await WebSockets.updateSelection(restaurant)

      return setUser(updatedUser)
    } catch (error) {
      console.error(error)

      emit(error.message)
    }
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
        placeholder="Start typing a restaurant name, cuisine, etc"
        icon={<Search style={{ cursor: 'pointer' }} onClick={searchRestaurants} />}
        onEnterPressed={searchRestaurants}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.currentTarget.value)

          searchQuery.length > 3 && searchRestaurants()
        }}
      />
      <div className={classes.container} id="container">
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
              scrollableTarget="container"
            >
              { restaurantCatalogue && restaurantCatalogue.restaurants.map(r => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  onSelect={() => onSelectRestaurant(r)}
                  selected={user.vote.selection.findIndex(restaurant => restaurant.id === r.id) > -1}
                  disabled={user.vote.hasConfirmedSelection}
                />
              ))}
            </InfiniteScroll>
          )
        }
      </div>
    </Fragment>
  )
}

export default SearchRestaurants;
