import React, { FC, useState, useEffect } from 'react';
import { Check, X } from 'react-feather';
import Tooltip from 'react-tooltip';

import WebSockets, { RoomUsers } from '../../../../services/WebSockets';
import theme from '../../../../utils/theme';
import { Classes } from './styles';
import { Text, Card, Modal } from '../../../../components';
import { emit } from '../../../../components/Toast';
import { User } from '../../../../types/constants';

interface UsersInRoomProps {
  classes: Classes;
  user: User
}

const UsersInRoom: FC<UsersInRoomProps> = ({ classes = {}, user = {} }) => {
  const [roomUsers, setRoomUsers] = useState<RoomUsers | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Tooltip.rebuild()

  const sendResultsInMessage = () => {
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
    WebSockets.whenRoomUpdates((roomInfo) => {
      if (roomInfo.allUsersHaveVoted) sendResultsInMessage()

      return setRoomUsers(roomInfo)
    })
  }, [])

  if (!roomUsers) return null;

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        title="Results"
        onRequestClose={() => {
          setModalIsOpen(false)
          sendResultsInMessage()
        }}
      >
        <Text>Hello</Text>
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
