# 📝 Hoja de Repaso – Normalización, SQL y Backend

## 📌 Normalización (Formas Normales)
**Objetivo:** Eliminar redundancia y asegurar integridad de datos.

### 1FN (Primera Forma Normal)
- Todos los campos son **atómicos** (no listas ni valores repetidos en la misma celda).
- Cada registro es único.
- Ejemplo ❌: `“gimnasio, yoga”` en una sola columna.  
  ✅ Solución: filas separadas o tabla intermedia.

### 2FN (Segunda Forma Normal)
- Cumple 1FN.
- Todos los atributos dependen **completamente** de la clave primaria (no dependencias parciales).
- Evitar que un campo dependa solo de una parte de la clave compuesta.

### 3FN (Tercera Forma Normal)
- Cumple 2FN.
- No hay dependencias **transitivas** (un campo que dependa de otro campo no clave).
- Ejemplo: si `código_postal → ciudad`, la ciudad debe ir en otra tabla.

---

## 📌 Comandos MySQL útiles

### Crear tabla con clave foránea
```sql
CREATE TABLE registros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    actividad_id INT,
    fecha DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (actividad_id) REFERENCES actividades(id) ON DELETE SET NULL
);
```

```sql
ALTER TABLE registros DROP FOREIGN KEY registros_ibfk_1;
ALTER TABLE registros 
ADD CONSTRAINT registros_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL;
```
```sql
-- Top 5 actividades más realizadas
SELECT a.nombre, COUNT(r.id) AS veces
FROM registros r
INNER JOIN actividades a ON r.actividad_id = a.id
GROUP BY a.nombre
ORDER BY veces DESC
LIMIT 5;

-- Registros de un usuario específico en el último mes
SELECT * 
FROM registros
WHERE usuario_id = 1 
  AND fecha >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH);
```
