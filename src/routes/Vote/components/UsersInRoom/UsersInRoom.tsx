import React, { FC, useState, useEffect } from 'react';
import { Check, X } from 'react-feather';
import Tooltip from 'react-tooltip';
import Confetti from 'react-dom-confetti';

import WebSockets, { RoomUsers, VoteResults } from '../../../../services/WebSockets';
import theme from '../../../../utils/theme';
import { Classes } from './styles';
import { Text, Card, Modal } from '../../../../components';
import { emit } from '../../../../components/Toast';
import { User } from '../../../../types/constants';
import RestaurantCard from '../RestaurantCard';

interface UsersInRoomProps {
  classes: Classes;
  user: User
}

const UsersInRoom: FC<UsersInRoomProps> = ({ classes = {}, user = {} }) => {
  const [roomUsers, setRoomUsers] = useState<RoomUsers | null>(null)
  const [voteResults, setVoteResults] = useState<VoteResults | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Tooltip.rebuild()

  const sendVoteFinishedNotification = () => {
    const Component = () => (
      <>
        <Text bold>The votes are in! <span role="img" aria-label="face savouring food">😋</span></Text>
        <Text>Click here to view the results.</Text>
      </>
    )

    return emit(Component, {
      autoClose: false,
      progress: 0,
      draggable: false,
      closeButton: false,
      onClick: () => setModalIsOpen(true),
    })
  }

  useEffect(() => {
    WebSockets.whenRoomUpdates(setRoomUsers)
    WebSockets.whenVoteIsFinished((results) => {
      setVoteResults(results)
      sendVoteFinishedNotification()
    })
  }, [])

  if (!roomUsers) return null;

  const confettiProps = {
    angle: 180,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "8px",
    height: "8px",
    perspective: "600px",
  }

  return (
    <>
      <div className={classes.confettiWrapper}>
        <Confetti active={modalIsOpen} config={confettiProps} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        title="Vote Results"
        onRequestClose={() => {
          setModalIsOpen(false)
          sendVoteFinishedNotification()
        }}
      >
        <Text h4>Let's eat! <span role="img" aria-label="dinner">🍽️</span></Text>
        <Text bold>Out of so many tasty choices, our top {voteResults?.mostCommonRestaurants.length === 1 ? 'pick is' : 'picks are'}...</Text>
        <div className={classes.overflow}>
          { voteResults?.mostCommonRestaurants.map(r => <RestaurantCard compact key={r.id} restaurant={r} />) }
        </div>
        <Text bold>Regardless of restaurant, most of us are in the mood for</Text>
        {voteResults?.mostCommonCuisines.map(cuisine =>
          <div className={classes.pill} key={cuisine}>
            <Text caption>{cuisine}</Text>
          </div>
        )}
      </Modal>
      <Card>
        <Tooltip
          effect="solid"
          className={classes.tooltip}
          place="top"
        /> 
        <Text grey caption>{roomUsers.count} {roomUsers.count === 1 ? 'user' : 'users'} in this vote</Text>
        <ul className={classes.list}>
          {
            (roomUsers.users || []).map(u => u && (
              <li key={u.id} className={classes.listItem}>
                { u.vote.hasConfirmedSelection
                  ? <Check size={20} color={theme.colorGreen} data-tip="Finished Voting" />
                  : <X size={20} color={theme.colorRed} data-tip="Still Browsing" />
                }
                <Text className={classes.listItemText} bold={u.id === user.id}>
                  {u.username}
                </Text>
              </li>
            ))
          }
        </ul>
      </Card>
    </>
  )
}

export default UsersInRoom;
