using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoLab
    {
        private string nombreLab;

        public string NombreLab
        {
            get
            {
                return nombreLab;
            }

            set
            {
                nombreLab = value;
            }
        }
    }
}