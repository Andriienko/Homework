using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using DAL.EF;
using DAL.Interfaces;

namespace DAL.Repositories
{
    public class TextRepository:IRepository<Message>
    {
        private readonly ApplicationDbContext _dbcontext;

        public TextRepository(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }


        public IEnumerable<Message> GetAll()
        {
            return _dbcontext.Texts;
        }

        public Message Get(string id)
        {
            return _dbcontext.Texts.Find(Int32.Parse(id));
        }

        public IEnumerable<Message> Find(Func<Message, bool> predicate)
        {
            return _dbcontext.Texts.Where(predicate).ToList();
        }

        public void Create(Message ob)
        {
            _dbcontext.Texts.Add(ob);
        }

        public void Update(Message ob)
        {
            _dbcontext.Entry(ob).State=EntityState.Modified;
        }

        public void Delete(Message ob)
        {
           _dbcontext.Texts.Remove(ob);
        }

        public void Save()
        {
            _dbcontext.SaveChanges();
        }
        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _dbcontext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}