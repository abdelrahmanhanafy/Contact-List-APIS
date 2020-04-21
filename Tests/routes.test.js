const request = require('supertest');
const app = require('../main');
let makeEmail = () => {
    let randomEmail = ""
    let randomString = Math.random().toString(36).substring(7);
    randomEmail = randomString + "@gmail.com"
    return { re: randomEmail, rs: randomString };
}
describe('Contacts POST Endpoint', () => {
    it('should create a new contact', async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send({
                email: makeEmail().re,
                mobile: `01276567384`
            })
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(200)
    })
    it("shouldn't create a new contact due to no email entered", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send({
                mobile: `01276567384`
            })
        expect(res.statusCode).toEqual(500)
    })
    it("shouldn't create a new contact due to no mobile entered", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send({
                email: makeEmail().re
            })
        expect(res.statusCode).toEqual(500)
    })
    it("shouldn't create a new contact due to wrong email format", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send({
                email: makeEmail().rs,
                mobile: `01276567384`
            })
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(500)
    })
    it("shouldn't create a new contact due to wrong mobile format", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send({
                email: makeEmail().re,
                mobile: `316161616161561566165156111561161`
            })
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(500)
    })
    it("shouldn't create a new contact due to no authorization sent", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send({
                email: makeEmail().re,
                mobile: `01276567384`
            })
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't create a new contact due to no deviceToken sent", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('fingerPrint', '123456789')
            .send({
                email: makeEmail().re,
                mobile: `01276567384`
            })
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't create a new contact due to no fingerPrint sent", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .send({
                email: makeEmail().re,
                mobile: `01276567384`
            })
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't create a new contact due to no fingerPrint sent && no deviceToken sent && no authorization sent", async () => {
        const res = await request(app)
            .post('/contacts/addContact')
            .send({
                email: makeEmail().re,
                mobile: `01276567384`
            })
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(403)
    })
})
describe('Contacts GET Endpoint', () => {
    it('should get all contacts', async () => {
        const res = await request(app)
            .get('/contacts/getList')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send()
        expect(res.statusCode).toEqual(200)
    })
    it("shouldn't get all contacts due to no authorization sent ", async () => {
        const res = await request(app)
            .get('/contacts/getList')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send()
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't get all contacts due to no deviceToken sent", async () => {
        const res = await request(app)
            .get('/contacts/getList')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('fingerPrint', '123456789')
            .send()
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't get all contacts due to no fingerPrint sent ", async () => {
        const res = await request(app)
            .get('/contacts/getList')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .send()
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't get all contacts due to no fingerPrint sent && no deviceToken sent && no authorization sent", async () => {
        const res = await request(app)
            .get('/contacts/getList')
            .send()
        expect(res.statusCode).toEqual(403)
    })
    it('should get Recent contacts', async () => {
        const res = await request(app)
            .get('/contacts/getRecentList')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send()
        expect(res.statusCode).toEqual(200)
    })
    it("shouldn't get Recent contacts due to no authorization sent ", async () => {
        const res = await request(app)
            .get('/contacts/getRecentList')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .set('fingerPrint', '123456789')
            .send()
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't get Recent contacts due to no deviceToken sent", async () => {
        const res = await request(app)
            .get('/contacts/getRecentList')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('fingerPrint', '123456789')
            .send()
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't get Recent contacts due to no fingerPrint sent ", async () => {
        const res = await request(app)
            .get('/contacts/getRecentList')
            .set('authorization', 'ff34555392bcd3f268f74d268f74d29da')
            .set('deviceToken', '0b0c968654b27e0701ad2bf577')
            .send()
        expect(res.statusCode).toEqual(403)
    })
    it("shouldn't get Recent contacts due to no fingerPrint sent && no deviceToken sent && no authorization sent", async () => {
        const res = await request(app)
            .get('/contacts/getRecentList')
            .send()
        expect(res.statusCode).toEqual(403)
    })
})




