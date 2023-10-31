const bcrypt = require('bcryptjs');

const db = require('../sequelizer/initDB');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    var message = {};
    if (await db.user.findOne({ where: { email: params.email } })) {
        return  {
            message : ('login "' + params.login + '" existe dèjà'),
            status : 202
        }

    }
    const user = new db.user(params);
    // hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);
    // save user
     await user.save();
    return {
        message : ('login "' + params.login + '" est enregistré avec succés'),
        status : 200
    }
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        //console.log(await db.User.findOne({ where: { username: params.username } }));
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
