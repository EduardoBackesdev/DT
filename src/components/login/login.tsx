import { FormEvent } from "react"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import './login.css'
import logo from '../../assets/logo-metaway.png'
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../../apis/apisCalls";
import { useNavigate } from "react-router-dom";
import useSignIn from 'react-auth-kit/hooks/useSignIn';



export function Login() {
    const navigate = useNavigate()
    const signIn = useSignIn();
    const {mutate} = useMutation({mutationFn: (e:any) => postLogin(e),
        onSuccess: (e:any)=>{
            if(signIn({
                auth: {
                    token: e.accessToken,
                    type: e.tokenType
                },
                userState: {
                    name: e.username,
                    uid: e.id
                }
            })){
                // Redirect or do-something
                navigate("/menu")
            }else {
                //Throw error
                console.log("error")
            }
        },
        onError: (e:any)=>{
            console.log(e)
        }
     })
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const dataObj: any = {}
        data.forEach((value, key) => {
            dataObj[key] = value
        })
        mutate(dataObj)
    }
    return (
        <div className='bg h-screen w-full flex items-center justify-center'>
            <div className="flex justify-center">
                <div className="text-white rounded-md w-full flex flex-row pt-10 pb-10 bg-[#0e0d0d75] logincard ">
                    <div className="flex justify-center items-center flex-col w-1/2 border-r-2">
                        <img className="imgcrs" src={logo}/>
                    </div>
                    <form onSubmit={handleSubmit} className="flex justify-center w-1/2">
                        <div className="w-[70%] flex flex-col gap-[80px]">
                                <div className="userInputHold flex relative ">
                                <FaUser className="absolute right-0 top-[50%] translate-y-[-50%] w-fit h-fit text-bluecontrast text-2xl" />
                                <input placeholder="Usuario" name="username" type="text" className="placeholder:text-white w-full outline-none text-2xl text-white border-b-2 border-[#E5E7EB] bg-transparent" required />
                                </div>
                                <div className="passwordInputHold flex relative">
                                <RiLockPasswordFill className="absolute right-0 top-[50%] translate-y-[-50%] w-fit h-fit text-bluecontrast text-2xl" />
                                <input placeholder="Senha" name="password" autoComplete="off" type="password" className="placeholder:text-white w-full outline-none text-2xl text-white border-b-2 border-[#E5E7EB] bg-transparent" required />
                                </div>
                                <button className="text-center bg-[#39bb39] rounded-xl h-12 bg-bluecontrast font-bold">Login</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
)
}