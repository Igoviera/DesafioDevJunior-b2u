import style from './car.module.css';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useContext } from 'react';
import { api } from '../../../src/services/api';
import { AuthContext } from '../../../src/contexts/contextAuth';

export default function Car({ name, marca, ano, descricao, id, car, nameUser, emailUser, phoneUser }) {
    const { setIsmodalEditar, setEditarCar } = useContext(AuthContext)

    function modalEditar(car) {
        setEditarCar(car)
        setIsmodalEditar(true)
    }

    function deleteCar(id) {
        api().delete(`/car/${id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={style.containerCar}>
            <div className={style.containerDescricao}>
                <div className={style.containerItem}>
                    <h3>Nome:</h3>
                    <p>{name}</p>
                </div>

                <div className={style.containerItem}>
                    <h3>Marca:</h3>
                    <p>{marca}</p>
                </div>

                <div className={style.containerItem}>
                    <h3>Ano:</h3>
                    <p>{ano}</p>
                </div>
            </div>
            <div className={style.containerItem}>
                <h3>Descrição:</h3>
                <p>{descricao}</p>
            </div>

            <div className={style.containerDescricao}>
                <div className={style.containerItem}>
                    <h3>Dono:</h3>
                    <p>{nameUser}</p>
                </div>
                <div className={style.containerItem}>
                    <h3>Telefone:</h3>
                    <p>{phoneUser}</p>
                </div>
            </div>


            <div className={style.containerItem}>
                <h3>Email:</h3>
                <p>{emailUser}</p>
            </div>

        </div>
    )
}