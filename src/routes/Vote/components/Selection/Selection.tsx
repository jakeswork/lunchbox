import React, { FC } from 'react';
import { Check, Trash2, ThumbsUp } from 'react-feather';

import { Card, Text, Button } from '../../../../components';
import WebSockets from '../../../../services/WebSockets'
import { User, Restaurant } from '../../../../types/constants';
import { Classes } from './styles';
import theme from '../../../../utils/theme';
import { OptionalUserPayload } from '../../../../reducers/user/types';

interface SelectionProps {
  user: User
  classes: Classes;
  setUser: (arg0: OptionalUserPayload) => void;
}

const Selection: FC<SelectionProps> = ({ user = {}, classes = {}, setUser = () => {} }) => {
  const updateSelection = async (restaurant: Restaurant) => {
    const updatedSelection = await WebSockets.updateSelection(restaurant);

    return setUser(updatedSelection)
  }

  const confirmSelection = async () => {
    const confirmed = await WebSockets.confirmSelection()

    return setUser(confirmed)
  }

  return (
    <Card>
      <Text grey caption>Your Selection</Text>
      <div className={classes.selectionWrapper}>
        {
          user.vote && user.vote.selection.length > 0
            ? user.vote.selection.map(restaurant => (
              <div className={classes.restaurantListItem} key={restaurant.id}>
                <Text bold>{restaurant.name}</Text>
                {
                  !user.vote?.hasConfirmedSelection && (
                    <Trash2 color={theme.colorRed} size={16} onClick={() => updateSelection(restaurant)} />
                  )
                }
              </div>
            ))
            : (
              <>
                <Text bold>There's nothing here yet.</Text>
                <Text>Select <b>between one and three</b> restaurants to submit your vote.</Text>
              </>
            )
        }
      </div>
      <Button
        disabled={!user.vote?.selection.length}
        success={user.vote?.hasConfirmedSelection}
        icon={user.vote?.hasConfirmedSelection ? <Check /> : <ThumbsUp />}
        style={{ width: '100%' }}
        onClick={confirmSelection}
      >
        { user.vote?.hasConfirmedSelection ? "Vote Submitted" : `I'm Ready` }
      </Button>
    </Card>
  );
}

export default Selection;
