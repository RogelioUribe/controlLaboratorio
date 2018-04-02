using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoPeriodo
    {
        private string _anoPeriodo;
        private string _semestrePeriodo;
        private string _nombre;

        public string AnoPeriodo
        {
            get
            {
                return _anoPeriodo;
            }

            set
            {
                _anoPeriodo = value;
            }
        }

        public string SemestrePeriodo
        {
            get
            {
                return _semestrePeriodo;
            }

            set
            {
                _semestrePeriodo = value;
            }
        }
    
        public string Nombre
        {
            get
            {
                string nombre = AnoPeriodo + "-" + SemestrePeriodo;
                return nombre;
            }
        }
    }
}