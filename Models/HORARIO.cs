//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ControlLab.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class HORARIO
    {
        public int hora_id { get; set; }
        public string hora_grupoId { get; set; }
        public string hora_materiaId { get; set; }
        public Nullable<int> hora_profesorId { get; set; }
        public string hora_laboratorioId { get; set; }
        public System.TimeSpan hora_horaEntrada { get; set; }
        public System.TimeSpan hora_horaSalida { get; set; }
        public string hora_dia { get; set; }
        public string hora_serie { get; set; }
        public string hora_periodo { get; set; }
    
        public virtual LABORATORIO LABORATORIO { get; set; }
        public virtual MATERIA MATERIA { get; set; }
        public virtual PROFESOR PROFESOR { get; set; }
    }
}
