using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoHorario
    {
        private int _idHorario;
        private string _nombreProfesor;
        private string _nombreMateria;
        private string _grupo;
        private string _horaE;
        private string _horaS;
        private string _nombreLab;
        private string _serie;
        public string NombreProfesor
        {
            get
            {
                return _nombreProfesor;
            }

            set
            {
                _nombreProfesor = value;
            }
        }

        public string NombreMateria
        {
            get
            {
                return _nombreMateria;
            }

            set
            {
                _nombreMateria = value;
            }
        }

        public string Grupo
        {
            get
            {
                return _grupo;
            }

            set
            {
                _grupo = value;
            }
        }

        public string HoraE
        {
            get
            {
                return _horaE;
            }

            set
            {
                _horaE = value;
            }
        }

        public string HoraS
        {
            get
            {
                return _horaS;
            }

            set
            {
                _horaS = value;
            }
        }

        public int IdHorario
        {
            get
            {
                return _idHorario;
            }

            set
            {
                _idHorario = value;
            }
        }

        public string NombreLab
        {
            get
            {
                return _nombreLab;
            }

            set
            {
                _nombreLab = value;
            }
        }

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
    }
}