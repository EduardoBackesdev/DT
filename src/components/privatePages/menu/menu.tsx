import { useQuery } from "@tanstack/react-query"
import { getContacts, getFavorites } from "../../../../apis/apisCalls"
import { useState } from "react"
import { Home } from "./home/home"
import { MyRegister } from "./myRegister/myRegister"
import { Users } from "./users/users"
import { Persons } from "./persons/persons"
import { Contacts } from "./contacts/contacts"

export function Menu(){
    const [nav, setNav] = useState(0)
    const [dados, setDados] = useState(localStorage.getItem('id'))
    const {data:favorites, isLoading: isLoadingFavorites, refetch} = useQuery({
        queryKey: ['getFavorites'],
        queryFn: ()=> getFavorites(),
    })
    const {data:contacts, isLoading} = useQuery({
        queryKey: ["getContacts"], 
        queryFn: () => getContacts(dados)
    })
    const renderPage = (nav: any) => {
        switch (nav) {
            case 0:
                return <Home dataContatos={contacts} dataFavoritos={favorites} re={refetch} />;
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
    return isLoading || isLoadingFavorites ? <h2>Carregando...</h2> : (
        <div className='bg-[#d48274] h-screen w-full'>
            <header className="flex justify-around font-bold text-[#ffffff] text-2xl pb-3">
                <h2 className="cursor-pointer" onClick={() => { setNav(0) }}>Home</h2>
                <h2 className="cursor-pointer" onClick={() => { setNav(1) }}>Meu Cadastro</h2>
                <h2 className="cursor-pointer" onClick={() => { setNav(2) }}>Usuários</h2>
                <h2 className="cursor-pointer" onClick={() => { setNav(3) }}>Pessoas</h2>
                <h2 className="cursor-pointer" onClick={() => { setNav(4) }}>Contatos</h2>
                <h2 className="cursor-pointer" onClick={() => { }}>Logout</h2>
            </header>
            <div className="bg-[#ebeaea] h-[90vh]"> 
                {renderPage(nav)}
            </div>
        </div>
    )
}