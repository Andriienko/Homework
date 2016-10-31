using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.DTOs;

namespace BLL.Interfaces
{
    public interface IMessageService
    {
        void Add(MessageDTO msg);
        void Remove(string id);
        void Edit(MessageDTO msg);
        IEnumerable<MessageDTO> GetAllMessages();
        MessageDTO GetMessage(string id);
    }
}
