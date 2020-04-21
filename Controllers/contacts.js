let config = require('config');
const model = require('../Core/contact');
const userModel = require('../Core/user');
module.exports = (express) => {
    let router = express.Router();
    router.use(async (req, res, next) => {
        let authorization = req.header('authorization');
        let deviceToken = req.header('deviceToken')
        let fingerPrint = req.header('fingerPrint');
        let users = config.get('users');
        if (users[0].authorization == authorization && users[0].deviceToken == deviceToken && users[0].fingerPrint == fingerPrint) {
            req.body.user = users[0].name;
            next();
        }
        else if (users[1].authorization == authorization && users[1].deviceToken == deviceToken && users[1].fingerPrint == fingerPrint) {
            req.body.user = users[1].name;
            next();
        }
        else {
            res.statusCode = 403;
            res.send(`You aren't authorized to access this resource`);
        }
    })
    //Create && Get Endpoints
    router.post('/addContact', async (req, res) => {
        try {
            let _user = await userModel.findOne({ name: req.body.user });
            req.body.user = _user._id;
            req.body.createdAt = new Date()
            let newObj = new model(req.body);
            let contact = await newObj.save();
            res.send(`Contact has been added successfully! ${contact}`);
        }
        catch (error) { res.status(500).send(`Something went wrong`) }
    });
    router.get('/getList', async (req, res) => {
        try {
            let _user = await userModel.findOne({ name: req.body.user });
            let contacts = await model.find({ user: _user }).populate('user', 'name  -_id')
            res.send(`Contacts for user ${_user.name}: ${contacts}`);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });
    router.get('/getRecentList', async (req, res) => {
        try {
            let _user = await userModel.findOne({ name: req.body.user });
            let contacts = await model.find({ user: _user }).sort({ _id: -1 }).limit(5).populate('user', 'name  -_id')
            res.send(`Contacts for user ${_user.name}: ${contacts}`);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });
    return router;
}