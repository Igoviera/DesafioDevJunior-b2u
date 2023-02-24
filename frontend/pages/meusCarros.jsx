import { useContext } from "react";
import ContainerCar from "../components/containerCar";
import Header from "../components/Header";
import Modal from "../components/modal";
import EditarCar from "../components/modal/editar";
import { AuthContext } from "../src/contexts/contextAuth";

export default function MeusCarros() {
    const { ismodal, ismodalEditar, editarCar, isUser } = useContext(AuthContext)

    return (
        <div>
            <Header />
            {ismodal && <Modal />}
            {ismodalEditar && <EditarCar editarCar={editarCar} />}
            {isUser &&
                <ContainerCar />
            }
        </div>
    )
}