import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type User } from '../../../interfaces'

export type UserState = {
  user: User
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // HACK: reducerは肥大化したらファイル分けたくなるかも
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    reset(): UserState {
      return initialState
    },
  },
})

export const { updateUser, reset } = userSlice.actions
export default userSlice.reducer