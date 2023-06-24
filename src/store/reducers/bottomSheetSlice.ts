import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Movie } from '../../@types/movie'
import { Season, Tv } from '../../@types/tv'

// --------------------------------------------------------------------------------

const initialState: {
    movie?: Movie,
    tv?: Tv,
    season?: Season,
    isVisible?: boolean
} = {
    movie: undefined,
    tv: undefined,
    season: undefined,
    isVisible: false
}

const bottomSheetSlice = createSlice({
    name: 'bottomSheet',
    initialState,
    reducers: {

        setBottomSheetData: (state, action: PayloadAction<typeof initialState>) => {
            state.movie = action.payload.movie
            state.tv = action.payload.tv
            state.season = action.payload.season
            state.isVisible = true
        },

        resetBottomSheetData: (state) => {
            state.movie = undefined
            state.tv = undefined
            state.season = undefined
        },

        hideBottomSheet: (state) => {
            state.isVisible = false
        }
    }
})

export const { setBottomSheetData, resetBottomSheetData, hideBottomSheet } = bottomSheetSlice.actions

export default bottomSheetSlice.reducer