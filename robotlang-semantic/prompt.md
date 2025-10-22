# PROMPT: Creación de Guía Web Interactiva - Análisis Semántico con Patrón Visitor

## CONTEXTO
Estás creando una guía didáctica multipágina en `web/semantic/` para enseñar análisis semántico a estudiantes de compiladores. El enfoque es la implementación del patrón Visitor sobre un AST del lenguaje RoboLang.

## REFERENCIAS DE ARCHIVOS
- Gramática BNF: `@web/semantic/RoboLang.bnf`
- Diagramas de gramática: `@web/semantic/bnfrobotlang.html`
- Nodos AST: `@src/main/java/parser/ast/`
- Clase base: `@src/main/java/parser/ASTNode.java`
- Interface Visitor: `@src/main/java/parser/ASTVisitor.java`
- Ejemplos de implementación:
    - `@src/main/java/semantic/CommandCounterVisitor.java`
    - `@src/main/java/semantic/SensorUsageVisitor.java`
    - `@src/main/java/semantic/SemanticAnalyzerVisitor.java`
- Referencia de estilos: `@web/web_parser/`

---

## ESTRUCTURA DE LA GUÍA (Implementar en orden)

### SLIDE 1: Arquitectura del AST de RoboLang
**Objetivo:** Presentar la estructura completa del árbol de sintaxis abstracta

**Contenido obligatorio:**
1. **Clasificación de nodos del AST**
    - Mostrar todos los nodos en `src/main/java/parser/ast/`
    - Agruparlos por categoría (expresiones, sentencias, declaraciones, etc.)
    - Crear diagrama de clases Mermaid mostrando jerarquía completa

2. **Relaciones y atributos**
    - Para cada tipo de nodo, listar sus atributos principales
    - Mostrar relaciones padre-hijo entre nodos
    - Referenciar las reglas BNF correspondientes en `@web/semantic/bnfrobotlang.html`

3. **Ejemplo de derivación**
    - Presentar un programa RoboLang sencillo (5-8 líneas)
    - Mostrar la derivación paso a paso desde el BNF
    - Ilustrar el AST resultante (diagrama visual del árbol)
    - Explicar: "Este AST es el producto del análisis sintáctico"

**Formato:**
- Diagrama Mermaid para jerarquía de clases
- Código RoboLang con syntax highlighting
- Diagrama de árbol visual para el AST resultante

---

### SLIDE 2: La Clase Base ASTNode - Construcción del Árbol
**Objetivo:** Explicar cómo se construye el AST dinámicamente

**⚠️ ATENCIÓN ESPECIAL - ESMÉRATE EN ESTA SECCIÓN**

**Contenido obligatorio:**
1. **Análisis de ASTNode.java**
```java
   // Mostrar código relevante de @src/main/java/parser/ASTNode.java
```
- Explicar cada atributo de la clase
- Enfocarse en el método `addChild()`
- Explicar por qué todos los nodos heredan de ASTNode (ventajas del polimorfismo)

2. **Ejemplos prácticos de construcción**
    - Usar `@src/main/java/parser/ast/expressions/ConditionNode.java` como ejemplo principal
    - Mostrar paso a paso:
        * Cómo se crea una instancia del nodo
        * Cómo se agregan hijos con `addChild()`
        * Cómo queda la estructura final en memoria

    - Incluir al menos 2 ejemplos adicionales de otros nodos (elegir nodos representativos)
    - Para cada ejemplo, mostrar:
        * El código del nodo
        * Un fragmento de código RoboLang que lo utiliza
        * El código de construcción del nodo durante el parsing
        * El árbol resultante (diagrama)

3. **Visualización del proceso**
    - Diagrama animado o secuencial mostrando cómo se va "armando" el árbol
    - Incluir comentarios en cada paso explicando qué ocurre

**Recursos didácticos:**
- Código comentado línea por línea
- Diagramas de secuencia (Mermaid)
- Analogías para explicar la relación padre-hijo

---

### SLIDE 3: Patrón Visitor - Fundamentos
**Objetivo:** Introducir el patrón Visitor y su aplicación al AST

