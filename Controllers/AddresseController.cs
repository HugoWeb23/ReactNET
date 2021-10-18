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

namespace reactNET.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [ErrorFormat]
    public class AddresseController : ControllerBase
    {
        private MyContext _context;
        public AddresseController(MyContext context)
        {
            _context = context;
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            Addresse addresse = await _context.addresses.Where(addresse => addresse.Id == id).FirstOrDefaultAsync();
            if (addresse != null)
            {
                _context.addresses.Remove(addresse);
                await _context.SaveChangesAsync();
                return Ok("ok");
            } else {
                return BadRequest("erreur");
            }

        }

    }
}