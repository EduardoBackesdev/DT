import { Navigate, useNavigate } from 'react-router';

export function Disconnected(){
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('timer')
    const nav = useNavigate()
    return(
        <div className='bg h-screen w-full flex items-center justify-center'>
            <div className="flex flex-col justify-center gap-5 p-5 bg-[#e764649d] rounded-lg">
                <h2 className="text-3xl">Sua Sessão expirou faça login novamente!</h2>
                <button onClick={()=>{nav('/')}} className='bg-green-500 p-5 text-xl font-bold'>Login</button> 
            </div>
        </div>
    )
}