using Microsoft.EntityFrameworkCore;

namespace reactNET.Entities
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }

        public DbSet<User> users { get; set; }
        public DbSet<Addresse> addresses { get; set; }

    }
}