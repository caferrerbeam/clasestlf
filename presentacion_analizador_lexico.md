# 📘 Presentación: Analizador Léxico – AFD vs Expresiones Regulares

## 1. Portada
- Título: *“Analizador Léxico: Estrategias con AFD y Regex”*
- Curso: Compiladores y Teoría de Lenguajes
- Nombre del expositor y fecha

---

## 2. Introducción
- El analizador léxico es la **primera fase del compilador**.
- Convierte la entrada (código fuente) en una secuencia de **tokens**.
- Pregunta guía: *¿Cuál es la mejor estrategia, AFD o Regex?*

---

## 3. Estrategias de Implementación

### Estrategia 1 – Una clase por AFD (serialización)
- Cada token tiene su propio autómata.  
- `nextToken()` ejecuta cada AFD en orden hasta que uno acepte.  
- **Ventaja:** implementación modular y sencilla.  
- **Problema:** puede requerir **backtracking** si dos tokens comparten prefijo (ej. `if` vs `identificador`).  

### Estrategia 2 – Un AFD único global
- Todas las expresiones regulares de los tokens se combinan en un **único AFD determinista**.  
- **Ventaja:** no hay backtracking, ejecución O(n).  
- **Desventaja:** requiere construcción previa (herramientas como Lex/Flex, ANTLR).  
- **Es la estrategia usada en compiladores reales**.  

---

## 4. Manejo de Palabras Reservadas
- **Problema:** las palabras reservadas (`if`, `while`, `return`) son un caso especial de identificador.  
- **Estrategia usada:**
  1. El AFD reconoce todo como **identificador**.  
  2. En la fase de construcción del token, se consulta una **tabla de keywords**.  
     - Si la cadena está en la tabla → se retorna `KEYWORD_IF`.  
     - Si no → se retorna `IDENTIFIER`.  

Ejemplo en pseudocódigo:

```java
Token matchIdentifier(String lexeme) {
    if (keywords.contains(lexeme)) {
        return new Token(KEYWORD, lexeme);
    } else {
        return new Token(IDENTIFIER, lexeme);
    }
}
```

- **Ventaja:** evita conflictos y mantiene un único AFD para identificadores.  

---

## 5. Ejemplos de Tokens

### Identificadores
- **Regex:** `[a-zA-Z][a-zA-Z0-9]*`
- **AFD:** estados para letra inicial, luego letras o dígitos.

### Números
- **Regex:** `[0-9]+(\.[0-9]+)?`
- **AFD:** estados para entero, punto decimal, parte fraccionaria.

### Strings
- **Regex (simplificada):** `"([^"\\]|\\.)*"`
- **AFD:** manejo explícito de comillas y escapes.

### Comentarios
- Línea: `// ...`
- Bloque: `/* ... */`

---

## 6. Comparación General – Regex vs AFD
- **Regex:**
  - Fácil de escribir y leer.
  - Rápido para prototipos.
  - Problema: posible backtracking si se evalúan directamente.
- **AFD:**
  - Determinista y eficiente (O(n)).
  - Estándar en compiladores reales.
  - Usado en conjunto con regex → regex se **compilan a AFD**.

---

## 7. Diagrama de Bloques de `nextToken()`
- Flujo serial: Entrada → AFD Identificador → AFD Número → AFD String → AFD Comentario → Error.
- Indicar que si se usa un AFD global, el flujo se resuelve en un solo autómata.

---

## 8. Implementación de `nextToken()`
Ejemplo en pseudocódigo:

```java
for (TokenMatcher matcher : matchers) {
    Token t = matcher.tryMatch(input);
    if (t != null) return t;
}
throw new LexicalException("Token inválido");
```

- Si más de un token puede empezar igual, se aplica **maximal munch** (consumir el lexema más largo posible).  

---

## 9. Manejo de Conflictos – Maximal Munch
- Principio: siempre elegir el **lexema más largo válido**.  
- Ejemplo:
  - Input: `ifx`
  - Coincidencias posibles: `if` (keyword), `ifx` (identificador).
  - Se elige `ifx` porque es más largo.  

---

## 10. Testing
- Casos válidos: identificadores correctos, números bien formados, strings cerrados.
- Casos inválidos: tokens desconocidos, strings sin cierre, comentarios no terminados.

---

## 11. Performance
- Regex directo: puede caer en backtracking exponencial.
- AFD: tiempo lineal garantizado.
- Herramientas de la industria (Lex, ANTLR, JavaCC) → **usan regex para definir tokens pero generan AFD deterministas**.

---

## 12. Conclusiones
- Regex es útil para prototipos y expresividad.  
- AFD es el estándar en compiladores: eficiencia y determinismo.  
- Las **palabras reservadas** se manejan con una **tabla de keywords** sobre identificadores.  
- Recomendación: usar herramientas que generen un AFD único a partir de regex.  
