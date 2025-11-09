// ------------------------------------------------------------------
// EJEMPLO PRÁCTICO: Procesador de Inventario de E-commerce
// ------------------------------------------------------------------

console.log('--- [INICIO] Script de gestión de inventario ---');

// 1. DATO DE ENTRADA (Simula un JSON recibido de un proveedor)
const inventarioJsonString = `[
  {"id": "A10", "nombre": "Laptop Pro", "categoria": "Electrónica", "precio": 1200.00, "stock": 8},
  {"id": "B05", "nombre": "Mouse Óptico", "categoria": "Electrónica", "precio": 25.50, "stock": 3},
  {"id": "C77", "nombre": "Silla de Oficina", "categoria": "Hogar", "precio": 150.00, "stock": 15},
  {"id": "A12", "nombre": "Teclado Mecánico", "categoria": "Electrónica", "precio": 80.00, "stock": 2},
  {"id": "H42", "nombre": "Taza de Café", "categoria": "Hogar", "precio": "12.00", "stock": 30}
]`; // Nota: El precio de la taza es un string a propósito

let inventario;

// 2. PARSEO DE JSON CON MANEJO DE ERRORES (try...catch y JSON.parse)
try {
  inventario = JSON.parse(inventarioJsonString);
  console.log('[PASO 1] Inventario JSON analizado correctamente.');
} catch (error) {
  console.error('[ERROR] El JSON del proveedor está dañado. Abortando.', error.message);
  process.exit(1); // Detiene el script
}

// 3. TRANSFORMACIÓN DE DATOS (Array.map)
//    Aplicar un aumento del 10% a la categoría "Electrónica"
//    y asegurar que todos los precios sean números.
const inventarioActualizado = inventario.map(function(producto) {
  
  // Aseguramos que el precio sea un número (Conversión de Tipo)
  let precioNum = parseFloat(producto.precio);

  // Verificamos si es de la categoría a actualizar
  if (producto.categoria === 'Electrónica') {
    // Aplicamos 10% de aumento y redondeamos a 2 decimales
    let precioNuevo = precioNum * 1.10;
    precioNum = parseFloat(precioNuevo.toFixed(2)); // .toFixed(2) devuelve string, lo volvemos a número
  }
  
  // Devolvemos una copia del producto con el precio actualizado
  // (Usamos '...' para copiar las propiedades que no cambiaron)
  return {
    ...producto,
    precio: precioNum 
  };
});

console.log('[PASO 2] Precios actualizados para "Electrónica".');

// 4. FILTRADO DE DATOS (Array.filter)
//    Encontrar productos con 5 o menos unidades en stock
const productosBajoStock = inventarioActualizado.filter(function(producto) {
  return producto.stock <= 5;
});

console.log(`[PASO 3] ${productosBajoStock.length} productos encontrados con bajo stock.`);

// 5. BÚSQUEDA DE UN ELEMENTO (Array.find)
const productoTeclado = inventarioActualizado.find(function(producto) {
  return producto.nombre === "Teclado Mecánico";
});

console.log('[PASO 4] Búsqueda de "Teclado Mecánico":');
console.log(productoTeclado); // Imprime el objeto completo

// 6. ANÁLISIS DE ESTRUCTURA (Object.values)
if (productoTeclado) {
  const valores = Object.values(productoTeclado);
  console.log(`[PASO 5] Los valores del teclado son: ${valores.join(' | ')}`);
}

// 7. SIMULACIÓN ASÍNCRONA (setTimeout)
//    Simulamos que enviar la orden de re-stock al proveedor toma 2 segundos.
console.log('[PASO 6] Iniciando orden de re-stock asíncrona (simulación)...');

setTimeout(function() {
  
  // 8. REPORTE FINAL (Array.forEach y String.toUpperCase)
  //    Esto se ejecuta DESPUÉS de 2 segundos
  console.log('\n--- 🚚 ¡Orden de Re-Stock Enviada! ---');
  console.log('Reporte de productos solicitados:');

  productosBajoStock.forEach(function(producto) {
    console.log(`  -> Pedir ${10 - producto.stock} unidades de [${producto.id}] ${producto.nombre}`);
    console.log(`     (Categoría: ${producto.categoria.toUpperCase()})`); // (String.toUpperCase)
  });
  console.log('-------------------------------------\n');

}, 2000); // 2000 ms = 2 segundos

console.log('[PASO 7] ...el script principal termina, la orden de re-stock se está procesando.');
