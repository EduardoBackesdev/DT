import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalUsers: {
        show: false
    },
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
        data: [{}] as any[],
    },
    tipeContact: {
        tipo: ""
    }
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    showModalUsers: (state)=>{
        state.modalUsers.show = true
    },
    hideModalUsers: (state)=>{
        state.modalUsers.show = false
    },
    setTypeContact: (state, p) =>{
        state.tipeContact.tipo = p.payload
    },
    resetTypeContact: (state) =>{
        state.tipeContact.tipo = ""
    },
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
    showModalNotify,
    resetTypeContact,
    setTypeContact,
    showModalUsers,
    hideModalUsers
} = counterSlice.actions;

export default counterSlice.reducer;
