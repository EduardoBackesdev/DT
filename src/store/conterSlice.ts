import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalContacts: {
        show:false
    },
    modalSearchContacts: {
        show: false
    },
    modalNotify: {
        show: false
    },
    modalNotifyError: {
        show: false
    },
    dataContacts: {
        data: [{}] as any[]
    }
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    showModalNotifyError: (state)=>{
        state.modalNotify.show = true
    },
    hideModalNotifyError: (state)=>{
        state.modalNotify.show = false
    },
    showModalNotify: (state)=>{
        state.modalNotify.show = true
    },
    hideModalNotify: (state)=>{
        state.modalNotify.show = false
    },
    showModalSearchContacts: (state)=>{
        state.modalSearchContacts.show = true
    },
    hideModalSearchContacts: (state)=>{
        state.modalSearchContacts.show = false
    },
    showModalContacts: (state)=>{
        state.modalContacts.show = true
    },
    hideModalContacts: (state)=>{
        state.modalContacts.show= false
    },
    setModalContacts: (state, p)=>{
        state.dataContacts.data = []
        state.dataContacts.data.push(p.payload)
    },
    resetModalContacts: (state)=>{
        state.dataContacts.data = []
    }
  },
});

export const { 
    hideModalNotifyError,
    showModalNotifyError,
    showModalContacts,
    hideModalContacts,
    resetModalContacts,
    setModalContacts,
    hideModalSearchContacts,
    showModalSearchContacts,
    hideModalNotify,
    showModalNotify
} = counterSlice.actions;

export default counterSlice.reducer;
