import { useMutation } from "@tanstack/react-query";
import { returnPersonsFilter } from "../../../../../apis/apisCalls";
import { useEffect, useState } from "react";

export function Persons() {
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
    console.log(data)
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className=" text-3xl font-bold text-[#666464]">
                <div className="flex justify-center text-3xl font-bold text-[#666464]">
                    <h2>Lista de pessoas</h2>
                </div>
            </div>
            <div className="flex justify-center">
                <input onChange={(e)=>{mutate({nome: e.target.value})}} className="w-[50%] bg-[#a19f9f] placeholder:text-black h-7 rounded-xl pl-3" type="text" placeholder="Pesquise pela pessoa" />
            </div>

            <div className="h-[90%] overflow-auto">
                {data?.map((e:any)=>{
                    return (
                        <div className="p-3">
                            <div onClick={()=>{
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