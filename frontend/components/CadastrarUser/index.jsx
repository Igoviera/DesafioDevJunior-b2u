import style from './login.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from '../../src/contexts/contextAuth';
import { useContext } from 'react';
import Link from 'next/link';

const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
    phone: yup.string().required('O telefone é obrigatório'),
}).required();


export default function Cadastrar() {
    const { cadastrarUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        await cadastrarUser(data)
    }

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2 className={style.tituloLogin}>Cadastrar</h2>
                <label>Nome</label>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    {...register("name", { required: true })}
                />
                <span
                    className={style.msgError}>
                    {errors.name?.message}
                </span>

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
                <label>Telefone:</label>
                <input
                    type="text"
                    placeholder="Digite seu telefone"
                    {...register("phone", { required: true })}
                />
                <span
                    className={style.msgError}>
                    {errors.phone?.message}
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
                <p><Link href="/login">Fazer login</Link></p>
                <button type='submit'>Cadastrar</button>
            </div>
        </form>
    )
}