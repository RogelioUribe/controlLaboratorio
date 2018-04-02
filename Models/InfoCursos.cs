using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ControlLab.Models
{
    public class InfoCursos
    {
        private int _idCurso;
        private string _nombreCurso;
        private string _representanteCurso;
        private string _presentadorCurso;
        private string _laboratorioCurso;
        private string _periodoCurso;
        private string _horaECurso;
        private string _horaSCurso;
        private string _diaCurso;

        public int IdCurso
        {
            get
            {
                return _idCurso;
            }

            set
            {
                _idCurso = value;
            }
        }

        public string NombreCurso
        {
            get
            {
                return _nombreCurso;
            }

            set
            {
                _nombreCurso = value;
            }
        }

        public string RepresentanteCurso
        {
            get
            {
                return _representanteCurso;
            }

            set
            {
                _representanteCurso = value;
            }
        }

        public string PresentadorCurso
        {
            get
            {
                return _presentadorCurso;
            }

            set
            {
                _presentadorCurso = value;
            }
        }

        public string LaboratorioCurso
        {
            get
            {
                return _laboratorioCurso;
            }

            set
            {
                _laboratorioCurso = value;
            }
        }

        public string HoraECurso
        {
            get
            {
                return _horaECurso;
            }

            set
            {
                _horaECurso = value;
            }
        }

        public string HoraSCurso
        {
            get
            {
                return _horaSCurso;
            }

            set
            {
                _horaSCurso = value;
            }
        }

        public string DiaCurso
        {
            get
            {
                return _diaCurso;
            }

            set
            {
                _diaCurso = value;
            }
        }

        public string PeriodoCurso
        {
            get
            {
                return _periodoCurso;
            }

            set
            {
                _periodoCurso = value;
            }
        }
    }
}