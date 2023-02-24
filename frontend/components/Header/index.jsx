import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { AuthContext } from '../../src/contexts/contextAuth';
import style from './header.module.css';

export default function Header() {
    const { setIsmodal, user, logout, isUser } = useContext(AuthContext)

    return (
        <header className={style.header}>
            <div>Logo</div>
            <div className={style.menu}>
                {isUser ?
                    <>
                        <p>Olá, {user?.data?.name}</p>
                        <p className={style.addCar}>
                            <Link style={{ color: 'white', textDecoration: 'none', }}
                                href={'/'}>
                                Home
                            </Link>

                        </p>
                        <p
                            className={style.addCar}
                            onClick={() => setIsmodal(true)} >
                            Adicionar carro
                        </p>

                        <p className={style.addCar}>
                            <Link style={{ color: 'white', textDecoration: 'none', }}
                                href={'/meusCarros'} >
                                Meus carros
                            </Link>
                        </p>
                        <p
                            className={style.sair}
                            onClick={logout}>Sair
                        </p>
                    </>
                    :
                    <p
                        className={style.entrar}>
                        <Link style={{ color: 'white', textDecoration: 'none', }}
                            href={'/login'} >
                            Entrar
                        </Link>
                    </p>
                }



            </div>
        </header>
    )
}