import { useDispatch, useSelector} from "react-redux"
import { hideModalContacts, resetModalContacts, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import './home.css'
import { RootState } from "../../../../store/store"
import { useMutation, useQuery} from "@tanstack/react-query"
import { getDownloadPhoto, postCreateAtt, postCreateAttFav } from "../../../../../apis/apisCalls"
import { FormEvent, useState } from "react"

export function UserCard({re, reContacts}:any){
    const tipo = useSelector((s:RootState)=>s.counter.tipeContact.tipo)
    const dis = useDispatch()
    const {mutate: mutFav} = useMutation({
        mutationFn: (e:any)=> postCreateAttFav(e),
        onSuccess: (e:any)=>{   
            re()
            dis(hideModalContacts())
            dis(showModalNotify())
            
        },
        onError: (s:any)=>{
            dis(showModalNotifyError())
        }
    })
    const {mutate: mutNormal} = useMutation({
        mutationFn: (e:any)=> postCreateAtt(e),
        onSuccess: (e:any)=>{   
            reContacts()
            dis(hideModalContacts())
            dis(showModalNotify())
            
        },
        onError: (s:any)=>{
            dis(showModalNotifyError())
        }
    })
    const data = useSelector((s:RootState)=>s.counter.dataContacts.data)
    const [email, setEmail] = useState(data[0].email)
    const [cpf, setCpf] = useState(data[0].pessoa.cpf)
    const [nome, setNome] = useState(data[0].pessoa.nome)
    const [bairro, setBairro] = useState(data[0].pessoa.endereco.bairro)
    const [cep, setCep] = useState(data[0].pessoa.endereco.cep)
    const [cidade, setCidade] = useState(data[0].pessoa.endereco.cidade)
    const [estado, setEstado] = useState(data[0].pessoa.endereco.estado)
    const [logradouro, setLogradouro] = useState(data[0].pessoa.endereco.logradouro)
    const [numero, setNumero] = useState(data[0].pessoa.endereco.numero)
    const [pais, setPais] = useState(data[0].pessoa.endereco.pais)
    const [telefone, setTelefone] = useState(data[0].telefone)
    const res = {
        email: email,
        id: data[0].id,
        pessoa: {
            cpf: cpf,
            endereco: {
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            id: data[0].pessoa.id,
            logradouro: logradouro,
            numero: numero,
            pais: pais,
            },
            foto: {
            id: data[0].pessoa.foto.id,
            name: data[0].pessoa.foto.name,
            type: data[0].pessoa.foto.type,
            },
            id: data[0].pessoa.id,
            nome: nome,
        },
        privado: data[0].privado,
        tag: data[0].tag,
        telefone: telefone,
        tipoContato: data[0].tipoContato,
        usuario: {
            cpf: data[0].usuario.cpf,
            dataNascimento: data[0].usuario.dataNascimento,
            email: data[0].usuario.email,
            id: data[0].usuario.id,
            nome: data[0].usuario.nome,
            password: data[0].usuario.password,
            telefone: data[0].usuario.telefone,
            username: data[0].usuario.username   
            }
}
const {data:photo} = useQuery({
    queryKey: ['photo'],
    queryFn: ()=>getDownloadPhoto(data[0].pessoa.id)
})
const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    mutNormal(res)
}

const handleSubmitFav = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    mutFav(res)
}


    return (
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
                    <div className="flex justify-center">
                        <img className="h-16 w-full " src="" alt="" />
                    </div>
                    {data.map((e:any)=>{
                        return (
                            <div className="h-full">
                                <form onSubmit={tipo === "normal" ? handleSubmit : handleSubmitFav} className="p-3 rounded-xl h-full flex flex-col gap-7">
                                    <div className="text-xl overflow-auto h-full p-3 bg-[#d4d3d342] flex flex-col gap-3">
                                        <span className="font-bold">Nome: </span>
                                        <input type="text" onChange={(e:any)=>{setNome(e.target.value)}}
                                         placeholder={e.pessoa.nome} className="placeholder:text-black outline-none pl-3" />
                                         <span className="font-bold">CPF: </span>
                                        <input type="text" onChange={(e:any)=>{setCpf(e.target.value)}}
                                         placeholder={e.pessoa.cpf} className="placeholder:text-black outline-none pl-3" />
                                         <span className="font-bold">Telefone: </span>
                                        <input type="text" onChange={(e:any)=>{setTelefone(e.target.value)}} 
                                        placeholder={e.telefone} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">Bairro: </span>
                                        <input type="text" onChange={(e:any)=>{setBairro(e.target.value)}} 
                                        placeholder={e.pessoa.endereco.bairro} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">CEP: </span> 
                                        <input type="text" onChange={(e:any)=>{setCep(e.target.value)}} 
                                        placeholder={e.pessoa.endereco.cep} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">Cidade: </span>
                                        <input type="text" onChange={(e:any)=>{setCidade(e.target.value)}} 
                                        placeholder={e.pessoa.endereco.cidade} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">Estado: </span>
                                        <input type="text" onChange={(e:any)=>{setEstado(e.target.value)}} 
                                        placeholder={e.pessoa.endereco.estado} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">Logradouro: </span>
                                        <input type="text" onChange={(e:any)=>{setLogradouro(e.target.value)}} 
                                        placeholder={e.pessoa.endereco.logradouro} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">Numero: </span>
                                        <input type="text" onChange={(e:any)=>{setNumero(e.target.value)}} 
                                        placeholder={e.pessoa.endereco.numero} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">Pais: </span>
                                        <input type="text" onChange={(e:any)=>{setPais(e.target.value)}} 
                                        placeholder={e.pessoa.endereco.pais} className="placeholder:text-black outline-none pl-3" />
                                        <span className="font-bold">Email: </span>
                                        <input type="text" onChange={(e:any)=>{setEmail(e.target.value)}} 
                                        placeholder={e.email} className="placeholder:text-black outline-none pl-3" />
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