import { useMutation } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { postSearchUser } from "../../../../../apis/apisCalls";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIdAlterUser, showModalAlterUsers, showModalUsers } from "../../../../store/conterSlice";
import { Expired } from "../../../expired";
import { Navigate } from "react-router";

export function Users() {
    const dis = useDispatch()
    const [data, setData] = useState<[]>()
    const {mutate} = useMutation({
    mutationFn: (e:{})=> postSearchUser(e),
    onSuccess: (s:any)=>{
        setData(s)
    }       
    })
    useEffect(()=>{
        mutate('')
    }, [])
    return Expired() ? <Navigate to='/'/> : (
        <div className="w-full h-full flex flex-col gap-2">
            <div className=" text-3xl font-bold text-[#666464]">
                <div className="flex justify-center text-3xl font-bold text-[#666464]">
                    <h2>Lista de usuários</h2>
                </div>
                <div className="flex justify-center gap-3">
                    <p onClick={() => { dis(showModalUsers()) }} className="text-lg">Clique para criar novo usuário</p>
                    <FaUser onClick={() => { dis(showModalUsers()) }} className="cursor-pointer text-2xl text-green-500" />
                </div>
            </div>
            <div className="flex justify-center">
                <input onChange={(e)=>{mutate({termo: e.target.value})}} className="w-[50%] bg-[#a19f9f] placeholder:text-black h-7 rounded-xl pl-3" type="text" placeholder="Pesquise pelo usuário" />
            </div>
            <div className="h-[90%] overflow-auto">
                {data?.map((e:any)=>{
                    return (
                        <div className="p-3">
                            <div onClick={()=>{
                                dis(showModalAlterUsers())
                                dis(setIdAlterUser(e.id))
                                }} className="rounded-xl border w-full border-black p-2 ">
                                    <h2 className="font-bold"><span className="text-yellow-600">Nome:</span> {e.nome}</h2>
                                </div> 
                        </div>
                    )
                })}
            </div>
        </div>
    )
}