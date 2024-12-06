import { useDispatch } from "react-redux"
import { hideModalCreatePersons, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import { FormEvent, useState } from "react";
import InputMask from 'react-input-mask'
import { useMutation } from "@tanstack/react-query";
import { createOrAttPerson } from "../../../../../apis/apisCalls";

export function CreatePersons(){
    const dis = useDispatch()
    const {mutate} = useMutation({
        mutationKey:['createPers'],
        mutationFn: (e:{})=> createOrAttPerson(e),
        onSuccess: ()=>{
            dis(showModalNotify())
        },
        onError: ()=>{
            dis(showModalNotifyError())
        }
    })

    const [cpf, setCpf] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState(0);
    const [pais, setPais] = useState("");
    const [nome, setNome] = useState("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const res = {
            cpf: cpf,
            endereco: {
              bairro: bairro,
              cep: cep ,
              cidade:  cidade,
              estado: estado,
              id: 0,
              logradouro: logradouro,
              numero: ~~numero ,
              pais: pais ,
            },
            foto: {
              id: "37e610b5-0bb0-4cb5-a4c2-cf9566591a38",
              name: "foto.png",
              type: "image/png"
            },
            id: 0,
            nome: nome ,
          } 
          mutate(res)
          
    }


    return (
        <div className="h-full w-full flex justify-center mt-10 fixed">
        <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
            <div className="flex justify-end ">
                <div onClick={() => {
                    dis(hideModalCreatePersons())
                }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                    <h2>X</h2>
                </div>
            </div>
            <div className="h-[90%]">
                            <form onSubmit={handleSubmit} className="p-3 rounded-xl h-full flex flex-col gap-7">
                                    <div className="text-xl overflow-auto h-full p-3 bg-[#d4d3d342] flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <span className="font-bold">Nome:</span>
                                        </div>
                                        <input required type="text" onChange={(e:any)=>{setNome(e.target.value)}}
                                         placeholder="Digite o novo nome" className="placeholder:text-black outline-none pl-3" />
                                         <div className="flex gap-3">
                                            <span className="font-bold">CPF: </span>
                                         </div>
                                         <InputMask 
                                        required
                                        mask="999.999.999-99"
                                        onChange={(e:any) => setCpf(e.target.value)}
                                        className="placeholder:text-black w-full rounded-xl pl-3"
                                        placeholder="Digite o novo CPF"
                                        /> 
                                        <div className="flex gap-3">
                                        <span className="font-bold">Bairro: </span>
                                        </div>
                                        <input required type="text" onChange={(e:any)=>{setBairro(e.target.value)}} 
                                        placeholder="Digite o novo Bairro" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                            <span className="font-bold">CEP: </span> 
                                        </div>

                                        <InputMask 
                                        required
                                        mask="99999-999"
                                        onChange={(e:any)=>{setCep(e.target.value)}}
                                        className="placeholder:text-black w-full rounded-xl pl-3"
                                        placeholder="Digite o novo CEP"
                                        />
                                        
                                        <div className="flex gap-3">
                                            <span className="font-bold">Cidade: </span>   
                                        </div>
                                        <input required type="text" onChange={(e:any)=>{setCidade(e.target.value)}} 
                                        placeholder="Digite a nova cidade" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Estado: </span>
                                        </div>
                                        <input required type="text" onChange={(e:any)=>{setEstado(e.target.value)}} 
                                        placeholder="Digite o novo estado" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Logradouro: </span>
                                        </div>
                                        <input required type="text" onChange={(e:any)=>{setLogradouro(e.target.value)}} 
                                        placeholder="Digite o novo logradouro" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Número: </span>
                                        </div>
                                        <input required type="text" onChange={(e:any)=>{setNumero(e.target.value)}} 
                                        placeholder="Digite o novo número" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Pais: </span>
                                        </div>      
                                        <input required type="text" onChange={(e:any)=>{setPais(e.target.value)}} 
                                        placeholder="Digite o novo País" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex justify-center">
                                        <button className="bg-green-500 p-3 rounded-xl w-full font-bold">Salvar</button>
                                    </div>
                                    </div>
                                </form>

                        </div>
        </div>
    </div>
    )
}