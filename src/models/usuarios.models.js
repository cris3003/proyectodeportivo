const pool = require('../config/db');

const selectById = async (usuarioId) => {
    const [result] = await pool.query('select * from usuarios where id = ?', [usuarioId]);
    if (result.length === 0) return null;
    return result[0];

}

const insertUsuario = async ({ username, password }) => {
    const [result] = await pool.query('insert into usuarios ( username, password ) values ( ?, ? )',
        [username, password]
    );
    return result.insertId;
}
const selectByUsuario = async (username) => {
    const [result] = await pool.query('select * from usuarios where username = ?', [username]);
    if (result.length === 0) return null;
    return result[0];

}


module.exports = {
    insertUsuario, selectById, selectByUsuario
}