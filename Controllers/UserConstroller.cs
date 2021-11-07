using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using reactNET.Entities;
using reactNET.Services;
using reactNET.Filters;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace reactNET.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [ErrorFormat]
    public class UserController : ControllerBase
    {
        private MyContext _context;
        public static IWebHostEnvironment _environment;
        private IUser userService;
        public UserController(MyContext context, IUser user, IWebHostEnvironment environment)
        {
            _context = context;
            userService = user;
            _environment = environment;
        }
        [HttpGet("get/{id}")]
        public IActionResult Single(int id)
        {
            User user = _context.users.Where(user => user.Id == id).Include(user => user.Addresses).FirstOrDefault();
            if(user == null)
            {
                return BadRequest(new { error = "L'utilisateur n'existe pas" });
            }
            return Ok(user);
        }

        [HttpGet("getall")]
        public IActionResult GetAllUsers()
        {
            List<User> users = _context.users.AsNoTracking().Include(u => u.Addresses).ToList();

            return Ok(users);
        }

        [HttpPost("new")]
        public async Task<IActionResult> NewUser(User user)
        {
            User u = await userService.CreateUser(user);
            return Ok(u);

        }

        [HttpPut("update/{id}")]
        public IActionResult Update(User user)
        {
           try
            {
                IEnumerable<Addresse> addresses = _context.addresses.AsNoTracking().Where(a => a.UserId == user.Id);
                IEnumerable<Addresse> test = addresses.Except(user.Addresses).ToList();
                _context.addresses.RemoveRange(test);
                _context.users.Update(user);
                _context.SaveChanges();
                return Ok(user);
            } catch(DbUpdateConcurrencyException)
            {
                return StatusCode(500, new { error = "Erreur lors de la mise à jour de l'utilisateur" });
            }
            
        }

        [HttpDelete("delete")]
        public IActionResult Delete(List<int> id)
        {
            List<User> users = _context.users.Where(u => id.Contains(u.Id)).ToList();
            if(users == null)
            {
                return NotFound(new { erreur = "L'utilisateur n'existe pas !" });
            }
            _context.users.RemoveRange(users);
            _context.SaveChanges();
            return Ok("Ok");
        }

        [HttpGet("getimage")]
        public IActionResult GetImage()
        {
            var stream = new FileStream(@"C:\Users\Utilisateur\Desktop\reactNET\Images\test.pdf", FileMode.Open);
            return new FileStreamResult(stream, "application/pdf");
        }

        [HttpPost("body")]
        public async Task<IActionResult> TestFromForm([FromForm] IFormFile file)
        {
            if(file == null)
            {
                return BadRequest("Erreur");
            }
            string path = Path.Combine(_environment.ContentRootPath, "Images/" + file.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Ok(file.FileName);
        }
    }
}
