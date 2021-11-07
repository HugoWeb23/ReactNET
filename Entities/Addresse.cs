using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

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
      
        public string Rue { get; set; }

        public string Numero { get; set; }
     
        public string Code_postal { get; set; }
       
        public string Ville { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }

    public class AddresseValidator : AbstractValidator<Addresse>
    {
        public AddresseValidator()
        {
            RuleFor(addresse => addresse.Rue).NotEmpty().WithMessage("Veuillez saisir une rue");
            RuleFor(addresse => addresse.Numero).NotEmpty().WithMessage("Veuillez saisir un numéro");
            RuleFor(addresse => addresse.Code_postal).NotEmpty().WithMessage("Veuillez saisir un code postal");
            RuleFor(addresse => addresse.Ville).NotEmpty().WithMessage("Veuillez saisir une ville");
        }
    }
}