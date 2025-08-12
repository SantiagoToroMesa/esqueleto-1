# ⚡ Chuleta de Atajos y Trucos – Programación & Excel

## 🖥️ Atajos útiles en el editor (VSCode / WebStorm)
| Acción | Atajo (Windows) | Atajo (Mac) |
|--------|----------------|-------------|
| Seleccionar todo | `Ctrl + A` | `Cmd + A` |
| Cortar todo (o lo seleccionado) | `Ctrl + X` | `Cmd + X` |
| Copiar | `Ctrl + C` | `Cmd + C` |
| Pegar | `Ctrl + V` | `Cmd + V` |
| Buscar | `Ctrl + F` | `Cmd + F` |
| Buscar y reemplazar | `Ctrl + H` | `Cmd + Option + F` |
| Renombrar variable / entidad (refactor) | `Shift + F6` | `Shift + Fn + F6` |
| Duplicar línea | `Ctrl + D` | `Cmd + D` |
| Comentar / descomentar línea | `Ctrl + /` | `Cmd + /` |
| Ir a definición | `Ctrl + Click` | `Cmd + Click` |
| Abrir paleta de comandos | `Ctrl + Shift + P` | `Cmd + Shift + P` |

---

## 📊 Trucos de Excel para Normalización

### 🔹 Quitar duplicados
1. Selecciona la columna o rango.
2. Ve a **Datos → Quitar duplicados**.
3. Marca las columnas relevantes y confirma.

### 🔹 Filtrar datos
1. Selecciona los encabezados.
2. Ve a **Datos → Filtro**.
3. Usa las flechas para mostrar solo lo que necesites.

### 🔹 Buscar valores únicos
- Función:
  ```excel
  =UNIQUE(A2:A100)
## 📝 Normalización de datos en Excel (Separar y Pasar a Tablas Intermedias)
Cuando tienes un campo con valores múltiples (por ejemplo, actividades separadas por espacios o comas), debes convertirlo en filas únicas para cumplir con la 1FN (Primera Forma Normal) y poder crear tablas intermedias en SQL.

#### 1️⃣ Separar valores de una celda en columnas
Selecciona la columna con los valores múltiples (ej. actividades).

Ve a Datos → Texto en columnas.

Elige Delimitados.

Marca el separador correspondiente (coma, espacio, punto y coma, etc.).

Finaliza y verifica que cada valor esté en su propia columna.

#### 2️⃣ Pasar columnas a filas (crear tabla intermedia)
Copia tu tabla con id_cliente y todas las columnas de actividades.

Ve a Datos → Obtener y transformar datos → Desde tabla/rango (esto abre Power Query).

En Power Query:

Selecciona las columnas de actividades.

Haz clic en Transformar → Despivotar columnas.

Ahora cada valor estará en una fila junto al id_cliente.

Cambia el nombre de las columnas (ej. id_cliente, actividad).

Clic en Cerrar y cargar para exportar la nueva tabla a Excel.

##### 3️⃣ Ejemplo final para SQL
Supongamos que tenías:

id_cliente	actividades
C001	Running Ciclismo Zumba
C002	Escalada Pilates

Después del proceso obtendrás:

id_cliente	actividad
C001	Running
C001	Ciclismo
C001	Zumba
C002	Escalada
C002	Pilates

Esto se puede importar a una tabla intermedia en SQL para modelar relaciones muchos a muchos.
Cómo Despivotear Tablas en Excel
Este proyecto/documentación explica las distintas formas para despivotear (rotar o transponer) tablas en Microsoft Excel. Esto es útil cuando quieres convertir datos organizados en columnas a un formato en filas, o viceversa.

Métodos para Despivotear en Excel
1. Usar Pegado Especial con Transponer
   Selecciona la tabla o rango de celdas que quieres "despivotear".

Copia la selección (Ctrl + C).

Selecciona la celda donde quieres que empiece la tabla transpuesta.

Haz clic derecho y selecciona Pegado especial.

Marca la opción Transponer.

Haz clic en OK.

Esto intercambiará filas por columnas.

2. Usar la función TRANSPONER
   Identifica el rango original de tu tabla (ej.: A1:C4).

Selecciona un rango vacío con las dimensiones invertidas (tantas filas como columnas y viceversa).

En la barra de fórmulas, escribe:

text
=TRANSPONER(A1:C4)
Presiona Ctrl + Shift + Enter (en versiones antiguas con fórmula matricial) o solamente Enter en versiones modernas de Excel.

Esto crea una tabla dinámica que refleja la transposición en tiempo real.

3. Convertir Tabla a Rango antes de Transponer
   Si tienes una tabla Excel (creada con Insertar > Tabla), el pegado especial no funcionará directamente.

Conviértela a rango normal:

Haz clic en alguna celda de la tabla.

Ve a la pestaña Diseño de tabla y selecciona Convertir a rango.

Luego procede a copiar y pegar con la opción Transponer.

4. Usar Power Query para Despivotear (Deshacer Pivot)
   Abre Power Query desde:
   Datos > Obtener y transformar > Desde tabla/rango.

Carga tu tabla en Power Query.

Selecciona las columnas que quieras deshacer pivote.

Usa la opción Despivotar columnas para convertirlas en filas.

Carga el resultado de nuevo a Excel como tabla.

Esta opción es ideal para tablas complejas o pivoteadas.

Notas
Despivotear es diferente a simplemente "transponer" cuando hablamos de tablas dinámicas o datos agrupados. Power Query te ayuda a "despivotar" columnas etiquetadas y hacer análisis más avanzados.

Asegúrate de validar los datos después de transponer para evitar errores de referencias.

Recursos y Documentación Adicional
Microsoft Support - Transponer datos en Excel

Power Query para principiantes

Si necesitas ayuda con ejemplos prácticos o automatizar estos procesos, ¡contáctame!

¿Quieres que te prepare un tutorial completo con capturas de pantalla o un archivo .xlsx de ejemplo?