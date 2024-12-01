import { createSlice } from '@reduxjs/toolkit';

type b = {

}

interface a {


}

const initialState = {
    modalContacts: {
        show:false
    },
    modalSearchContacts: {
        show: false
    },
    dataContacts: {
        data: [{  
            endereco:"",
            foto: {id: "",
                   name: "",
                   type: ""},
            id: "",
            nome: ""       
        } ] as any[]
    }

}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
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
    showModalContacts,
    hideModalContacts,
    resetModalContacts,
    setModalContacts,
    hideModalSearchContacts,
    showModalSearchContacts
} = counterSlice.actions;

export default counterSlice.reducer;
