using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using ControlLab.Models;

namespace ControlLab.Controllers
{
    public class HomeController : Controller
    {
        DBLABEntities dblab = new DBLABEntities();
        public ActionResult Index()
        {
            if (Session["usuario"] != null)
            {
                string usuario = (Session["usuario"]).ToString();
                var userId = (from u in dblab.USUARIO
                              where u.usu_nombre == usuario
                              select new { u.usu_nombre }).FirstOrDefault();
                ViewBag.userId = userId.usu_nombre;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Profesor()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Materias()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Asignacion()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Cursos()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Usuarios()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Bitacora()
        {
            if (Session["usuario"] != null)
            {
                string usuario = (Session["usuario"]).ToString();
                var userId = (from u in dblab.USUARIO
                              where u.usu_nombre == usuario
                              select new { u.usu_nombre }).FirstOrDefault();
                ViewBag.userId = userId.usu_nombre;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Laboratorios()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Accesos()
        {
            if (Session["usuario"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Asistencia()
        {
            if (Session["usuario"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult ReportesBit()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                List<InfoUsuarios> Items = ShowUsuarios(); return View(Items);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Horario()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Consultas()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Carreras()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Departamento()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Periodo()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Series()
        {

            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                List<InfoHPrac> Items = HorasPracticas(); return View(Items);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }

        }
        public ActionResult HorariosLab()
        {
            if (Session["usuario"] != null)
            {
                List<InfoLab> Items = ShowLab(); return View(Items);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Compartidos()
        {
            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                List<InfoLab> Items = ShowLab(); return View(Items);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Cambios()
        {

            if (Session["usuario"] != null && (int)Session["perfil"] == 1)
            {
                List<InfoCambios> Items = ShowCambios(); return View(Items);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }

        }
        public ActionResult Login() { return View(); }
        //METODOS DE CARGAR

        [HttpPost]
        public JsonResult loadProfesores()
        {
            List<PROFESOR> Profesores = new List<PROFESOR>();
            try
            {
                var prf = from p in dblab.PROFESOR
                          orderby (p.prf_nombreCompleto)
                          select new { p.prf_id, p.prf_nombreCompleto, p.prf_contrato, p.prf_correo, p.prf_telefono };
                foreach (var objeto in prf)
                {
                    Profesores.Add(new PROFESOR { prf_id = objeto.prf_id, prf_nombreCompleto = objeto.prf_nombreCompleto, prf_contrato = objeto.prf_contrato, prf_correo = objeto.prf_correo, prf_telefono = objeto.prf_telefono });
                }
                return Json(Profesores, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Profesores, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadCarreras()
        {
            List<CARRERA> Carreras = new List<CARRERA>();
            try
            {
                var car = from c in dblab.CARRERA
                          select new { c.car_id, c.car_nombre };
                foreach (var objeto in car)
                {
                    Carreras.Add(new CARRERA { car_id = objeto.car_id, car_nombre = objeto.car_nombre });
                }
                return Json(Carreras, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Carreras, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadMaterias()
        {
            List<InfoMateria> Materias = new List<InfoMateria>();
            try
            {
                var mat = from m in dblab.MATERIA
                          join c in dblab.CARRERA on m.mat_carrera equals c.car_id
                          select new { m.mat_id, m.mat_nombre, m.mat_semestre, c.car_nombre, m.mat_horasp };
                foreach (var objeto in mat)
                {
                    Materias.Add(new InfoMateria { IdMateria = objeto.mat_id, NombreMateria = objeto.mat_nombre, SemestreMat = objeto.mat_semestre ?? default(int), CarreraMat = objeto.car_nombre, HorasP = objeto.mat_horasp ?? default(int) });
                }
                return Json(Materias, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Materias, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadLaboratorios()
        {
            List<LABORATORIO> Laboratorios = new List<LABORATORIO>();
            try
            {
                var lab = from l in dblab.LABORATORIO
                          select new { l.lab_id, l.lab_nombre, l.lab_capacidad, l.lab_descripcion };
                foreach (var objeto in lab)
                {
                    Laboratorios.Add(new LABORATORIO { lab_id = objeto.lab_id, lab_nombre = objeto.lab_nombre, lab_capacidad = objeto.lab_capacidad, lab_descripcion = objeto.lab_descripcion });
                }
                return Json(Laboratorios, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Laboratorios, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadCursos(string Periodo)
        {
            List<InfoCursos> Cursos = new List<InfoCursos>();
            try
            {
                var cur = from c in dblab.CURSOS
                          join p in dblab.PROFESOR on c.cur_profesorId equals p.prf_id
                          join l in dblab.LABORATORIO on c.cur_laboratorioId equals l.lab_id
                          where c.cur_periodo == Periodo
                          select new { c.cur_id, c.cur_nombre, p.prf_nombreCompleto, c.cur_presentador, l.lab_nombre, c.cur_horaEntrada, c.cur_horaSalida, c.cur_fecha, c.cur_periodo };

                foreach (var objeto in cur)
                {
                    Cursos.Add(new InfoCursos { IdCurso = objeto.cur_id, NombreCurso = objeto.cur_nombre, RepresentanteCurso = objeto.prf_nombreCompleto, PresentadorCurso = objeto.cur_presentador, LaboratorioCurso = objeto.lab_nombre, HoraECurso = (objeto.cur_horaEntrada).ToString(), HoraSCurso = (objeto.cur_horaSalida).ToString(), DiaCurso = (objeto.cur_fecha).ToString(), PeriodoCurso = objeto.cur_periodo });
                }
                return Json(Cursos, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Cursos, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadPeriodo()
        {
            List<InfoPeriodo> Periodo = new List<InfoPeriodo>();
            try
            {
                var per = from p in dblab.PERIODO
                          select new { p.per_año, p.per_semestre };

                foreach (var objeto in per)
                {
                    Periodo.Add(new InfoPeriodo { AnoPeriodo = objeto.per_año, SemestrePeriodo = objeto.per_semestre });
                }
                return Json(Periodo, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Periodo, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadUsuarios()
        {
            List<InfoUsuarios> Usuarios = new List<InfoUsuarios>();
            try
            {
                var usu = from u in dblab.USUARIO
                          join p in dblab.PERFIL on u.usu_pefilId equals p.pfl_id
                          select new { u.usu_id, u.usu_nombre, u.usu_apPaterno, u.usu_apMaterno, u.usu_contrasena, u.usu_correo, p.pfl_nombre, u.usu_noControl };

                foreach (var objeto in usu)
                {
                    Usuarios.Add(new InfoUsuarios { UsuId = objeto.usu_id, UsuNombre = objeto.usu_nombre, UsuAp = objeto.usu_apPaterno, UsuAm = objeto.usu_apMaterno, UsuPass = objeto.usu_contrasena, UsuCorreo = objeto.usu_correo, UsuPerfil = objeto.pfl_nombre, NoControl = Convert.ToInt32(objeto.usu_noControl) });
                }
                return Json(Usuarios, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Usuarios, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadDepartamento()
        {
            List<DEPARTAMENTO> Departamento = new List<DEPARTAMENTO>();
            try
            {
                var dep = from d in dblab.DEPARTAMENTO
                          select new { d.dep_id, d.dep_nombre };

                foreach (var objeto in dep)
                {
                    Departamento.Add(new DEPARTAMENTO { dep_id = objeto.dep_id, dep_nombre = objeto.dep_nombre });
                }
                return Json(Departamento, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Departamento, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadLabHora(string Lab, string Dia, string Periodo)
        {
            List<InfoHorario> Horario = new List<InfoHorario>();
            try
            {
                LABORATORIO lab = (from l in dblab.LABORATORIO
                                   where l.lab_nombre == Lab
                                   select l).FirstOrDefault();

                var hora = from h in dblab.HORARIO
                           join p in dblab.PROFESOR on h.hora_profesorId equals p.prf_id
                           join m in dblab.MATERIA on h.hora_materiaId equals m.mat_id
                           orderby h.hora_horaEntrada
                           where h.hora_laboratorioId == lab.lab_id && h.hora_dia == Dia && h.hora_periodo == Periodo
                           select new { h.hora_id, p.prf_nombreCompleto, m.mat_nombre, h.hora_grupoId, h.hora_horaEntrada, h.hora_horaSalida, h.hora_serie };

                foreach (var objeto in hora)
                {
                    Horario.Add(new InfoHorario { IdHorario = objeto.hora_id, NombreProfesor = objeto.prf_nombreCompleto, NombreMateria = objeto.mat_nombre, Grupo = objeto.hora_grupoId, HoraE = objeto.hora_horaEntrada.ToString(), HoraS = objeto.hora_horaSalida.ToString(), Serie = objeto.hora_serie });
                }
                return Json(Horario, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Horario, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult loadPrfHora(string IdProfesor, string HoraEntrada, string Dia, string Periodo)
        {
            List<InfoHorario> Horario = new List<InfoHorario>();
            try
            {
                TimeSpan he = TimeSpan.Parse(HoraEntrada);

                int idPrf = Convert.ToInt32(IdProfesor);
                var hora = from h in dblab.HORARIO
                           join p in dblab.PROFESOR on h.hora_profesorId equals p.prf_id
                           join l in dblab.LABORATORIO on h.hora_laboratorioId equals l.lab_id
                           join m in dblab.MATERIA on h.hora_materiaId equals m.mat_id
                           where h.hora_profesorId == idPrf && h.hora_horaEntrada == he && h.hora_dia == Dia && h.hora_periodo == Periodo
                           select new { h.hora_id, m.mat_nombre, h.hora_grupoId, h.hora_horaEntrada, h.hora_horaSalida, l.lab_nombre };

                foreach (var objeto in hora)
                {
                    Horario.Add(new InfoHorario { IdHorario = objeto.hora_id, NombreMateria = objeto.mat_nombre, Grupo = objeto.hora_grupoId, HoraE = objeto.hora_horaEntrada.ToString(), HoraS = objeto.hora_horaSalida.ToString(), NombreLab = objeto.lab_nombre });
                }
                return Json(Horario, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Horario, JsonRequestBehavior.AllowGet);
            }
        }
        //METODOS DE GUARDAR

        [HttpPost]
        public string saveProfesores(string NoEmp, string Nombre, string Contrato, string Correo, string Telefono)
        {
            try
            {
                int noEmp;

                //Verificar que el campo
                try { noEmp = Convert.ToInt32(NoEmp); }
                catch { return "El campo serie no tiene el formato correcto"; }

                string nombre = Nombre.ToUpper();

                if (Contrato == "BASE" || Contrato == "HONORARIO")
                {

                    Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                    Match match = regex.Match(Correo);
                    if (match.Success)
                    {
                        PROFESOR profe = (from p in dblab.PROFESOR
                                          where p.prf_id == noEmp
                                          select p).FirstOrDefault();

                        if (profe != null)
                        {
                            profe.prf_nombreCompleto = nombre;
                            profe.prf_contrato = Contrato;
                            profe.prf_correo = Correo;
                            profe.prf_telefono = Telefono;
                            dblab.SaveChanges();
                            return "Los datos se han modificado";
                        }

                        else
                        {
                            PROFESOR prf = new PROFESOR();
                            prf.prf_id = noEmp;
                            prf.prf_nombreCompleto = nombre;
                            prf.prf_contrato = Contrato;
                            prf.prf_correo = Correo;
                            prf.prf_telefono = Telefono;
                            dblab.PROFESOR.Add(prf);
                            dblab.SaveChanges();
                            return "Datos Guardados";
                        }
                    }
                    else
                    {
                        return "El campo correo tiene el formato incorrecto";
                    }
                }//Fin de la llave en caso de que el contrato tenga el concepto correcto
                else
                {
                    return "El contrato seleccionado no existe";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveCarrera(string Serie, string Nombre)
        {
            try
            {
                string serie = Serie.ToUpper();
                string nombre = Nombre.ToUpper();

                CARRERA carre = (from c in dblab.CARRERA
                                 where c.car_id == Serie
                                 select c).FirstOrDefault();

                if (carre != null)
                {
                    carre.car_id = serie;
                    carre.car_nombre = nombre;
                    dblab.SaveChanges();
                    return "Los datos hasn sido modificados";
                }
                else
                {
                    CARRERA car = new CARRERA();
                    car.car_id = serie;
                    car.car_nombre = nombre;
                    dblab.CARRERA.Add(car);
                    dblab.SaveChanges();
                    return "Datos Guardados";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveMateria(string Serie, string Nombre, string Semestre, string Carrera, string HPracticas)
        {
            try
            {
                string serie = Serie.ToUpper();
                string nombre = Nombre.ToUpper();

                CARRERA car = (from c in dblab.CARRERA
                               where c.car_nombre == Carrera
                               select c).FirstOrDefault();

                //Verificar si el campo carrera existe
                if (car != null)
                {
                    int semestre;

                    //Verificar que el campo semestre tenga el formato correcto
                    try { semestre = Convert.ToInt32(Semestre); }
                    catch { return "El campo semestre no tiene el formato correcto"; }

                    //Verificar que el semestre se encuentra dentro de los limites del semestre
                    if (semestre > 0 && semestre <= 9)
                    {
                        int hprac;

                        //Verificar que el campo horas practicas tenga el formato correcto
                        try { hprac = Convert.ToInt32(HPracticas); }
                        catch { return "El campo horas practicas no tiene el formato correcto"; }

                        //Verificar que las horas practicas no se pasen del limite
                        if (hprac > 0 && hprac <= 6)
                        {
                            string id = serie + car.car_id.Substring(1, 2) + Semestre;

                            MATERIA mate = (from m in dblab.MATERIA
                                            where m.mat_id == id
                                            select m).FirstOrDefault();

                            if (mate != null)
                            {
                                mate.mat_nombre = nombre;
                                mate.mat_semestre = semestre;
                                mate.mat_carrera = car.car_id;
                                mate.mat_horasp = hprac;
                                dblab.SaveChanges();
                                return "Los datos se han modificado";
                            }

                            else
                            {
                                MATERIA mat = new MATERIA();
                                mat.mat_id = id;
                                mat.mat_nombre = nombre;
                                mat.mat_semestre = semestre;
                                mat.mat_carrera = car.car_id;
                                mat.mat_horasp = hprac;
                                dblab.MATERIA.Add(mat);
                                dblab.SaveChanges();
                                return "Datos Guardados";
                            }
                        }//Fin de la lalve en caso de que las horas practicas no se pasen de los limites
                        else
                        {
                            return "Las horas practicas se pasan de los limites";
                        }
                    }//Fin de la llave en caso de que el semestre pertenezca a los semestres actuales
                    else
                    {
                        return "El semeste seleccionado no pertenece a los semestres actuales";
                    }
                }//Fin de la llave en caso de que la carrera exista
                else
                {
                    return "La carrera seleccionada no existe";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveLaboratorio(string Serie, string Nombre, string Capacidad, string Descripcion)
        {
            try
            {
                Regex Val = new Regex("[0-9]");

                //Verificar si el campo nombre contiene numeros
                if (Val.IsMatch(Serie))
                {
                    return "El campo nombre no tiene el formato correcto";
                }
                else
                {
                    string seriePrincipal = Serie.Substring(0, 3);
                    seriePrincipal = seriePrincipal.ToUpper();

                    string nombre = Nombre.ToUpper();

                    if (seriePrincipal == "LCL")
                    {
                        int capacidad;

                        //Verificar si el campo capacidad tien el formato correcto
                        try { capacidad = Convert.ToInt32(Capacidad); }
                        catch { return "El campo capacidad no tiene el formato correcto"; }

                        string serie = Serie.ToUpper();

                        LABORATORIO labo = (from l in dblab.LABORATORIO
                                            where l.lab_id == serie
                                            select l).FirstOrDefault();

                        if (labo != null)
                        {
                            labo.lab_nombre = nombre;
                            labo.lab_capacidad = capacidad;
                            labo.lab_descripcion = Descripcion;
                            dblab.SaveChanges();
                            return "Se han modificado los datos";
                        }

                        else
                        {
                            LABORATORIO lab = new LABORATORIO();
                            lab.lab_id = serie;
                            lab.lab_nombre = nombre;
                            lab.lab_capacidad = capacidad;
                            lab.lab_descripcion = Descripcion;
                            dblab.LABORATORIO.Add(lab);
                            dblab.SaveChanges();
                            return "Datos Guardados";
                        }
                    }//Fin de la la llave en caso de que el campo serie tenga el formato correcto
                    else
                    {
                        return "El campo serie tiene el formato incorrecto1";
                    }
                }//Fin del else en caso de que la serie tenga el formato correcto
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveCurso(string Nombre, string Representante, string Presentador, string Laboratorio, string Periodo, string HoraEntrada, string HoraSalida, string Fecha, string Dia)
        {
            try
            {
                string nombre = Nombre.ToUpper();
                string rep = Representante.ToUpper();

                PROFESOR prf = (from p in dblab.PROFESOR
                                where p.prf_nombreCompleto == rep
                                select p).FirstOrDefault();

                //Verificar si el profesor existe
                if (prf != null)
                {
                    string pre = Presentador.ToUpper();
                    Regex Val = new Regex("[0-9]");
                    //Verificar si el campo presentador contiene numeros
                    if (Val.IsMatch(pre))
                    {
                        return "El campo presentador no tiene el formato correcto";
                    }
                    else
                    {
                        string laboratorio = Laboratorio.ToUpper();

                        LABORATORIO lab = (from l in dblab.LABORATORIO
                                           where l.lab_nombre == laboratorio
                                           select l).FirstOrDefault();

                        //Verificar que el laboratorio exista
                        if (lab != null)
                        {
                            TimeSpan horaE;

                            try { horaE = TimeSpan.Parse(HoraEntrada); }
                            catch { return "El campo hora de entrada tiene el formato incorrecto"; }

                            TimeSpan horaS;

                            try { horaS = TimeSpan.Parse(HoraSalida); }
                            catch { return "El campo hora de salida tiene el formato incorrecto"; }

                            int he = Convert.ToInt32(HoraEntrada.Substring(0, 2));
                            int hs = Convert.ToInt32(HoraSalida.Substring(0, 2));

                            DateTime fecha;

                            try { fecha = Convert.ToDateTime(Fecha); }
                            catch { return "El campo fecha tiene el formato incorrecto"; }

                            //Verificar que la hora de salida sea mayor a la hora de entrada
                            if (hs > he)
                            {
                                DateTime fechaActual = DateTime.Today;

                                //Verificar que la fecha no sea menor a la fecha actual
                                if (fecha >= fechaActual)
                                {
                                    HORARIO existe = (from h in dblab.HORARIO
                                                      where h.hora_laboratorioId == lab.lab_id && (h.hora_horaEntrada == horaE || h.hora_horaSalida == horaS) && h.hora_dia == Dia && h.hora_periodo == Periodo
                                                      select h).FirstOrDefault();
                                    //Verificar si hay lugar en los horarios
                                    if (existe == null)
                                    {
                                        CURSOS nombreCurso = (from c in dblab.CURSOS
                                                              where c.cur_nombre == nombre && c.cur_periodo == Periodo
                                                              select c).FirstOrDefault();
                                        if (nombreCurso != null)
                                        {
                                            
                                            CURSOS existeCur = (from c in dblab.CURSOS
                                                                where c.cur_laboratorioId == lab.lab_id && (c.cur_horaEntrada == horaE || c.cur_horaSalida == horaS) && c.cur_fecha == fecha && c.cur_periodo == Periodo
                                                                select c).FirstOrDefault();
                                            if (existeCur == null)
                                            {
                                                nombreCurso.cur_profesorId = prf.prf_id;
                                                nombreCurso.cur_presentador = pre;
                                                nombreCurso.cur_laboratorioId = lab.lab_id;
                                                nombreCurso.cur_periodo = Periodo;
                                                nombreCurso.cur_horaEntrada = horaE;
                                                nombreCurso.cur_horaSalida = horaS;
                                                nombreCurso.cur_dia = Dia;
                                                nombreCurso.cur_fecha = fecha;
                                                nombreCurso.cur_periodo = Periodo;
                                                dblab.SaveChanges();
                                                return "Los datos han sido modificados";
                                            }
                                            else
                                            {
                                                return "El labotario " + lab.lab_nombre + " esta ocupado el dia " + existeCur.cur_fecha + " de " + existeCur.cur_horaEntrada + " a " + existeCur.cur_horaSalida + " por el curso: " + existeCur.cur_nombre;
                                            }
                                        }
                                        else
                                        {
                                            var idCur = dblab.sp_getCurso();
                                            int? seqCur = Convert.ToInt32(idCur.SingleOrDefault());

                                            CURSOS cur = new CURSOS();
                                            cur.cur_id = Convert.ToInt32(seqCur);
                                            cur.cur_nombre = nombre;
                                            cur.cur_profesorId = prf.prf_id;
                                            cur.cur_laboratorioId = lab.lab_id;
                                            cur.cur_horaEntrada = horaE;
                                            cur.cur_horaSalida = horaS;
                                            cur.cur_dia = Dia;
                                            cur.cur_fecha = fecha;
                                            cur.cur_presentador = pre;
                                            cur.cur_periodo = Periodo;
                                            dblab.CURSOS.Add(cur);
                                            dblab.SaveChanges();
                                            return "Datos Guardados";
                                        }
                                    }
                                    else
                                    {
                                        return "El laboratorio " + lab.lab_nombre + " esta ocupado de " + existe.hora_horaEntrada + " a " + existe.hora_horaSalida + " el dia " + Dia;
                                    }
                                }//Fin de la llave en caso de que la fecha este bien designada
                                else
                                {
                                    return "La fecha esta mal designada";
                                }
                            }
                            else
                            {
                                return "La hora del curso esta mal designada";
                            }
                        }//Fin de la llave en caso de que el laboratorio exista
                        else
                        {
                            return "El laboratorio no existe";
                        }
                    }//Fin del else en caso de que el presentador tenga el formato correcto
                }//Fin de la llave en caso de que el profesor exista
                else
                {
                    return "El profesor no existe";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveAcceso(string Usuario, string NumeroID, string Laboratorio, string Maquina, string horaE, string Fecha, string Periodo, string Materia)
        {
            try
            {

                DateTime fecha = Convert.ToDateTime(Fecha);
                TimeSpan horaEntrada = TimeSpan.Parse(horaE);
                int idPrf = Convert.ToInt32(NumeroID);

                if (Usuario == "Docente")
                {
                    PROFESOR prf = (from p in dblab.PROFESOR
                                    where p.prf_id == idPrf
                                    select p).FirstOrDefault();
                    if (prf != null)
                    {
                        LABORATORIO lab = (from l in dblab.LABORATORIO
                                           where l.lab_nombre == Laboratorio
                                           select l).FirstOrDefault();

                        if (lab != null)
                        {
                            ASISTENCIA disponible = (from d in dblab.ASISTENCIA
                                                     where d.asis_laboratorioId == lab.lab_id && d.asis_fecha == fecha && d.asis_horaEntrada == horaEntrada && d.asis_periodo == Periodo
                                                     select d).FirstOrDefault();

                            if (disponible != null)
                            {
                                return "El laboratorio no esta disponible";
                            }
                            else
                            {
                                MATERIA mat = (from m in dblab.MATERIA
                                               where m.mat_nombre == Materia
                                               select m).FirstOrDefault();
                                if(mat != null)
                                {
                                    var idAcc = dblab.sp_getAcceso();
                                    int? seqAcc = Convert.ToInt32(idAcc.SingleOrDefault());

                                    ACCESO acc = new ACCESO();
                                    acc.acc_id = Convert.ToInt32(seqAcc);
                                    acc.acc_usuario = Usuario;
                                    acc.acc_numeroId = Convert.ToInt32(NumeroID);
                                    acc.acc_laboratorioId = lab.lab_id;
                                    acc.acc_maquina = Maquina;
                                    acc.acc_horaEntrada = TimeSpan.Parse(horaE);
                                    acc.acc_fecha = Convert.ToDateTime(Fecha);
                                    acc.acc_periodo = Periodo;
                                    acc.acc_materia = Materia;
                                    dblab.ACCESO.Add(acc);
                                    dblab.SaveChanges();
                                    return "Datos Guardados";
                                }
                                else
                                {
                                    return "La materia no existe";
                                }
                                
                            }
                        }
                        else
                        {
                            return "El laboratorio no existe";
                        }
                    }
                    else
                    {
                        return "El no empleado no existe";
                    }
                }
                else
                {
                    ACCESO dis = (from a in dblab.ACCESO
                                  where a.acc_usuario == "Docente" && a.acc_horaEntrada == horaEntrada && a.acc_fecha == fecha && a.acc_periodo == Periodo
                                  select a).FirstOrDefault();
                    if (dis != null)
                    {
                        return "El laboratorio no esta disponible";
                    }
                    else
                    {
                        LABORATORIO lab = (from l in dblab.LABORATORIO
                                           where l.lab_nombre == Laboratorio
                                           select l).FirstOrDefault();

                        if (lab != null)
                        {
                            int maquina = Convert.ToInt32(Maquina);

                            if (maquina <= lab.lab_capacidad)
                            {
                                ASISTENCIA disponible = (from d in dblab.ASISTENCIA
                                                         where d.asis_laboratorioId == lab.lab_id && d.asis_fecha == fecha && d.asis_horaEntrada == horaEntrada && d.asis_periodo == Periodo
                                                         select d).FirstOrDefault();

                                if (disponible != null)
                                {
                                    return "El laboratorio no esta disponible";
                                }
                                else
                                {
                                    int noControl = Convert.ToInt32(NumeroID);

                                    ACCESO alumno = (from a in dblab.ACCESO
                                                     where a.acc_numeroId == noControl && a.acc_horaEntrada == horaEntrada && a.acc_fecha == fecha && a.acc_periodo == Periodo
                                                     select a).FirstOrDefault();

                                    if (alumno != null)
                                    {
                                        return "Este estudiante ya fue registrado";
                                    }
                                    else
                                    {

                                        ACCESO disMaq = (from d in dblab.ACCESO
                                                         where d.acc_maquina == Maquina && d.acc_horaEntrada == horaEntrada && d.acc_fecha == fecha && d.acc_periodo == Periodo
                                                         select d).FirstOrDefault();

                                        if (disMaq != null)
                                        {
                                            return "La máquina seleccionada no esta disponible";
                                        }
                                        else
                                        {
                                            var idAcc = dblab.sp_getAcceso();
                                            int? seqAcc = Convert.ToInt32(idAcc.SingleOrDefault());

                                            ACCESO acc = new ACCESO();
                                            acc.acc_id = Convert.ToInt32(seqAcc);
                                            acc.acc_usuario = Usuario;
                                            acc.acc_numeroId = Convert.ToInt32(NumeroID);
                                            acc.acc_laboratorioId = lab.lab_id;
                                            acc.acc_maquina = Maquina;
                                            acc.acc_horaEntrada = TimeSpan.Parse(horaE);
                                            acc.acc_fecha = Convert.ToDateTime(Fecha);
                                            acc.acc_periodo = Periodo;
                                            dblab.ACCESO.Add(acc);
                                            dblab.SaveChanges();
                                            return "Datos Guardados";
                                        }
                                    }
                                }
                            }
                            else
                            {
                                return "La maquina seleccionada no existe";
                            }
                        }
                        else
                        {
                            return "El laboratorio no existe";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }        
        public string saveDepartamento(string Serie, string Nombre)
        {
            try
            {
                DEPARTAMENTO depaId = (from d in dblab.DEPARTAMENTO
                                       where d.dep_id == Serie
                                       select d).FirstOrDefault();

                //Veriricar si la serie del departamento existe
                if (depaId != null)
                {
                    return "La serie del departamento ya existe";
                }
                else
                {
                    DEPARTAMENTO depaNombre = (from d in dblab.DEPARTAMENTO
                                               where d.dep_nombre == Nombre
                                               select d).FirstOrDefault();

                    //Verificar si el nombre del departamento existe
                    if (depaNombre != null)
                    {
                        return "El nombre del departamento ya existe";
                    }
                    else
                    {
                        string serie = Serie.ToUpper();
                        string nombre = Nombre.ToUpper();

                        DEPARTAMENTO dep = new DEPARTAMENTO();
                        dep.dep_id = serie;
                        dep.dep_nombre = nombre;
                        dblab.DEPARTAMENTO.Add(dep);
                        dblab.SaveChanges();
                        return "Datos Guardados";
                    }//Fin del else en caso de que ni la serie ni el nombre existan
                }//Fin del else que caso de que la serie no exista              
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string savePeriodo(string Ano, string Semestre, string AnoActual)
        {
            try
            {
                if (Convert.ToInt32(Ano) < Convert.ToInt32(AnoActual))
                {
                    return "El año ingresado es menor al año actual";
                }
                else
                {
                    PERIODO periodo = (from p in dblab.PERIODO
                                       where p.per_año == Ano && p.per_semestre == Semestre
                                       select p).FirstOrDefault();

                    if (periodo != null)
                    {
                        return "El perido ya existe";
                    }
                    else
                    {
                        var idPer = dblab.sp_getPeriodo();
                        int? seqPer = Convert.ToInt32(idPer.SingleOrDefault());

                        PERIODO per = new PERIODO();
                        per.per_id = Convert.ToInt32(seqPer);
                        per.per_año = Ano;
                        per.per_semestre = Semestre;
                        dblab.PERIODO.Add(per);
                        dblab.SaveChanges();
                        return "Datos Guardados";
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveBitacora(string Usuario, string Bitacora, string Fecha)
        {
            try
            {
                DateTime fecha = Convert.ToDateTime(Fecha);
                BITACORA registro = (from r in dblab.BITACORA
                                     where r.bit_usuario == Usuario && r.bit_fecha == fecha
                                     select r).FirstOrDefault();

                if (registro != null)
                {
                    return "Ya ha sido registrada su informe en la bitacora";
                }
                else
                {
                    BITACORA bit = new BITACORA();
                    var idBit = dblab.sp_getBitacora();
                    int? seqBit = Convert.ToInt32(idBit.SingleOrDefault());

                    bit.bit_id = Convert.ToInt32(seqBit);
                    bit.bit_usuario = Usuario;
                    bit.bit_descripcion = Bitacora;
                    bit.bit_fecha = Convert.ToDateTime(Fecha);
                    dblab.BITACORA.Add(bit);
                    dblab.SaveChanges();
                    return "Datos Guardados";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveUsuario(string Nombre, string Paterno, string Materno, string Pass, string Correo, string Perfil, string NControl)
        {
            try
            {
                PERFIL perfil = (from p in dblab.PERFIL
                                 where p.pfl_nombre == Perfil
                                 select p).FirstOrDefault();
                Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                Match match = regex.Match(Correo);
                if (match.Success)
                {
                    USUARIO usu = new USUARIO();
                    var idUsu = dblab.sp_getUsuario();
                    int? seqUsu = Convert.ToInt32(idUsu.SingleOrDefault());

                    usu.usu_id = Convert.ToInt32(seqUsu);
                    usu.usu_nombre = Nombre;
                    usu.usu_apPaterno = Paterno;
                    usu.usu_apMaterno = Materno;
                    usu.usu_contrasena = Pass;
                    usu.usu_correo = Correo;
                    usu.usu_pefilId = perfil.pfl_id;
                    usu.usu_noControl = Convert.ToInt32(NControl);
                    dblab.USUARIO.Add(usu);
                    dblab.SaveChanges();
                    return "Datos Guardados";
                }
                else
                {
                    return "El campo correo no tiene el formato correcto";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveAsistencia(string IdProfesor, string HoraEntrada, string Dia, string Alumnos, string Periodo, string Fecha)
        {
            try
            {
                TimeSpan he = TimeSpan.Parse(HoraEntrada);
                int idPrf = Convert.ToInt32(IdProfesor);

                HORARIO asistencia = (from h in dblab.HORARIO
                                      where h.hora_profesorId == idPrf && h.hora_horaEntrada == he && h.hora_dia == Dia
                                      select h).FirstOrDefault();
                if (asistencia != null)
                {
                    DateTime fecha = Convert.ToDateTime(Fecha);
                    ASISTENCIA cumplido = (from a in dblab.ASISTENCIA
                                           where a.asis_horaEntrada == he && a.asis_fecha == fecha && a.asis_laboratorioId == asistencia.hora_laboratorioId
                                           select a).FirstOrDefault();

                    if (cumplido != null)
                    {
                        return "Ya se ha registrado la asistencia";
                    }
                    else
                    {
                        var idAsis = dblab.sp_getAsistencia();
                        int? seqAsis = Convert.ToInt32(idAsis.SingleOrDefault());

                        ASISTENCIA asis = new ASISTENCIA();
                        asis.asis_id = Convert.ToInt32(seqAsis);
                        asis.asis_profesorId = asistencia.hora_profesorId;
                        asis.asis_materiaId = asistencia.hora_materiaId;
                        asis.asis_grupoId = asistencia.hora_grupoId;
                        asis.asis_laboratorioId = asistencia.hora_laboratorioId;
                        asis.asis_alumnos = Convert.ToInt32(Alumnos);
                        asis.asis_horaEntrada = asistencia.hora_horaEntrada;
                        asis.asis_horaSalida = asistencia.hora_horaSalida;
                        asis.asis_fecha = Convert.ToDateTime(Fecha);
                        asis.asis_periodo = Periodo;
                        dblab.ASISTENCIA.Add(asis);
                        dblab.SaveChanges();
                        return "Datos Guardados";
                    }
                }
                else
                {
                    return "No hay horario para el docente " + idPrf + " a esta hora";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveGrupoCom(string CarreraGrupoUno, string GrupoUno, string CarreraGrupoDos, string GrupoDos, string Grupo, string Materia, string Alumnos, string Profesor, string Laboratorio, string HoraEntrada, string HoraSalida, string Dia, string Periodo)
        {
            try
            {
                CarreraGrupoUno = CarreraGrupoUno.ToUpper();
                var carGrpUno = (from c in dblab.CARRERA
                                 where c.car_nombre == CarreraGrupoUno
                                 select c).FirstOrDefault();
                if (carGrpUno != null)
                {
                    CarreraGrupoDos = CarreraGrupoDos.ToUpper();
                    var carGrpDos = (from c in dblab.CARRERA
                                     where c.car_nombre == CarreraGrupoDos
                                     select c).FirstOrDefault();
                    if (carGrpDos != null)
                    {
                        if (CarreraGrupoUno != CarreraGrupoDos)
                        {
                            Materia = Materia.ToUpper();
                            var mat = (from m in dblab.MATERIA
                                       where m.mat_nombre == Materia
                                       select m).FirstOrDefault();
                            if (mat != null)
                            {
                                Profesor = Profesor.ToUpper();
                                var prf = (from p in dblab.PROFESOR
                                           where p.prf_nombreCompleto == Profesor
                                           select p).FirstOrDefault();
                                if (prf != null)
                                {
                                    Laboratorio = Laboratorio.ToUpper();
                                    var lab = (from l in dblab.LABORATORIO
                                               where l.lab_nombre == Laboratorio
                                               select l).FirstOrDefault();
                                    if (lab != null)
                                    {
                                        var matUno = (from m in dblab.MATERIA
                                                      where m.mat_nombre == Materia && m.mat_carrera == carGrpUno.car_id
                                                      select m).FirstOrDefault();
                                        if (matUno != null)
                                        {
                                            var matDos = (from m in dblab.MATERIA
                                                          where m.mat_nombre == Materia && m.mat_carrera == carGrpDos.car_id
                                                          select m).FirstOrDefault();
                                            if (matDos != null)
                                            {
                                                TimeSpan horaE = TimeSpan.Parse(HoraEntrada);
                                                TimeSpan horaS = TimeSpan.Parse(HoraSalida);
                                                if (horaS > horaE)
                                                {
                                                    var existe = (from h in dblab.HORARIO
                                                                  where h.hora_laboratorioId == lab.lab_id && (h.hora_horaEntrada == horaE || h.hora_horaSalida == horaS) && h.hora_dia == Dia && h.hora_periodo == Periodo
                                                                  select h).FirstOrDefault();
                                                    if (existe == null)
                                                    {
                                                        int capacidad = Convert.ToInt32(Alumnos);
                                                        if (capacidad <= lab.lab_capacidad)
                                                        {
                                                            string he = HoraEntrada.Substring(0, 2);
                                                            string hs = HoraSalida.Substring(0, 2);

                                                            var idHora = dblab.sp_getHorario();
                                                            int? seqHora = Convert.ToInt32(idHora.SingleOrDefault());

                                                            Grupo = Grupo.ToUpper();
                                                            GrupoUno = GrupoUno.ToUpper();
                                                            GrupoDos = GrupoDos.ToUpper();
                                                            string serie = matUno.mat_id + Grupo + " - " + matDos.mat_id + Grupo;

                                                            COMPARTIDOS compar = (from c in dblab.COMPARTIDOS
                                                                                  where c.grpCom_serie == serie
                                                                                  select c).FirstOrDefault();

                                                            if (compar != null)
                                                            {
                                                                HORARIO horario = new HORARIO();
                                                                horario.hora_id = Convert.ToInt32(seqHora);
                                                                horario.hora_grupoId = Grupo;
                                                                horario.hora_profesorId = prf.prf_id;
                                                                horario.hora_materiaId = matUno.mat_id;
                                                                horario.hora_laboratorioId = lab.lab_id;
                                                                horario.hora_horaEntrada = TimeSpan.Parse(HoraEntrada);
                                                                horario.hora_horaSalida = TimeSpan.Parse(HoraSalida);
                                                                horario.hora_dia = Dia;
                                                                horario.hora_serie = serie;
                                                                horario.hora_periodo = Periodo;
                                                                dblab.HORARIO.Add(horario);

                                                                int totalH = Convert.ToInt32(hs) - Convert.ToInt32(he);

                                                                GrupoUno = GrupoUno.ToUpper();

                                                                string materiaGpUno = "GC" + matUno.mat_id + GrupoUno;

                                                                MATGRP existMtUno = (from m in dblab.MATGRP
                                                                                     where m.matgrp_nombre == materiaGpUno
                                                                                     select m).FirstOrDefault();

                                                                //Verificar si existe un grupo para las horas practicas
                                                                if (existMtUno == null)
                                                                {

                                                                    MATGRP matgrp = new MATGRP();
                                                                    matgrp.matgrp_nombre = "GC" + matUno.mat_id + GrupoUno;
                                                                    matgrp.materia = matUno.mat_id;
                                                                    matgrp.grupo = GrupoUno;
                                                                    matgrp.hora = matUno.mat_horasp - totalH;
                                                                    matgrp.periodo = Periodo;
                                                                    matgrp.matgrp_serie = serie;
                                                                    dblab.MATGRP.Add(matgrp);
                                                                }
                                                                //En caso de que exista se modifica el registro
                                                                else
                                                                {
                                                                    existMtUno.hora = existMtUno.hora - totalH;
                                                                }

                                                                GrupoDos = GrupoDos.ToUpper();

                                                                string materiaGpDos = "GC" + matDos.mat_id + GrupoDos;

                                                                MATGRP existMtDos = (from m in dblab.MATGRP
                                                                                     where m.matgrp_nombre == materiaGpDos
                                                                                     select m).FirstOrDefault();

                                                                //Verificar si existe un grupo para las horas practicas
                                                                if (existMtDos == null)
                                                                {

                                                                    MATGRP matgrp = new MATGRP();
                                                                    matgrp.matgrp_nombre = "GC" + matDos.mat_id + GrupoDos;
                                                                    matgrp.materia = matDos.mat_id;
                                                                    matgrp.grupo = GrupoDos;
                                                                    matgrp.hora = matDos.mat_horasp - totalH;
                                                                    matgrp.periodo = Periodo;
                                                                    matgrp.matgrp_serie = serie;
                                                                    dblab.MATGRP.Add(matgrp);
                                                                }
                                                                //En caso de que exista se modifica el registro
                                                                else
                                                                {
                                                                    existMtDos.hora = existMtDos.hora - totalH;
                                                                }

                                                                dblab.SaveChanges();
                                                                return "Datos Guardados";
                                                            }
                                                            else
                                                            {
                                                                COMPARTIDOS compa = new COMPARTIDOS();
                                                                compa.grpCom_serie = serie;
                                                                compa.grpCom_carGrpUno = carGrpUno.car_id;
                                                                compa.grpCom_carGrpDos = carGrpDos.car_id;
                                                                compa.grpCom_grpUno = GrupoUno;
                                                                compa.grpCom_grpDos = GrupoDos;
                                                                compa.grpCom_grpId = Grupo;
                                                                compa.grpCom_materia = Materia;
                                                                compa.grpCom_profesor = prf.prf_id;
                                                                dblab.COMPARTIDOS.Add(compa);

                                                                HORARIO hora = new HORARIO();
                                                                hora.hora_id = Convert.ToInt32(seqHora);
                                                                hora.hora_grupoId = Grupo;
                                                                hora.hora_profesorId = prf.prf_id;
                                                                hora.hora_materiaId = matUno.mat_id;
                                                                hora.hora_laboratorioId = lab.lab_id;
                                                                hora.hora_horaEntrada = TimeSpan.Parse(HoraEntrada);
                                                                hora.hora_horaSalida = TimeSpan.Parse(HoraSalida);
                                                                hora.hora_dia = Dia;
                                                                hora.hora_serie = serie;
                                                                hora.hora_periodo = Periodo;
                                                                dblab.HORARIO.Add(hora);

                                                                int total = Convert.ToInt32(hs) - Convert.ToInt32(he);

                                                                string materiaGrpUno = "GC" + matUno.mat_id + GrupoUno;

                                                                MATGRP existMatUno = (from m in dblab.MATGRP
                                                                                      where m.matgrp_nombre == materiaGrpUno
                                                                                      select m).FirstOrDefault();

                                                                //Verificar si existe un grupo para las horas practicas
                                                                if (existMatUno == null)
                                                                {

                                                                    MATGRP matgrp = new MATGRP();
                                                                    matgrp.matgrp_nombre = "GC" + matUno.mat_id + GrupoUno;
                                                                    matgrp.materia = matUno.mat_id;
                                                                    matgrp.grupo = GrupoUno;
                                                                    matgrp.hora = matUno.mat_horasp - total;
                                                                    matgrp.periodo = Periodo;
                                                                    matgrp.matgrp_serie = serie;
                                                                    dblab.MATGRP.Add(matgrp);
                                                                }
                                                                //En caso de que exista se modifica el registro
                                                                else
                                                                {
                                                                    existMatUno.hora = existMatUno.hora - total;
                                                                }


                                                                string materiaGrpDos = "GC" + matDos.mat_id + GrupoDos;

                                                                MATGRP existMatDos = (from m in dblab.MATGRP
                                                                                      where m.matgrp_nombre == materiaGrpUno
                                                                                      select m).FirstOrDefault();

                                                                //Verificar si existe un grupo para las horas practicas
                                                                if (existMatDos == null)
                                                                {

                                                                    MATGRP matgrp = new MATGRP();
                                                                    matgrp.matgrp_nombre = "GC" + matDos.mat_id + GrupoDos;
                                                                    matgrp.materia = matDos.mat_id;
                                                                    matgrp.grupo = GrupoDos;
                                                                    matgrp.hora = matDos.mat_horasp - total;
                                                                    matgrp.periodo = Periodo;
                                                                    matgrp.matgrp_serie = serie;
                                                                    dblab.MATGRP.Add(matgrp);
                                                                }
                                                                //En caso de que exista se modifica el registro
                                                                else
                                                                {
                                                                    existMatDos.hora = existMatDos.hora - total;
                                                                }

                                                                dblab.SaveChanges();
                                                                return "Datos Guardados";
                                                            }
                                                        }//Fin de la llave en caso de que el grupo no exceda la capacidad del laboratorio
                                                        else
                                                        {
                                                            return "El grupo excede la capacidad del laboratorio";
                                                        }
                                                    }//Fin de la llave en caso de que el horario este disponible
                                                    else
                                                    {
                                                        return "El laboratorio " + Laboratorio + " no esta disponible de " + HoraEntrada + " a " + HoraSalida + " el dia " + Dia;
                                                    }
                                                }//Fin de la llave en caso de que la hora este bien designada
                                                else
                                                {
                                                    return "La hora esta mal designada";
                                                }
                                            }//Fin de la llave en caso de que la materia exista en la carrera del grupo dos
                                            else
                                            {
                                                return "La materia " + Materia + " no existe en la carrera " + CarreraGrupoDos;
                                            }
                                        }//Fin de la llave en caso de que la materia exista en la carrea del grupo uno
                                        else
                                        {
                                            return "La materia " + Materia + " no existe en la carrera " + CarreraGrupoUno;
                                        }
                                    }//Fin de la llave en caso de que el laboratorio exista
                                    else
                                    {
                                        return "El laboratorio no existe";
                                    }
                                }//Fin de la llave en caso de que el profesor exista
                                else
                                {
                                    return "El profesor no existe";
                                }
                            }//Fin de la llave en caso de que la materia exista
                            else
                            {
                                return "La materia no existe";
                            }
                        }//Fin de la llave en caso de que la carrera del grupo uno sea diferente de la carrera del grupo dos
                        else
                        {
                            return "La carrera del grupo uno es igual a la carrera del grupo dos";
                        }
                    }//Fin de la lalve en caso de que la carrera del grupo dos exista
                    else
                    {
                        return "La carrera del grupo dos no existe";
                    }
                }//Fin de la llave en caso de que la carrera del grupo uno exista
                else
                {
                    return "La carrera del grupo uno no existe";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveHorario(string Grupo, string Materia, string Profesor, string Laboratorio, string HEntrada, string HSalida, string Dia, string Periodo)
        {
            try
            {
                Materia = Materia.ToUpper();
                MATERIA mat = (from m in dblab.MATERIA
                               where m.mat_id == Materia
                               select m).FirstOrDefault();
                //Verificar que la materia exista
                if (mat != null)
                {
                    Profesor = Profesor.ToUpper();
                    PROFESOR prf = (from p in dblab.PROFESOR
                                    where p.prf_nombreCompleto == Profesor
                                    select p).FirstOrDefault();
                    //Verificar que el profesor exista
                    if (prf != null)
                    {
                        Laboratorio = Laboratorio.ToUpper();
                        LABORATORIO lab = (from l in dblab.LABORATORIO
                                           where l.lab_nombre == Laboratorio
                                           select l).FirstOrDefault();
                        //Veriricar que el laboratorio exista
                        if (lab != null)
                        {
                            TimeSpan horaE = TimeSpan.Parse(HEntrada);
                            TimeSpan horaS = TimeSpan.Parse(HSalida);

                            string he = HEntrada.Substring(0, 2);
                            string hs = HSalida.Substring(0, 2);
                            int total = Convert.ToInt32(hs) - Convert.ToInt32(he);

                            //Verificar que la hora de salida no sea menor o igual a la hora de entrada
                            if (horaS > horaE)
                            {
                                HORARIO existe = (from h in dblab.HORARIO
                                                  where h.hora_laboratorioId == lab.lab_id && (h.hora_horaEntrada == horaE || h.hora_horaSalida == horaS) && h.hora_dia == Dia && h.hora_periodo == Periodo
                                                  select h).FirstOrDefault();

                                //Verirficar si existe laboratorio disponible
                                if (existe == null)
                                {
                                    Grupo = Grupo.ToUpper();
                                    var idHora = dblab.sp_getHorario();
                                    int? seqHora = Convert.ToInt32(idHora.SingleOrDefault());
                                    string materiaGrp = (mat.mat_id) + Grupo;

                                    HORARIO hora = new HORARIO();
                                    hora.hora_id = Convert.ToInt32(seqHora);
                                    hora.hora_grupoId = Grupo;
                                    hora.hora_profesorId = prf.prf_id;
                                    hora.hora_materiaId = mat.mat_id;
                                    hora.hora_laboratorioId = lab.lab_id;
                                    hora.hora_horaEntrada = TimeSpan.Parse(HEntrada);
                                    hora.hora_horaSalida = TimeSpan.Parse(HSalida);
                                    hora.hora_dia = Dia;
                                    hora.hora_serie = materiaGrp;
                                    hora.hora_periodo = Periodo;
                                    dblab.HORARIO.Add(hora);

                                    MATGRP existMat = (from m in dblab.MATGRP
                                                       where m.matgrp_nombre == materiaGrp
                                                       select m).FirstOrDefault();

                                    if (existMat == null)
                                    {

                                        MATGRP matgrp = new MATGRP();
                                        matgrp.matgrp_nombre = (mat.mat_id) + Grupo;
                                        matgrp.materia = Materia;
                                        matgrp.grupo = Grupo;
                                        matgrp.hora = mat.mat_horasp - total;
                                        matgrp.periodo = Periodo;
                                        dblab.MATGRP.Add(matgrp);
                                    }
                                    else
                                    {
                                        existMat.hora = existMat.hora - total;
                                    }

                                    dblab.SaveChanges();
                                    return "Datos Guardados";
                                }//Fin de la llave en caso de que haya laboratorios disponibles
                                else
                                {
                                    return "El laboratorio " + Laboratorio + " esta ocupado de " + existe.hora_horaEntrada + " a " + existe.hora_horaSalida + " el dia " + Dia;
                                }
                            }//Fin de la llave en caso de que la hora este bien designada
                            else
                            {
                                return "La hora esta mal designada";
                            }
                        }//Fin de la llave en caso de que le laboratorio exista
                        else
                        {
                            return "El laboratorio no existe";
                        }
                    }//Fin de la llave en caso de que el profesor exista
                    else
                    {
                        return "El profesor no existe";
                    }
                }//Fin de la llave en caso de que la materia exista
                else
                {
                    return "La materia no existe";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string updateHorario(string Id, string Serie, string Laboratorio, string LaboratorioNuevo, string HoraEntrada, string HoraSalida, string HoraEntradaNueva, string HoraSalidaNueva, string Dia, string DiaNuevo, string Razon, string Fecha, string Periodo)
        {
            try
            {
                TimeSpan horaEntradaNueva = TimeSpan.Parse(HoraEntradaNueva);
                TimeSpan horaSalidaNueva = TimeSpan.Parse(HoraSalidaNueva);

                string horaEntrada = HoraEntrada.Substring(0, 2);
                string horaSalida = HoraSalida.Substring(0, 2);
                int totalHoraVieja = Convert.ToInt32(horaSalida) - Convert.ToInt32(horaEntrada);

                string horaEntradaN = HoraEntradaNueva.Substring(0, 2);
                string horaSalidaN = HoraSalidaNueva.Substring(0, 2);
                int totalHoraNueva = Convert.ToInt32(horaSalidaN) - Convert.ToInt32(horaEntradaN);

                int idHora = Convert.ToInt32(Id);

                LaboratorioNuevo = LaboratorioNuevo.ToUpper();

                LABORATORIO lab = (from l in dblab.LABORATORIO
                                   where l.lab_nombre == LaboratorioNuevo
                                   select l).FirstOrDefault();

                if (lab != null)
                {
                    HORARIO horario = (from h in dblab.HORARIO
                                       where h.hora_id == idHora
                                       select h).FirstOrDefault();

                    if (horario != null)
                    {
                        Dia = Dia.ToUpper();
                        HORARIO existe = (from h in dblab.HORARIO
                                          where h.hora_laboratorioId == lab.lab_id && (h.hora_horaEntrada == horaEntradaNueva || h.hora_horaSalida == horaSalidaNueva) && h.hora_dia == Dia && h.hora_serie != horario.hora_serie
                                          select h).FirstOrDefault();

                        if (existe == null)
                        {
                            horario.hora_laboratorioId = lab.lab_id;
                            horario.hora_horaEntrada = TimeSpan.Parse(HoraEntradaNueva);
                            horario.hora_horaSalida = TimeSpan.Parse(HoraSalidaNueva);
                            horario.hora_dia = Dia;
                            dblab.SaveChanges();

                            MATGRP existMat = (from m in dblab.MATGRP
                                               where m.matgrp_nombre == Serie || m.matgrp_serie == Serie
                                               select m).FirstOrDefault();

                            if (existMat != null)
                            {
                                existMat.hora = existMat.hora + totalHoraVieja;
                                existMat.hora = existMat.hora - totalHoraNueva;
                                dblab.SaveChanges();
                            }
                            else
                            {
                                return "Error serie de materia-grupo";
                            }

                            CAMBIOS cam = new CAMBIOS();

                            var idCambio = dblab.sp_getCambio();
                            int? seqCambio = Convert.ToInt32(idCambio.SingleOrDefault());

                            cam.cambio_id = Convert.ToInt32(seqCambio);
                            cam.cambio_serieGrp = Serie;
                            cam.cambio_lab = Laboratorio;
                            cam.cambio_labNuevo = LaboratorioNuevo;
                            cam.cambio_horaEntrada = HoraEntrada;
                            cam.cambio_horaSalida = HoraSalida;
                            cam.cambio_horaEntradaNueva = HoraEntradaNueva;
                            cam.cambio_horaSalidaNueva = HoraSalidaNueva;
                            cam.cambio_dia = Dia;
                            cam.cambio_diaNuevo = DiaNuevo;
                            cam.cambio_razonCambio = Razon;
                            cam.cambio_fecha = Fecha;
                            cam.cam_periodo = Periodo;
                            dblab.CAMBIOS.Add(cam);

                            dblab.SaveChanges();
                            return "Datos Guardados";
                        }//Fin de la llave en caso de que si este un horario disponible
                        else
                        {
                            return "El laboratorio " + Laboratorio + " esta ocupado de " + existe.hora_horaEntrada + " a " + existe.hora_horaSalida + " el dia " + existe.hora_dia;
                        }
                    }//Fin de la llave en caso de que el id exista
                    else
                    {
                        return "Error id de horario";
                    }
                }//Fin de la llave en caso de que el laboratorio exista
                else
                {
                    return "El laboratorio no existe";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //Importar
        public string saveHorarioImportar(string Grupo, string Alumnos, string Materia, string Profesor, string Laboratorio, string HEntrada, string HSalida, string Dia, string Periodo)
        {
            try
            {
                //Verifica si algun campo falta
                if (Grupo == "undefined" || Alumnos == "undefined" || Materia == "undefined" || Profesor == "undefined" || Laboratorio == "undefined" || HEntrada == "undefined" || HSalida == "undefined" || Dia == "undefined")
                {
                    return "Faltan campos por llenar";
                }
                else
                {
                    Regex Val = new Regex(@"[a-zA-ZñÑ\s]");
                    string grupo = Grupo.ToUpper();
                    //Verificar si el campo Grupo este en el formato correcto
                    if (Val.IsMatch(grupo) && grupo.Length == 1)
                    {
                        string materia = Materia.ToUpper();
                        MATERIA mat = (from m in dblab.MATERIA
                                       where m.mat_id == materia
                                       select m).FirstOrDefault();
                        //Verfica si el campo materia existe
                        if (mat != null)
                        {
                            int profesor;

                            //Verificar que el campo profesor tenga el formato correcto
                            try { profesor = Convert.ToInt32(Profesor); }
                            catch { return "El campo profesor no tiene el formato correto"; }

                            PROFESOR prf = (from p in dblab.PROFESOR
                                            where p.prf_id == profesor
                                            select p).FirstOrDefault();
                            if (prf != null)
                            {
                                string laboratorio = Laboratorio.ToUpper();

                                LABORATORIO lab = (from l in dblab.LABORATORIO
                                                   where l.lab_id == laboratorio
                                                   select l).FirstOrDefault();
                                if (lab != null)
                                {
                                    //Poner cero en la izquierda para formato hora 7:00 a 9:00 en la hora de Entrada
                                    if (HEntrada.Length == 4)
                                    {
                                        HEntrada = "0" + HEntrada;
                                    }
                                    //Poner cero en la izquierda para formato hora 7:00 a 9:00 en la hora de Salida
                                    if (HSalida.Length == 4)
                                    {
                                        HSalida = "0" + HSalida;
                                    }

                                    TimeSpan horaE;
                                    TimeSpan horaS;

                                    //Convertir el campo hora de entrada a tipo tiempo, en caso de que no enviar mensaje
                                    try { horaE = TimeSpan.Parse(HEntrada); }
                                    catch { return "La hora de entrada no tiene el formato correcto"; }

                                    //Convertir el campo hora de salida a tipo tiempo, en caso de que no enviar mensaje
                                    try { horaS = TimeSpan.Parse(HSalida); }
                                    catch { return "La hora de salida no tiene el formato correcto"; }

                                    TimeSpan horaLimiteEntrada = TimeSpan.Parse("07:00");
                                    TimeSpan horaLimiteSalida = TimeSpan.Parse("22:00");

                                    //Verificar que la hora de entrada o salida esten dentro de los tiempos establecidos
                                    if (horaE < horaLimiteEntrada || horaS > horaLimiteSalida)
                                    {
                                        return "La hora de entrada o salida se sale de los limites";
                                    }//Llave de cierre en caso de que la hora de entrada o salida esten fuera de los limites de entrada
                                    else
                                    {
                                        string horaEntradaMedias = HEntrada.Substring(3, 2);
                                        string horaSalidaMedias = HSalida.Substring(3, 2);

                                        //Verificar si la hora de entrada o salida son correspondientes
                                        if (horaEntradaMedias != "00" || horaSalidaMedias != "00")
                                        {
                                            return "El horario no es correspondiente";
                                        }
                                        else
                                        {
                                            string he = HEntrada.Substring(0, 2);
                                            string hs = HSalida.Substring(0, 2);

                                            //Verificar si la hora de Salida es menor o igual que la hora de Entrada
                                            if (horaS <= horaE)
                                            {
                                                return "La hora de salida es menor a la hora de entrada";
                                            }
                                            else
                                            {
                                                string dia = Dia.ToUpper();
                                                if (dia == "LUNES" || dia == "MARTES" || dia == "MIERCOLES" || dia == "JUEVES" || dia == "VIERNES" || dia == "SABADO")
                                                {
                                                    HORARIO existe = (from h in dblab.HORARIO
                                                                      where h.hora_laboratorioId == laboratorio && h.hora_horaEntrada == horaE && h.hora_horaSalida == horaS && h.hora_dia == dia && h.hora_periodo == Periodo
                                                                      select h).FirstOrDefault();

                                                    //Verificar si el laboratorio esta disponible
                                                    if (existe == null)
                                                    {
                                                        int alumnos;

                                                        //Convertir el campo de alumnos a entero, en caso de que no mostrar un mensaje
                                                        try { alumnos = Convert.ToInt32(Alumnos); }
                                                        catch { return "El campo de alumno no tiene el formato correcto"; }

                                                        //Verificar que los alumnos no pasen la capacidad del laboratorio
                                                        if (alumnos <= lab.lab_capacidad)
                                                        {
                                                            var idHora = dblab.sp_getHorario();
                                                            int? seqHora = Convert.ToInt32(idHora.SingleOrDefault());
                                                            string materiaGrp = (materia) + grupo;

                                                            HORARIO hora = new HORARIO();
                                                            hora.hora_id = Convert.ToInt32(seqHora);
                                                            hora.hora_grupoId = grupo;
                                                            hora.hora_profesorId = profesor;
                                                            hora.hora_materiaId = materia;
                                                            hora.hora_laboratorioId = laboratorio;
                                                            hora.hora_horaEntrada = TimeSpan.Parse(HEntrada);
                                                            hora.hora_horaSalida = TimeSpan.Parse(HSalida);
                                                            hora.hora_dia = dia;
                                                            hora.hora_serie = materiaGrp;
                                                            hora.hora_periodo = Periodo;
                                                            dblab.HORARIO.Add(hora);

                                                            int total = Convert.ToInt32(hs) - Convert.ToInt32(he);

                                                            MATGRP existMat = (from m in dblab.MATGRP
                                                                               where m.matgrp_nombre == materiaGrp
                                                                               select m).FirstOrDefault();

                                                            //Verificar si existe un grupo para las horas practicas
                                                            if (existMat == null)
                                                            {

                                                                MATGRP matgrp = new MATGRP();
                                                                matgrp.matgrp_nombre = (materia) + grupo;
                                                                matgrp.materia = materia;
                                                                matgrp.grupo = grupo;
                                                                matgrp.hora = mat.mat_horasp - total;
                                                                matgrp.periodo = Periodo;
                                                                dblab.MATGRP.Add(matgrp);
                                                            }
                                                            //En caso de que exista se modifica el registro
                                                            else
                                                            {
                                                                existMat.hora = existMat.hora - total;
                                                            }
                                                            dblab.SaveChanges();
                                                            return "Datos Guardados";
                                                        }//Llave de cierre del if en caso de que no excedan la capacidad del laboratorio
                                                        else
                                                        {
                                                            return "El grupo excede la capacidad del laboratorio";
                                                        }

                                                    }//Llave de cierre en caso de que el laboratorio no este ocupado
                                                    else
                                                    {
                                                        return "El laboratorio " + laboratorio + " esta ocupado de " + horaE + " a " + horaS + " el dia " + dia;
                                                    }
                                                }//Llave del cierre en caso de que el campo dia tenga el formato correcno
                                                else
                                                {
                                                    return "El campo dia no tiene el formato correcto";
                                                }
                                            }//Llave de cierre del else en caso de que la hora de salida no sea menor o igual a la hora de entrda 
                                        }//Llave de cierre del else en caso que la hora sea correspondiente
                                    }//Llave de cierre del else en caso de que la hora no este fuera de los limites establecidos

                                }//Llave de cierre en caso de que el laboratorio exista
                                else
                                {
                                    return "El dato laboratorio no existe.";
                                }
                            }//Llave de cierre en caso de que el profesor exista
                            else
                            {
                                return "El dato profesor no existe.";
                            }
                        }//Llave de cierre en caso de que la materia exista
                        else
                        {
                            return "El dato materia no existe.";
                        }
                    }//Llave de cierre en caso de que el campo grupo este en el formato correcto  
                    else
                    {
                        return "El campo grupo no tiene el formato correcto";
                    }
                }//Llave de cierre del else en caso de que ningun campo falte  
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveLaboratorioImportar(string Serie, string Nombre, string Capacidad, string Descripcion)
        {
            try
            {
                if (Serie == "undefined" || Nombre == "undefined" || Capacidad == "undefined")
                {
                    return "Faltan campos por llenar";
                }
                else
                {
                    Regex Val = new Regex("[0-9]");
                    //Verificar si el campo serie contiene numeros
                    if (Val.IsMatch(Serie))
                    {
                        return "El campo serie no tiene el formato correcto";
                    }
                    else
                    {
                        string seriePrincipal = Serie.Substring(0, 3);

                        if (seriePrincipal == "lcl" || seriePrincipal == "LCL")
                        {
                            if (Nombre.Length > 1)
                            {
                                return "El campo nombre tiene el formato incorrecto";
                            }
                            else
                            {
                                Regex ValNom = new Regex("[0-9]");

                                //Verificar si el campo nombre contiene numeros
                                if (ValNom.IsMatch(Nombre))
                                {
                                    return "El campo nombre no tiene el formato correcto";
                                }
                                else
                                {
                                    int capacidad;
                                    string serie = Serie.ToUpper();
                                    //Verificar que el campo capacidad tenga el formato correcto
                                    try { capacidad = Convert.ToInt32(Capacidad); }
                                    catch { return "El campo capacidad no tiene el formato correcto"; }

                                    LABORATORIO labo = (from l in dblab.LABORATORIO
                                                        where l.lab_id == serie
                                                        select l).FirstOrDefault();

                                    string nombre = Nombre.ToUpper();

                                    if (labo != null)
                                    {
                                        return "La serie de laboratorio ya existe";
                                    }

                                    else
                                    {
                                        LABORATORIO lab = new LABORATORIO();
                                        lab.lab_id = serie;
                                        lab.lab_nombre = nombre;
                                        lab.lab_capacidad = capacidad;
                                        lab.lab_descripcion = Descripcion;
                                        dblab.LABORATORIO.Add(lab);
                                        dblab.SaveChanges();
                                        return "Datos Guardados";
                                    }
                                }
                            }
                        }//Fin de la llave en caso de que la serie tenga el formato correcto
                        else
                        {
                            return "El campo serie no tiene el formato incorrecto";
                        }
                    }//Fin del else en caso de que la serie tenga el formato correcto
                }//Fin del else en caso de que no falten campos por llenar
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveMateriaImportar(string Serie, string Nombre, string Semestre, string Carrera, string HPracticas)
        {
            try
            {
                //Verificar si algun campo esta vacio
                if (Serie == "undefined" || Nombre == "undefined" || Semestre == "undefined" || Carrera == "undefined" || HPracticas == "undefined")
                {
                    return "Faltan campos por llenar";
                }
                else
                {
                    int semestre;

                    //Verificar que el campo semestre tenga el formato correcto
                    try { semestre = Convert.ToInt32(Semestre); }
                    catch { return "El campo semestre tiene el formato incorrecto"; }

                    //Verificar que el campo semeste se encuentre dentro de los parametros establecidos
                    if (semestre >= 1 && semestre <= 9)
                    {
                        string carrera = Carrera.ToUpper();

                        CARRERA car = (from c in dblab.CARRERA
                                       where c.car_id == carrera
                                       select c).FirstOrDefault();

                        //Verificar si el campo carrera existe
                        if (car != null)
                        {
                            int hprac;

                            //Verificar que el campo horas practicas tenga el formato correcto
                            try { hprac = Convert.ToInt32(HPracticas); }
                            catch { return "El campo horas practicas no tiene el formato correcto"; }

                            //Verificar que las horas practicas esten dentro de los parametros establecidos
                            if (hprac > 0 && hprac <= 6)
                            {

                                string serie = Serie.ToUpper();
                                string id = serie + car.car_id.Substring(1, 2) + Semestre;
                                MATERIA mate = (from m in dblab.MATERIA
                                                where m.mat_id == id
                                                select m).FirstOrDefault();

                                string nombre = Nombre.ToUpper();

                                if (mate != null)
                                {
                                    return "La serie de la materia ya existe";
                                }

                                else
                                {
                                    if (serie.Length < 2)
                                    {
                                        MATERIA mat = new MATERIA();
                                        mat.mat_id = id;
                                        mat.mat_nombre = nombre;
                                        mat.mat_semestre = semestre;
                                        mat.mat_carrera = car.car_id;
                                        mat.mat_horasp = hprac;
                                        dblab.MATERIA.Add(mat);
                                        dblab.SaveChanges();
                                        return "Datos Guardados";
                                    }
                                    else
                                    {
                                        return "El campo serie no tiene el formato correcto";
                                    }
                                }
                            }//Fin de la llave en caso de que las horas practicas correspondan
                            else
                            {
                                return "Las horas practicas exceden a las obligatorias";
                            }

                        }//Fin de la llave en caso de que la carrera exista
                        else
                        {
                            return "El campo carrera no existe";
                        }
                    }//Fin de la llave en caso de que el semestre este dentro de los semestres presentes
                    else
                    {
                        return "El campo semestre no pertenece a los semetres presentes";
                    }
                }//Fin del else en caso de que no falte ningun campo



            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveProfesoresImportar(string NoEmp, string Nombre, string Contrato, string Correo, string Telefono)
        {
            try
            {
                //Verificar si falta algun campo
                if (NoEmp == "undefined" || Nombre == "undefined" || Contrato == "undefined" || Correo == "undefined" || Telefono == "undefined")
                {
                    return "Faltan campos por llenar";
                }
                else
                {
                    int noEmp;

                    //Verificar si el campo no. Empleado tiene el formato correcto
                    try { noEmp = Convert.ToInt32(NoEmp); }
                    catch { return "El campo No. Empleado no tiene el formato correcto"; }

                    Regex Val = new Regex("[0-9]");

                    //Verificar si el campo nombre contiene numeros
                    if (Val.IsMatch(Nombre))
                    {
                        return "El campo nombre no tiene el formato correcto";
                    }
                    else
                    {
                        string contrato = Contrato.ToUpper();

                        //Verificar si el campo contrato existe
                        if (contrato == "BASE" || contrato == "HONORARIO")
                        {
                            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                            Match match = regex.Match(Correo);

                            //Verificar si el campo correo tiene el formato correcto
                            if (match.Success)
                            {
                                string nombre = Nombre.ToUpper();

                                Regex regexnumber = new Regex(@"^[0-9]+$");
                                Match matchnumber = regexnumber.Match(Telefono);

                                //Verificar si el campo telefono tiene el formato correcto
                                if (matchnumber.Success)
                                {
                                    PROFESOR profe = (from p in dblab.PROFESOR
                                                      where p.prf_id == noEmp
                                                      select p).FirstOrDefault();

                                    //Verificar si el no empleado ya existe
                                    if (profe != null)
                                    {
                                        return "El no empleado ya existe";
                                    }

                                    else
                                    {
                                        PROFESOR prf = new PROFESOR();
                                        prf.prf_id = noEmp;
                                        prf.prf_nombreCompleto = nombre;
                                        prf.prf_contrato = contrato;
                                        prf.prf_correo = Correo;
                                        prf.prf_telefono = Telefono;
                                        dblab.PROFESOR.Add(prf);
                                        dblab.SaveChanges();
                                        return "Datos Guardados";
                                    }
                                }
                                else
                                {
                                    return "El campo telefono no tiene el formato correcto";
                                }
                            }
                            else
                            {
                                return "El campo correo no tiene el formato correcto";
                            }

                        }
                        else
                        {
                            return "El campo contrato no tiene el formato correcto";
                        }

                    }//Fin del else en caso de que el campo nombre tenga el formato correcto                    
                }//Fin del else en caso de que no falte ningun campo                
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveCarreraImportar(string Serie, string Nombre)
        {
            try
            {
                //Verificar si faltan campos
                if (Serie == "undefined" || Nombre == "undefined")
                {
                    return "Faltan campos por llenar";
                }
                else
                {
                    Regex Val = new Regex("[0-9]");
                    string serie = Serie.ToUpper();

                    if (Val.IsMatch(serie) || serie.Length >= 5)
                    {
                        return "El campo serie no tiene el formato correcto";
                    }
                    else
                    {
                        //Verificar si el campo nombre contiene numeros
                        if (Val.IsMatch(Nombre))
                        {
                            return "El campo nombre no tiene el formato correcto";
                        }
                        else
                        {
                            string nombre = Nombre.ToUpper();

                            CARRERA carre = (from c in dblab.CARRERA
                                             where c.car_id == serie
                                             select c).FirstOrDefault();
                            if (carre != null)
                            {
                                return "La serie de la carrera ya existe";
                            }
                            else
                            {
                                CARRERA carreNom = (from c in dblab.CARRERA
                                                    where c.car_nombre == nombre
                                                    select c).FirstOrDefault();

                                if (carreNom != null)
                                {
                                    return "El nombre de la carrera ya existe";
                                }
                                else
                                {
                                    CARRERA car = new CARRERA();
                                    car.car_id = serie;
                                    car.car_nombre = nombre;
                                    dblab.CARRERA.Add(car);
                                    dblab.SaveChanges();
                                    return "Datos Guardados";
                                }
                            }//fin del else en caso de que la serie de la carrera no exista
                        }//Fin del esle en caso que el nombre tenga el formato correcto                   
                    }//Fin del else en caso de que el campo serie tenga el formato correcto   
                }//Fin del else en caso de que no falte ningun campo                
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveCursoImportar(string Nombre, string Representante, string Presentador, string Laboratorio, string Periodo, string HoraEntrada, string HoraSalida, string Fecha, string Dia)
        {
            try
            {
                if (Nombre == "undefined" || Representante == "undefined" || Presentador == "undefined" || Laboratorio == "undefined" || Periodo == "undefined" || HoraEntrada == "undefined" || HoraSalida == "undefined" || Fecha == "undefined" || Dia == "undefined")
                {
                    return "Faltan campos por llenar";
                }
                else
                {
                    string nombre = Nombre.ToUpper();

                    int profesor;

                    try { profesor = Convert.ToInt32(Representante); }
                    catch { return "El campo representante tiene el formato incorrecto"; }

                    PROFESOR prf = (from p in dblab.PROFESOR
                                    where p.prf_id == profesor
                                    select p).FirstOrDefault();

                    //Verificar si el profesor existe
                    if (prf != null)
                    {
                        string pre = Presentador.ToUpper();
                        Regex Val = new Regex("[0-9]");
                        //Verificar si el campo presentador contiene numeros
                        if (Val.IsMatch(pre))
                        {
                            return "El campo presentador tiene el formato incorrecto";
                        }
                        else
                        {
                            string laboratorio = Laboratorio.ToUpper();

                            LABORATORIO lab = (from l in dblab.LABORATORIO
                                               where l.lab_id == laboratorio
                                               select l).FirstOrDefault();

                            //Verificar que el laboratorio exista
                            if (lab != null)
                            {

                                //Poner cero en la izquierda para formato hora 7:00 a 9:00 en la hora de Entrada
                                if (HoraEntrada.Length == 4)
                                {
                                    HoraEntrada = "0" + HoraEntrada;
                                }
                                //Poner cero en la izquierda para formato hora 7:00 a 9:00 en la hora de Salida
                                if (HoraSalida.Length == 4)
                                {
                                    HoraSalida = "0" + HoraSalida;
                                }

                                TimeSpan horaE;

                                try { horaE = TimeSpan.Parse(HoraEntrada); }
                                catch { return "El campo hora de entrada tiene el formato incorrecto"; }

                                TimeSpan horaS;

                                try { horaS = TimeSpan.Parse(HoraSalida); }
                                catch { return "El campo hora de salida tiene el formato incorrecto"; }

                                string horaEntradaMedias = HoraEntrada.Substring(3, 2);
                                string horaSalidaMedias = HoraSalida.Substring(3, 2);

                                if (horaEntradaMedias != "00" || horaSalidaMedias != "00")
                                {
                                    return "El horario no es correspondiente";
                                }
                                else
                                {
                                    int he = Convert.ToInt32(HoraEntrada.Substring(0, 2));
                                    int hs = Convert.ToInt32(HoraSalida.Substring(0, 2));

                                    TimeSpan horaLimiteEntrada = TimeSpan.Parse("07:00");
                                    TimeSpan horaLimiteSalida = TimeSpan.Parse("22:00");



                                    //Verificar que la hora de entrada o salida esten dentro de los tiempos establecidos
                                    if (horaE < horaLimiteEntrada || horaS > horaLimiteSalida)
                                    {
                                        return "La hora de entrada o salida se sale de los limites";
                                    }//Llave de cierre en caso de que la hora de entrada o salida esten fuera de los limites de entrada
                                    else
                                    {
                                        DateTime fecha;

                                        try { fecha = Convert.ToDateTime(Fecha); }
                                        catch { return "El campo fecha tiene el formato incorrecto"; }

                                        //Verificar que la hora de salida sea mayor a la hora de entrada
                                        if (hs > he)
                                        {
                                            DateTime fechaActual = DateTime.Today;

                                            //Verificar que la fecha no sea menor a la fecha actual
                                            if (fecha >= fechaActual)
                                            {
                                                HORARIO existe = (from h in dblab.HORARIO
                                                                  where h.hora_laboratorioId == lab.lab_id && (h.hora_horaEntrada == horaE || h.hora_horaSalida == horaS) && h.hora_dia == Dia && h.hora_periodo == Periodo
                                                                  select h).FirstOrDefault();
                                                //Verificar si hay lugar en los horarios
                                                if (existe == null)
                                                {
                                                    CURSOS existeCur = (from c in dblab.CURSOS
                                                                        where c.cur_laboratorioId == lab.lab_id && (c.cur_horaEntrada == horaE || c.cur_horaSalida == horaS) && c.cur_fecha == fecha && c.cur_periodo == Periodo
                                                                        select c).FirstOrDefault();
                                                    if (existeCur != null)
                                                    {
                                                        CURSOS nombreCurso = (from c in dblab.CURSOS
                                                                              where c.cur_nombre == nombre
                                                                              select c).FirstOrDefault();
                                                        if (nombreCurso != null)
                                                        {
                                                            return "El nombre del curso ya existe";
                                                        }
                                                        else
                                                        {
                                                            return "El labotario " + lab.lab_nombre + " esta ocupado el dia " + existeCur.cur_fecha + " de " + existeCur.cur_horaEntrada + " a " + existeCur.cur_horaSalida + " por el curso: " + existeCur.cur_nombre;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        var idCur = dblab.sp_getCurso();
                                                        int? seqCur = Convert.ToInt32(idCur.SingleOrDefault());

                                                        CURSOS cur = new CURSOS();
                                                        cur.cur_id = Convert.ToInt32(seqCur);
                                                        cur.cur_nombre = nombre;
                                                        cur.cur_profesorId = prf.prf_id;
                                                        cur.cur_laboratorioId = lab.lab_id;
                                                        cur.cur_horaEntrada = horaE;
                                                        cur.cur_horaSalida = horaS;
                                                        cur.cur_dia = Dia;
                                                        cur.cur_fecha = fecha;
                                                        cur.cur_presentador = pre;
                                                        cur.cur_periodo = Periodo;
                                                        dblab.CURSOS.Add(cur);
                                                        dblab.SaveChanges();
                                                        return "Datos Guardados";
                                                    }
                                                }
                                                else
                                                {
                                                    return "El laboratorio " + lab.lab_nombre + " esta ocupado de " + existe.hora_horaEntrada + " a " + existe.hora_horaSalida + " el dia " + Dia;
                                                }
                                            }//Fin de la llave en caso de que la fecha este bien designada
                                            else
                                            {
                                                return "La fecha esta mal designada";
                                            }
                                        }
                                        else
                                        {
                                            return "La hora de salida es menor a la hora de entrada";
                                        }
                                    }
                                }
                            }//Fin de la llave en caso de que el laboratorio exista
                            else
                            {
                                return "El laboratorio no existe";
                            }
                        }//Fin del else en caso de que el presentador tenga el formato correcto
                    }//Fin de la llave en caso de que el profesor exista
                    else
                    {
                        return "El profesor no existe";
                    }
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string saveGRpComImportar(string CarGrpUno, string CarGrpDos, string GrupoUno, string GrupoDos, string Materia, string Profesor, string Grupo, string Laboratorio, string HoraEntrada, string HoraSalida, string Dia, string Alumnos, string Periodo)
        {
            try
            {
                string cargrpuno = CarGrpUno.ToUpper();
                CARRERA carUno = (from c in dblab.CARRERA
                                  where c.car_id == cargrpuno
                                  select c).FirstOrDefault();
                if (carUno != null)
                {
                    string cargrpdos = CarGrpDos.ToUpper();

                    CARRERA carDos = (from c in dblab.CARRERA
                                      where c.car_id == cargrpdos
                                      select c).FirstOrDefault();
                    if (carDos != null)
                    {
                        string materia = Materia.ToUpper();

                        MATERIA mat = (from m in dblab.MATERIA
                                       where m.mat_nombre == materia
                                       select m).FirstOrDefault();

                        if (mat != null)
                        {
                            MATERIA matUno = (from m in dblab.MATERIA
                                              where m.mat_nombre == materia && m.mat_carrera == cargrpuno
                                              select m).FirstOrDefault();

                            if (cargrpuno == cargrpdos)
                            {
                                return "La carrera del grupo uno es la misma carrera del grupo dos";
                            }
                            else
                            {
                                if (matUno != null)
                                {
                                    MATERIA matDos = (from m in dblab.MATERIA
                                                      where m.mat_nombre == materia && m.mat_carrera == cargrpdos
                                                      select m).FirstOrDefault();

                                    if (matDos != null)
                                    {
                                        int profesor;

                                        //Verificar que el campo profesor tenga el formato correcto
                                        try { profesor = Convert.ToInt32(Profesor); }
                                        catch { return "El campo profesor no tiene el formato correcto"; }

                                        PROFESOR prf = (from p in dblab.PROFESOR
                                                        where p.prf_id == profesor
                                                        select p).FirstOrDefault();

                                        if (prf != null)
                                        {
                                            Regex Val = new Regex(@"[a-zA-ZñÑ\s]");
                                            string grupoUno = GrupoUno.ToUpper();
                                            string grupoDos = GrupoDos.ToUpper();
                                            string grupo = Grupo.ToUpper();
                                            //Verificar si el campo GrupoUno este en el formato correcto
                                            if (Val.IsMatch(grupoUno) && grupoUno.Length == 1)
                                            {
                                                if (Val.IsMatch(grupoDos) && grupoDos.Length == 1)
                                                {
                                                    if (Val.IsMatch(grupo) && grupoUno.Length == 1)
                                                    {
                                                        string laboratorio = Laboratorio.ToUpper();

                                                        LABORATORIO lab = (from l in dblab.LABORATORIO
                                                                           where l.lab_id == laboratorio
                                                                           select l).FirstOrDefault();

                                                        if (lab != null)
                                                        {
                                                            //Poner cero en la izquierda para formato hora 7:00 a 9:00 en la hora de Entrada
                                                            if (HoraEntrada.Length == 4)
                                                            {
                                                                HoraEntrada = "0" + HoraEntrada;
                                                            }
                                                            //Poner cero en la izquierda para formato hora 7:00 a 9:00 en la hora de Salida
                                                            if (HoraSalida.Length == 4)
                                                            {
                                                                HoraSalida = "0" + HoraSalida;
                                                            }

                                                            TimeSpan horaE;
                                                            TimeSpan horaS;

                                                            //Convertir el campo hora de entrada a tipo tiempo, en caso de que no enviar mensaje
                                                            try { horaE = TimeSpan.Parse(HoraEntrada); }
                                                            catch { return "La hora de entrada no tiene el formato correcto"; }

                                                            //Convertir el campo hora de salida a tipo tiempo, en caso de que no enviar mensaje
                                                            try { horaS = TimeSpan.Parse(HoraSalida); }
                                                            catch { return "La hora de salida no tiene el formato correcto"; }

                                                            TimeSpan horaLimiteEntrada = TimeSpan.Parse("07:00");
                                                            TimeSpan horaLimiteSalida = TimeSpan.Parse("22:00");

                                                            //Verificar que la hora de entrada o salida esten dentro de los tiempos establecidos
                                                            if (horaE < horaLimiteEntrada || horaS > horaLimiteSalida)
                                                            {
                                                                return "La hora de entrada o salida se sale de los limites";
                                                            }//Llave de cierre en caso de que la hora de entrada o salida esten fuera de los limites de entrada
                                                            else
                                                            {
                                                                string horaEntradaMedias = HoraEntrada.Substring(3, 2);
                                                                string horaSalidaMedias = HoraSalida.Substring(3, 2);

                                                                //Verificar si la hora de entrada o salida son correspondientes
                                                                if (horaEntradaMedias != "00" || horaSalidaMedias != "00")
                                                                {
                                                                    return "El horario no es correspondiente";
                                                                }
                                                                else
                                                                {
                                                                    //Verificar si la hora de Salida es menor o igual que la hora de Entrada
                                                                    if (horaS <= horaE)
                                                                    {
                                                                        return "La hora esta mal designada";
                                                                    }
                                                                    else
                                                                    {
                                                                        string dia = Dia.ToUpper();
                                                                        if (dia == "LUNES" || dia == "MARTES" || dia == "MIERCOLES" || dia == "JUEVES" || dia == "VIERNES" || dia == "SABADO")
                                                                        {
                                                                            HORARIO existe = (from h in dblab.HORARIO
                                                                                              where h.hora_laboratorioId == laboratorio && (h.hora_horaEntrada == horaE || h.hora_horaSalida == horaS) && h.hora_dia == dia && h.hora_periodo == Periodo
                                                                                              select h).FirstOrDefault();
                                                                            //Verificar si el laboratorio esta disponible
                                                                            if (existe == null)
                                                                            {
                                                                                int alumnos;

                                                                                //Convertir el campo de alumnos a entero, en caso de que no mostrar un mensaje
                                                                                try { alumnos = Convert.ToInt32(Alumnos); }
                                                                                catch { return "El campo de alumno no tiene el formato correcto"; }

                                                                                if (alumnos <= lab.lab_capacidad)
                                                                                {
                                                                                    string he = HoraEntrada.Substring(0, 2);
                                                                                    string hs = HoraSalida.Substring(0, 2);

                                                                                    var idHora = dblab.sp_getHorario();
                                                                                    int? seqHora = Convert.ToInt32(idHora.SingleOrDefault());

                                                                                    string serie = matUno.mat_id + grupo + " - " + matDos.mat_id + grupo;

                                                                                    COMPARTIDOS compar = (from c in dblab.COMPARTIDOS
                                                                                                          where c.grpCom_serie == serie
                                                                                                          select c).FirstOrDefault();

                                                                                    if (compar != null)
                                                                                    {
                                                                                        HORARIO horario = new HORARIO();
                                                                                        horario.hora_id = Convert.ToInt32(seqHora);
                                                                                        horario.hora_grupoId = grupo;
                                                                                        horario.hora_profesorId = profesor;
                                                                                        horario.hora_materiaId = matUno.mat_id;
                                                                                        horario.hora_laboratorioId = laboratorio;
                                                                                        horario.hora_horaEntrada = TimeSpan.Parse(HoraEntrada);
                                                                                        horario.hora_horaSalida = TimeSpan.Parse(HoraSalida);
                                                                                        horario.hora_dia = dia;
                                                                                        horario.hora_serie = serie;
                                                                                        horario.hora_periodo = Periodo;
                                                                                        dblab.HORARIO.Add(horario);

                                                                                        int totalH = Convert.ToInt32(hs) - Convert.ToInt32(he);

                                                                                        string materiaGpUno = "GC" + matUno.mat_id + grupoUno;

                                                                                        MATGRP existMtUno = (from m in dblab.MATGRP
                                                                                                             where m.matgrp_nombre == materiaGpUno
                                                                                                             select m).FirstOrDefault();

                                                                                        //Verificar si existe un grupo para las horas practicas
                                                                                        if (existMtUno == null)
                                                                                        {

                                                                                            MATGRP matgrp = new MATGRP();
                                                                                            matgrp.matgrp_nombre = "GC" + matUno.mat_id + grupoUno;
                                                                                            matgrp.materia = matUno.mat_id;
                                                                                            matgrp.grupo = grupoUno;
                                                                                            matgrp.hora = matUno.mat_horasp - totalH;
                                                                                            matgrp.periodo = Periodo;
                                                                                            matgrp.matgrp_serie = serie;
                                                                                            dblab.MATGRP.Add(matgrp);
                                                                                        }
                                                                                        //En caso de que exista se modifica el registro
                                                                                        else
                                                                                        {
                                                                                            existMtUno.hora = existMtUno.hora - totalH;
                                                                                        }


                                                                                        string materiaGpDos = "GC" + matDos.mat_id + grupoDos;

                                                                                        MATGRP existMtDos = (from m in dblab.MATGRP
                                                                                                             where m.matgrp_nombre == materiaGpDos
                                                                                                             select m).FirstOrDefault();

                                                                                        //Verificar si existe un grupo para las horas practicas
                                                                                        if (existMtDos == null)
                                                                                        {

                                                                                            MATGRP matgrp = new MATGRP();
                                                                                            matgrp.matgrp_nombre = "GC" + matDos.mat_id + grupoDos;
                                                                                            matgrp.materia = matDos.mat_id;
                                                                                            matgrp.grupo = grupoDos;
                                                                                            matgrp.hora = matDos.mat_horasp - totalH;
                                                                                            matgrp.periodo = Periodo;
                                                                                            matgrp.matgrp_serie = serie;
                                                                                            dblab.MATGRP.Add(matgrp);
                                                                                        }
                                                                                        //En caso de que exista se modifica el registro
                                                                                        else
                                                                                        {
                                                                                            existMtDos.hora = existMtDos.hora - totalH;
                                                                                        }

                                                                                        dblab.SaveChanges();
                                                                                        return "Datos Guardados";
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        COMPARTIDOS compa = new COMPARTIDOS();
                                                                                        compa.grpCom_serie = serie;
                                                                                        compa.grpCom_carGrpUno = carUno.car_id;
                                                                                        compa.grpCom_carGrpDos = carDos.car_id;
                                                                                        compa.grpCom_grpUno = grupoUno;
                                                                                        compa.grpCom_grpDos = grupoDos;
                                                                                        compa.grpCom_grpId = grupo;
                                                                                        compa.grpCom_materia = materia;
                                                                                        compa.grpCom_profesor = profesor;
                                                                                        dblab.COMPARTIDOS.Add(compa);

                                                                                        HORARIO hora = new HORARIO();
                                                                                        hora.hora_id = Convert.ToInt32(seqHora);
                                                                                        hora.hora_grupoId = grupo;
                                                                                        hora.hora_profesorId = profesor;
                                                                                        hora.hora_materiaId = matUno.mat_id;
                                                                                        hora.hora_laboratorioId = laboratorio;
                                                                                        hora.hora_horaEntrada = TimeSpan.Parse(HoraEntrada);
                                                                                        hora.hora_horaSalida = TimeSpan.Parse(HoraSalida);
                                                                                        hora.hora_dia = dia;
                                                                                        hora.hora_serie = serie;
                                                                                        hora.hora_periodo = Periodo;
                                                                                        dblab.HORARIO.Add(hora);

                                                                                        int total = Convert.ToInt32(hs) - Convert.ToInt32(he);

                                                                                        string materiaGrpUno = "GC" + matUno.mat_id + grupoUno;

                                                                                        MATGRP existMatUno = (from m in dblab.MATGRP
                                                                                                              where m.matgrp_nombre == materiaGrpUno
                                                                                                              select m).FirstOrDefault();

                                                                                        //Verificar si existe un grupo para las horas practicas
                                                                                        if (existMatUno == null)
                                                                                        {

                                                                                            MATGRP matgrp = new MATGRP();
                                                                                            matgrp.matgrp_nombre = "GC" + matUno.mat_id + grupoUno;
                                                                                            matgrp.materia = matUno.mat_id;
                                                                                            matgrp.grupo = grupoUno;
                                                                                            matgrp.hora = matUno.mat_horasp - total;
                                                                                            matgrp.periodo = Periodo;
                                                                                            matgrp.matgrp_serie = serie;
                                                                                            dblab.MATGRP.Add(matgrp);
                                                                                        }
                                                                                        //En caso de que exista se modifica el registro
                                                                                        else
                                                                                        {
                                                                                            existMatUno.hora = existMatUno.hora - total;
                                                                                        }


                                                                                        string materiaGrpDos = "GC" + matDos.mat_id + grupoDos;

                                                                                        MATGRP existMatDos = (from m in dblab.MATGRP
                                                                                                              where m.matgrp_nombre == materiaGrpUno
                                                                                                              select m).FirstOrDefault();

                                                                                        //Verificar si existe un grupo para las horas practicas
                                                                                        if (existMatDos == null)
                                                                                        {

                                                                                            MATGRP matgrp = new MATGRP();
                                                                                            matgrp.matgrp_nombre = "GC" + matDos.mat_id + grupoDos;
                                                                                            matgrp.materia = matDos.mat_id;
                                                                                            matgrp.grupo = grupoDos;
                                                                                            matgrp.hora = matDos.mat_horasp - total;
                                                                                            matgrp.periodo = Periodo;
                                                                                            matgrp.matgrp_serie = serie;
                                                                                            dblab.MATGRP.Add(matgrp);
                                                                                        }
                                                                                        //En caso de que exista se modifica el registro
                                                                                        else
                                                                                        {
                                                                                            existMatDos.hora = existMatDos.hora - total;
                                                                                        }



                                                                                        dblab.SaveChanges();
                                                                                        return "Datos Guardados";
                                                                                    }
                                                                                }//Llave de cierre del if en caso de que no excedan la capacidad del laboratorio
                                                                                else
                                                                                {
                                                                                    return "El grupo excede la capacidad del laboratorio";
                                                                                }
                                                                            }
                                                                            else
                                                                            {
                                                                                return "El laboratorio " + laboratorio + " esta ocupado de " + horaE + " a " + horaS + " el dia " + dia;
                                                                            }
                                                                        }
                                                                        else
                                                                        {
                                                                            return "El campo dia tiene el formato incorrecto";
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                        }
                                                        else
                                                        {
                                                            return "El laboratorio no existe";
                                                        }
                                                    }
                                                    else
                                                    {
                                                        return "El campo grupo no tiene el formato correcto";
                                                    }
                                                }
                                                else
                                                {
                                                    return "El grupo de la segunda carrera no tiene el formato correcto";
                                                }
                                            }
                                            else
                                            {
                                                return "El grupo de la primera carrera no tiene el formato correcto";
                                            }
                                        }
                                        else
                                        {
                                            return "El profesor no existe";
                                        }
                                    }
                                    else
                                    {
                                        return "La materia " + Materia + " no existe en la carrera " + CarGrpDos;
                                    }

                                }//Fin de la llave en caso de que la materia exista en la primera carrera
                                else
                                {
                                    return "La materia " + Materia + " no existe en la carrera " + CarGrpUno;
                                }
                            }
                        }//Fin de la llave en caso de que la materia exista
                        else
                        {
                            return "La materia no existe";
                        }
                    }//Fin de la llave en caso de que la segunda carrera exista
                    else
                    {
                        return "La carrera " + CarGrpDos + " no existe";
                    }
                }//Fin de la llave en caso de que la primera carrera exista
                else
                {
                    return "La carrera " + CarGrpUno + " no existe";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        //AutoComplete
        public ActionResult getPrf()
        {
            suggestion sug = new suggestion();

            var registro = (from b in dblab.PROFESOR
                            select b.prf_nombreCompleto).ToList();

            sug.suggestions = registro.ConvertAll(x => x.ToString()).ToArray();

            return Json(sug, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getLab()
        {
            suggestion sug = new suggestion();

            var registro = (from l in dblab.LABORATORIO
                            select l.lab_nombre).ToList();

            sug.suggestions = registro.ConvertAll(x => x.ToString()).ToArray();

            return Json(sug, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getMateria()
        {
            suggestion sug = new suggestion();

            var registro = (from m in dblab.MATERIA
                            select m.mat_nombre).ToList();

            sug.suggestions = registro.ConvertAll(x => x.ToString()).ToArray();

            return Json(sug, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getMateriaId()
        {
            suggestion sug = new suggestion();

            var registro = (from m in dblab.MATERIA
                            select m.mat_id).ToList();

            sug.suggestions = registro.ConvertAll(x => x.ToString()).ToArray();

            return Json(sug, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getCarrera()
        {
            suggestion sug = new suggestion();

            var registro = (from c in dblab.CARRERA
                            select c.car_nombre).ToList();

            sug.suggestions = registro.ConvertAll(x => x.ToString()).ToArray();

            return Json(sug, JsonRequestBehavior.AllowGet);
        }



        //Logearse
        public ActionResult getUsuario(string usuario, string password)
        {
            try
            {
                var validadoUsu = (from u in dblab.USUARIO
                                   where u.usu_nombre == usuario
                                   select u).FirstOrDefault();
                if (validadoUsu != null)
                {
                    var validadoPass = (from u in dblab.USUARIO
                                        where u.usu_nombre == usuario && u.usu_contrasena == password
                                        select u).FirstOrDefault();
                    if (validadoPass != null)
                    {
                        Session["usuario"] = validadoPass.usu_nombre;
                        Session["perfil"] = validadoPass.usu_pefilId;
                        return Json("El usuario " + validadoPass.usu_nombre + " se ha logeado", JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json("La contraseña es errona.", JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json("El usuario no existe.", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public string Logout(string Usuario, string Fecha)
        {
            try
            {
                USUARIO perfil = (from p in dblab.USUARIO
                                  where p.usu_nombre == Usuario
                                  select p).FirstOrDefault();

                if (perfil.usu_pefilId != 1)
                {
                    DateTime fecha = Convert.ToDateTime(Fecha);
                    BITACORA registro = (from r in dblab.BITACORA
                                         where r.bit_usuario == Usuario && r.bit_fecha == fecha
                                         select r).FirstOrDefault();

                    if (registro != null)
                    {
                        Session["usuario"] = null;
                        Session["perfil"] = null;
                        return "Usted se ha deslogado";
                    }
                    else
                    {
                        Session["usuario"] = null;
                        Session["perfil"] = null;
                        return "El sistema le recuerda que no ha registrado su bitacora";
                    }
                }
                else
                {
                    Session["usuario"] = null;
                    Session["perfil"] = null;
                    return "Usted se ha deslogado";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //METODOS DE BUSCAR
        public List<InfoHPrac> HorasPracticas()
        {
            try
            {
                DateTime Hoy = DateTime.Today;
                string fecha_actual = Hoy.ToString("dd-MM-yyyy");

                string mes = fecha_actual.Substring(3, 2);
                string anio = fecha_actual.Substring(6, 4);
                string numeroPeriodo = "";
                if (mes == "01") { numeroPeriodo = "1"; }
                if (mes == "02") { numeroPeriodo = "1"; }
                if (mes == "03") { numeroPeriodo = "1"; }
                if (mes == "04") { numeroPeriodo = "1"; }
                if (mes == "05") { numeroPeriodo = "1"; }
                if (mes == "06") { numeroPeriodo = "1"; }
                if (mes == "07") { numeroPeriodo = "Verano"; }
                if (mes == "08") { numeroPeriodo = "2"; }
                if (mes == "09") { numeroPeriodo = "2"; }
                if (mes == "10") { numeroPeriodo = "2"; }
                if (mes == "11") { numeroPeriodo = "2"; }
                if (mes == "12") { numeroPeriodo = "2"; }

                string periodo = anio + "-" + numeroPeriodo;

                List<InfoHPrac> listaHP = new List<InfoHPrac>();
                var lista = from mg in dblab.MATGRP
                            join m in dblab.MATERIA on mg.materia equals m.mat_id
                            where mg.periodo == periodo
                            select new { mg.matgrp_nombre, m.mat_nombre, mg.grupo, m.mat_horasp, mg.hora };

                foreach (var objeto in lista)
                {
                    if (objeto.hora >= 0)
                    {
                        listaHP.Add(new InfoHPrac { Serie = objeto.matgrp_nombre, Materia = objeto.mat_nombre, Grupo = objeto.grupo, HorasPracticas = Convert.ToInt32(objeto.mat_horasp), HorasFaltantes = Convert.ToInt32(objeto.hora), HorasSobrantes = 0 });
                    }
                    else
                    {
                        listaHP.Add(new InfoHPrac { Serie = objeto.matgrp_nombre, Materia = objeto.mat_nombre, Grupo = objeto.grupo, HorasPracticas = Convert.ToInt32(objeto.mat_horasp), HorasFaltantes = 0, HorasSobrantes = (Convert.ToInt32(objeto.hora) * (-1)) });
                    }

                }
                return listaHP;
            }
            catch (Exception ex)
            {
                List<InfoHPrac> NullList = new List<InfoHPrac>(); return NullList;
            }
        }
        public List<InfoCambios> ShowCambios()
        {
            try
            {
               
                    DateTime Hoy = DateTime.Today;
                    string fecha_actual = Hoy.ToString("dd-MM-yyyy");

                    string mes = fecha_actual.Substring(3, 2);
                    string anio = fecha_actual.Substring(6, 4);
                    string numeroPeriodo = "";
                    if (mes == "01") { numeroPeriodo = "1"; }
                    if (mes == "02") { numeroPeriodo = "1"; }
                    if (mes == "03") { numeroPeriodo = "1"; }
                    if (mes == "04") { numeroPeriodo = "1"; }
                    if (mes == "05") { numeroPeriodo = "1"; }
                    if (mes == "06") { numeroPeriodo = "1"; }
                    if (mes == "07") { numeroPeriodo = "Verano"; }
                    if (mes == "08") { numeroPeriodo = "2"; }
                    if (mes == "09") { numeroPeriodo = "2"; }
                    if (mes == "10") { numeroPeriodo = "2"; }
                    if (mes == "11") { numeroPeriodo = "2"; }
                    if (mes == "12") { numeroPeriodo = "2"; }

                    string periodo = anio + "-" + numeroPeriodo;
                

                List<InfoCambios> listaCambios = new List<InfoCambios>();
                var lista = from c in dblab.CAMBIOS
                            where c.cam_periodo == periodo
                            select new { c.cambio_serieGrp, c.cambio_lab, c.cambio_labNuevo, c.cambio_horaEntrada, c.cambio_horaSalida, c.cambio_horaEntradaNueva, c.cambio_horaSalidaNueva, c.cambio_dia, c.cambio_diaNuevo, c.cambio_razonCambio, c.cambio_fecha };
                foreach (var objeto in lista)
                {
                    listaCambios.Add(new InfoCambios { Serie = objeto.cambio_serieGrp, Laboratorio = objeto.cambio_lab, LaboratorioNuevo = objeto.cambio_labNuevo, HoraEntrada = objeto.cambio_horaEntrada, HoraSalida = objeto.cambio_horaSalida, HoraEntradaNuevo = objeto.cambio_horaEntradaNueva, HoraSalidaNuevo = objeto.cambio_horaSalidaNueva, Dia = objeto.cambio_dia, DiaNuevo = objeto.cambio_diaNuevo, Razon = objeto.cambio_razonCambio, Fecha = objeto.cambio_fecha });
                }
                return listaCambios;
            }
            catch (Exception ex)
            {
                List<InfoCambios> NullList = new List<InfoCambios>(); return NullList;
            }
        }
        public List<InfoUsuarios> ShowUsuarios()
        {            
            try
            {
                List<InfoUsuarios> Usuarios = new List<InfoUsuarios>();
                var usu = from u in dblab.USUARIO
                          join p in dblab.PERFIL on u.usu_pefilId equals p.pfl_id
                          select new { u.usu_id, u.usu_nombre, u.usu_apPaterno, u.usu_apMaterno, u.usu_contrasena, u.usu_correo, p.pfl_nombre, u.usu_noControl };

                foreach (var objeto in usu)
                {
                    Usuarios.Add(new InfoUsuarios { UsuId = objeto.usu_id, UsuNombre = objeto.usu_nombre, UsuAp = objeto.usu_apPaterno, UsuAm = objeto.usu_apMaterno, UsuPass = objeto.usu_contrasena, UsuCorreo = objeto.usu_correo, UsuPerfil = objeto.pfl_nombre, NoControl = Convert.ToInt32(objeto.usu_noControl) });
                }
                return Usuarios;
            }
            catch (Exception ex)
            {
                List<InfoUsuarios> NullList = new List<InfoUsuarios>(); return NullList;
            }
        }
        public List<InfoLab> ShowLab()
        {
            try
            {
                List<InfoLab> listaLab = new List<InfoLab>();
                var lista = from l in dblab.LABORATORIO
                            orderby l.lab_nombre
                            select new { l.lab_nombre };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoLab { NombreLab = objeto.lab_nombre });
                }
                return listaLab;
            }
            catch (Exception ex)
            {
                List<InfoLab> NullList = new List<InfoLab>(); return NullList;
            }
        }

        //METODOS PARA ELIMINAR
        public string elminarDep(string depa)
        {
            try
            {
                var dep = (from d in dblab.DEPARTAMENTO
                           where d.dep_id == depa
                           select d).Single();
                dblab.Entry(dep).State = System.Data.Entity.EntityState.Deleted;
                dblab.SaveChanges();
                return "El departamento " + depa + " ah sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string elminarCar(string Carrera)
        {
            try
            {
                var car = (from c in dblab.CARRERA
                           where c.car_id == Carrera
                           select c).Single();
                dblab.Entry(car).State = System.Data.Entity.EntityState.Deleted;
                dblab.SaveChanges();
                return "La carrera " + Carrera + " ah sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string elminarPrf(int Profesor)
        {
            try
            {
                var prf = (from p in dblab.PROFESOR
                           where p.prf_id == Profesor
                           select p).Single();
                dblab.Entry(prf).State = System.Data.Entity.EntityState.Deleted;
                dblab.SaveChanges();
                return "El profesor con no. Empleado " + Profesor + " ah sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string eliminarMtr(string Materia)
        {
            try
            {
                var mat = (from m in dblab.MATERIA
                           where m.mat_id == Materia
                           select m).Single();
                dblab.Entry(mat).State = System.Data.Entity.EntityState.Deleted;
                dblab.SaveChanges();
                return "La materia con seria " + Materia + " ah sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string eliminarLab(string Laboratorio)
        {
            try
            {
                var lab = (from l in dblab.LABORATORIO
                           where l.lab_id == Laboratorio
                           select l).Single();
                dblab.Entry(lab).State = System.Data.Entity.EntityState.Deleted;
                dblab.SaveChanges();
                return "El laboratorio con serie " + Laboratorio + " ah sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string eliminarCur(int Curso)
        {
            try
            {
                var cur = (from c in dblab.CURSOS
                           where c.cur_id == Curso
                           select c).Single();
                dblab.Entry(cur).State = System.Data.Entity.EntityState.Deleted;
                dblab.SaveChanges();
                return "El curso ha sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string eliminarUsu(int Id)
        {
            try
            {
                var usu = (from u in dblab.USUARIO
                           where u.usu_id == Id
                           select u).Single();
                dblab.Entry(usu).State = System.Data.Entity.EntityState.Deleted;
                dblab.SaveChanges();
                return "El usuario ha sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string eliminarHora(string IdHora, string Serie, string HoraEntrada, string HoraSalida)
        {
            try
            {
                int hora = Convert.ToInt32(IdHora);

                int he = Convert.ToInt32(HoraEntrada.Substring(0, 2));
                int hs = Convert.ToInt32(HoraSalida.Substring(0, 2));

                int total = hs - he;

                var matgrp = from m in dblab.MATGRP
                             where m.matgrp_nombre == Serie || m.matgrp_serie == Serie
                             select m;

                foreach (MATGRP c in matgrp) c.hora = c.hora + total;

                var horario = (from h in dblab.HORARIO
                               where h.hora_id == hora
                               select h).Single();
                dblab.Entry(horario).State = System.Data.Entity.EntityState.Deleted;

                dblab.SaveChanges();
                return "El horario seleccionado ah sido borrado";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        //VISTA CONSULTAS

        //ESTUDIANTES

        //Total de estudiantes que accesaron a los laboratorios
        public int getEstudiantesTotal(string Periodo)
        {
            var estudiantes = (from e in dblab.ACCESO
                               where e.acc_usuario == "Estudiante" && e.acc_periodo == Periodo
                               select (e)).Count();

            return estudiantes;
        }

        //Total de estudiantes que accesaron a ese laboratorio
        public int getEstLab(string Laboratorio, string Periodo)
        {
            var estudiantes = (from e in dblab.ACCESO
                               where e.acc_usuario == "Estudiante" && e.acc_periodo == Periodo && e.acc_laboratorioId == Laboratorio
                               select (e)).Count();

            return estudiantes;
        }

        //Todos los accesos del laboratorio seleccionado
        public JsonResult getLaboratoriosEst(string Laboratorio, string Periodo)
        {
            List<InfoAcceso> listaLab = new List<InfoAcceso>();
            try
            {
                var lista = from l in dblab.ACCESO
                            where l.acc_usuario == "Estudiante" && l.acc_laboratorioId == Laboratorio && l.acc_periodo == Periodo
                            select new { l.acc_usuario, l.acc_numeroId, l.acc_maquina, l.acc_horaEntrada, l.acc_fecha };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoAcceso { Usuario = objeto.acc_usuario, Numero = objeto.acc_numeroId.ToString(), Maquina = objeto.acc_maquina, HoraEntrada = objeto.acc_horaEntrada.ToString(), Fecha = objeto.acc_fecha.ToString() });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }

        //Total de estudiantes que accesaron al laboratorio seleccionado conforme a las fechas seleccionadas
        public int getEstFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            DateTime fechaIni = Convert.ToDateTime(FechaInicio);
            DateTime fechaFin = Convert.ToDateTime(FechaFinal);

            var estudiantes = (from e in dblab.ACCESO
                               where e.acc_usuario == "Estudiante" && e.acc_periodo == Periodo && e.acc_laboratorioId == Laboratorio && (e.acc_fecha >= fechaIni && e.acc_fecha <= fechaFin)
                               select (e)).Count();

            return estudiantes;
        }

        //Mostrar los accesos del laboratorio seleccionado de la fecha seleccionada
        public JsonResult getLabEstFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            List<InfoAcceso> listaLab = new List<InfoAcceso>();
            try
            {
                DateTime fechaIni = Convert.ToDateTime(FechaInicio);
                DateTime fechaFin = Convert.ToDateTime(FechaFinal);

                var lista = from l in dblab.ACCESO
                            where l.acc_usuario == "Estudiante" && l.acc_laboratorioId == Laboratorio && l.acc_periodo == Periodo && (l.acc_fecha >= fechaIni && l.acc_fecha <= fechaFin)
                            select new { l.acc_usuario, l.acc_numeroId, l.acc_maquina, l.acc_horaEntrada, l.acc_fecha };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoAcceso { Usuario = objeto.acc_usuario, Numero = objeto.acc_numeroId.ToString(), Maquina = objeto.acc_maquina, HoraEntrada = objeto.acc_horaEntrada.ToString(), Fecha = objeto.acc_fecha.ToString() });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }
    
        //DOCENTES

        //Total de docentes que han accesado al laboratorio
        public int getDocente()
        {
            var docentes = (from e in dblab.ACCESO
                            where e.acc_usuario == "Docente"
                            select (e)).Count();

            return docentes;
        }
        
        //Total de docentes del laboratorio seleccionado
        public int getDocLab(string Laboratorio, string Periodo)
        {
            var docentes = (from e in dblab.ACCESO
                               where e.acc_usuario == "Docente" && e.acc_periodo == Periodo && e.acc_laboratorioId == Laboratorio
                               select (e)).Count();

            return docentes;
        }
        
        //Mostrar Accesos de los docentes del laboratorio seleccionado
        public JsonResult getLaboratoriosDoc(string Laboratorio, string Periodo)
        {
            List<InfoAcceso> listaLab = new List<InfoAcceso>();
            try
            {
                var lista = from l in dblab.ACCESO
                            where l.acc_usuario == "Docente" && l.acc_laboratorioId == Laboratorio && l.acc_periodo == Periodo
                            select new { l.acc_usuario, l.acc_numeroId, l.acc_maquina, l.acc_horaEntrada, l.acc_fecha, l.acc_materia };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoAcceso { Usuario = objeto.acc_usuario, Numero = objeto.acc_numeroId.ToString(), Maquina = objeto.acc_maquina, HoraEntrada = objeto.acc_horaEntrada.ToString(), Fecha = objeto.acc_fecha.ToString(), Materia=objeto.acc_materia });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }

        //Total de docentes del laboratorio seleccionado de las fechas seleccionadas
        public int getDocFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            DateTime fechaIni = Convert.ToDateTime(FechaInicio);
            DateTime fechaFin = Convert.ToDateTime(FechaFinal);

            var docente = (from e in dblab.ACCESO
                               where e.acc_usuario == "Docente" && e.acc_periodo == Periodo && e.acc_laboratorioId == Laboratorio && (e.acc_fecha >= fechaIni && e.acc_fecha <= fechaFin)
                               select (e)).Count();

            return docente;
        }

        //Mostrar accesos de los docentes del laboratorio seleccionado de las fechas seleccionadas
        public JsonResult getLabDocFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            List<InfoAcceso> listaLab = new List<InfoAcceso>();
            try
            {
                DateTime fechaIni = Convert.ToDateTime(FechaInicio);
                DateTime fechaFin = Convert.ToDateTime(FechaFinal);

                var lista = from l in dblab.ACCESO
                            where l.acc_usuario == "Docente" && l.acc_laboratorioId == Laboratorio && l.acc_periodo == Periodo && (l.acc_fecha >= fechaIni && l.acc_fecha <= fechaFin)
                            select new { l.acc_usuario, l.acc_numeroId, l.acc_maquina, l.acc_horaEntrada, l.acc_fecha, l.acc_materia };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoAcceso { Usuario = objeto.acc_usuario, Numero = objeto.acc_numeroId.ToString(), Maquina = objeto.acc_maquina, HoraEntrada = objeto.acc_horaEntrada.ToString(), Fecha = objeto.acc_fecha.ToString(), Materia=objeto.acc_materia });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }

        //ACCESOS
        
        //Mostrar el total de asistencias
        public int getAccesos(string Periodo)
        {
            var accesos = (from e in dblab.ASISTENCIA
                           where e.asis_periodo == Periodo
                           select (e)).Count();

            return accesos;
        }

        //Total de asistencias del laboratorio seleccionado
        public int getAsistenciaLab(string Laboratorio, string Periodo)
        {
            var accesos = (from e in dblab.ASISTENCIA
                           where e.asis_laboratorioId == Laboratorio && e.asis_periodo == Periodo
                           select (e)).Count();

            return accesos;
        }
        public JsonResult getAsisLab(string Laboratorio, string Periodo)
        {
            List<InfoAsistencia> listaLab = new List<InfoAsistencia>();
            try
            {
                var lista = from l in dblab.ASISTENCIA
                            join p in dblab.PROFESOR on l.asis_profesorId equals p.prf_id
                            join m in dblab.MATERIA on l.asis_materiaId equals m.mat_id
                            where l.asis_laboratorioId == Laboratorio && l.asis_periodo == Periodo
                            select new { p.prf_nombreCompleto, m.mat_nombre, l.asis_grupoId, l.asis_alumnos, l.asis_fecha, l.asis_horaEntrada, l.asis_horaSalida, l.asis_materiaId };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoAsistencia { NombrePrf = objeto.prf_nombreCompleto, NombreMat = objeto.mat_nombre, Grupo = objeto.asis_grupoId, Alumnos = Convert.ToInt32(objeto.asis_alumnos), Fecha = objeto.asis_fecha.ToString(), HoraE = objeto.asis_horaEntrada.ToString(), HoraS = objeto.asis_horaSalida.ToString() });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }    
        public int getAsisFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            DateTime fechaIni = Convert.ToDateTime(FechaInicio);
            DateTime fechaFin = Convert.ToDateTime(FechaFinal);

            var asistencia = (from e in dblab.ASISTENCIA
                           where  e.asis_periodo == Periodo && e.asis_laboratorioId == Laboratorio && (e.asis_fecha >= fechaIni && e.asis_fecha <= fechaFin)
                           select (e)).Count();

            return asistencia;
        }
        public JsonResult getLabAsisFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            List<InfoAsistencia> listaLab = new List<InfoAsistencia>();
            try
            {
                DateTime fechaIni = Convert.ToDateTime(FechaInicio);
                DateTime fechaFin = Convert.ToDateTime(FechaFinal);

                var lista = from l in dblab.ASISTENCIA
                            join p in dblab.PROFESOR on l.asis_profesorId equals p.prf_id
                            join m in dblab.MATERIA on l.asis_materiaId equals m.mat_id
                            where l.asis_periodo == Periodo && l.asis_laboratorioId == Laboratorio && (l.asis_fecha >= fechaIni && l.asis_fecha <= fechaFin)
                            select new { p.prf_nombreCompleto, m.mat_nombre, l.asis_grupoId, l.asis_alumnos, l.asis_fecha, l.asis_horaEntrada, l.asis_horaSalida, l.asis_materiaId };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoAsistencia { NombrePrf = objeto.prf_nombreCompleto, NombreMat = objeto.mat_nombre, Grupo = objeto.asis_grupoId, Alumnos = Convert.ToInt32(objeto.asis_alumnos), Fecha = objeto.asis_fecha.ToString(), HoraE = objeto.asis_horaEntrada.ToString(), HoraS = objeto.asis_horaSalida.ToString() });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }

        ////CURSOS

        public int getCursos(string Periodo)
        {
            var cursos = (from e in dblab.CURSOS
                           where e.cur_periodo == Periodo
                           select (e)).Count();

            return cursos;
        }
        public int getCursoLab(string Laboratorio, string Periodo)
        {
            var cursos = (from e in dblab.CURSOS
                          where e.cur_periodo == Periodo && e.cur_laboratorioId == Laboratorio
                          select (e)).Count();

            return cursos;
        }
        public JsonResult getCurLab(string Laboratorio, string Periodo)
        {
            List<InfoCursos> listaLab = new List<InfoCursos>();
            try
            {
                var lista = from l in dblab.CURSOS
                            join p in dblab.PROFESOR on l.cur_profesorId equals p.prf_id                            
                            where l.cur_laboratorioId == Laboratorio && l.cur_periodo == Periodo
                            select new { l.cur_nombre, p.prf_nombreCompleto, l.cur_presentador, l.cur_horaEntrada, l.cur_horaSalida, l.cur_fecha };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoCursos { NombreCurso = objeto.cur_nombre, RepresentanteCurso = objeto.prf_nombreCompleto, PresentadorCurso = objeto.cur_presentador, HoraECurso = objeto.cur_horaEntrada.ToString(), HoraSCurso = objeto.cur_horaSalida.ToString(), DiaCurso = objeto.cur_fecha.ToString() });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }
        public int getCurFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            DateTime fechaIni = Convert.ToDateTime(FechaInicio);
            DateTime fechaFin = Convert.ToDateTime(FechaFinal);

            var curso = (from e in dblab.CURSOS
                              where e.cur_periodo == Periodo && e.cur_laboratorioId == Laboratorio && (e.cur_fecha >= fechaIni && e.cur_fecha <= fechaFin)
                              select (e)).Count();

            return curso;
        }
        public JsonResult getLabCurFecha(string Laboratorio, string FechaInicio, string FechaFinal, string Periodo)
        {
            List<InfoCursos> listaLab = new List<InfoCursos>();
            try
            {
                DateTime fechaIni = Convert.ToDateTime(FechaInicio);
                DateTime fechaFin = Convert.ToDateTime(FechaFinal);
                var lista = from l in dblab.CURSOS
                            join p in dblab.PROFESOR on l.cur_profesorId equals p.prf_id
                            where l.cur_periodo == Periodo && l.cur_laboratorioId == Laboratorio && (l.cur_fecha >= fechaIni && l.cur_fecha <= fechaFin)
                            select new { l.cur_nombre, p.prf_nombreCompleto, l.cur_presentador, l.cur_horaEntrada, l.cur_horaSalida, l.cur_fecha };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoCursos { NombreCurso = objeto.cur_nombre, RepresentanteCurso = objeto.prf_nombreCompleto, PresentadorCurso = objeto.cur_presentador, HoraECurso = objeto.cur_horaEntrada.ToString(), HoraSCurso = objeto.cur_horaSalida.ToString(), DiaCurso = objeto.cur_fecha.ToString() });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }

        //MATERIAS
        public JsonResult getMateriaCar(string Carrera, string Periodo)
        {
            string atendido = "No atendido";
            List<InfoMateria> listaLab = new List<InfoMateria>();
            try
            {                

                var lista = from m in dblab.MATERIA                            
                            where m.mat_carrera==Carrera
                            select new { m.mat_id, m.mat_nombre };
                foreach (var objeto in lista)
                {

                    HORARIO hor = (from h in dblab.HORARIO
                                   where h.hora_materiaId == objeto.mat_id && h.hora_periodo == Periodo
                                   select h).FirstOrDefault();

                    if (hor != null)
                    {
                        atendido = "Atendido";
                    }
                    else
                    {
                        atendido = "No atendido";
                    }

                    listaLab.Add(new InfoMateria { IdMateria = objeto.mat_id, NombreMateria = objeto.mat_nombre, Atendido = atendido });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult getReporte(int Usuario)
        {
            List<InfoReportes> listaLab = new List<InfoReportes>();
            try
            {
                USUARIO usu = (from u in dblab.USUARIO
                               where u.usu_id == Usuario
                               select u).FirstOrDefault();
                
                var lista = from l in dblab.BITACORA                            
                            where l.bit_usuario==usu.usu_nombre
                            select new { l.bit_descripcion, l.bit_fecha };
                foreach (var objeto in lista)
                {
                    listaLab.Add(new InfoReportes { Descripcion = objeto.bit_descripcion, Fecha = objeto.bit_fecha.ToString() });
                }
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(listaLab, JsonRequestBehavior.AllowGet);
            }
        }

        //CHECAR PERIODO
        public bool checkPeriodo(string Ano, string Semestre)
        {
            try
            {
                PERIODO per = (from p in dblab.PERIODO
                               where p.per_año == Ano && p.per_semestre == Semestre
                               select p).FirstOrDefault();

                if(per != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        //PERIODO
        public JsonResult getCambio(string Periodo)
        {
            List<InfoCambios> listaCambios = new List<InfoCambios>();
            try
            {                
                var lista = from c in dblab.CAMBIOS
                            where c.cam_periodo == Periodo
                            select new { c.cambio_serieGrp, c.cambio_lab, c.cambio_labNuevo, c.cambio_horaEntrada, c.cambio_horaSalida, c.cambio_horaEntradaNueva, c.cambio_horaSalidaNueva, c.cambio_dia, c.cambio_diaNuevo, c.cambio_razonCambio, c.cambio_fecha };
                foreach (var objeto in lista)
                {
                    listaCambios.Add(new InfoCambios { Serie = objeto.cambio_serieGrp, Laboratorio = objeto.cambio_lab, LaboratorioNuevo = objeto.cambio_labNuevo, HoraEntrada = objeto.cambio_horaEntrada, HoraSalida = objeto.cambio_horaSalida, HoraEntradaNuevo = objeto.cambio_horaEntradaNueva, HoraSalidaNuevo = objeto.cambio_horaSalidaNueva, Dia = objeto.cambio_dia, DiaNuevo = objeto.cambio_diaNuevo, Razon = objeto.cambio_razonCambio, Fecha = objeto.cambio_fecha });
                }
                return Json(listaCambios, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(listaCambios, JsonRequestBehavior.AllowGet);
            }
        }

        //HORAS PRACTICAS

        public JsonResult getHorasP(string Periodo)
        {
            List<InfoHPrac> listaHP = new List<InfoHPrac>();
            try
            {                
                var lista = from mg in dblab.MATGRP
                            join m in dblab.MATERIA on mg.materia equals m.mat_id
                            where mg.periodo == Periodo
                            select new { mg.matgrp_nombre, m.mat_nombre, mg.grupo, m.mat_horasp, mg.hora };

                foreach (var objeto in lista)
                {
                    if (objeto.hora >= 0)
                    {
                        listaHP.Add(new InfoHPrac { Serie = objeto.matgrp_nombre, Materia = objeto.mat_nombre, Grupo = objeto.grupo, HorasPracticas = Convert.ToInt32(objeto.mat_horasp), HorasFaltantes = Convert.ToInt32(objeto.hora), HorasSobrantes = 0 });
                    }
                    else
                    {
                        listaHP.Add(new InfoHPrac { Serie = objeto.matgrp_nombre, Materia = objeto.mat_nombre, Grupo = objeto.grupo, HorasPracticas = Convert.ToInt32(objeto.mat_horasp), HorasFaltantes = 0, HorasSobrantes = (Convert.ToInt32(objeto.hora) * (-1)) });
                    }

                }
                return Json(listaHP, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(listaHP, JsonRequestBehavior.AllowGet);
            }
        }
    }

    public class suggestion
    {

        public string query { get; set; }
        public string[] suggestions { get; set; }

        public suggestion()
        {
            query = "Unit";

        }

    }
}