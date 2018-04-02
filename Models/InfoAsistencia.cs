using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoAsistencia
    {
        private string _nombrePrf;
        private string _nombreMat;
        private string _grupo;
        private int _alumnos;
        private string _fecha;
        private string _horaE;
        private string _horaS;
        private string _materia;
        public string NombrePrf
        {
            get
            {
                return _nombrePrf;
            }

            set
            {
                _nombrePrf = value;
            }
        }

        public string NombreMat
        {
            get
            {
                return _nombreMat;
            }

            set
            {
                _nombreMat = value;
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

        public int Alumnos
        {
            get
            {
                return _alumnos;
            }

            set
            {
                _alumnos = value;
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