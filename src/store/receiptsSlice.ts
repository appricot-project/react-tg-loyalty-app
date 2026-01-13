import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { mockReceipts } from "@/mocks/mockReceiptAPI";
import type { Receipt, ReceiptStatus } from "@/types";

interface ReceiptsState {
  error: string | null;
  isLoading: boolean;
  items: Receipt[];
  uploadProgress: number;
}

const initialState: ReceiptsState = {
  error: null,
  isLoading: false,
  items: mockReceipts,
  uploadProgress: 0,
};

export const receiptsSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {
    addReceipt(state, action: PayloadAction<Receipt>) {
      state.items.push(action.payload);
      state.uploadProgress = 0;
    },

    updateReceiptStatus(state, action: PayloadAction<{ id: string; status: ReceiptStatus }>) {
      const receipt = state.items.find((receipt) => receipt.id === action.payload.id);
      if (receipt) {
        receipt.status = action.payload.status;
      }
    },

    deleteReceipt(state, action: PayloadAction<string>) {
      state.items = state.items.filter((receipt) => receipt.id !== action.payload);
    },

    clearReceipts(state) {
      state.items = [];
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },

    loadReceipts(state, action: PayloadAction<Receipt[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addReceipt,
  updateReceiptStatus,
  deleteReceipt,
  clearReceipts,
  setLoading,
  setError,
  setUploadProgress,
  loadReceipts,
} = receiptsSlice.actions;

export default receiptsSlice.reducer;
