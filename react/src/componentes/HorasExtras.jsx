import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './HorasExtras.css';

const HorasExtras = () => {
    const { id } = useParams();
    const [nomina, setNomina] = useState(null);
    const [horasExtras, setHorasExtras] = useState({
        horas_extras_diurnas: 0,
        horas_extras_nocturnas: 0,
        horas_extras_diurnas_dominicales: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNomina = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/nomina/nominarest/${id}/`);
                setNomina(res.data);
                setHorasExtras({
                    horas_extras_diurnas: res.data.horas_extras_diurnas,
                    horas_extras_nocturnas: res.data.horas_extras_nocturnas,
                    horas_extras_diurnas_dominicales: res.data.horas_extras_diurnas_dominicales
                });
            } catch (error) {
                console.error('Error fetching the nomina data', error);
                console.error('Error details:', error.response);
            }
        };
        fetchNomina();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHorasExtras(prevState => ({
            ...prevState,
            [name]: parseInt(value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8000/nomina/nominarest/${id}/`, horasExtras);
            navigate('/');
        } catch (error) {
            console.error('Error updating horas extras', error);
        }
    };

    if (!nomina) return <div>Loading...</div>;

    return (
        <div className="horas-extras-container">
            <h1>Actualizar Horas Extras para {nomina.nombre} {nomina.apellido}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Horas Extras Diurnas:</label>
                    <input
                        type="number"
                        name="horas_extras_diurnas"
                        value={horasExtras.horas_extras_diurnas}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Horas Extras Nocturnas:</label>
                    <input
                        type="number"
                        name="horas_extras_nocturnas"
                        value={horasExtras.horas_extras_nocturnas}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Horas Extras Diurnas Dominicales:</label>
                    <input
                        type="number"
                        name="horas_extras_diurnas_dominicales"
                        value={horasExtras.horas_extras_diurnas_dominicales}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar</button>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>Volver</button>




                  
            </form>
        </div>
    );
};

export default HorasExtras;

