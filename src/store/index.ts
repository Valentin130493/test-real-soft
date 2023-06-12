import {configureStore} from '@reduxjs/toolkit'
import cardsSlice from "./reducers/cardReducer";


export const store = configureStore({
    reducer: {
        card: cardsSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch