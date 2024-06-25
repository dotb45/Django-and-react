import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AxiosDjango from './componentes/AxiosDjango';
import NominaForm from './componentes/NominaForms';
import EditarUsuario from './componentes/EditarUsuario';
import Calculos from './componentes/Calculos'; 
import HorasExtras from './componentes/HorasExtras';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AxiosDjango />} />
                <Route path="/form" element={<NominaForm />} />
                <Route path="/editar/:id" element={<EditarUsuario />} />
                <Route path="/calculos/:id" element={<Calculos />} /> 
                <Route path="/horasextras/:id" element={<HorasExtras />} />
            </Routes>
        </Router>
    );
};

export default App;

