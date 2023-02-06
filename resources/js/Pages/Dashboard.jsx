import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthMainLayout from '@/Layouts/AuthMainLayout';
import { Link, useForm } from '@inertiajs/react'
import { useState } from 'react';
import styled from 'styled-components';

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

const ModalBody = styled.div`
    line-height: 26px;
    padding: 1rem;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: #00000008;
    padding: 1rem;

    & button {
        margin-left: 12px;
    }
`;

const FormContent = styled.div`
    & div {
        display: flex;
        flex-direction: column;
        
        & input {
            padding: 0.4rem 0.8rem;
            background-color: #00000003;
            border: 1px solid #00000018;
            border-radius: 8px;
            outline: none;
        }
    }
`;

const Table = styled.table`
    background-color: #00000008;

    & thead {
        background-color: #000000CC;
        color: #FFF;
    }
    
    & th, & td {
        padding: .5rem 1rem;
        border-bottom: 1px solid #00000016;
    }
`;

const AutoListItem = ({ auto, errors }) => {
    const { data, setData, put } = useForm({ ...auto });

    console.log('data', data);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        put(route("autos.update"));
        setShowEditModal(false);
    }

    return (
        <>
            <tr className='p-6 text-gray-900'>
                <td className='' style={{ minWidth: 200 }}>{auto.modelo}</td>
                <td>{auto.cor}</td>
                <td>{auto.ano}</td>
                <td>{auto.placa}</td>
                <td style={{ borderBottom: '1px solid silver' }}>
                    <SecondaryButton type='button' onClick={() => setShowEditModal(true)}>editar</SecondaryButton>
                </td>
                <td style={{ borderBottom: '1px solid silver' }}>
                    <DangerButton type='button' onClick={() => setShowModal(true)}>remover</DangerButton>
                </td>
            </tr>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ModalHeader>
                    <h1 className='text-xl gray-900'>Tem certeza?</h1>
                </ModalHeader>
                <ModalBody>
                    Este registro não poderá ser recuperado novamente:
                    <br />
                    <strong>
                        {auto.modelo} - {auto.cor} - {auto.ano}
                    </strong>
                </ModalBody>
                <ModalFooter>
                    <SecondaryButton type='button' onClick={() => setShowModal(false)}>Cancelar</SecondaryButton>
                    <Link as='button' href={`autos/${auto.id}`} method="delete">
                        <DangerButton type='button'>
                            Continuar
                        </DangerButton>
                    </Link>
                </ModalFooter>
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                <ModalHeader>
                    <h1 className='text-xl gray-900'>Editar auto</h1>
                </ModalHeader>
                <form onSubmit={handleSubmitEdit}>
                    <ModalBody>
                        <strong>
                            [ {data.modelo}, {data.cor}, {data.ano} ]
                        </strong>

                        <FormContent className="flex flex-wrap justify-evenly my-6">
                            <div className='pb-4'>
                                <InputLabel>Modelo:</InputLabel>
                                <input type="text" value={data.modelo}
                                    onChange={(e) =>
                                        setData("modelo", e.target.value)
                                    } />
                                {errors.modelo && <span style={{ color: '#CC3333' }}>{errors.modelo}</span>}
                            </div>
                            <div className='pb-4'>
                                <InputLabel>Placa:</InputLabel>
                                <input type="text" onChange={e => setData('placa', e.target.value)} value={data.placa} />
                                {errors.placa && <span style={{ color: '#CC3333' }}>{errors.placa}</span>}
                            </div>
                            <div className='pb-4'>
                                <InputLabel>Cor:</InputLabel>
                                <input type="text" onChange={e => setData('cor', e.target.value)} value={data.cor} />
                                {errors.cor && <span style={{ color: '#CC3333' }}>{errors.cor}</span>}
                            </div>
                            <div className='pb-4'>
                                <InputLabel>Ano:</InputLabel>
                                <input type="text" onChange={e => setData('ano', e.target.value)} value={data.ano} />
                                {errors.ano && <span style={{ color: '#CC3333' }}>{errors.ano}</span>}
                            </div>
                        </FormContent>
                    </ModalBody>
                    <ModalFooter>
                        <SecondaryButton type='button' onClick={() => setShowEditModal(false)}>Cancelar</SecondaryButton>
                        <Link method='patch' href={`autos/${auto.id}`}>
                            <PrimaryButton type='submit'>Salvar</PrimaryButton>
                        </Link>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

function Dashboard({ autos, auth, errors }) {
    const { data, setData, post, reset } = useForm({
        modelo: "",
        ano: "",
        cor: '',
        placa: '',
        user_id: auth.user.id,
    });

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('autos.store'));
        reset();
        setShowCreateModal(false);
    }

    return (
        <AuthMainLayout defaultProps={{
            auth,
            errors,
            header: "Dashboard"
        }}>
            <div className='p-6'>
                <div className='mb-4' style={{ displa: 'flex', justifyContent: 'flex-end' }}>
                    <PrimaryButton onClick={() => setShowCreateModal(true)}>Add Auto</PrimaryButton>
                </div>
                <Table style={{ textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Cor</th>
                            <th>Ano</th>
                            <th>Placa</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !!autos.length
                                ? autos.map(auto => <AutoListItem key={auto.id} auto={auto} errors={errors} />)
                                : <strong>Nenhum automóvel disponível.</strong>
                        }
                    </tbody>
                </Table>
            </div>

            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
                <div className='p-4'>
                    <h1 className='text-xl text-strong my-4'>Add novo automóvel</h1>

                    <form onSubmit={handleSubmit}>
                        <FormContent className="flex flex-wrap justify-evenly my-6">
                            <div className='pb-4'>
                                <InputLabel>Modelo:</InputLabel>
                                <input type="text" value={data.modelo}
                                    onChange={(e) =>
                                        setData("modelo", e.target.value)
                                    } />
                                {errors.modelo && <span style={{ color: '#CC3333' }}>{errors.modelo}</span>}
                            </div>
                            <div className='pb-4'>
                                <InputLabel>Placa:</InputLabel>
                                <input type="text" onChange={e => setData('placa', e.target.value)} value={data.placa} />
                                {errors.placa && <span style={{ color: '#CC3333' }}>{errors.placa}</span>}
                            </div>
                            <div className='pb-4'>
                                <InputLabel>Cor:</InputLabel>
                                <input type="text" onChange={e => setData('cor', e.target.value)} value={data.cor} />
                                {errors.cor && <span style={{ color: '#CC3333' }}>{errors.cor}</span>}
                            </div>
                            <div className='pb-4'>
                                <InputLabel>Ano:</InputLabel>
                                <input type="text" onChange={e => setData('ano', e.target.value)} value={data.ano} />
                                {errors.ano && <span style={{ color: '#CC3333' }}>{errors.ano}</span>}
                            </div>
                        </FormContent>
                        <PrimaryButton type='submit'>Cadastrar</PrimaryButton>
                    </form>
                </div>
            </Modal>
        </AuthMainLayout >
    );
}

export default Dashboard;