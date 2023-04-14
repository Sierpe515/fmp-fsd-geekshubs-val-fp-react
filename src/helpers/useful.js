
export const validate = (name, data, required) => {
    switch (name) {
        case "name":
        case "username":
        case "userName":
        case "surname":
        case "nombre":
        case "apellido":
            if (data === "" && required === true) {
            return { message: "Please, fill the field", validated: false };
            } else if (!/[a-z]/gi.test(data)) {
            return { message: "Please, fill with a valid text", validated: false };
            }
    
            return { message: "", validated: true };
  
        case "email":
        case "correo":
        case "correo electronico":
            if (data === "" && required === true) {
            return { message: "Please, fill the field", validated: false };
            } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)
            ) {
            return { message: "Invalid e-mail format", validated: false };
            }
  
            return { message: "", validated: true };
  
        case "password":
        
            const lowerCaseLetters = /[a-z]/g;
            const upperCaseLetters = /[A-Z]/g;
            const numbers = /[0-9]/g;
  
            if (data === "" && required === true) {
                return { message: "Please, fill the field", validated: false };
            } else if (data.length < 8) {
                return { message: "The password must have at least eight characters", validated: false};
            } else if (!data.match(lowerCaseLetters)) {
                return { message: "The password must have at least one lowercase letter", validated: false}; 
            } else if (!data.match(upperCaseLetters)) {
                return { message: "The password must have at least one uppercase letter", validated: false};
            } else if (!data.match(numbers)) {
                return { message: "The password must have at least one number", validated: false};
            } else {
                return { message: "", validated: true };
            }
  
        case "phone":
        case "tfno":
        case "telefono":
        case "phonenumber":
            if (data === "") { 
            return {message: "Please, fill the field", validated: false};
            } else if (!/^[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]+$/gi.test(data)) {
            return {message: "Please, enter a valid phone number", validated: false};
            }
            return {message: "", validated: true};
  
        case "dni":
        case "document":
        case "nif":
        case "NIF":
            if (data === "") {
            return {message: "Please, fill the field", validated: false};
            } else if (!/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/g.test(data)) {
            return {message: "Please, enter a valid NIF number with upper case letter", validated: false};
            }
            return {message: "", validated: true};
  
        case "direction":
        case "direccion":
        case "adress":
            if (data === "") {       
            return {message: "Please, fill the field", validated: false};
            } else if (data.length < 5) {
            return {message: "Please, enter a valid direction", validated: false};
            }
            return {message: "", validated: true};
  
        case "birth_date":
        case "fecha de nacimiento":
        case "birthdate":
            if (data === "") { 
            return {message: "Please, fill the field", validated: false};
            } else if (!/^\d{4}-\d{2}-\d{2}$/gi.test(data)) {
            return {message: "Please, enter a valid birthdate", validated: false};
            }
            return {message: "", validated: true};
  
        default:
    }
  };