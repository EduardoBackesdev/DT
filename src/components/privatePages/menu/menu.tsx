import { useQuery } from "@tanstack/react-query"
import { getContacts, getFavorites } from "../../../../apis/apisCalls"
import { useState } from "react"
import { Home } from "./home/home"
import { MyRegister } from "./myRegister/myRegister"

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
                <h2 className="cursor-pointer" onClick={() => { setNav(5) }}>Logout</h2>
            </header>
            <div className="bg-[#ebeaea] h-[90vh]"> 
                {renderPage(nav)}
            </div>
        </div>
    )
}