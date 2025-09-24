import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  try{
    return await bcrypt.compare(password, hashed);
  } catch (error){
    console.error('Error comparing password:', error);
    return false;
  }
}