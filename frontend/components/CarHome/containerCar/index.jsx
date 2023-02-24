import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../src/contexts/contextAuth";
import { api } from "../../../src/services/api";
import Loading from "../../Loading";
import Car from "../Car";
import style from './containerCar.module.css';

export default function CarHome() {
    const { user, loading } = useContext(AuthContext)
    const [cars, setCars] = useState()
    const [search, setSearch] = useState('')

    console.log(search)

    useEffect(() => {
        api().get('/car')
            .then((res) => {
                setCars(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const carFilter = cars?.filter((car) => car.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    return (
        <section className={style.container}>
            <input
                className={style.search}
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            {loading &&
                <div className={style.loading}>
                    <Loading />
                </div>
            }
            <div className={style.containerCar}>

                {carFilter?.map((car) => (
                    <Car
                        key={car.id}
                        car={car}
                        id={car.id}
                        name={car.name}
                        ano={car.ano}
                        marca={car.marca}
                        descricao={car.descricao}
                        nameUser={car.user.name}
                        emailUser={car.user.email}
                        phoneUser={car.user.phone}
                    />
                ))}
            </div>
        </section>
    )
}