**Contenido obligatorio:**
1. **Teoría del patrón Visitor**
    - Explicar el problema que resuelve
    - Mostrar estructura general del patrón
    - Diagrama UML con Mermaid

2. **Análisis de ASTVisitor.java**
```java
   // Mostrar código de @src/main/java/parser/ASTVisitor.java
```
- Explicar cada método de la interface
- Relacionar cada método con los tipos de nodos del AST
- Explicar el flujo de ejecución (accept() y visit())

---

### SLIDE 4: Implementación de Visitor - CommandCounterVisitor
**Objetivo:** Enseñar implementación completa de un Visitor mediante ejemplo guiado

**⚠️ MOSTRAR SOLUCIÓN COMPLETA**

**Contenido obligatorio:**
1. **Propósito del CommandCounterVisitor**
    - Explicar qué cuenta y por qué es útil
    - Casos de uso prácticos

2. **Implementación detallada**
```java
   // Código completo de @src/main/java/semantic/CommandCounterVisitor.java
```
- Explicar línea por línea cada método visit
- Detallar el manejo del estado interno (contador)
- Mostrar cómo se recorre el árbol
- Explicar el patrón de recursión

3. **Ejemplo de ejecución**
    - Programa RoboLang de ejemplo
    - Traza de ejecución del visitor sobre el AST
    - Resultado esperado

**Formato:**
- Código con anotaciones inline
- Diagrama de flujo de ejecución
- Tabla de resultados

---

### SLIDE 5: Ejercicio Práctico - SensorUsageVisitor
**Objetivo:** Que los estudiantes implementen su primer Visitor

**⚠️ NO MOSTRAR SOLUCIÓN - SOLO GUÍA**

**Contenido obligatorio:**
1. **Descripción del problema**
    - Explicar qué debe hacer el SensorUsageVisitor
    - Definir claramente los requisitos
    - Mostrar ejemplos de entrada/salida esperados

2. **Guía de implementación (sin código)**
    - Listar los métodos visit que deben implementarse
    - Para cada método:
        * Explicar QUÉ debe hacer (no CÓMO)
        * Sugerir qué información debe rastrearse
        * Dar pistas sobre estructura de datos necesaria

3. **Tips y consideraciones**
    - Similitudes con CommandCounterVisitor
    - Casos especiales a considerar
    - Sugerencias de debugging

4. **Criterios de evaluación**
    - Checklist de funcionalidades requeridas
    - Casos de prueba para validar la implementación

---

### SLIDE 6: Análisis Semántico - Tabla de Símbolos
**Objetivo:** Introducir la tabla de símbolos y su propósito

**Contenido obligatorio:**
1. **Concepto de tabla de símbolos**
    - Qué es y para qué sirve
    - Qué información almacena
    - Operaciones básicas (insert, lookup, etc.)

2. **Diseño para RoboLang**
    - Estructura de datos propuesta
    - Diagrama de clases (Mermaid)
    - Alcances y scopes (si aplica)

3. **Casos de uso en análisis semántico**
    - Detección de variables no declaradas
    - Detección de redeclaraciones
    - Verificación de tipos

---

### SLIDE 7: SemanticAnalyzerVisitor - Implementación Guiada
**Objetivo:** Implementar el análisis semántico con tabla de símbolos

**Contenido obligatorio:**
1. **Análisis del método analyze()**
```java
   // Mostrar firma y estructura general
   public void analyze(ASTNode root) {
       // Explicar por qué recibe el nodo raíz
       // Explicar el flujo general
   }
```
- Explicar en detalle por qué recibe el nodo raíz
- Describir el proceso de análisis completo
- Mostrar el manejo de errores semánticos

2. **Responsabilidades de cada método visit**
   Para cada método de la interface ASTVisitor:
    - **Explicar QUÉ debe hacer** (sin mostrar código)
    - **Explicar POR QUÉ debe hacerlo**
    - **Indicar en qué momento** se actualiza la tabla de símbolos
    - **Listar qué validaciones** debe realizar

3. **Ejemplo completo: visitVariableDeclaration**
   **⚠️ ÚNICO MÉTODO CON CÓDIGO COMPLETO**
