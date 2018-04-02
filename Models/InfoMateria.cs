using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoMateria
    {
        private string _idMateria;
        private string _nombreMateria;
        private int _semestreMat;
        private string _carreraMat;
        private int _horasP;
        private string _atendido;

        public string IdMateria
        {
            get
            {
                return _idMateria;
            }

            set
            {
                _idMateria = value;
            }
        }

        public int SemestreMat
        {
            get
            {
                return _semestreMat;
            }

            set
            {
                _semestreMat = value;
            }
        }

        public string CarreraMat
        {
            get
            {
                return _carreraMat;
            }

            set
            {
                _carreraMat = value;
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

        public int HorasP
        {
            get
            {
                return _horasP;
            }

            set
            {
                _horasP = value;
            }
        }

        public string Atendido
        {
            get
            {
                return _atendido;
            }

            set
            {
                _atendido = value;
            }
        }
    }
}