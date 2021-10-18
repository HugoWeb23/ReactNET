using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace reactNET.Entities
{
    public class Addresse: IEquatable<Addresse>
    {

        public bool Equals(Addresse other)
        {
            if (other is null)
                return false;

            return this.Id == other.Id && this.Rue == other.Rue && this.Numero == other.Numero && this.Code_postal == other.Code_postal && this.Ville == other.Ville;
        }

        public override bool Equals(object obj) => Equals(obj as Addresse);
        public override int GetHashCode() => (Id, Rue, Numero, Code_postal, Ville).GetHashCode();

        public int Id { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        [Required(ErrorMessage = "La rue est obligatoire")]
        public string Rue { get; set; }
        [Required(ErrorMessage = "Le numéro est obligatoire")]
        public string Numero { get; set; }
        [Required(ErrorMessage = "Le code postal est obligatoire")]
        public string Code_postal { get; set; }
        [Required(ErrorMessage = "La ville est obligatoire")]
        public string Ville { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}