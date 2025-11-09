/*
  app.js - Procesador de Calificaciones (ejercicio página 8)
  Ejecutar: node app.js
*/

console.log('1) Inicio del script - Procesador de Calificaciones');

// 2) Simulamos un string JSON (como si fuera respuesta de una API)
const jsonString = `
[
  {"id":1, "nombre":"Ana Pérez", "activo": "true", "calificacion":"8.5"},
  {"id":2, "nombre":"Luis Gómez", "activo": "false", "calificacion":"6.0"},
  {"id":3, "nombre":"María López", "activo": "true", "calificacion":"9.2"},
  {"id":4, "nombre":"Carlos Ruiz", "activo": "true", "calificacion":"7.4"}
]
`;

let alumnos = [];
try {
  console.log('2) Intentando convertir el texto JSON a objeto JavaScript...');
  alumnos = JSON.parse(jsonString); // puede lanzar un error si el JSON está mal
  console.log('   JSON parseado correctamente. Alumnos recibidos:', alumnos.length);
} catch (error) {
  console.error('   ¡Error al parsear JSON!', error.message);
  // En caso de error, podemos salir o establecer alumnos = []
  alumnos = [];
}

// 3) filter: nos quedamos solo con los alumnos activos
const activos = alumnos.filter(function(a) {
  // algunos JSONs guardan booleano como string, normalizamos
  const estaActivo = (a.activo === true) || (String(a.activo).toLowerCase() === 'true');
  return estaActivo;
});
console.log('3) Alumnos activos:', activos.length);

// 4) map: transformamos los datos (calificación a número y nombre a mayúsculas)
const transformados = activos.map(function(a) {
  return {
    id: a.id,
    nombre: String(a.nombre).toUpperCase(),
    calificacion: parseFloat(a.calificacion)
  };
});
console.log('4) Datos transformados (nombre en MAYÚSCULAS y calificación como número):');
console.log(transformados);

// 5) find: buscar a un alumno específico (ej. MARÍA LÓPEZ)
const buscado = transformados.find(function(a) {
  return a.nombre === 'MARÍA LÓPEZ';
});
if (buscado) {
  console.log('5) Alumno encontrado:', buscado);
  // Object.keys: mostrando la estructura de datos
  console.log('   Estructura del objeto alumno (keys):', Object.keys(buscado));
} else {
  console.log('5) Alumno buscado no se encontró.');
}

// 6) Simulamos guardado asíncrono con setTimeout (ej. guardando en BD)
console.log('6) Simulando guardado asíncrono en BD (setTimeout 2s)...');
setTimeout(function() {
  console.log('   Guardado simulado finalizado. Preparando reporte final...');
  // 7) forEach: imprimimos el reporte final
  transformados.forEach(function(a, index) {
    console.log(`   ${index + 1}. ${a.nombre} - Calificación: ${a.calificacion.toFixed(1)}`);
  });

  // Ejemplo: calcular promedio
  const suma = transformados.reduce(function(acc, cur) { return acc + cur.calificacion; }, 0);
  const promedio = transformados.length ? (suma / transformados.length) : 0;
  console.log('   Promedio de calificaciones (activos):', promedio.toFixed(2));

  console.log('7) Fin del procesamiento.');
}, 2000);

console.log('Script continúa ejecutándose mientras se simula el guardado...');
