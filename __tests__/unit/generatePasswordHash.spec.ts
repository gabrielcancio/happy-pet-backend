import bcrypt from 'bcryptjs';

import generatePasswordHash from '../../src/utils/generatePasswordHash';

describe('Password hash', () => {
    it('Should generate a hash with the password', async () => {
        const password = '123456'

        const hash = await generatePasswordHash(password);

        expect(typeof(hash)).toBe("string");
        expect(await bcrypt.compare(password, hash)).toBe(true);
    });
});