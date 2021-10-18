using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reactNET.Attributes;

namespace reactNET.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Le nom est obligatoire")]
        public string Nom { get; set; }
       
        public string Prenom { get; set; }
        [Required(ErrorMessage = "L'adresse e-mail est obligatoire !")]
        public string Email { get; set; }
        [Required(ErrorMessage = "L'âge est obligatoire")]
        [Age(ErrorMessage = "L'utilisateur est mineur !")]
        public int Age { get; set; }

        public ICollection<Addresse> Addresses { get; set; }
    }
}
