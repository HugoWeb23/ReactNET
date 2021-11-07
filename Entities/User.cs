using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reactNET.Attributes;
using FluentValidation;

namespace reactNET.Entities
{
    public class User
    {
        public int Id { get; set; }
    
        public string Nom { get; set; }
       
        public string Prenom { get; set; }
   
        public string Email { get; set; }
   
        public int Age { get; set; }

        public ICollection<Addresse> Addresses { get; set; }
    }

    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(user => user.Nom).NotEmpty().WithMessage("Veuillez saisir un nom");
            RuleFor(user => user.Prenom).NotEmpty().WithMessage("Veuillez saisir un prénom");
            RuleFor(user => user.Email).EmailAddress().WithMessage("Veuillez saisir une adresse e-mail");
            RuleFor(user => user.Age).NotEmpty().WithMessage("Veuillez saisir un age");
            RuleFor(user => user.Addresses).NotEmpty().WithMessage("Veuillez saisir au moins une adresse");
            RuleForEach(x => x.Addresses).SetValidator(new AddresseValidator());
        }
    }
}
