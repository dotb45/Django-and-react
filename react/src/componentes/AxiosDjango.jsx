import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AxiosDjango.css';

const AxiosDjango = () => {
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarUsuarios = async () => {
            const res = await axios('http://localhost:8000/nomina/nominarest/');
            setUsers(res.data);
        };
        cargarUsuarios();
    }, []);

    const confirmarEliminacion = (user) => {
        setUserToDelete(user);
    };

    const eliminarUsuario = async () => {
        try {
            await axios.delete(`http://localhost:8000/nomina/nominarest/${userToDelete.id}/`);
            setUsers(users.filter((user) => user.id !== userToDelete.id));
            setUserToDelete(null); // Resetear el estado después de eliminar
        } catch (error) {
            console.error('Error al eliminar el usuario', error);
        }
    };

    const calcular = (id) => {
        navigate(`/calculos/${id}`);
    };

    const actualizarHorasExtras = (id) => {
        navigate(`/horasextras/${id}`);
    };

    return (
        <div className="axios-container">
            <div className="axios header">
                <h1 className="axios title">Usuarios</h1>
                <Link to="/form" className="axios btn axios btn-primary">
                    Ir al Formulario
                </Link>
            </div>
            <table className="axios table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Documento</th>
                        <th>Género</th>
                        <th>Estado</th>
                        <th>Fecha de Contratacion</th>
                        <th>Tipo de Contrato</th>
                        <th>Email</th>
                        <th>Sueldo</th>
                        <th>Foto</th>
                        <th>Nivel de riesgo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((usr) => (
                        <tr key={usr.id}>
                            <td>{usr.nombre}</td>
                            <td>{usr.apellido}</td>
                            <td>{usr.documento}</td>
                            <td>{usr.genero}</td>
                            <td>{usr.estado}</td>
                            <td>{usr.fecha_contratacion}</td>
                            <td>{usr.tipo_contrato}</td>
                            <td>{usr.email}</td>
                            <td>{usr.sueldo}</td>
                            <td>
                                <img alt="User" src={usr.photo} />
                            </td>
                            <td>{usr.nivel_riesgo}</td>
                            <td className="axios actions">
                                <button
                                    onClick={() => calcular(usr.id)}
                                    className="axios btn axios btn-info"
                                >
                                    Calcular
                                </button>
                                <button
                                    onClick={() => actualizarHorasExtras(usr.id)}
                                    className="axios btn axios btn-info"
                                >
                                    Horas Extras
                                </button>
                                <Link to={`/editar/${usr.id}`} className="axios btn axios btn-warning">
                                    Editar
                                </Link>
                                <button
                                    onClick={() => confirmarEliminacion(usr)} 
                                    className="axios btn axios btn-danger"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {userToDelete && (
                <div className="axios confirmation-dialog">
                    <h2>¿Estás seguro de que quieres eliminar este usuario?</h2>
                    <p>Nombre: {userToDelete.nombre}</p>
                    <p>Apellido: {userToDelete.apellido}</p>
                    <p>Documento: {userToDelete.documento}</p>
                    <p>Género: {userToDelete.genero}</p>
                    <p>Estado: {userToDelete.estado}</p>
                    <p>Fecha de Contratacion: {userToDelete.fecha_contratacion}</p>
                    <p>Tipo de Contrato: {userToDelete.tipo_contrato}</p>
                    <p>Email: {userToDelete.email}</p>
                    <p>Sueldo: {userToDelete.sueldo}</p>
                    <button onClick={eliminarUsuario} className="axios btn axios btn-danger">Eliminar</button>
                    <button onClick={() => setUserToDelete(null)} className="axios btn axios btn-secondary">Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default AxiosDjango;
