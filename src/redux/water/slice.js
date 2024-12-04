import { createSlice } from '@reduxjs/toolkit';
import {
  getDayWater,
  getMonthWater,
  addWater,
  updateWater,
  deleteWater,
  getSummaryAmount,
} from './operations';

const initialState = {
  activeDay: '',
  dayWater: { date: '', water: [] },
  monthWater: [],
  currentDay: [],
  summaryAmount: 0,
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setActiveDay: (state, action) => {
      state.activeDay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Get Day Water
      .addCase(getDayWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDayWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater = action.payload;
      })
      .addCase(getDayWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Month Water
      .addCase(getMonthWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.loading = false;
        state.monthWater = action.payload;
      })
      .addCase(getMonthWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Water
      .addCase(addWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater.water.push(action.payload);
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Water
      .addCase(updateWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater.water = state.dayWater.water.map(item =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Water
      .addCase(deleteWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater.water = state.dayWater.water.filter(
          item => item._id !== action.payload._id
        );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Summary Amount
      .addCase(getSummaryAmount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSummaryAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.summaryAmount = action.payload.totalAmount;
      })
      .addCase(getSummaryAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default waterSlice.reducer;
export const { setActiveDay } = waterSlice.actions;
