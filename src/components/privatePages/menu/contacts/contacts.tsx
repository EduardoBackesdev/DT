import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { FaSearch, FaTrashAlt } from "react-icons/fa"
import { resetTypeContact, setModalContacts, setTypeContact, showModalContacts, showModalNotify, showModalNotifyError, showModalSearchContacts } from "../../../../store/conterSlice"
import { UserCard } from "../home/userCard"
import { useMutation } from "@tanstack/react-query"
import { getContacts } from "../../../../../apis/apisCalls"
import { useEffect, useState } from "react"

export function Contacts() {
    const dis = useDispatch()
    const [data, setData] = useState([])
    const {mutate} = useMutation({
        mutationKey: ['searchContactsFinish'],
        mutationFn: (e:any)=>getContacts(e),
        onSuccess: (e:any)=>{
            setData(e)
            dis(showModalNotify())
        },
        onError: ()=>{
            dis(showModalNotifyError())
        }
    })
    useEffect(()=>{
        mutate('')
    },[])
    
    const modalShow = useSelector((s:RootState)=>s.counter.modalContacts.show)
    return (
        <div className="w-full">
            <div className=" text-3xl font-bold text-[#666464]">
                <div className="flex justify-center text-3xl font-bold text-[#666464]">   
                    <h2>Contatos</h2>
                </div>  
                <div className="flex justify-center">
                    <p className="text-lg">Pesquise pelo contato</p>

                </div>
                <input onChange={(e:any)=>{mutate(e.target.value)}} type="text" />
            </div>
            <div>
            {modalShow && <UserCard />}
                <div className="w-full" >
                    <div className="flex justify-center">
                        <h2>Contatos</h2>
                    </div>
                    <div className="p-5 gap-7 w-full flex flex-col">
                 {data?.map((e:any)=>{
                    console.log(e)
                            return ( 
                                <>
                                <div onClick={()=>{
                                    dis(showModalContacts())
                                    dis(setModalContacts(e))
                                    dis(resetTypeContact())
                                    dis(setTypeContact("normal"))
                                }} className="rounded-xl border w-full border-black p-2 flex justify-between">
                                    <h2 className="font-bold"><span className="text-yellow-600">Nome:</span> {e.pessoa.nome}</h2>
                                    <FaTrashAlt onClick={()=>{
                                        mutate(e.id)
                                    }} className="text-red-600 text-xl" />
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