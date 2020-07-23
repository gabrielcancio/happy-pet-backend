import bcrypt from 'bcryptjs';

async function generatePasswordHash(password: string) {
  return await bcrypt.hash(password, 8);
}

export default generatePasswordHash;