import { useDispatch, useSelector} from "react-redux"
import { hideModalContacts, resetModalContacts } from "../../../../store/conterSlice"
import './home.css'
import { RootState } from "../../../../store/store"
import { useQuery } from "@tanstack/react-query"
import { getDownloadPhoto } from "../../../../../apis/apisCalls"

export function UserCard(){
    const dis = useDispatch()
    const data = useSelector((s:RootState)=>s.counter.dataContacts.data)
    const {data: photo, isLoading} = useQuery({
        queryKey:['photo'],
        queryFn: ()=> getDownloadPhoto(data[0].endereco.id)})
    return isLoading ? <h2>Carregando</h2> : (
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
                <div>
                    {data.map((e:any)=>{
                        return (
                            <div>
                                <div>
                                    <img src={photo.uri} alt="" />
                                </div>
                                <div className="flex justify-center">
                                    <h2 className="text-xl"><span className="font-bold text-xl">Nome: {e.nome} </span></h2>
                                </div>
                                <div className="p-3 rounded-xl">
                                    <div className="text-xl p-3 bg-[#d4d3d342] flex flex-col">
                                        <span className="font-bold">Bairro: </span>
                                        <input type="text" value={e.endereco.bairro} className="outline-none pl-3" />
                                        <span className="font-bold">CEP: </span> 
                                        <input type="text" value={e.endereco.cep} className="outline-none pl-3" />
                                        <span className="font-bold">Cidade: </span>
                                        <input type="text" value={e.endereco.cidade} className="outline-none pl-3" />
                                        <span className="font-bold">Estado: </span>
                                        <input type="text" value={e.endereco.estado} className="outline-none pl-3" />
                                        <span className="font-bold">Logradouro: </span>
                                        <input type="text" value={e.endereco.logradouro} className="outline-none pl-3" />
                                        <span className="font-bold">Numero: </span>
                                        <input type="text" value={e.endereco.numero} className="outline-none pl-3" />
                                        <span className="font-bold">Pais: </span>
                                        <input type="text" value={e.endereco.pais} className="outline-none pl-3" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}