import { useQuery } from "@tanstack/react-query"
import { getContacts, getFavorites, getReturnDataUser } from "../../../../apis/apisCalls"
import { useState } from "react"
import { Home } from "./home/home"
import { MyRegister } from "./myRegister/myRegister"
import { Users } from "./users/users"
import { Persons } from "./persons/persons"
import { Contacts } from "./contacts/contacts"
import { SearchContacts } from "./home/searchContatcts"
import { Notify } from "../../notify/notify"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { CreateUser } from "./users/createUser"

export function Menu(){
    const modalUsers = useSelector((s:RootState)=>s.counter.modalUsers.show)
    const modalNotify = useSelector((s:RootState)=> s.counter.modalNotify.show)
    const modalSearchContactsShow = useSelector((s:RootState)=> s.counter.modalSearchContacts.show)
    const [nav, setNav] = useState(0)
    const [dados, setDados] = useState(localStorage.getItem('id'))
    const [id, setId] = useState(localStorage.getItem('id'))
    const {data, isLoading: isLoadingUser} = useQuery({
        queryKey: ['myRegister'],
        queryFn: ()=> getReturnDataUser(Number(id))
    })
    const {data:favorites, isLoading: isLoadingFavorites, refetch} = useQuery({
        queryKey: ['getFavorites'],
        queryFn: ()=> getFavorites(),
    })
    const {data:contacts, isLoading, refetch: refetchContacts} = useQuery({
        queryKey: ["getContacts"], 
        queryFn: () => getContacts(dados)
    })
    const renderPage = (nav: any) => {
        switch (nav) {
            case 0:
                return <Home dataContatos={contacts} dataFavoritos={favorites} re={refetch} reContacts={refetchContacts} />;
            case 1:
                return <MyRegister />;
            case 2:
                return <Users />;
            case 3:
                return <Persons />;
            case 4:
                return <Contacts />;      
        }
    };
    console.log(data)
    return isLoading || isLoadingFavorites || isLoadingUser ? <h2>Carregando...</h2> : (
        <div className='bg-[#d48274] h-screen w-full'>
            <div className="flex flex-col justify-center pt-2">
                <header className="flex justify-around font-bold  text-2xl pb-3">
                    <h2 className={`${ nav === 0 ? "text-green-400" : "text-[#ffffff]"} cursor-pointer`} onClick={() => { setNav(0) }}>Home</h2>
                    <h2 className={`${ nav === 1 ? "text-green-400" : "text-[#ffffff]"} cursor-pointer`} onClick={() => { setNav(1) }}>Meu Cadastro</h2>
                    {data?.object.tipos.includes("ROLE_ADMIN") && <h2 className={`${ nav === 2 ? "text-green-400" : "text-[#ffffff]"} cursor-pointer`} onClick={() => { setNav(2) }}>Usuários</h2>}
                    <h2 className={`${ nav === 3 ? "text-green-400" : "text-[#ffffff]"} cursor-pointer`} onClick={() => { setNav(3) }}>Pessoas</h2>
                    <h2 className={`${ nav === 4 ? "text-green-400" : "text-[#ffffff]"} cursor-pointer`} onClick={() => { setNav(4) }}>Contatos</h2>
                    <h2 className="cursor-pointer bg-red-500 p-1 rounded-lg" onClick={() => { }}>Logout</h2>
                </header>
            </div>
            <div className="bg-[#ebeaea] h-[90vh]"> 
                {modalUsers && <CreateUser />}
                {modalSearchContactsShow && <SearchContacts/>}    
                {modalNotify && <Notify/>}
                {renderPage(nav)}
            </div>

        </div>
    )
}