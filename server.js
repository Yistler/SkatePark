const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const exphbs = require('express-handlebars');
const expressFileUpLoad = require('express-fileupload');
const { verifyUser, register, obtenerUser, obtenerSkaters, actualizarUsuario, eliminarUsuario, cambiarEstado } = require('./queries');
const { enviarEmail } = require('./email');
const app = express();

app.listen(3000, () => console.log(`http://localhost:3000`));

//configuracion para servir archivos estaticos desde el directorio public para express
app.use(express.static('public'));

// Middleware para parsear JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion de express-fileupload
app.use(expressFileUpLoad({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso no debe ser mayor a 5MB"
}));

//app.set = define la configuracion para ser utilizada por express
app.set("view engine", "handlebars");
//configura el motor de plantillas usa el metodo engine, el cual define el motor de plantillas
app.engine(
    "handlebars",//define la extension de los archivos q handlebars identificara como vistas
    exphbs.engine({//recibe la instancia de express-handlebars y define la configuracion
        //especificando que la ruta para las vistas será /views
        layoutsDir: __dirname + "/views",
        //ruta en donde se encontrarán los parciales o componentes será /views/componentes.
        partialsDir: __dirname + "/views/componentes",
    })
);

app.get("/", async (req, res) => {
    const data = await obtenerSkaters()
    res.render("index", { layout: "index", skaters: data });
});

app.get("/login", (req, res) => {
    res.render("login", { layout: "login" });
});

app.post("/session", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await verifyUser(email, password);
        console.log("/session user->", user)
        if (user) {
            const token = jwt.sign(
                {
                    payload: user[0].email,
                    exp: Math.floor(Date.now() / 1000) + 500,
                },
                "secretKey"
            )
            res.redirect(`http://localhost:3000/perfil?token=${token}`);
        } else {
            console.log("No se encontro usuario o hubo un error", user)
            res.status(404).send("usuario no encontrado");
        }
    } catch (err) {
        console.error("Error al verificar usuario", err);
        res.status(500).send("Error interno");//Errores internos del servidor
    }
});

// Ruta para manejar el formulario de registro
app.post("/register", async (req, res) => {
    //1 recibir los dato
    const { name, email, password, repeatPassword, experiencie, specialty } = req.body;
    const { photo } = req.files;
    try {
        const img = `img-${name}`;
        const user = await register(name, email, password, experiencie, specialty, img);
        if (user) {
            //2 crear el token
            const token = jwt.sign(
                {
                    payload: email,
                    exp: Math.floor(Date.now() / 1000) + 500,
                },
                "secretKey"
            );
            photo.mv(`${__dirname}/public/img/img-${name}.jpg`);
            res.redirect(`http://localhost:3000/perfil?token=${token}`);
        } else {
            console.log("No se encontro usuario o hubo un error", user)
            res.status(404).send("usuario no encontrado");
        }
    } catch (err) {
        console.error("Error al verificar usuario", err);
        res.status(500).send("Error interno");//Errores internos del servidor
    }
});

app.get("/perfil", async (req, res) => {
    const { token } = req.query;
    jwt.verify(token, "secretKey", async (err, decode) => {
        if (err) {
            res.status(401).send(
                {
                    error: "401 Unauthorized",
                    message: err.message
                }
            )
        } else {
            const user = await obtenerUser(decode.payload)
            res.render("perfil", { layout: "perfil", usuario: user[0] });
        }
    });
})

app.get("/recuperar", (req, res) => {
    res.render("recuperarPassword", { layout: "recuperarPassword" })
});

app.post("/recuperarPassword", (req, res) => {
    const { email } = req.body;
    const token = jwt.sign({
        payload: email,
        exp: Math.floor(Date.now() / 1000) + 500,
    }, "secretKey")
    let asunto = "Recuperar password"
    const url = `http://localhost:3000/perfil?token=${token}`
    enviarEmail(email, asunto, url);
    res.send("se envio el correo revisa")
});


app.post("/updateUser", async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    try {
        const result = await actualizarUsuario(email, nombre, password, anos_experiencia, especialidad);
        if (result) {
            const token = jwt.sign({
                payload: email,
                exp: Math.floor(Date.now() / 1000) + 500
            }, "secretKey")
            res.redirect(`http://localhost:3000/perfil?token=${token}`);
        } else {
            res.status(404).send("Error al actualizar el usuario");
        }
    } catch (err) {
        console.error("Error al actualizar usuario", err);
        res.status(500).send("Error interno del servidor");
    }
});
// Ruta para eliminar usuario
app.post("/deleteUser", async (req, res) => {
    const { email } = req.body;
    try {
        const result = await eliminarUsuario(email);
        if (result) {
            const data = await obtenerSkaters()
            res.render("index", { layout: "index", skaters: data });
        } else {
            res.status(404).send("Error al eliminar el usuario");
        }
    } catch (err) {
        console.error("Error al eliminar usuario", err);
        res.status(500).send("Error interno del servidor");
    }
});

app.get("/admin", async (req, res) => {
    const data = await obtenerSkaters()
    res.render("admin", { layout: "admin", skaters: data });
});

app.post("/estado", async(req, res)=>{
    const { skaterId, estado } = req.body;
    try {
        const user = await cambiarEstado(skaterId, estado);
        if(user){
            const data = await obtenerSkaters()
            res.render("admin", { layout: "admin", skaters: data });
        }
    } catch (error) {
        console.error("Error al actualizar estado del usuario", error);
    }
})