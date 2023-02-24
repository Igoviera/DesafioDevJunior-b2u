import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import CarHome from "../components/CarHome/containerCar";
import Header from "../components/Header";
import Modal from "../components/modal";
import EditarCar from "../components/modal/editar";
import { AuthContext } from "../src/contexts/contextAuth";

export default function Home() {
  const { ismodal, ismodalEditar, editarCar } = useContext(AuthContext)
  const router = useRouter()
  const [token, setToken] = useState()

  // useEffect(() => {
  //   const { 'nextauth.token': token } = parseCookies()
  //   if (token) {
  //     setToken(token)
  //   }else{
  //      router.push('/login')
  //   }
  // }, [])

  return (
    <>
     
          <Header />
          {ismodal && <Modal />}
          {ismodalEditar && <EditarCar editarCar={editarCar} />}
          <CarHome />
        
     
    </>
  )
}
