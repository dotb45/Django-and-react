import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Calculos.css';

const Calculos = () => {
    const { id } = useParams();
    const [nomina, setNomina] = useState(null);
    const [calculos, setCalculos] = useState(null);

    useEffect(() => {
        document.body.classList.add('calculos');

        return () => {
            document.body.classList.remove('calculos');
        };
    }, []);

    useEffect(() => {
        const obtenerNomina = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/nomina/nominarest/${id}/`);
                setNomina(res.data);
                if (res.data.calculos && res.data.calculos.length > 0) {
                    setCalculos(res.data.calculos[0]);
                }
            } catch (error) {
                console.error('Error al obtener la nómina', error);
            }
        };
        obtenerNomina();
    }, [id]);

    if (!nomina) {
        return <div>Cargando cálculos...</div>;
    }

    if (!calculos) {
        return <div>No se encontraron cálculos para esta nómina.</div>;
    }

    return (
        <div className="calculos-container">
            <h2>Cálculos del empleado</h2>
            <table className="table table-striped mt-4">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <td>{nomina.nombre}</td>
                    </tr>
                    <tr>
                        <th>Apellido</th>
                        <td>{nomina.apellido}</td>
                    </tr>
                    <tr>
                        <th>Documento</th>
                        <td>{nomina.documento}</td>
                    </tr>
                    <tr>
                        <th>Pensiones</th>
                        <td>{calculos.pensiones.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Salud</th>
                        <td>{calculos.salud.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Base</th>
                        <td>{calculos.base.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>ARL</th>
                        <td>{calculos.arl.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Caja de Compensación</th>
                        <td>{calculos.caja_compensacion.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Prima</th>
                        <td>{calculos.prima.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Auxilio de Transporte</th>
                        <td>{calculos.auxilio_transporte.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <Link to="/">
                <button className="btn btn-primary mt-3">Ir a la lista</button>
            </Link>
        </div>
    );
};

export default Calculos;
