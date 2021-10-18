using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using reactNET.Entities;

namespace reactNET.Services
{
    public interface IUser
    {
        Task<bool> CheckUserEmail(string email);
        Task<User> CreateUser(User user);
    }

    public class UserService : IUser
    {
        private MyContext db;
        public UserService(MyContext _db)
        {
            db = _db;
        }

        public async Task<User> CreateUser(User Newuser)
        {
            User checkuser = await db.users.Where(user => user == Newuser).FirstOrDefaultAsync();
            if (checkuser == null)
            {
                await db.AddAsync(Newuser);
                await db.SaveChangesAsync();
                return Newuser;
            } else {
                return null;
            }
        }

        public async Task<bool> CheckUserEmail(string email)
        {
            User EmailExist = await db.users.Where(user => user.Email == email).FirstOrDefaultAsync();
            if(EmailExist != null)
            {
                return false;
            }
            return true;
        }
    }
}
