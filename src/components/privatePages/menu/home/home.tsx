import { UserCard } from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { hideModalNotifyError, resetTypeContact, setModalContacts, setTypeContact, showModalContacts, showModalCreateContact, showModalNotify, showModalNotifyError, showModalSearchContacts } from "../../../../store/conterSlice";
import { FaSearch, FaUser } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { deleteContact } from "../../../../../apis/apisCalls";

interface a {
    dataContatos: [],
    dataFavoritos: [],
    re: any,
    reContacts: any,
    page: number
}

export function Home({dataContatos, dataFavoritos, re, reContacts, page}:a){
    const dis = useDispatch()
    const {mutate} = useMutation({
        mutationFn: (e:number)=> deleteContact(e),
        onSuccess: ()=>{
            dis(showModalNotify())
        },
        onError: ()=>{
            console.log("errrinho")
            dis(showModalNotifyError())
        }
    })
    const modalShow = useSelector((s:RootState) => s.counter.modalContacts.show)
    return(
        <div className="w-full">
            <div className=" text-3xl font-bold text-[#666464]">
                <div className="flex justify-center text-3xl font-bold text-[#666464]">   
                    <h2>Contatos</h2>
                </div>  
                <div className="flex justify-center">
                    <p className="text-lg">Clique no nome para alterar... ou pesquise pelo contato</p>
                    <div className="pl-2 text-2xl">
                        <FaSearch onClick={()=> {dis(showModalSearchContacts())}} className="text-green-600 cursor-pointer" />
                    </div>
                </div>
            </div>
            {modalShow && <UserCard re={re} reContacts={reContacts}/>}
            <div className="flex">
                { page != 4 && <div className="w-full">
                    <div className="flex justify-center">
                        <h2 className="font-bold">Favoritos</h2>
                    </div>
                    <div className="p-5 gap-7 w-full flex flex-col">
                    {dataFavoritos?.map((e:any)=>{
                            return ( 
                                <>
                                <div className="rounded-xl border w-full border-black p-2 flex justify-between">
                                    <h2 onClick={()=>{
                                    dis(showModalContacts())
                                    dis(setModalContacts(e))
                                    dis(resetTypeContact())
                                    dis(setTypeContact("fav"))
                                }} className="font-bold"><span className="text-yellow-600">Nome:</span> {e.pessoa.nome}</h2>
                                    <FaTrashAlt onClick={()=>{
                                        mutate(e.id)
                                        }} className="text-red-600 text-xl cursor-pointer" />
                                </div> 
                                </>
                            )
                        })
                    }
                    </div>
                </div>}
                <div className="w-full" >
                    <div className="flex justify-center gap-3">
                        <h2 className="font-bold">Criar Contato</h2>
                        <FaUser onClick={()=>{
                            dis(showModalCreateContact())
                            dis(setModalContacts(dataContatos))
                        }} className="cursor-pointer text-2xl text-green-500" />
                    </div>
                    <div className="p-5 gap-7 w-full flex flex-col">
                    {dataContatos?.map((e:any)=>{
                            return ( 
                                <>
                                <div className="rounded-xl border w-full border-black p-2 flex justify-between">
                                    <h2 onClick={()=>{
                                    dis(showModalContacts())
                                    dis(setModalContacts(e))
                                    dis(resetTypeContact())
                                    dis(setTypeContact("normal"))
                                }} className="font-bold cursor-pointer"><span className="text-yellow-600">Nome:</span> {e.pessoa.nome}</h2>
                                    <FaTrashAlt onClick={()=>{
                                        mutate(e.id)
                                    }} className="text-red-600 text-xl cursor-pointer" />
                                </div>                               
                                </>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}