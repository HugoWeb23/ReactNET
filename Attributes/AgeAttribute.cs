using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace reactNET.Attributes
{
    public class AgeAttribute : ValidationAttribute
    {

        protected override ValidationResult IsValid(object value,
        ValidationContext validationContext)
        {
            int age = (int)value;
            if (age < 18)
            {
                return new ValidationResult(this.ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
