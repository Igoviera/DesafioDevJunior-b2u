import style from './Modal.module.css'
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from '../../src/contexts/contextAuth';
import { useContext } from 'react';
import { api } from '../../src/services/api';

const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    marca: yup.string().required('A marca é obrigatoria'),
    ano: yup.string().required('O ano é obrigatorio'),
    descricao: yup.string().required('A descrição é obrigatoria')
}).required();

export default function Modal() {
    const { setIsmodal } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        api().post('/car',data)
        setIsmodal(false)
    }

    return (
        <div className={style.containerPrincialCadastrarCliente}>
            <form className={style.containerCadastrarClient} onSubmit={handleSubmit(onSubmit)}>
                <button
                    onClick={() => setIsmodal(false)}
                    className={style.closeModelBtn}>
                    <AiFillCloseCircle size={30} color='rgb(8,23,255)' />
                </button>
                <h2 className={style.tituloNovoCliente}>Cadastrar veiculo</h2>
                <div>
                    <label className={style.label}>Nome:</label>
                    <input
                        type="text"
                        {...register('name', { require: true })}
                        placeholder='Nome do veiculo' />
                    <span className={style.msgError}>{errors.name?.message}</span>
                </div>
                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        {...register('marca', { require: true })}
                        placeholder='Marca do veiculo' />
                    <span className={style.msgError}>{errors.marca?.message}</span>
                </div>
                <div>
                    <label className={style.label}>Ano:</label>
                    <input
                        type="text"
                        {...register('ano', { require: true })}
                        placeholder='Ano do veiculo' />
                    <span className={style.msgError}>{errors.ano?.message}</span>
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        className={style.textarea}
                        type="text"
                        {...register('descricao', { require: true })}
                        placeholder='Descrição do veiculo'
                        rows="5"
                        cols="33" />

                    <span className={style.msgError}>{errors.descricao?.message}</span>
                </div>
                <div className={style.btnCadastrarClient}>
                    <button type='submit'>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}