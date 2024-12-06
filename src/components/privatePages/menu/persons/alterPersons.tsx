import { useDispatch, useSelector } from "react-redux"
import { hideModalAlterPersons, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import { RootState } from "../../../../store/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createOrAttPerson, getDownloadPhoto, returnDataPersons } from "../../../../../apis/apisCalls"
import { FormEvent, useState } from "react"
import InputMask from 'react-input-mask'

export function AlterPersons(){
    const dis = useDispatch()
    const personId = useSelector((s:RootState)=> s.counter.personsId.id)
    const {mutate} = useMutation({
        mutationKey: ['alterPersonsOrCreate'],
        mutationFn: (e:{})=> createOrAttPerson(e),
        onSuccess: ()=>{
            dis(showModalNotify())
        },
        onError: ()=>{
            dis(showModalNotifyError())
        }
    })
    const {data, isLoading} = useQuery({
        queryKey: ['searchPersonsData'],
        queryFn: ()=> returnDataPersons(personId),
    }) 
    const { data: photo, isLoading:photoLoading } = useQuery({
        queryKey: ['photo2'],
        queryFn: ()=>getDownloadPhoto(personId)})
    const arr = [data]
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
            cpf: cpf === "" ? data?.object.cpf : cpf,
            endereco: {
              bairro: bairro === "" ? data?.object.endereco?.bairro : bairro,
              cep: cep === "" ? data?.object.endereco?.cep : cep,
              cidade:  cidade === "" ? data?.object.endereco?.cidade : cidade,
              estado: estado === "" ? data?.object.endereco?.estado : estado,
              id: data?.object.endereco?.id,
              logradouro: logradouro === "" ? data?.object.endereco?.logradouro : logradouro,
              numero: numero === 0 ? data?.object.endereco?.numero : ~~numero,
              pais: pais === "" ? data?.object.endereco?.pais : pais,
            },
            foto: {
              id: data?.object.foto?.id,
              name: data?.object.foto?.name,
              type: data?.object.foto?.type
            },
            id: data?.object.id,
            nome: nome === "" ? data?.object.nome : nome,
          } 
          mutate(res)
          
    }



    return isLoading || photoLoading ? <h2>Carregando...</h2> :(
        <div className="h-full w-full flex justify-center mt-10 fixed">
        <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
            <div className="flex justify-end ">
                <div onClick={() => {
                    dis(hideModalAlterPersons())
                }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                    <h2>X</h2>
                </div>
            </div>
            <div className="h-[90%]">
               {arr.map((e:any)=>{
                    return (
                        <div className="h-[90%]">
                            <form onSubmit={handleSubmit} className="p-3 rounded-xl h-full flex flex-col gap-7">
                                    <div className="text-xl overflow-auto h-full p-3 bg-[#d4d3d342] flex flex-col gap-3">
                                        <div className="h-[30%] flex justify-center">
                                            <img src={URL.createObjectURL(photo)} className="h-full rounded-lg " alt="" />
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="font-bold">Nome:</span>
                                            <h2>{e.object?.nome}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setNome(e.target.value)}}
                                         placeholder="Digite o novo nome" className="placeholder:text-black outline-none pl-3" />
                                         <div className="flex gap-3">
                                            <span className="font-bold">CPF: </span>
                                            <h2>{e.object?.cpf}</h2>
                                         </div>
                                         <InputMask
                                        mask="999.999.999-99"
                                        onChange={(e:any) => setCpf(e.target.value)}
                                        className="placeholder:text-black w-full rounded-xl pl-3"
                                        placeholder="Digite o novo CPF"
                                        /> 
                                        <div className="flex gap-3">
                                        <span className="font-bold">Bairro: </span>
                                        <h2>{e.object.endereco.bairro}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setBairro(e.target.value)}} 
                                        placeholder="Digite o novo Bairro" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                            <span className="font-bold">CEP: </span> 
                                            <h2>{e.object.endereco.cep}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setCep(e.target.value)}} 
                                        placeholder="Digite o novo Cep" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                            <span className="font-bold">Cidade: </span>   
                                            <h2>{e.object.endereco.cidade}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setCidade(e.target.value)}} 
                                        placeholder="Digite a nova cidade" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Estado: </span>
                                        <h2>{e.object.endereco.estado}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setEstado(e.target.value)}} 
                                        placeholder="Digite o novo estado" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Logradouro: </span>
                                        <h2>{e.object.endereco.logradouro}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setLogradouro(e.target.value)}} 
                                        placeholder="Digite o novo logradouro" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Número: </span>
                                        <h2>{e.object.endereco.numero}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setNumero(e.target.value)}} 
                                        placeholder="Digite o novo número" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Pais: </span>
                                        <h2>{e.object.endereco.pais}</h2>
                                        </div>      
                                        <input type="text" onChange={(e:any)=>{setPais(e.target.value)}} 
                                        placeholder="Digite o novo País" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex justify-center">
                                        <button className="bg-green-500 p-3 rounded-xl w-full font-bold">Salvar</button>
                                    </div>
                                    </div>
                                </form>

                        </div>
                    )
                })} 
            </div>
        </div>
    </div>

    )
}