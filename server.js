const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const routes = require('./routes');

// Importar dotenv para usar variables de entorno
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de los archivos estáticos para usar la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

// Usar las rutas definidas en el directorio routes
app.use(routes);

// Ruta raíz para probar que la app está funcionando
app.get('/', (req, res) => {
    res.render('home', { msg: 'Welcome to the Tech Blog!' });
});

// Sincronización con la base de datos y luego iniciar el servidor
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
});
