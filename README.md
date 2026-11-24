# ✈️ AeroCol — Reserva tu vuelo

Aplicación web interactiva para la búsqueda y reserva de vuelos nacionales en Colombia, desarrollada en **React + Vite** como proyecto final del curso de **Desarrollo Front-End**.

---

## Árbol de Componentes

```text
                                App
              (estados: origen, destino, seleccionado, reservas)
        ┌───────────────┬─────────────────┼────────────────┬──────────────┐
     <Header>    <SelectorRuta>     <ListaVuelos> <FormularioReserva> <Footer>
                 /            \           │               │
          <SelectCiudad> <SelectCiudad>   │       (vuelo, onReservar)
             (origen)       (destino)     │
                                    <TarjetaVuelo> ×N
                               (seleccionado, onSeleccionar)
```

---

##  Documentación F1 — Formulario de Reserva

### 1. ¿Dónde viven los estados del formulario y por qué?
Viven de manera local dentro del componente `FormularioReserva` (`nombre`, `pasajeros`, `clase`). Nadie fuera del formulario necesita conocer lo que el usuario digita o selecciona hasta que presiona el botón **Reservar**, manteniendo el componente autocontenido y evitando re-renderizados innecesarios en `App`.

### 2. ¿Por qué el total no es un `useState` más?
Porque el total es un **estado derivado**. Al ser una operación matemática directa de valores que ya existen (`vuelo.precio * pasajeros * factor`), guardarlo en un `useState` generaría redundancia y riesgo de desincronización. Al calcularse en cada render, se actualiza automáticamente ante cualquier cambio de pasajeros o clase.

### 3. ¿Qué prop le agregaste a `TarjetaVuelo` y para qué?
Se le agregaron:
- **`onSeleccionar`**: función callback que notifica a `App` qué vuelo fue seleccionado al hacer clic (*"los datos suben, las funciones bajan"*).
- **`seleccionado`**: valor booleano que indica si esta tarjeta es la activa para aplicar la clase `.tarjeta.seleccionada` y mostrar el botón correspondiente.

---

##  Cómo ejecutar el proyecto

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

## Decisión de Diseño

Para garantizar una experiencia de usuario moderna y limpia, se implementó una **disposición en dos columnas adaptativas**: los resultados de búsqueda se organizan a la izquierda y el formulario de reserva aparece fijado a la derecha en cuanto se selecciona un vuelo. Esto permite al usuario cambiar de vuelo o comparar precios sin perder de vista su formulario de reserva en tiempo real.
