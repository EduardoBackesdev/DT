import { FormEvent, useState } from "react"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import './login.css'
import logo from '../../assets/logo-metaway.png'
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../../apis/apisCalls";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ErrorLogin } from "./errorLogin";
import { showLoginError } from "../../store/conterSlice";



export function Login() {
    const dis = useDispatch()
    const error = useSelector((s:RootState)=>s.counter.loginError.show)
    const [manter, setManter] = useState(false)
    const navigate = useNavigate()
    const {mutate} = useMutation({mutationFn: (e:{}) => postLogin(e),
        onSuccess: (e:any)=>{
                 localStorage.setItem("id", e.id)
                 localStorage.setItem("token", e.accessToken)
                 navigate("/menu")
                 window.location.reload();
        },
        onError: () => {
            dis(showLoginError())
        }
     })
    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const dataObj: any = {}
        data.forEach((value, key) => {
            dataObj[key] = value
        })
         mutate(dataObj)
         
    }
    return(
        <div className='bg h-screen w-full flex items-center justify-center'>
            {error && <ErrorLogin/>}
            {!error && <div className="flex justify-center">
                <div className="text-white rounded-md w-full flex flex-row pt-10 pb-10 bg-[#0e0d0d75] logincard ">
                    <div className="flex justify-center items-center flex-col w-1/2 border-r-2">
                        <img className="imgcrs" src={logo}/>
                    </div>
                    <form onSubmit={handleSubmit} className="flex justify-center w-1/2">
                        <div className="w-[70%] flex flex-col gap-12">
                                <div className="userInputHold flex relative ">
                                <FaUser className="absolute right-0 top-[50%] translate-y-[-50%] w-fit h-fit text-bluecontrast text-2xl" />
                                <input placeholder="Usuario" name="username" type="text" className="placeholder:text-white w-full outline-none text-2xl text-white border-b-2 border-[#E5E7EB] bg-transparent" required />
                                </div>
                                <div className="passwordInputHold flex relative">
                                <RiLockPasswordFill className="absolute right-0 top-[50%] translate-y-[-50%] w-fit h-fit text-bluecontrast text-2xl" />
                                <input placeholder="Senha" name="password" autoComplete="off" type="password" className="placeholder:text-white w-full outline-none text-2xl text-white border-b-2 border-[#E5E7EB] bg-transparent" required />
                                </div>
                                <div className="flex gap-4 text-xl">
                                    <h2>Manter conectado</h2>
                                    <input  type="checkbox" onChange={(e:any)=>{setManter(e.target.checked) }} />
                                </div>
                                <button className="text-center bg-[#39bb39] rounded-xl h-12 bg-bluecontrast font-bold">Login</button>
                            </div>
                    </form>
                </div>
            </div>}
            
        </div>
)
}