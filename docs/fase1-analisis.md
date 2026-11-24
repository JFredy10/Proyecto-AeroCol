# Fase 1: Análisis y Árbol de Componentes — AeroCol

Este documento contiene el análisis inicial del proyecto antes de escribir el código de las tres funcionalidades (F1, F2 y F3), explicando el flujo de datos y la organización de los componentes.

---

## 1. Preguntas de análisis

### 1. ¿Dónde viven hoy los estados origen y destino? ¿Por qué ahí y no en SelectCiudad?
Actualmente viven en el componente principal, App.jsx.

Están ahí porque si los dejáramos dentro de SelectCiudad, ese dato se quedaría guardado únicamente en ese componente y los demás no tendrían forma de conocerlo. En cambio, teniéndolos arriba en App:
- App puede armar la lista de destinos disponibles para que la ciudad que elegiste como origen no vuelva a salir repetida en el destino.
- Puede filtrar el listado de vuelos y saber cuáles coinciden con la ruta seleccionada.
- Puede pasarle a ListaVuelos los nombres de las ciudades para poner el título de la ruta.

Al estar en el componente padre, la información baja fácilmente por props hacia cualquier hijo que la necesite (lo que en React se conoce como elevación del estado).

---

### 2. ListaVuelos recibe vuelos, nombreOrigen, nombreDestino… ¿qué más necesitará recibir para que una tarjeta sea seleccionable?
Para que el usuario pueda elegir un vuelo de la lista, ListaVuelos necesita recibir dos cosas:

1. **El vuelo que está seleccionado actualmente:** para que al recorrer la lista con map, cada tarjeta sepa si es la elegida y se le pueda aplicar el estilo visual resaltado (la clase seleccionada).
2. **Una función para avisar la selección:** como el estado del vuelo seleccionado se guarda arriba en App, la tarjeta no puede cambiarlo directamente. Necesita recibir una función (como onSeleccionar) para que al hacer clic le avise a App cuál vuelo se tocó.

---

### 3. ¿Qué datos necesita guardar una reserva?
Para poder identificar cada reserva, mostrar sus detalles y guardarla en el navegador, propongo una estructura con estos datos:

```javascript
{
  id: crypto.randomUUID(),       // identificador único para poder borrarla luego
  vueloId: "v4",                 // id del vuelo reservado
  vuelo: vuelo,                  // datos del vuelo (avión, hora, ruta, precio)
  nombre: "Ana García",          // nombre de la persona que viaja
  pasajeros: 2,                  // cantidad de puestos
  clase: "ejecutiva",            // tipo de clase elegida
  claseNombre: "Ejecutiva",      // nombre para mostrar en pantalla
  factor: 1.6,                   // factor que multiplica el valor del vuelo
  total: 832000,                 // total a pagar (precio base * pasajeros * factor)
  fecha: "23/11/2026"            // fecha en la que se hizo la reserva
}
```

---

### 4. ¿Dónde crees que debe vivir el estado de las reservas y por qué?
Debe vivir en App.jsx.

La razón es que el formulario de reserva (donde el usuario ingresa sus datos y confirma) y la sección de Mis reservas (donde se listan las reservas y se pueden borrar) son componentes hermanos; no están uno dentro del otro.

Para que lo que se crea en el formulario pueda llegar a la lista, el arreglo de reservas tiene que estar en su padre común, que es App. Además, teniéndolo en App es mucho más directo sincronizar la lectura y el guardado en localStorage, actualizando todo en un solo sitio cuando se cree o se elimine una reserva.

---

## 2. Árbol de componentes proyectado

A partir de la estructura que teníamos en la semana 14, así queda el árbol con las partes nuevas:

```text
                                  App
              (estados: origen, destino, seleccionado, reservas)
        ┌───────────────┬─────────────────┼────────────────┬──────────────┐
     <Header>    <SelectorRuta>     <ListaVuelos>  <MisReservas>     <Footer>
                 /            \           │          (reservas,
          <SelectCiudad> <SelectCiudad>   │         onEliminar)
             (origen)       (destino)     │
                                    <TarjetaVuelo> ×N
                              (vuelo, seleccionado,
                                  onSeleccionar)
                                          │
                                 <FormularioReserva>
                                  (vuelo, onReservar)
```

### Cómo se comunican los componentes:
- **App:** Centraliza los datos principales de la pantalla (ciudades elegidas, vuelo seleccionado y lista de reservas).
- **SelectorRuta:** Recibe las ciudades y las funciones para cambiar origen y destino.
- **TarjetaVuelo:** Muestra la información del vuelo y ejecuta onSeleccionar cuando el usuario le hace clic.
- **FormularioReserva:** Solo se muestra cuando hay un vuelo seleccionado. Lleva el control de los campos de nombre, pasajeros y clase, calcula el total al instante, y al confirmar envía la reserva a App.
- **MisReservas:** Recibe las reservas para mostrarlas en pantalla y permite eliminarlas avisándole a App.
