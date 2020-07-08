import React, { FC } from 'react';
import { Image, ExternalLink, Heart, MapPin, Phone, CreditCard, Check, X, Clock } from 'react-feather';

import { Text, Button, Card } from '../../../../../../components';
import theme from '../../../../../../utils/theme';
import { Restaurant } from '../../../../../../types/constants';
import StarRating from '../StarRating';
import { Classes } from './styles';

interface RestaurantCardProps {
  restaurant: Restaurant;
  classes: Classes
  onSelect: () => void;
  selected: boolean;
  disabled: boolean;
}

const RestaurantCard: FC<RestaurantCardProps> = ({
  restaurant = {},
  classes = {},
  onSelect = () => {},
  selected = false,
  disabled = false,
}) => (
  <Card className={classes.restaurantCard}>
    <div className={classes.imageWrapper}>
      <div className={classes.restaurantImg} style={{ backgroundImage: `url(${restaurant.thumbnail})` }}>
        {!restaurant.thumbnail && <Image size={50} />}
      </div>
      <div className={classes.buttonsWrapper}>
        <a href={restaurant.menuUrl} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
          <Button secondary style={{ width: '100%' }} icon={<ExternalLink />}>
            View Menu
          </Button>
        </a>
        <Button secondary={!selected} disabled={disabled} onClick={onSelect} icon={<Heart />}>
          { selected ? 'Unfavourite' : 'Favourite' }
        </Button>
      </div>
    </div>
    <div className={classes.infoWrapper}>
      <Text h4 style={{ marginBottom: 8 }}>{restaurant.name}</Text>
      <Text caption>{restaurant.cuisines}</Text>
      <div style={{ margin: '8px 0' }}>
        <StarRating rating={restaurant?.averageRating} />
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
  </Card>
)

export default RestaurantCard;