```java
   // Código de visitVariableDeclaration con comentarios línea por línea
   @Override
   public void visitVariableDeclaration(VariableDeclarationNode node) {
       // [Explicación línea por línea aquí]
   }
```
- Comentar cada línea explicando qué hace
- Explicar las decisiones de diseño
- Mostrar manejo de errores

4. **Guía para otros métodos**
   Para el resto de métodos visit:
    - Describir el pseudocódigo
    - Listar casos especiales
    - Dar pistas de implementación
    - **NO DAR CÓDIGO COMPLETO**

---

## METODOLOGÍA DE IMPLEMENTACIÓN

### Workflow Incremental (OBLIGATORIO)
1. **Implementa un slide completo**
2. **Autoevaluación:** Revisa desde la perspectiva de un estudiante
    - ¿Se entiende sin conocimiento previo?
    - ¿Los ejemplos son claros?
    - ¿Hay gaps en la explicación?
    - ¿Los diagramas son informativos?
3. **Genera recomendaciones de mejora**
4. **Ajusta el contenido**
5. **Pasa al siguiente slide**

### Checklist de calidad por slide:
- [ ] Título claro y objetivo explícito
- [ ] Explicaciones paso a paso
- [ ] Ejemplos concretos y relevantes
- [ ] Diagramas visuales (Mermaid cuando aplique)
- [ ] Código bien formateado con syntax highlighting
- [ ] Transición lógica al siguiente slide
- [ ] Ejercicios o reflexiones para el estudiante

---

## ESPECIFICACIONES TÉCNICAS

### Diagramas
- **Herramienta:** Mermaid exclusivamente
- **Tipos requeridos:**
    - Diagramas de clases para jerarquía del AST
    - Diagramas de secuencia para flujo de ejecución
    - Diagramas de árbol para estructura del AST

### Código
- **Lenguaje:** Java
- **Formato:** Syntax highlighting correcto
- **Estilo:** Seguir convenciones en `@web/web_parser/`
- **Comentarios:** Abundantes y descriptivos para código de ejemplo

### Estilo Visual
- **Referencia:** Revisar `@web/web_parser/` para:
    - Estilos CSS
    - Scripts JS necesarios
    - Layout y estructura HTML
- **Consistencia:** Mantener el mismo look & feel en todos los slides

---

## OBJETIVOS DE APRENDIZAJE

Al finalizar la guía, el estudiante debe poder:
1. ✅ Comprender la estructura completa del AST de RoboLang
2. ✅ Explicar cómo se construye un AST dinámicamente
3. ✅ Entender y aplicar el patrón Visitor
4. ✅ Implementar Visitors personalizados para análisis de código
5. ✅ Diseñar y usar una tabla de símbolos
6. ✅ Realizar análisis semántico básico

---

## PRINCIPIOS DIDÁCTICOS

1. **Claridad antes que brevedad:** Prefiere explicaciones completas
2. **Ejemplo, teoría, práctica:** En ese orden para cada concepto
3. **Complejidad incremental:** De lo simple a lo complejo
4. **Visualización constante:** Usa diagramas generosamente
5. **Interactividad:** Incluye ejercicios y reflexiones
6. **Feedback inmediato:** Proporciona criterios claros de evaluación

---

## TONO Y ESTILO

- **Didáctico pero no condescendiente**
- **Preciso técnicamente pero accesible**
- **Entusiasta y motivador**
- **Usa analogías cuando ayuden a la comprensión**
- **Evita jerga innecesaria**

---

## ENTREGABLES

Para cada slide:
1. HTML completo con estructura semántica
2. CSS integrado o referenciado
3. JavaScript necesario para interactividad
4. Diagramas Mermaid embebidos
5. Código Java formateado y comentado
6. Ejercicios o actividades para el estudiante

---

**ULTRATHINK antes de cada slide:**
- ¿Esto ayudaría a un estudiante que ve el tema por primera vez?
- ¿Los ejemplos son suficientemente claros?
- ¿Hay una progresión lógica?
- ¿Es visualmente atractivo y profesional?

**RECUERDA:** Esmérate en hacer algo didáctico, bonito y memorable. La calidad pedagógica es prioritaria.