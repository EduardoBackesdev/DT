import { useMutation } from "@tanstack/react-query";
import { deletePerson, returnPersonsFilter } from "../../../../../apis/apisCalls";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPersonsId, showModalAlterPersons, showModalCreatePersons, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { Expired } from "../../../expired";
import { Navigate } from "react-router";

export function Persons() {
    const dis = useDispatch()
    const {mutate:del} = useMutation({
        mutationKey: ['deletePerson'],
        mutationFn: (e:number)=> deletePerson(e),
        onSuccess: ()=>{
            dis(showModalNotify())
        },
        onError: ()=>{
            dis(showModalNotifyError())
        }
    })
    const [data, setData] = useState<[]>()
    const {mutate} = useMutation({
        mutationKey: ['filterPersons'],
        mutationFn: (e:{})=> returnPersonsFilter(e),
        onSuccess: (e:any)=>{
            setData(e)
        }
    })
    useEffect(()=>{
        mutate('')
    }, [])
    return Expired() ? <Navigate to='/'/> : (
        <div className="w-full h-full flex flex-col gap-2">
            <div className=" text-3xl font-bold text-[#666464]">
                <div className="flex justify-center text-3xl font-bold text-[#666464]">
                    <h2>Lista de pessoas</h2>         
                </div>
                <div className="flex justify-center gap-3">
                <span className="text-xl">Clique no nome para alterar... ou clique e crie um novo registro de pessoa</span>
                <FaUser onClick={()=>{dis(showModalCreatePersons())}} className="cursor-pointer text-2xl text-green-500" />
                </div>
            </div>
            <div className="flex justify-center">
                <input onChange={(e)=>{mutate({nome: e.target.value})}} className="w-[50%] bg-[#a19f9f] placeholder:text-black h-7 rounded-xl pl-3" type="text" placeholder="Pesquise pela pessoa" />
            </div>

            <div className="h-[90%] overflow-auto">
                {data?.map((e:any)=>{
                    return (
                        <div className="p-3">
                            <div className=" rounded-xl border w-full border-black p-2 flex justify-between">
                                    <h2 className="font-bold cursor-pointer" onClick={()=>{
                                dis(setPersonsId(e.id))
                                dis(showModalAlterPersons())
                                }}><span className="text-yellow-600">Nome:</span> {e.nome}</h2>
                                    <FaTrashAlt onClick={()=>{
                                        del(e.id)
                                        }} className="text-red-600 text-xl cursor-pointer" />
                                </div> 
                        </div>
                    )
                })}
            </div>
        
        </div>
    )
}