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
    
    public partial class USUARIO
    {
        public int usu_id { get; set; }
        public string usu_nombre { get; set; }
        public string usu_apPaterno { get; set; }
        public string usu_apMaterno { get; set; }
        public string usu_contrasena { get; set; }
        public string usu_correo { get; set; }
        public Nullable<int> usu_pefilId { get; set; }
        public Nullable<int> usu_noControl { get; set; }
    
        public virtual PERFIL PERFIL { get; set; }
    }
}
