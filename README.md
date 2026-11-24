# ✈️ AeroCol — Reserva tu vuelo

Aplicación web interactiva para la búsqueda y reserva de vuelos nacionales en Colombia, desarrollada en **React + Vite** como proyecto final del curso de **Desarrollo Front-End**.

---

## 🌳 Árbol de Componentes

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

---

## 🟢 Documentación F1 — Formulario de Reserva

### 1. ¿Dónde viven los estados del formulario y por qué?
Viven de manera local dentro del componente FormularioReserva (nombre, pasajeros, clase). Nadie fuera del formulario necesita conocer lo que el usuario digita o selecciona hasta que presiona el botón Reservar, manteniendo el componente autocontenido y evitando re-renderizados innecesarios en App.

### 2. ¿Por qué el total no es un useState más?
Porque el total es un estado derivado. Al ser una operación matemática directa de valores que ya existen (precio * pasajeros * factor), guardarlo en un useState generaría redundancia y riesgo de desincronización. Al calcularse en cada render, se actualiza automáticamente ante cualquier cambio de pasajeros o clase.

### 3. ¿Qué prop le agregaste a TarjetaVuelo y para qué?
Se le agregaron:
- onSeleccionar: función callback que notifica a App qué vuelo fue seleccionado al hacer clic ("los datos suben, las funciones bajan").
- seleccionado: valor booleano que indica si esta tarjeta es la activa para aplicar la clase .tarjeta.seleccionada y mostrar el botón correspondiente.

---

## 🟡 Documentación F2 — Mis Reservas (Persistencia con localStorage)

### 1. ¿Por qué no mutar el array directamente con push?
Porque en React el estado debe ser inmutable. React decide cuándo volver a dibujar la pantalla comparando si la referencia del estado cambió. Si hacemos reservas.push(), estamos modificando el mismo arreglo en la misma dirección de memoria, por lo que React piensa que nada cambió y no re-renderiza la lista. Al usar el operador spread [...reservas, nueva], creamos un arreglo completamente nuevo con una referencia distinta, lo que le avisa a React que debe actualizar la interfaz de inmediato.

### 2. ¿Qué le pasa a tus reservas si recargas la página sin localStorage?
Se borrarían por completo. Las variables y estados de React viven únicamente en la memoria RAM del navegador mientras la pestaña esté abierta. Al recargar (F5), la página se reinicia desde cero y el estado vuelve a su valor inicial vacío. Al utilizar localStorage con JSON.stringify y JSON.parse, los datos sobreviven a recargas y cierres del navegador.

### 3. ¿Dónde pones la lógica de guardar y por qué?
Se coloca en App.jsx, directamente dentro de las funciones que modifican las reservas (al agregar una reserva en manejarReserva y al borrar una en manejarEliminarReserva). Se ubica allí porque App es el componente dueño del estado de las reservas; centralizar el guardado en sus funciones controladoras garantiza que cada cambio en el estado quede sincronizado de inmediato con localStorage en un solo punto, sin repetir lógica en componentes hijos.

---

## 🚀 Cómo ejecutar el proyecto

1. **Instalar dependencias** (solo la primera vez):
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador.

3. **Verificación de calidad**:
   ```bash
   npm run lint
   npm run build
   ```

---

## 💡 Decisión de Diseño

Para garantizar una experiencia de usuario moderna y fluida, se diseñó una navegación por pestañas en la barra superior que permite alternar entre la búsqueda interactiva (Inicio / Vuelos) y el módulo de gestión de reservas (Mis reservas). Al confirmar una reserva en el formulario, el sistema guarda de inmediato en localStorage y traslada al usuario automáticamente a la vista de Mis reservas, donde puede visualizar el resumen completo de su itinerario o eliminarla en cualquier momento.
