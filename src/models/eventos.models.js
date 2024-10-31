const pool = require('../config/db');

const selectAll = async (req, res, next) => {
    const [result] = await pool.query('select * from eventos');
    return result;
}

const selectById = async (eventoId) => {
    const [result] = await pool.query('select * from eventos where id = ?', [eventoId]);
    if (result.length === 0) {
        return null;
    }
    return result[0];
}

const insertEvents = async ({ nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    const [result] = await pool.query(
        'insert into eventos (nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador) values (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador]
    );
    if (result.affectedRows === 0) {
        return -1;
    }
    return result.insertId;
}
const updateById = async (eventoId, { nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    const [result] = await pool.query(
        'update eventos set nombre = ?, descripcion = ?, fecha = ?, ubicacion = ?, tipoDeporte = ?, organizador = ? where id = ?',
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador, eventoId]
    );
    return result;
}
const deleteById = async (eventoId) => {
    const [result] = await pool.query('delete from eventos where id = ?', [eventoId]);
    return result;
}

module.exports = {
    selectAll, selectById, insertEvents, updateById, deleteById
}