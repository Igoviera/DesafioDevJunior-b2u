import { useContext } from "react";
import { AuthContext } from "../../src/contexts/contextAuth";
import Car from "../Car";
import Loading from "../Loading";
import style from './containerCar.module.css';

export default function ContainerCar() {
    const { user, loading } = useContext(AuthContext)

    console.log(user)

    return (
        <section className={style.container}>
            {loading &&
                <div className={style.loading}>
                    <Loading />
                </div>
            }
            <h1>Meus carros</h1>
            <div className={style.containerCar}>
                
                {user?.data.cars?.map((car) => (
                    <Car
                        key={car.id}
                        car={car}
                        id={car.id}
                        name={car.name}
                        ano={car.ano}
                        marca={car.marca}
                        descricao={car.descricao}
                    />
                ))}
            </div>
        </section>
    )
}