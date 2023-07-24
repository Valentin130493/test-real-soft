import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {firebaseGetCards} from "../../config";
import type {PayloadAction} from '@reduxjs/toolkit'
import {CardInterface} from "../../types";


export const getCards = createAsyncThunk("cards/get", async () => {
    try {
        return await firebaseGetCards();
    } catch (error: any) {
        throw new Error(error.message);
    }
})


interface CardsState {
    cards: CardInterface[],
    card: CardInterface | null,
    loading: boolean,
    error: string | null;
}

const initialState: CardsState = {
    cards: [],
    card: null,
    loading: false,
    error: null
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.cards = state.cards.concat(action.payload)
        },
        getCard: (state, action) => {
            const [card] = state.cards.filter((item => item.id === action.payload))
            state.card = card
        },
        setCard:(state)=>{
            state.card = null;
        },
        setCardFav: (state, action) => {
            state.cards = state.cards.map((item) => {
                if (item.id === action.payload.id) {
                    return {...item, is_fav: action.payload.is_fav}
                } else {
                    return item
                }
            })
            const card = {...state.card, is_fav: action.payload.is_fav}
            // @ts-ignore
            state.card = card
        },


    },
    extraReducers: (builder => {
        builder.addCase(getCards.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCards.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.cards = action.payload
        })
        builder.addCase(getCards.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message ?? "Something went wrong";
        })
    })
})

export const {addCard, getCard, setCard, setCardFav} = cardsSlice.actions

export default cardsSlice.reducer