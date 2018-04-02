using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoAcceso
    {
        private string _usuario;
        private string _numero;
        private string _laboratorio;
        private string _maquina;
        private string _horaEntrada;
        private string _fecha;
        private string _periodo;
        private string _materia;

        public string Usuario
        {
            get
            {
                return _usuario;
            }

            set
            {
                _usuario = value;
            }
        }

        public string Numero
        {
            get
            {
                return _numero;
            }

            set
            {
                _numero = value;
            }
        }

        public string Laboratorio
        {
            get
            {
                return _laboratorio;
            }

            set
            {
                _laboratorio = value;
            }
        }

        public string Maquina
        {
            get
            {
                return _maquina;
            }

            set
            {
                _maquina = value;
            }
        }

        public string HoraEntrada
        {
            get
            {
                return _horaEntrada;
            }

            set
            {
                _horaEntrada = value;
            }
        }

        public string Fecha
        {
            get
            {
                return _fecha;
            }

            set
            {
                _fecha = value;
            }
        }

        public string Periodo
        {
            get
            {
                return _periodo;
            }

            set
            {
                _periodo = value;
            }
        }

        public string Materia
        {
            get
            {
                return _materia;
            }

            set
            {
                _materia = value;
            }
        }
    }
}