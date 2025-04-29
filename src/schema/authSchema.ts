import z from 'zod';

const registerUser = z.object({
    nombre : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(6),
    rol : z.enum(['usuario', 'entrenador'])
})


export const validateRegister = (data : any) => {
    const result = registerUser.safeParse(data);
  
    if (!result.success) {
      return { valid: false, errors: result.error.format()};
    }
    return { valid: true, data: result.data };
  };


  
const loginUser = z.object({
    email : z.string().email(),
    password : z.string().min(6),
})

export const validateLogin = (data : any) => {
    const result = loginUser.safeParse(data);
  
    if (!result.success) {
      return { valid: false, errors: result.error.format()};
    }
    return { valid: true, data: result.data };
  };