using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoGrupos
    {
        private int _idGrupo;
        private string _nombreGrupo;
        private string _profesorGrupo;
        private int _alumnosGrupo;
        private string _materiaGrupo;

        public int IdGrupo
        {
            get
            {
                return _idGrupo;
            }

            set
            {
                _idGrupo = value;
            }
        }

        public string NombreGrupo
        {
            get
            {
                return _nombreGrupo;
            }

            set
            {
                _nombreGrupo = value;
            }
        }

        public string ProfesorGrupo
        {
            get
            {
                return _profesorGrupo;
            }

            set
            {
                _profesorGrupo = value;
            }
        }

        public int AlumnosGrupo
        {
            get
            {
                return _alumnosGrupo;
            }

            set
            {
                _alumnosGrupo = value;
            }
        }

        public string MateriaGrupo
        {
            get
            {
                return _materiaGrupo;
            }

            set
            {
                _materiaGrupo = value;
            }
        }
    }
}