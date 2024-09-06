const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '1234',
    database: 'skatepark',
    port: 5432,
    host: 'localhost',
    idleTimeoutMillis: '10000',// Tiempo máximo de espera para una conexión inactiva
    connectionTimeoutMillis: '2000',// Tiempo máximo de espera para establecer una conexión
    max: 20, // Número máximo de conexiones en el pool
    min: 4,  // Número mínimo de conexiones en el pool
});
const obtenerCliente = async() =>{
    try{
        const client = await pool.connect();
        return client;
    }catch(err){
        console.error("Error de conexion BD", err);
        //throw
    }
}

const verifyUser = async(email, password) =>{
    let client;
    try{
        client = await obtenerCliente();
        try{
            const consulta = {
                text: `SELECT email, rol FROM skaters WHERE email = $1 AND password = $2`,
                values: [email, password]
            }
            const result = await client.query(consulta);
            if(result.rows.length === 0){
                return null; //devuelve null si no encontro el usuario
            }
            return result.rows//devuelve el resultado si se encontro
        }catch(err){
            console.error("Error al buscar verificar usuario", err);
            return null;
        }
    }catch(err){
        console.error("Error de conexion al llamar la funcion", err)
    }finally{
        if(client){
            client.release();
        }
    }
}

const register = async(name, email, password, experiencie, specialty, img)=>{
    let client;
    try{
        client = await obtenerCliente();
        try{
            const consulta = {
                text: `INSERT INTO skaters (nombre, email, password, anos_experiencia, especialidad, foto, estado) VALUES($1, $2, $3, $4, $5, $6, $7)`,
                values: [name, email, password, experiencie, specialty, img, false]
            }
            const result = await client.query(consulta);
            /* if(result.rows.length === 0){
                return null; //devuelve null si no encontro el usuario
            } */
            return result.rows//devuelve el resultado si se encontro
        }catch(err){
            console.error("Error al crear usuario", err);
            return null;
        }
    }catch(err){
        console.error("Error de conexion al llamar la funcion", err)
    }finally{
        if(client){
            client.release();
        }
    }
}

const obtenerUser = async(email)=>{
    let client;
    try{
        client = await obtenerCliente();
        try{
            const consulta = {
                text: `SELECT email, nombre, password, anos_experiencia, especialidad from skaters WHERE email = $1`,
                values: [email]
            }
            const result = await client.query(consulta);
            if(result.rows.length === 0){
                return null; //devuelve null si no encontro el usuario
            }
            return result.rows//devuelve el resultado si se encontro
        }catch(err){
            console.error("Error al buscar usuario", err);
            return null;
        }
    }catch(err){
        console.error("Error de conexion al llamar la funcion", err)
    }finally{
        if(client){
            client.release();
        }
    }
}

const obtenerSkaters = async()=>{
    let client;
    try {
        client = await obtenerCliente();
        try {
            const consulta = {
                text: `SELECT id, foto, nombre, anos_experiencia, especialidad, estado from skaters where rol = $1`,
                values: ['user']
            }
            const result = await client.query(consulta);
            if(result.rows.length === 0){
                return null; //devuelve null si no encontro el usuario
            }
            return result.rows//devuelve el resultado si se encontro
        } catch (error) {
            console.error("Error en obtener skaters", error)
        }
    } catch (error) {
        console.error("Error en obtener client", error)
    }
}


const actualizarUsuario = async(email, nombre, password, anos_experiencia, especialidad) => {
    let client;
    try {
        client = await obtenerCliente();
        try {
            const consulta = {
                text: `UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE email = $5`,
                values: [nombre, password, anos_experiencia, especialidad, email]
            }
            const result = await client.query(consulta);
            return result.rowCount > 0; //devuelve true si se actualizó el usuario
        } catch (err) {
            console.error("Error al actualizar usuario", err);
            return false;
        }
    } catch (err) {
        console.error("Error de conexion al llamar la funcion", err)
    } finally {
        if (client) {
            client.release();
        }
    }
}
const eliminarUsuario = async(email) => {
    let client;
    try {
        client = await obtenerCliente();
        try {
            const consulta = {
                text: `DELETE FROM skaters WHERE email = $1`,
                values: [email]
            }
            const result = await client.query(consulta);
            return result.rowCount > 0; //devuelve true si se eliminó el usuario
        } catch (err) {
            console.error("Error al eliminar usuario", err);
            return false;
        }
    } catch (err) {
        console.error("Error de conexion al llamar la funcion", err)
    } finally {
        if (client) {
            client.release();
        }
    }
}

const cambiarEstado = async(skaterId, estado)=>{
    let client;
    try {
        client = await obtenerCliente();
        try {
            const consulta = {
                text: `UPDATE skaters SET estado = $1 WHERE id = $2`,
                values: [estado, skaterId]
            }
            const result = await client.query(consulta);
            return result.rowCount;
        } catch (error) {
            console.error("Error al cambiar estado de usuario", error)
        }
    } catch (error) {
        console.error("Error de conexion", error)
    }
}

module.exports = { verifyUser, register, obtenerUser, obtenerSkaters, actualizarUsuario, eliminarUsuario, cambiarEstado };