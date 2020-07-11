import React, { FC, useState, useEffect, Fragment, useRef } from 'react';
import { MessageSquare, X, Send } from 'react-feather';
import cx from 'classnames';

import { Classes } from './styles';
import { FadeTransition, Card, Text, Input } from '../../../../components';
import { Message, User } from '../../../../types/constants';
import WebSockets from '../../../../services/WebSockets';

interface MessagingProps {
  classes: Classes
  user: User
}

const Messaging: FC<MessagingProps> = ({ classes = {}, user = {} }) => {
  const [chatModuleOpen, setChatModuleOpen] = useState(false);
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const toggleChatModule = () => setChatModuleOpen(!chatModuleOpen);

  const sendMessage = () => {
    if (!message) return null;

    WebSockets.sendMessage(message)

    return setMessage('')
  }

  const messagesWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function getMessageHistory () {
      const messages = await WebSockets.getMessageHistory()

      if (!messages) return null;

      return setMessageHistory(messages)
    }

    getMessageHistory()

    WebSockets.whenMessageHistoryUpdates((messageHistory) => {
      setMessageHistory(messageHistory);

      if (messagesWrapper && messagesWrapper.current) {
        messagesWrapper.current.scrollTop = messagesWrapper.current.scrollHeight
      }
    })
  }, [])

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    return `${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <>
      <button className={classes.button} onClick={toggleChatModule}>
        <MessageSquare size={20} />
      </button>
      <FadeTransition in={chatModuleOpen} mountOnEnter timeout={250}>
        <Card className={classes.chat}>
          <X onClick={toggleChatModule} size={20} className={classes.closeButton} />
          <Text h4>Messages</Text>
          <div className={classes.messageWrapper} ref={messagesWrapper}>
            {
              messageHistory.map((message, i) => {
                const time = formatDate(message.timestamp);

                return (
                  <Fragment key={`${message.timestamp}-${message.from}`}>
                    <div className={cx(classes.messageBubble, {
                      [classes.myMessage as string]: message.from === user.id
                    })}>
                      {
                        (!messageHistory[i - 1] || (messageHistory[i - 1] && messageHistory[i - 1].from !== message.from)) && (
                          <Text bold caption>{message.displayName}, {time}</Text>
                        )
                      }
                      <Text>{message.content}</Text>
                    </div>
                  </Fragment>
                )
              })
            }
          </div>
          <Input
            placeholder="Send a message"
            autoFocus
            icon={<Send onClick={sendMessage} style={{ cursor: 'pointer' }} />}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onEnterPressed={sendMessage}
            width="100%"
          />
        </Card>
      </FadeTransition>
    </>
  )
}

export default Messaging;
