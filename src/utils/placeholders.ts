import { User } from '../types/constants';

export const user: User = {
  id: '',
  room: {
    id: '',
    city: {
      id: 0,
      name: '',
      area: ''
    },
    cuisines: [],
  },
  vote: {
    hasConfirmedSelection: false,
    selection: [],
  }
}
