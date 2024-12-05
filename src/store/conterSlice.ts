import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    createNewContatc: {
        show: false
    },
    createPersons: {
        show: false
    },
    modalAlterPersons: {
      show: false  
    },
    personsId: {
        id: 0
    },
    loginError: {
        show: false
    },
    idAlterUser: {
        id: 0
    },
    modalAlterUsers: {
        show: false
    },
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
    showModalCreateContact: (state)=>{
        state.createNewContatc.show = true
    },
    hideModalCreateContact: (state)=>{
        state.createNewContatc.show = false
    },
    showModalCreatePersons: (state)=>{
        state.createPersons.show = true
    },
    hideModalCreatePersons: (state)=>{
        state.createPersons.show = false
    },
    showModalAlterPersons: (state)=>{
        state.modalAlterPersons.show = true  
    },
    hideModalAlterPersons: (state)=>{
        state.modalAlterPersons.show = false  
    },
    setPersonsId: (state, p)=>{
        state.personsId.id = p.payload
    },
    resetPersonsId: (state)=>{
        state.personsId.id = 0
    },
    showLoginError:(state)=>{
        state.loginError.show = true
    },
    hideLoginError:(state)=>{
        state.loginError.show = false
    },
    setIdAlterUser: (state, p)=>{
        state.idAlterUser.id = p.payload
    },
    resetIdAlterUser: (state)=>{
        state.idAlterUser.id = NaN
    },
    showModalAlterUsers:(state)=>{
        state.modalAlterUsers.show = true
    },
    hideModalAlterUsers:(state)=>{
        state.modalAlterUsers.show = false
    },
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
        state.modalNotifyError.show = true
    },
    hideModalNotifyError: (state)=>{
        state.modalNotifyError.show = false
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
    hideModalUsers,
    hideModalAlterUsers,
    showModalAlterUsers,
    resetIdAlterUser,
    setIdAlterUser,
    hideLoginError,
    showLoginError,
    resetPersonsId,
    setPersonsId,
    hideModalAlterPersons,
    showModalAlterPersons,
    hideModalCreatePersons,
    showModalCreatePersons,
    hideModalCreateContact,
    showModalCreateContact
} = counterSlice.actions;

export default counterSlice.reducer;
