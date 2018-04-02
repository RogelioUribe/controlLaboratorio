using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoUsuarios
    {
        private int _usuId;
        private string _usuNombre;
        private string _usuAp;
        private string _usuAm;
        private string _usuPass;
        private string _usuCorreo;
        private string _usuPerfil;
        private string _nombreCompleto;
        private int _noControl;
        public int UsuId
        {
            get
            {
                return _usuId;
            }

            set
            {
                _usuId = value;
            }
        }

        public string UsuNombre
        {
            get
            {
                return _usuNombre;
            }

            set
            {
                _usuNombre = value;
            }
        }

        public string UsuAp
        {
            get
            {
                return _usuAp;
            }

            set
            {
                _usuAp = value;
            }
        }

        public string UsuAm
        {
            get
            {
                return _usuAm;
            }

            set
            {
                _usuAm = value;
            }
        }

        public string UsuPass
        {
            get
            {
                return _usuPass;
            }

            set
            {
                _usuPass = value;
            }
        }

        public string UsuCorreo
        {
            get
            {
                return _usuCorreo;
            }

            set
            {
                _usuCorreo = value;
            }
        }

        public string UsuPerfil
        {
            get
            {
                return _usuPerfil;
            }

            set
            {
                _usuPerfil = value;
            }
        }

        public int NoControl
        {
            get
            {
                return _noControl;
            }

            set
            {
                _noControl = value;
            }
        }

        public string NombreCompleto
        {
            get
            {
                string nombre = UsuNombre + " " + UsuAp + " " + UsuAm;
                return nombre;
            }
        }
    }
}