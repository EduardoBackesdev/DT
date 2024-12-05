import { useDispatch } from 'react-redux'
import './home.css'
import { hideModalSearchContacts, setModalContacts, showModalContacts } from '../../../../store/conterSlice'
import { useMutation } from '@tanstack/react-query'
import { postSearchAllContacts } from '../../../../../apis/apisCalls'
import { useEffect, useState } from 'react'

export function SearchContacts(){
    const dis = useDispatch()
    const [data, setData] = useState([])
    const {mutate} = useMutation({
        mutationFn: (e:{})=> postSearchAllContacts(e),
        onSuccess: (e:any)=>{
            setData(e)
        }
    })
    useEffect(() => {
        mutate('')
    }, [])
    return (
        <div className="h-full w-full flex justify-center mt-10 fixed">
            <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
                <div className="flex justify-end ">
                    <div  onClick={()=>{
                        dis(hideModalSearchContacts())
                }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                        <h2>X</h2>
                    </div>
                </div>
                <div className='h-[90%]'>
                    <div className='flex justify-center p-3'>
                        <input onChange={(e)=>{navigator.onLine && mutate({termo: e.target.value})}} placeholder='Digite o contato' className='bg-[#ffffff] w-full h-10 text-xl pl-3 outline-none rounded-lg' type="text" />
                    </div>
                    <div className='p-3 overflow-auto h-[70%] md:h-[80%]'>
                        {data?.map((e:any)=>{
                            return (
                                <div className='p-2'>
                                    <div onClick={()=>{
                                        dis(showModalContacts())
                                        dis(setModalContacts(e))
                                        }} className="rounded-xl border flex justify-between bg-white w-full border-black p-2">
                                        <h2 className="font-bold">Nome: {e.pessoa.nome}</h2>
                                    </div>
                                </div>
                            )
                        })}
                    </div>   
                </div>
            </div>
        </div>
    )
}