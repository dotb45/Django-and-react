import React, { useState } from 'react';

function CalculadoraSalarioARLCesantias() {
  const [salario, setSalario] = useState('');
  const [salario40, setSalario40] = useState('');
  const [saludEmpleado, setSaludEmpleado] = useState('');
  const [saludEmpresa, setSaludEmpresa] = useState('');
  const [pensionEmpleado, setPensionEmpleado] = useState('');
  const [pensionEmpresa, setPensionEmpresa] = useState('');
  const [nivelRiesgo, setNivelRiesgo] = useState('1');
  const [tipoHoras, setTipoHoras] = useState('Horas Extra Diurna');
  const [cuotaARL, setCuotaARL] = useState('');
  const [horasExtras, setHorasExtras] = useState('');
  const [valorHorasExtras, setValorHorasExtras] = useState(0);
  const [añosTrabajados, setAñosTrabajados] = useState('');
  const [diasTrabajados, setDiasTrabajados] = useState('');
  const [cesantias, setCesantias] = useState(0);
  const [interesCesantias, setInteresCesantias] = useState(0);
  const [vacaciones, setVacaciones] = useState({
    diasVacaciones: 0,
    primaVacaciones: 0,
    salarioTotalVacaciones: 0
  });
  const [primaSalario, setPrimaSalario] = useState(0);
  const [auxilioTransporte, setAuxilioTransporte] = useState(0);

  const porcentajesCuotaARL = {
    '1': 0.00348,
    '2': 0.00522,
    '3': 0.01044,
    '4': 0.02436,
    '5': 0.04350
  };

  const valorHoraColombia = 5416;

  const calcularValorHoraExtra = (tipoHorasExtra) => {
    switch (tipoHorasExtra) {
      case 'Horas Extra Diurna':
        return valorHoraColombia * 1.25;
      case 'Horas Extra Nocturna':
        return valorHoraColombia * 1.75;
      case 'Horas Extra Dominical o Festivo Diurno':
        return valorHoraColombia * 2.0;
      case 'Horas Extra Nocturna Dominical o Festivo':
        return valorHoraColombia * 2.5;
      default:
        return 0;
    }
  };

  const calcularCesantias = () => {
    const cesantiasCalculadas = (salario * diasTrabajados) / 360;
    const interesCesantiasCalculado = (cesantiasCalculadas * diasTrabajados * 0.12) / 360;
    setCesantias(parseInt(cesantiasCalculadas));
    setInteresCesantias(parseInt(interesCesantiasCalculado));
  };

  const calcularVacaciones = () => {
    const salarioFloat = parseFloat(salario);
    const añosFloat = parseFloat(añosTrabajados);
    const diasVacaciones = Math.round(añosFloat * 15); 
    const primaVacaciones = salarioFloat * 0.5;
    const salarioTotalVacaciones = salarioFloat + primaVacaciones;

    setVacaciones({
      diasVacaciones,
      primaVacaciones,
      salarioTotalVacaciones
    });
  };

  const handleChangeSalario = (event) => {
    const salarioInput = event.target.value;
    setSalario(salarioInput);
    const salarioFloat = parseFloat(salarioInput);
    const salario40Float = salarioFloat * 0.4;
    const saludEmpleadoFloat = salario40Float * 0.04;
    const saludEmpresaFloat = salario40Float * 0.08;
    const pensionEmpleadoFloat = salario40Float * 0.04;
    const pensionEmpresaFloat = salario40Float * 0.12;
    setSalario40(Math.round(salario40Float));
    setSaludEmpleado(Math.round(saludEmpleadoFloat));
    setSaludEmpresa(Math.round(saludEmpresaFloat));
    setPensionEmpleado(Math.round(pensionEmpleadoFloat));
    setPensionEmpresa(Math.round(pensionEmpresaFloat));

    const cuotaARLPesos = salarioFloat * porcentajesCuotaARL[nivelRiesgo];
    setCuotaARL(cuotaARLPesos.toFixed(2));

    const primaSalarioCalculada = salarioFloat * 0.08;
    setPrimaSalario(primaSalarioCalculada.toFixed(2));

    const salarioMinimo = 1300000; 
    const esElegibleParaAuxilio = salarioFloat <= (salarioMinimo * 2);
    const auxilioTransporteCalculado = esElegibleParaAuxilio ? 106454 : 0;
    setAuxilioTransporte(auxilioTransporteCalculado.toFixed(2));
  };

  const handleChangeTipoHoras = (event) => {
    setTipoHoras(event.target.value);
  };

  const handleChangeHorasExtras = (event) => {
    const horas = event.target.value;

    const horasInt = parseInt(horas);

    if (horasInt > 48) {
      setHorasExtras('48');
      alert('No puedes ingresar más de 48 horas extras.');
    } else {
      setHorasExtras(horas);
    }
  };

  const handleChangeNivelRiesgo = (event) => {
    const nivelRiesgoSeleccionado = event.target.value;
    setNivelRiesgo(nivelRiesgoSeleccionado);
    const salarioFloat = parseFloat(salario);
    const cuotaARLPesos = salarioFloat * porcentajesCuotaARL[nivelRiesgoSeleccionado];
    setCuotaARL(cuotaARLPesos.toFixed(2));
  };

  const handleChangeAñosTrabajados = (event) => {
    setAñosTrabajados(event.target.value);
  };

  const handleChangeDiasTrabajados = (event) => {
    const dias = event.target.value;
    const diasInt = parseInt(dias);

    if (diasInt > 365) {
      alert('No puedes ingresar más de 365 días.');
    } else {
      setDiasTrabajados(dias);
    }
  };

  const handleReset = () => {
    setSalario('');
    setNivelRiesgo('1');
    setTipoHoras('Horas Extra Diurna');
    setHorasExtras('');
    setCuotaARL('');
    setValorHorasExtras(0);
    setAñosTrabajados('');
    setDiasTrabajados('');
    setCesantias(0);
    setInteresCesantias(0);
    setVacaciones({
      diasVacaciones: 0,
      primaVacaciones: 0,
      salarioTotalVacaciones: 0
    });
    setPrimaSalario(0);
    setAuxilioTransporte(0);
  };

  return (
    <div className="container">
      <div className="calculadora-container">
        <h2 className="calculadora-title">Calculadora de Salud , Pensión , ARL , Cesantías , Prima y Auxilio de Transporte</h2>

        <form className="calculadora-form">
          <label className="calculadora-label">
            Salario del empleado:
            <input
              type="number"
              value={salario}
              onChange={handleChangeSalario}
              className="calculadora-input"
            />
          </label>
        </form>

        {salario !== '' && (
          <div className="calculadora-result">
            <p>Salario ingresado: ${salario} COP</p>
          </div>
        )}

        {salario40 !== '' && (
          <div className="calculadora-result">
            <p>40% del salario del empleado: {salario40}</p>
            <p>4% de salud que debe pagar el empleado: {saludEmpleado}</p>
            <p>8% de salud que debe pagar la empresa: {saludEmpresa}</p>
            <p>4% de pensión que debe pagar el empleado: {pensionEmpleado}</p>
            <p>12% de pensión que debe pagar la empresa: {pensionEmpresa}</p>
          </div>
        )}

        <h2 className="calculadora-title">Calculadora de Cuota de ARL</h2>

        <label className="calculadora-label">
          Nivel de riesgo:
          <select className="calculadora-input" value={nivelRiesgo} onChange={handleChangeNivelRiesgo}>
            <option value="1">Nivel 1</option>
            <option value="2">Nivel 2</option>
            <option value="3">Nivel 3</option>
            <option value="4">Nivel 4</option>
            <option value="5">Nivel 5</option>
          </select>
        </label>

        {cuotaARL !== '' && (
          <div className="calculadora-result">
            <p>Cuota del ARL: ${cuotaARL} COP</p>
          </div>
        )}

        <h2 className="calculadora-title">Calculadora de Horas Extras</h2>

        <label className="calculadora-label">
          Tipo de horas extras:
          <select className="calculadora-input" value={tipoHoras} onChange={handleChangeTipoHoras}>
            <option value="Horas Extra Diurna">Horas Extra Diurna</option>
            <option value="Horas Extra Nocturna">Horas Extra Nocturna</option>
            <option value="Horas Extra Dominical o Festivo Diurno">Horas Extra Dominical o Festivo Diurno</option>
            <option value="Horas Extra Nocturna Dominical o Festivo">Horas Extra Nocturna Dominical o Festivo</option>
          </select>
        </label>

        <label className="calculadora-label">
          Horas Extras:
          <input
            className="calculadora-input"
            type="number"
            value={horasExtras}
            onChange={handleChangeHorasExtras}
          />
        </label>

        <button className="calculadora-button green" onClick={() => {
          const valorHorasExtrasCalculado = calcularValorHoraExtra(tipoHoras) * parseFloat(horasExtras);
          setValorHorasExtras(valorHorasExtrasCalculado.toFixed(2));
        }}>
          Calcular Valor Horas Extras
        </button>

        {valorHorasExtras !== 0 && (
          <div className="calculadora-result">
            <p>Valor de las {horasExtras} horas extras: ${valorHorasExtras} COP</p>
          </div>
        )}

        <h2 className="calculadora-title">Calculadora de Cesantías</h2>

        <label className="calculadora-label">
          Días Trabajados:
          <input
            type="number"
            value={diasTrabajados}             
            onChange={handleChangeDiasTrabajados}
            className="calculadora-input"
          />
        </label>

        <button className="calculadora-button" onClick={calcularCesantias}>
          Calcular Cesantías
        </button>

        <div className="calculadora-result">
          <p>Cesantías: {cesantias}</p>
          <p>Intereses de Cesantías: {interesCesantias}</p>
        </div>

        <h2 className="calculadora-title">Calculadora de Vacaciones</h2>

        <label className="calculadora-label">
            Años Trabajados:
          <input
            type="number"
            value={añosTrabajados}
            onChange={handleChangeAñosTrabajados}
            className="calculadora-input"
          />
        </label>

        <button className="calculadora-button" onClick={calcularVacaciones}>
          Calcular Vacaciones
        </button>

        {vacaciones.diasVacaciones !== 0 && (
          <div className="calculadora-result">
            <p>Días de vacaciones: {vacaciones.diasVacaciones}</p>
            <p>Prima de vacaciones: {vacaciones.primaVacaciones}</p>
            <p>Salario total durante vacaciones: {vacaciones.salarioTotalVacaciones}</p>
          </div>
        )}

        {primaSalario !== 0 && (
          <div className="calculadora-result">
            <p>Prima salario: ${primaSalario} COP</p>
          </div>
        )}

        {auxilioTransporte !== 0 && (
          <div className="calculadora-result">
            <p>Auxilio de transporte: ${auxilioTransporte} COP</p>
          </div>
        )}

        <button className="borrar-button orange" onClick={handleReset}>Borrar</button>
      </div>
    </div>
  );
}

export default CalculadoraSalarioARLCesantias;