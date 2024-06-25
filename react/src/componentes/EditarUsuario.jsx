import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NominaForm.css';

const EditarUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        documento: '',
        genero: 'M',
        estado: 'D',
        email: '',
        sueldo: '',
        photo: null,
        nivel_riesgo: '1',
        tipo_contrato: 'TF',
        fecha_contratacion: '',
    });

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/nomina/nominarest/${id}/`);
                const data = res.data;
                setFormData({
                    ...data,
                    photo: null,
                });
            } catch (error) {
                console.error('Error al cargar el usuario:', error.response ? error.response.data : error.message);
            }
        };
        cargarUsuario();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && key !== 'photo') {
                data.append(key, formData[key]);
            }
        }
        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            const response = await axios.put(`http://localhost:8000/nomina/nominarest/${id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error al enviar el formulario:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container">
            <h1>Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Apellido:</label>
                    <input type="text" name="apellido" className="form-control" value={formData.apellido} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Documento:</label>
                    <input type="text" name="documento" className="form-control" value={formData.documento} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Género:</label>
                    <select name="genero" className="form-control" value={formData.genero} onChange={handleChange} required>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Estado:</label>
                    <select name="estado" className="form-control" value={formData.estado} onChange={handleChange} required>
                        <option value="D">Dependiente</option>
                        <option value="I">Independiente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Sueldo:</label>
                    <input type="number" name="sueldo" className="form-control" value={formData.sueldo} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Foto:</label>
                    <input type="file" name="photo" className="form-control" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label>Nivel de riesgo:</label>
                    <select name="nivel_riesgo" className="form-control" value={formData.nivel_riesgo} onChange={handleChange} required>
                        <option value="1">Nivel 1</option>
                        <option value="2">Nivel 2</option>
                        <option value="3">Nivel 3</option>
                        <option value="4">Nivel 4</option>
                        <option value="5">Nivel 5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tipo de Contrato:</label>
                    <select name="tipo_contrato" className="form-control" value={formData.tipo_contrato} onChange={handleChange} required>
                        <option value="TF">Termino Fijo</option>
                        <option value="TI">Termino Indefinido</option>
                        <option value="P">Practicante</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha de Contratacion:</label>
                    <input type="date" name="fecha_contratacion" className="form-control" value={formData.fecha_contratacion} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Guardar</button>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>Volver</button>
            </form>
        </div>
    );
};

export default EditarUsuario;


