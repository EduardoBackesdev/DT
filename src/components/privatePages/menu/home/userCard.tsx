import { useDispatch, useSelector} from "react-redux"
import { hideModalContacts, resetModalContacts, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import './home.css'
import { RootState } from "../../../../store/store"
import { useMutation, useQuery} from "@tanstack/react-query"
import { getDownloadPhoto, postCreateAtt, postCreateAttFav } from "../../../../../apis/apisCalls"
import { FormEvent, useState } from "react"
import InputMask from 'react-input-mask'
import { Loading } from "../../../loading/loading"

export function UserCard({re, reContacts}:any){
    const tipo = useSelector((s:RootState)=>s.counter.tipeContact.tipo)
    const dis = useDispatch()
    const {mutate: mutFav} = useMutation({
        mutationFn: (e:{})=> postCreateAttFav(e),
        onSuccess: ()=>{   
            dis(hideModalContacts())
            dis(showModalNotify())
            re()
            
        },
        onError: () => {
            dis(showModalNotifyError())
        }
    })
    const {mutate: mutNormal} = useMutation({
        mutationFn: (e:{})=> postCreateAtt(e),
        onSuccess: () => {   
            reContacts()
            dis(hideModalContacts())
            dis(showModalNotify())
            
        },
        onError: () => {
            dis(showModalNotifyError())
        }
    })
    const data = useSelector((s:RootState)=>s.counter.dataContacts.data)
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [nome, setNome] = useState("")
    const [bairro, setBairro] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [numero, setNumero] = useState("")
    const [pais, setPais] = useState("")
    const [telefone, setTelefone] = useState("")
    
    const { data: photo, isLoading } = useQuery({
    queryKey: ['photo'],
    queryFn: ()=>getDownloadPhoto(data[0].pessoa.id)})
    
const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const res = {
        email: email === "" ? data[0].email : email,
        id: data[0].id,
        pessoa: {
            cpf: cpf === "" ? data[0].pessoa?.cpf : cpf,
            endereco: {
            bairro: bairro === "" ? data[0].pessoa?.endereco?.bairro : bairro,
            cep: cep === "" ? data[0].pessoa?.endereco?.cep : cep,
            cidade: cidade === "" ? data[0].pessoa?.endereco?.cidade : cidade,
            estado: estado === "" ? data[0].pessoa?.endereco?.estado : estado,
            id: data[0].pessoa?.endereco?.id,
            logradouro: logradouro === "" ? data[0].pessoa?.endereco?.logradouro : logradouro,
            numero: numero === "" ? data[0].pessoa?.endereco?.numero : numero,
            pais: pais === "" ? data[0].pessoa?.endereco?.pais : pais,
            },
            foto: {
                id: data[0].pessoa.foto?.id,
                name: data[0].pessoa.foto?.name,
                type: data[0].pessoa.foto?.type,
            },
            id: data[0].pessoa.id,
            nome: nome === "" ? data[0].pessoa?.nome : nome,
        },
        privado: data[0].privado,
        tag: data[0].tag,
        telefone: telefone,
        tipoContato: data[0]?.tipoContato,
        usuario: {
            cpf: data[0].usuario.cpf,
            dataNascimento: data[0].usuario.dataNascimento,
            email: data[0].usuario.email,
            id: data[0].usuario.id,
            nome: data[0].usuario.nome,
            password: data[0].usuario.password,
            telefone: data[0].usuario?.telefone,
            username: data[0].usuario.username   
            }
}
    mutNormal(res)
}
const handleSubmitFav = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const res = {
        email: email === "" ? data[0].email : email,
        id: data[0].id,
        pessoa: {
            cpf: cpf === "" ? data[0].pessoa?.cpf : cpf,
            endereco: {
            bairro: bairro === "" ? data[0].pessoa?.endereco?.bairro : bairro,
            cep: cep === "" ? data[0].pessoa?.endereco?.cep : cep,
            cidade: cidade === "" ? data[0].pessoa?.endereco?.cidade : cidade,
            estado: estado === "" ? data[0].pessoa?.endereco?.estado : estado,
            id: data[0].pessoa?.endereco?.id,
            logradouro: logradouro === "" ? data[0].pessoa?.endereco?.logradouro : logradouro,
            numero: numero === "" ? data[0].pessoa?.endereco?.numero : numero,
            pais: pais === "" ? data[0].pessoa?.endereco?.pais : pais,
            },
            foto: {
                id: data[0].pessoa.foto?.id,
                name: data[0].pessoa.foto?.name,
                type: data[0].pessoa.foto?.type,
            },
            id: data[0].pessoa.id,
            nome: nome === "" ? data[0].pessoa?.nome : nome,
        },
        privado: data[0].privado,
        tag: data[0].tag,
        telefone: telefone,
        tipoContato: data[0]?.tipoContato,
        usuario: {
            cpf: data[0].usuario.cpf,
            dataNascimento: data[0].usuario.dataNascimento,
            email: data[0].usuario.email,
            id: data[0].usuario.id,
            nome: data[0].usuario.nome,
            password: data[0].usuario.password,
            telefone: data[0].usuario?.telefone,
            username: data[0].usuario.username   
            }
}
    mutFav(res)
}
    return isLoading ? <Loading/> : (
        <div className=" h-full flex justify-center">
            <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
                <div className="flex justify-end ">
                    <div  onClick={()=>{
                    dis(hideModalContacts())
                    dis(resetModalContacts())
                }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                        <h2>X</h2>
                    </div>
                </div>
                <div className="h-[80%]">
                    {data.map((e:any)=>{
                        return (
                            <div className="h-full">
                                <form onSubmit={tipo === "normal" ? handleSubmit : handleSubmitFav} className="p-3 rounded-xl h-full flex flex-col gap-2">
                                    <div className="h-[30%] flex justify-center">
                                        <img src={URL.createObjectURL(photo)} className="h-full rounded-lg " alt="" />
                                    </div>
                                    <div className="text-xl overflow-auto h-full p-3 bg-[#d4d3d342] flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <span className="font-bold">Nome: </span>
                                            <h2>{e.pessoa.nome}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setNome(e.target.value)}}
                                         placeholder="Digite o novo nome" className="placeholder:text-black outline-none pl-3" />
                                         <div className="flex gap-3">
                                            <span className="font-bold">CPF: </span>
                                            <h2>{e.pessoa.cpf}</h2>
                                         </div>
                                         <InputMask
                                        mask="999.999.999-99"
                                        onChange={(e:any) => setCpf(e.target.value)}
                                        className="placeholder:text-black w-full rounded-xl pl-3"
                                        placeholder="Digite o novo CPF"
                                        /> 
                                        <div className="flex gap-3">
                                         <span className="font-bold">Telefone: </span>
                                         <h2>{e.telefone}</h2>
                                        </div> 
                                         <InputMask
                                            mask="(99) 99999-9999"
                                            onChange={(e:any) => setTelefone(e.target.value)}
                                            className="placeholder:text-black w-full rounded-xl pl-3"
                                            placeholder="(XX) XXXXX-XXXX"
                                            /> 
                                        <div className="flex gap-3">
                                        <span className="font-bold">Bairro: </span>
                                        <h2>{e.pessoa.endereco.bairro}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setBairro(e.target.value)}} 
                                        placeholder="Digite o novo Bairro" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                            <span className="font-bold">CEP: </span> 
                                            <h2>{e.pessoa.endereco.cep}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setCep(e.target.value)}} 
                                        placeholder="Digite o novo Cep" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                            <span className="font-bold">Cidade: </span>   
                                            <h2>{e.pessoa.endereco.cidade}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setCidade(e.target.value)}} 
                                        placeholder="Digite a nova cidade" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Estado: </span>
                                        <h2>{e.pessoa.endereco.estado}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setEstado(e.target.value)}} 
                                        placeholder="Digite o novo estado" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Logradouro: </span>
                                        <h2>{e.pessoa.endereco.logradouro}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setLogradouro(e.target.value)}} 
                                        placeholder="Digite o novo logradouro" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Número: </span>
                                        <h2>{e.pessoa.endereco.numero}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setNumero(e.target.value)}} 
                                        placeholder="Digite o novo número" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Pais: </span>
                                        <h2>{e.pessoa.endereco.pais}</h2>
                                        </div>      
                                        <input type="text" onChange={(e:any)=>{setPais(e.target.value)}} 
                                        placeholder="Digite o novo País" className="placeholder:text-black outline-none pl-3" />
                                        <div className="flex gap-3">
                                        <span className="font-bold">Email: </span>
                                        <h2>{e.email}</h2>
                                        </div>
                                        <input type="text" onChange={(e:any)=>{setEmail(e.target.value)}} 
                                        placeholder="Digite o novo email" className="placeholder:text-black outline-none pl-3" />
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