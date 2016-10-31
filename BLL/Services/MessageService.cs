using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Interfaces;
using DAL.EF;
using DAL.Interfaces;
using DAL.Repositories;

namespace BLL.Services
{
    public class MessageService : IMessageService
    {
        private static ApplicationDbContext db;
        private readonly IRepository<Message> repository;
        public MessageService()
        {
            db = ApplicationDbContext.Instance;
            repository = new TextRepository(db);
        }

        public void Add(MessageDTO msg)
        {
            if (msg != null)
            {
                var message = new Message
                {
                    Text = msg.Content
                };
                repository.Create(message);
                repository.Save();
            }
        }

        public void Edit(MessageDTO msg)
        {
            if (msg != null)
            {
                if (msg.MessageId == 0)
                    return;
                var message=repository.Get(msg.MessageId.ToString());
                message.Text = msg.Content;
                repository.Update(message);
                repository.Save();
            }
        }

        public IEnumerable<MessageDTO> GetAllMessages()
        {
            List<MessageDTO> messages=new List<MessageDTO>();
            foreach (var msg in repository.GetAll())
            {
                MessageDTO message = new MessageDTO
                {
                    MessageId = msg.Id,
                    Content = msg.Text
                };
                messages.Add(message);
            }
            return messages.AsEnumerable();
        }

        public MessageDTO GetMessage(string id)
        {
            var tmp = repository.Get(id);
            if (tmp != null)
            {
                var message = new MessageDTO
                {
                    MessageId = tmp.Id,
                    Content = tmp.Text
                };
                return message;
            }
            return new MessageDTO();
        }

        public void Remove(string id)
        {
            var txt = repository.Get(id);
            if (txt != null)
                repository.Delete(txt);
            repository.Save();
        }
    }
}
