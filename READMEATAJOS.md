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