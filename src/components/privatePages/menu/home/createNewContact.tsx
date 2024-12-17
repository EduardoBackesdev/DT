import { useMutation, useQuery } from '@tanstack/react-query'
import InputMask from 'react-input-mask'
import { getReturnDataUser, postCreateAtt } from '../../../../../apis/apisCalls'
import { useDispatch, useSelector } from 'react-redux'
import { hideModalCreateContact, showModalNotify, showModalNotifyError } from '../../../../store/conterSlice'
import { FormEvent, useState } from 'react'
import { RootState } from '../../../../store/store'
import { Loading } from '../../../loading/loading'

export function CreateNewContact({re}:any){
    const dis = useDispatch()
    const [id, setId] = useState(localStorage.getItem('id'))
    const {data:sel, isLoading: isLoadingUsers} = useQuery({
        queryKey: ['myRegisterTwo'],
        queryFn: ()=> getReturnDataUser(Number(id))
    })
    const {mutate: mutNormal} = useMutation({
        mutationFn: (e:{})=> postCreateAtt(e),
        onSuccess: ()=>{   
            dis(showModalNotify())
            re()
            
        },
        onError: ()=>{
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
const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const res = {
        email: email ,
        id: 1,
        pessoa: {
            cpf: cpf,
            endereco: {
            bairro: bairro ,
            cep: cep,
            cidade: cidade,
            estado: estado,
            id: 1,
            logradouro: logradouro,
            numero: ~~numero,
            pais: pais,
            },
            foto: {
                id: "37e610b5-0bb0-4cb5-a4c2-cf9566591a38",
                name: "foto.png",
                type: "image/png"
              },
            id: 1,
            nome: nome,
        },
        privado: true,
        tag: "Comercial",
        telefone: telefone,
        tipoContato: "CELULAR",
        usuario: sel.object.usuario
}
    mutNormal(res)
} 
    return isLoadingUsers ? <Loading/> : (
        <div className="h-full fixed flex justify-center w-full">
        <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
            <div className="flex justify-end ">
                <div  onClick={()=>{
                    dis(hideModalCreateContact())
            }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                    <h2>X</h2>
                </div>
            </div>
            <div className="h-[70%]">
                <div className='flex justify-center font-bold'>
                    Criar Contato
                </div>
                    <div className="h-full">
                        <form onSubmit={handleSubmit} className="p-3 rounded-xl h-full flex flex-col gap-7">
                            <div className="text-xl overflow-auto h-full p-3 bg-[#d4d3d342] flex flex-col gap-3">
                                <div className="flex gap-3">
                                    <span className="font-bold">Nome: </span>
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
                                    <span className="font-bold">Telefone: </span>
                                </div> 
                                    <InputMask
                                    required
                                    mask="(99) 99999-9999"
                                    onChange={(e:any) => setTelefone(e.target.value)}
                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                    placeholder="(XX) XXXXX-XXXX"
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
                                <input maxLength={2} required type="text" onChange={(e:any)=>{setPais(e.target.value)}} 
                                placeholder="Digite o novo País" className="placeholder:text-black outline-none pl-3" />
                                <div className="flex gap-3">
                                <span className="font-bold">Email: </span>
                                </div>
                                <input required type="text" onChange={(e:any)=>{setEmail(e.target.value)}} 
                                placeholder="Digite o novo email" className="placeholder:text-black outline-none pl-3" />
                                <div className="flex justify-center">
                                <button className="bg-green-500 p-3 rounded-xl w-full font-bold">Salvar</button>
                            </div>
                            </div>
                                
                            </form>
                        </div>
            </div>
        </div>
    </div>
    )


}