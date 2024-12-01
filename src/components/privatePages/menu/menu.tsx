import { useQuery } from "@tanstack/react-query"
import { getContacts, getFavorites } from "../../../../apis/apisCalls"
import { useState } from "react"
import { Home } from "./home/home"

export function Menu(){
    const [dados, setDados] = useState(localStorage.getItem('id'))
    const {data:favorites, isLoading: isLoadingFavorites} = useQuery({
        queryKey: ['getFavorites'],
        queryFn: ()=> getFavorites()
    })
    const {data:contacts, isLoading} = useQuery({
        queryKey: ["getContacts"], 
        queryFn: () => getContacts(dados)
    })
    return isLoading || isLoadingFavorites ? <h2>Carregando...</h2> : (
        <div className='bg-[#d48274] h-screen w-full'>
            <header className="flex justify-around font-bold text-[#ffffff] text-2xl pb-3">
                <h2>Home</h2>
                <h2>Meu Cadastro</h2>
                <h2>Usuários</h2>
                <h2>Pessoas</h2>
                <h2>Contatos</h2>
                <h2>Logout</h2>
            </header>
            <div className="bg-[#ebeaea] h-[90vh]"> 
                   <Home dataContatos={contacts} dataFavoritos={favorites} />
            </div>
        </div>
    )
}