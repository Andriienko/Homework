using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAL.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(string id);
        IEnumerable<T> Find(Func<T, bool> predicate);
        void Create(T item);
        void Update(T item);
        void Delete(T item);
        void Save();
        void Dispose(bool dis);
    }
}