const bcrypt = require('bcryptjs');

const db = require('../sequelizer/initDB');

module.exports = {
    getAll,
    getById,
    getUserByEmail,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(email) {

    if (await getUser(email)){
        return {
            status : 200,
            data: id
        }
    };
}

async function create(params,res) {
    // valida
    await db.users.findOne({ where: { email: params.email } }).then(async user => {
        if (user) {
            return res.status(202).json({
                message:
                    "l'utilisateur existe deja"
            });
        }
        const pass = await db.users.build(params);
        await pass.update({passwordHash: bcrypt.hashSync(params.password, 10)});
         //pass = db.users.build({passwordHash: bcrypt.hash(params.password, 10)});
        await pass.save();
        return res.status(200).json({message: "l'utlisateur est enregistré avec succés"})
    })


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

async function getUser(user) {
    //const user = getUserByEmail(user.em)
    await db.user.findByPk(idUser);
    if (!user) throw 'User not found';
    return user;
}
 async function getUserByEmail(params) {

     if(await db.user.findOne({where: {email: params}})){
         return {
             status: 200,
             message: user
         }
     } else {
         return {
             status: 202,
             message: "l'utilisateur n'existe pas"
         }
     }
 }
