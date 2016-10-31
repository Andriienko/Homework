using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.WebPages;
using BLL.DTOs;
using BLL.Interfaces;
using BLL.Services;

//using Ubrainians.Models.EF;
//using Ubrainians.Models.EFModels;
//using Ubrainians.Models.IRepository;
//using Ubrainians.Models.TextRepository;

namespace Ubrainians.Controllers
{
    public class HomeController : Controller
    {
        //private static ApplicationDbContext db;
        //private IRepository<TextModel> repository;
        private static IMessageService service;
        public HomeController()
        {
           service=new MessageService();
        }

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAll()
        {
            return Json(service.GetAllMessages(),JsonRequestBehavior.AllowGet);
        }
        public MessageDTO Get(string id)
        {
            if(id!="")
                return service.GetMessage(id);
            return new MessageDTO();
        }
        public void Create(MessageDTO ob)
        {
            if(ob!=null)
                service.Add(ob);
        }

        public bool Delete(string id)
        {
            if (id != ""||id.IsEmpty())
            {
                service.Remove(id);
                return true;
            }
            return false;
        }

        public bool Edit(MessageDTO ob)
        {
            if (ob != null)
            {
                service.Edit(ob);
                return true;
            }
            return false;
        }

        //protected override void Dispose(bool disposing)
        //{
        //    repository.Dispose(disposing);
        //    base.Dispose(disposing);
        //}
    }
}