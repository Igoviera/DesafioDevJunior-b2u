import style from './login.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from '../../src/contexts/contextAuth';
import { useContext } from 'react';
import Link from 'next/link';
import Loading from '../Loading';

const schema = yup.object({
    email: yup.string().required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
}).required();


export default function Login() {
    const { signIn, loading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        await signIn(data)
    }

    return (
        <>
            {loading &&
                <div className={style.loading}>
                    <Loading />
                </div>
            }
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className={style.tituloLogin}>Login</h2>
                    <label>Email:</label>
                    <input
                        type="text"
                        placeholder="Digite seu email"
                        {...register("email", { required: true })}
                    />
                    <span
                        className={style.msgError}>
                        {errors.email?.message}
                    </span>
                    <label>Senha:</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        {...register("password", { required: true })}
                    />
                    <span
                        className={style.msgError}>
                        {errors.password?.message}
                    </span>
                    <p className={style.LinkCadastrar} >Não tem conta? <Link href="/cadastrar"> cadastre-se</Link></p>
                    <button type='submit'>Entrar</button>
                </div>
            </form>
        </>

    )
}