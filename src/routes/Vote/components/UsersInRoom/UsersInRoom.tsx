import React, { FC, useState, useEffect } from 'react';
import { Check, X } from 'react-feather';
import Tooltip from 'react-tooltip';

import WebSockets, { RoomUsers } from '../../../../services/WebSockets';
import theme from '../../../../utils/theme';
import { Classes } from './styles';
import { Text, Card } from '../../../../components';
import { User } from '../../../../types/constants';

interface UsersInRoomProps {
  classes: Classes;
  user: User
}

const UsersInRoom: FC<UsersInRoomProps> = ({ classes = {}, user = {} }) => {
  const [roomUsers, setRoomUsers] = useState<RoomUsers | null>(null)

  WebSockets.onRoomUsersUpdate((updated) => setRoomUsers(updated))

  useEffect(() => {
    Tooltip.rebuild()
  })

  if (!roomUsers) return null;

  return (
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
  )
}

export default UsersInRoom;
