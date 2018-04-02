using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoCambios
    {
        private string _serie;
        private string _laboratorio;
        private string _laboratorioNuevo;
        private string _horaEntrada;
        private string _horaSalida;
        private string _horaEntradaNuevo;
        private string _horaSalidaNuevo;
        private string _dia;
        private string _diaNuevo;
        private string _razon;
        private string _fecha;
        public string Serie
        {
            get
            {
                return _serie;
            }

            set
            {
                _serie = value;
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

        public string LaboratorioNuevo
        {
            get
            {
                return _laboratorioNuevo;
            }

            set
            {
                _laboratorioNuevo = value;
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

        public string HoraSalida
        {
            get
            {
                return _horaSalida;
            }

            set
            {
                _horaSalida = value;
            }
        }

        public string HoraEntradaNuevo
        {
            get
            {
                return _horaEntradaNuevo;
            }

            set
            {
                _horaEntradaNuevo = value;
            }
        }

        public string HoraSalidaNuevo
        {
            get
            {
                return _horaSalidaNuevo;
            }

            set
            {
                _horaSalidaNuevo = value;
            }
        }

        public string Dia
        {
            get
            {
                return _dia;
            }

            set
            {
                _dia = value;
            }
        }

        public string DiaNuevo
        {
            get
            {
                return _diaNuevo;
            }

            set
            {
                _diaNuevo = value;
            }
        }

        public string Razon
        {
            get
            {
                return _razon;
            }

            set
            {
                _razon = value;
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
    }
}