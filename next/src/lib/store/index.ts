import { configureStore } from '@reduxjs/toolkit'
import reducer from '../store/user'

const store = configureStore({
  reducer: {
    user: reducer,
  },
}) 

export default store
export type RootState = ReturnType<typeof store.getState>;