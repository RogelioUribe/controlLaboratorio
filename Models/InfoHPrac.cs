using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoHPrac
    {
        private string _serie;
        private string _materia;
        private string _grupo;
        private int _horasPracticas;
        private int _horasFaltantes;
        private int _horasSobrantes;

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

        public int HorasPracticas
        {
            get
            {
                return _horasPracticas;
            }

            set
            {
                _horasPracticas = value;
            }
        }

        public int HorasFaltantes
        {
            get
            {
                return _horasFaltantes;
            }

            set
            {
                _horasFaltantes = value;
            }
        }

        public int HorasSobrantes
        {
            get
            {
                return _horasSobrantes;
            }

            set
            {
                _horasSobrantes = value;
            }
        }
    }
}