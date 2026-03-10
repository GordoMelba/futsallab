// BASE DE DATOS LOCAL FUTSAL LAB

const DB_NAME = "futsallab_db";

function getDB() {

let db = localStorage.getItem(DB_NAME);

if(!db){

db = {
equipos: [],
jugadores: [],
partidos: [],
eventos: [],
minutos: []
};

localStorage.setItem(DB_NAME, JSON.stringify(db));

return db;

}

return JSON.parse(db);

}

function saveDB(db){

localStorage.setItem(DB_NAME, JSON.stringify(db));

}

function addEquipo(nombre, escudo){

let db = getDB();

const equipo = {
id: Date.now(),
nombre: nombre,
escudo: escudo,
jugadores: []
};

db.equipos.push(equipo);

saveDB(db);

return equipo;

}

function addJugador(equipoId, jugador){

let db = getDB();

let equipo = db.equipos.find(e => e.id === equipoId);

if(!equipo) return;

jugador.id = Date.now();

equipo.jugadores.push(jugador);

saveDB(db);

}

function getEquipos(){

let db = getDB();

return db.equipos;

}

function eliminarJugador(equipoId, jugadorId){

let db = getDB();

let equipo = db.equipos.find(e => e.id === equipoId);

if(!equipo) return;

equipo.jugadores = equipo.jugadores.filter(j => j.id !== jugadorId);

saveDB(db);

}
