import generateUUID from '../../src/utils/generateUUID';

describe('Universal Unique ID generating', () => {
    it('Should generate a UUID', () => {
        const uuid = generateUUID();

        expect(uuid).toHaveLength(36);
    });

    it('Should generate a valid UUID', () => {
        const uuid = generateUUID();

        const spiltedUuid = uuid.split('-');

        expect(spiltedUuid[0]).toHaveLength(8);
        expect(spiltedUuid[1]).toHaveLength(4);
        expect(spiltedUuid[2]).toHaveLength(4);
        expect(spiltedUuid[3]).toHaveLength(4);
        expect(spiltedUuid[4]).toHaveLength(12);
    })
});