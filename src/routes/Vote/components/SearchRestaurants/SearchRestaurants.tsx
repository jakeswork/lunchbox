import React, { FC, Fragment, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Search, MapPin, Phone, CreditCard, Check, X, Heart, Image, Clock, Star, ExternalLink } from 'react-feather';
import InfiniteScroll from 'react-infinite-scroll-component';

import theme from '../../../../utils/theme';
import Zomato, { RestaurantListWithMetaData } from '../../../../services/Zomato';
import { User } from '../../../../types/constants';
import { Input, Button, Text } from '../../../../components';
import { Classes } from './styles';

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

  const Stars = ({ rating = 0 }) => {
    const props = {
      size: 20
    }
    const ratings = [1, 2, 3, 4, 5];
    const stars = ratings.map((r) => {
      if (r < rating) return <Star {...props} fill={theme.colorAmber} color={theme.colorAmber} />

      return <Star {...props} color={theme.colorGrey} />
    })

    return (
      <div style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }}>
        {stars}
      </div>
    )
  }

  const LoadingCard = () => {
    const num = () => {
      const min = Math.ceil(150);
      const max = Math.floor(300);

      return Math.floor(Math.random() * (max - min)) + min;
    }

    return (
      <div className={classes.restaurantCard}>
        <ContentLoader height={260} width={600}>
          <rect x="0" y="0" rx="4" ry="4" width="225" height="136" />
          <rect x="0" y="150" rx="4" ry="4" width="225" height="46" />
          <rect x="0" y="210" rx="4" ry="4" width="225" height="46" />
          <rect x="248" y="0" rx="1" ry="1" width="160" height="27" />
          <rect x="248" y="35" rx="1" ry="1" width="64" height="14" />
          <rect x="320" y="35" rx="1" ry="1" width="72" height="14" />
          <rect x="248" y="56" rx="1" ry="1" width="108" height="24" />
          <rect x="248" y="88" rx="1" ry="1" width={num()} height="20" />
          <rect x="248" y="118" rx="1" ry="1" width={num()} height="20" />
          <rect x="248" y="148" rx="1" ry="1" width={num()} height="20" />
          <rect x="248" y="178" rx="1" ry="1" width={num()} height="20" />
          <rect x="248" y="208" rx="1" ry="1" width={num()} height="20" />
          <rect x="248" y="236" rx="1" ry="1" width={num()} height="20" />
        </ContentLoader>
      </div>
    )
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
              { restaurantCatalogue && restaurantCatalogue.restaurants.map(restaurant => (
                <div className={classes.restaurantCard} key={restaurant.id}>
                  <div className={classes.imageWrapper}>
                    <div className={classes.restaurantImg} style={{ backgroundImage: `url(${restaurant.thumbnail})` }}>
                      {!restaurant.thumbnail && <Image size={50} />}
                    </div>
                    <div className={classes.buttonsWrapper}>
                      <a href={restaurant.menuUrl} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                        <Button secondary style={{ width: '100%' }} icon={<ExternalLink />}>View Menu</Button>
                      </a>
                      <Button secondary icon={<Heart />}>Favourite</Button>
                    </div>
                  </div>
                  <div className={classes.infoWrapper}>
                    <Text h4 style={{ marginBottom: 8 }}>{restaurant.name}</Text>
                    <Text caption>{restaurant.cuisines}</Text>
                    <div style={{ margin: '8px 0' }}>
                      <Stars rating={restaurant?.averageRating} />
                      <Text className={classes.inlineText}>({restaurant.totalReviews} reviews)</Text>
                    </div>
                    <div className={classes.bullet}>
                      <MapPin size={16} className={classes.bulletIcon} />
                      <Text className={classes.inlineText}>{restaurant.address}</Text>
                    </div>
                    <div className={classes.bullet}>
                      <Phone size={16} className={classes.bulletIcon} /> 
                      <Text className={classes.inlineText}>{restaurant.phoneNumbers}</Text>
                    </div>
                    <div className={classes.bullet}>
                      <CreditCard size={16} className={classes.bulletIcon} /> 
                      <Text className={classes.inlineText}>Around £{restaurant.averageCostForTwo} for two</Text>
                    </div>
                    <div className={classes.bullet}>
                      { restaurant.deliveryOpen
                          ? <Check size={16} color={theme.colorGreen} className={classes.bulletIcon} />
                          : <X size={16} color={theme.colorRed} className={classes.bulletIcon} />
                      }
                      <Text className={classes.inlineText}>
                        Delivery {restaurant.deliveryOpen ? 'available' : 'unavailable'}</Text>
                    </div>
                    <div className={classes.bullet}>
                      { restaurant.takeawayOpen
                          ? <Check size={16} color={theme.colorGreen} className={classes.bulletIcon} />
                          : <X size={16} color={theme.colorRed} className={classes.bulletIcon} />
                      }
                      <Text className={classes.inlineText}>
                        Collection {restaurant.takeawayOpen ? 'available' : 'unavailable'}
                      </Text>
                    </div>
                    <div className={classes.bullet}>
                      <Clock size={16} className={classes.bulletIcon} />
                      <Text className={classes.inlineText}>{restaurant.openHours}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )
        }
      </div>
    </Fragment>
  )
}

export default SearchRestaurants;
