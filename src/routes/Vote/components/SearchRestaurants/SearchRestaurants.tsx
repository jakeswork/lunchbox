import React, { FC, Fragment, useEffect, useState } from 'react';
import { Search } from 'react-feather';

import Zomato from '../../../../services/Zomato';
import { Restaurant, User } from '../../../../types/constants';
import { Input } from '../../../../components';
import { Classes } from './styles';

interface SearchRestaurantsProps {
  user: User;
  classes: Classes;
}

const SearchRestaurants: FC<SearchRestaurantsProps> = ({ user, classes = {} }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [restaurantCatalogue, setRestaurantCatalogue] = useState<Restaurant[]>([])

  useEffect(() => {
    async function fetchData () {
      const { room: { city: { id }, cuisines } } = user;
      const response = await Zomato.getRestaurantsByCityId(id.toString(), cuisines)

      if (!response) return null;

      return setRestaurantCatalogue(response.restaurants);
    }

    if (user && user.room) fetchData()
  }, [user])

  return (
    <Fragment>
      <Input
        width="100%"
        placeholder="Search for a restaurant"
        icon={<Search />}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
      {
        restaurantCatalogue.map(restaurant => (
          <div>{JSON.stringify(restaurant)}</div>
        ))
      }
    </Fragment>
  )
}

export default SearchRestaurants;
