# Prompt para Generar Sitio Web Educativo RoboLang Parser

## Contexto del Proyecto

Necesito crear un sitio web educativo completo para estudiantes de **Teoría de Lenguajes Formales** que aprenderán a implementar parsers para el lenguaje RoboLang. Este es un proyecto universitario de la Universidad EAM.

## Estructura del Proyecto

```
robot_lang/
├── web/
│   ├── index.html          # Página principal (a crear)
│   ├── css/
│   │   ├── style.css       # Estilos principales
│   │   └── parser-implementation.css  # Estilos específicos
│   ├── js/
│   │   └── script.js       # JavaScript interactivo
│   ├── images/             # Imágenes y diagramas
│   └── robotlangbnf.html   # Gramática BNF (ya existe)
└── src/main/java/parser/   # Código Java del parser
    ├── ast/                # Nodos AST
    ├── parsers/            # Implementación de parsers
    └── ParseContext.java   # Contexto de parsing
```

## Especificaciones Técnicas

### Lenguaje RoboLang
- **Tipo**: Lenguaje de dominio específico (DSL) para control de robots
- **Comandos**: UP, DOWN, LEFT, RIGHT, PENUP, PENDOWN
- **Estructuras**: IF, WHILE, REPEAT con condiciones y bloques
- **Sensores**: BATTERY, LIGHT, TEMP, DIST, OBSTACLE, BLOCKED
- **Operadores**: AND, OR, NOT, >, <, >=, <=, ==, !=

### Arquitectura del Parser
- **Interface**: `Parser<T>` genérica
- **Context**: `ParseContext` para manejo de tokens
- **AST**: Árbol de sintaxis abstracta con jerarquía de nodos
- **Delegación**: Parsers complejos delegan a parsers simples

## Requerimientos del Sitio Web

### 1. Página Principal (`index.html`)
lAS SECCIONES SON PAGINAS INDIVIDUALES
**ESTRUCTURA EDUCATIVA OBLIGATORIA - 5 SECCIONES PRINCIPALES:**

#### Sección 1: 🏗️ **ARQUITECTURA Y AST (Árbol de Sintaxis Abstracta)**
**Objetivo**: Que el estudiante comprenda los fundamentos antes de implementar
@
**Contenido obligatorio:**
- **Introducción a RoboLang**: ¿Qué es? Objetivos del proyecto
- **Arquitectura del Compilador**: Flujo Lexer → Parser → AST → Intérprete
- **¿Qué es un AST?**: Conceptos fundamentales con analogías
- **Jerarquía de Nodos Base**: 
  - `ASTNode` (clase base abstracta)
  - `ExpressionNode` (expresiones y condiciones)
  - `StatementNode` (comandos y estructuras de control)
  - `LiteralNode` (valores primitivos)
  - `CommandNode` (acciones del robot)
- **Ejemplo Completo de Construcción**: 
  - Código: `IF (BATTERY > 20) { UP; }`
  - Tokens generados
  - AST resultante paso a paso
  - Visualización del árbol final
- **Nodos AST Implementados** (para referencia):
  - Lista de todos los nodos ya creados con ubicaciones
  - Ejemplos de uso de cada tipo de nodo
- **Patrón de Diseño**: Composite Pattern en el AST

#### Sección 2: ⚙️ **PARSERS - CONSTRUCCIÓN Y FUNCIONAMIENTO**
**Objetivo**: Enseñar cómo se construyen los parsers paso a paso

**Contenido obligatorio:**
- **Parsers 101 - Conceptos Básicos**:
  - ¿Qué hace un parser? (Tokens → AST)
  - Interface `Parser<T>` genérica
  - Patrón de diseño Template Method
- **ParseContext - El Corazón del Parser**:
  - Introducción gradual de métodos:
    - `getCurrentToken()` - "Espiar" el token actual
    - `advance()` - Avanzar al siguiente token  
    - `match(TokenType...)` - Verificar y consumir
    - `consume(TokenType, String)` - Consumir obligatorio
    - `check(TokenType)` - Solo verificar
    - `isAtEnd()` - Detectar fin de entrada
- **Parser Más Simple - NumberParser**:
  - Código completo paso a paso
  - Explicación línea por línea
  - Manejo de errores
- **Parser Intermedio - MovementCommandParser**:
  - Múltiples opciones (UP|DOWN|LEFT|RIGHT)
  - Patrón switch/case vs if-else
- **Parser Avanzado - IfStatementParser**:
  - Delegación a otros parsers
  - Composición de parsers complejos
  - Manejo de precedencia
- **Parsers Implementados** (para referencia):
  - Lista completa con código de ejemplo
  - Patrones de implementación
- **Mini-Ejercicios Interactivos**:
  - Completar código faltante
  - Identificar errores comunes
  - Debugging paso a paso
- **Errores Comunes de Estudiantes**:
  - Token ya consumido
  - Falta de advance()
  - Manejo incorrecto de errores

#### Sección 3: 🧪 **PRUEBAS (TESTING)**
**Objetivo**: Validar que las implementaciones funcionen correctamente

**Contenido obligatorio:**
- **Filosofía de Testing en Parsers**:
  - ¿Por qué testear parsers?
  - Tipos de pruebas: válidas, inválidas, casos límite
- **Estructura de una Prueba**:
  - Patrón AAA (Arrange, Act, Assert)
  - Setup de tokens y ParseContext
  - Verificación de AST generado
- **Patrones de Testing Comunes**:
  - Test de caso válido
  - Test de error esperado
  - Test de tokens consumidos correctamente
- **Framework JUnit**:
  - Anotaciones básicas (@Test, @BeforeEach)
  - Assertions útiles para parsers
  - Manejo de excepciones esperadas
- **Ejemplos de Tests Completos**:
  - Test para NumberParser
  - Test para IfStatementParser
  - Test de casos de error
- **Tareas de Testing para Estudiantes**:
  - Tests específicos que deben crear
  - Casos de prueba obligatorios por parser
  - Cobertura esperada

#### Sección 4: 🎨 **GUI (Interfaz Gráfica)**
**Objetivo**: Herramienta visual para probar y depurar parsers

**Contenido obligatorio:**
- **RoboLang IDE - Características**:
  - Editor con syntax highlighting
  - Visualizador de tokens en tiempo real
  - Árbol AST interactivo
  - Consola de errores
  - Ejemplos integrados
- **Arquitectura de la GUI**:
  - Patrón MVC (Model-View-Controller)
  - Integración Swing + Parser
  - Flujo de datos: Código → Tokens → AST → Visualización
- **Componentes Principales**:
  - `JTextPane` para edición de código
  - `JTable` para mostrar tokens
  - `JTree` para visualizar AST
  - `JTextArea` para mensajes de consola
- **Ejemplo de Integración**:
  - Código completo de conexión GUI-Parser
  - Manejo de errores en interfaz
  - Actualización en tiempo real
- **Beneficios Educativos**:
  - Feedback visual inmediato
  - Debugging interactivo
  - Comprensión del flujo completo
  - Experimentación segura
- **Uso Práctico para Estudiantes**:
  - Cómo probar implementaciones
  - Depuración de errores
  - Validación de AST generado

#### Sección 5: 🎯 **TAREA DE IMPLEMENTACIÓN**
**Objetivo**: Lista completa de trabajo a realizar por los estudiantes

**Contenido obligatorio:**

**5.1 AST Nodes a Implementar:**
- **Nodos Base Faltantes** (si alguno):
  - Ubicaciones exactas en filesystem
  - Estructura esperada de cada clase
  - Métodos obligatorios a implementar
  - Relaciones de herencia

**5.2 Parsers a Implementar (16 Total):**
- **🔢 Literal Parsers (4 parsers - Nivel ⭐ Básico)**:
  1. NumberParser - `src/main/java/parser/parsers/literals/NumberParser.java`
  2. BooleanParser - `src/main/java/parser/parsers/literals/BooleanParser.java`
  3. BooleanSensorParser - `src/main/java/parser/parsers/literals/BooleanSensorParser.java`
  4. NumericSensorParser - `src/main/java/parser/parsers/literals/NumericSensorParser.java`

- **🎮 Command Parsers (3 parsers - Nivel ⭐⭐ Medio)**:
  5. MovementCommandParser - `src/main/java/parser/parsers/commands/MovementCommandParser.java`
  6. PenCommandParser - `src/main/java/parser/parsers/commands/PenCommandParser.java`
  7. SimpleCommandParser - `src/main/java/parser/parsers/commands/SimpleCommandParser.java`

- **🧮 Expression Parsers (5 parsers - Nivel ⭐⭐⭐ Avanzado)**:
  8. ComparisonExpressionParser - `src/main/java/parser/parsers/expressions/ComparisonExpressionParser.java`
  9. NotExpressionParser - `src/main/java/parser/parsers/expressions/NotExpressionParser.java`
  10. AndExpressionParser - `src/main/java/parser/parsers/expressions/AndExpressionParser.java`
  11. OrExpressionParser - `src/main/java/parser/parsers/expressions/OrExpressionParser.java`
  12. ConditionParser - `src/main/java/parser/parsers/expressions/ConditionParser.java`

- **🏗️ Statement Parsers (4 parsers - Nivel ⭐⭐⭐⭐ Experto)**:
  13. IfStatementParser - `src/main/java/parser/parsers/statements/IfStatementParser.java`
  14. WhileStatementParser - `src/main/java/parser/parsers/statements/WhileStatementParser.java`
  15. RepeatStatementParser - `src/main/java/parser/parsers/statements/RepeatStatementParser.java`
  16. StatementBlockParser - `src/main/java/parser/parsers/statements/StatementBlockParser.java`

**Formato de Tarjetas de Implementación:**
- ✅ Checkbox interactivo para progreso
- 📂 Ubicación exacta en filesystem
- 📝 Gramática BNF específica
- ⏱️ Tiempo estimado de implementación
- 🔗 Dependencias (parsers que debe usar)
- 💡 Objetivo de aprendizaje específico
- 🎯 Nivel de dificultad visual

**5.3 Guía de Implementación Paso a Paso:**
- **Orden de implementación recomendado**
- **Estrategia progresiva**: Simple → Compuesto → Complejo
- **Puntos de verificación** en cada etapa
- **Uso de la GUI** para testing continuo
- **Recursos de apoyo** (gramática BNF, ejemplos)

**5.4 Entregables Esperados:**
- Código Java funcional
- Tests unitarios básicos
- Documentación de decisiones de diseño
- Demostración funcional en GUI

#### Navegación y UX:
- **Header con navegación fija**: AST | Parsers | Tests | GUI | Implementación
- **Smooth scroll** entre secciones
- **Progreso visual**: Barra de progreso de implementación
- **Enlaces internos**: Referencias cruzadas entre secciones
- **Breadcrumbs**: Indicador de ubicación actual

### 2. Estilos CSS

#### `css/style.css` - Estilos Base:
- **Color scheme**: Moderno y educativo
  - Primario: #3b82f6 (azul)
  - Secundario: #10b981 (verde)
  - Acento: #8b5cf6 (púrpura)
  - Fondo: #f8fafc
- **Typography**: Sans-serif moderna, legible
- **Layout**: Responsive, mobile-first
- **Navegación**: Sticky header con smooth scroll

#### `css/parser-implementation.css` - Estilos Específicos:
- **Parser cards**: Diseño de tarjetas interactivas
- **Difficulty indicators**: Badges de dificultad (⭐ Básico, ⭐⭐ Medio, ⭐⭐⭐ Avanzado, ⭐⭐⭐⭐ Experto)
- **Progress tracking**: Barras de progreso y contadores
- **Code highlighting**: Estilos para sintaxis de código
- **Interactive elements**: Hover effects, checkboxes, animations

### 3. JavaScript (`js/script.js`)

#### Funcionalidades:
- **Smooth scrolling** para navegación
- **Progress tracking** de parsers completados
- **Interactive checkboxes** sin salto de página
- **Celebration effects** al completar todos los parsers
- **Code highlighting** con Prism.js
- **Responsive menu** para móviles

### 4. Características Técnicas

#### HTML Structure:
- **Semantic HTML5**: Uso de `<section>`, `<article>`, `<nav>`, etc.
- **Accessibility**: Aria labels, alt texts, proper contrast
- **SEO friendly**: Meta tags, structured content
- **Mobile responsive**: Viewport meta, flexible layouts

#### CSS Features:
- **CSS Grid & Flexbox**: Layouts modernos
- **CSS Variables**: Sistema de colores consistente
- **Animations**: Transiciones suaves, micro-interactions
- **Print styles**: Para documentación offline

#### JavaScript Features:
- **Vanilla JS**: Sin dependencias pesadas
- **Event delegation**: Performance optimizada
- **Local storage**: Persistencia de progreso
- **Error handling**: Graceful degradation
- **Dynamic BNF links**: Integración automática con `robotlangbnf.html`

## Integración Obligatoria con Gramática BNF

### **REQUERIMIENTO CRÍTICO**: Integración con `robotlangbnf.html`

**OBLIGATORIO**: Cada vez que se mencione una gramática, parser o nodo AST, debe incluirse:

#### **1. Formato de Referencia BNF**:
```html
<div class="bnf-reference">
    <div class="bnf-inline">
        <strong>📝 Gramática:</strong> 
        <code>&lt;number&gt; ::= [0-9]+</code>
    </div>
    <div class="bnf-visual">
        <a href="robotlangbnf.html#number" target="_blank" class="bnf-link">
            📖 Ver diagrama visual de esta gramática
        </a>
    </div>
</div>
```

#### **2. Referencias Automáticas Obligatorias**:
- **Cada parser mencionado** → Link específico a su gramática en `robotlangbnf.html`
- **Cada nodo AST explicado** → Referencia a gramática que lo genera
- **Cada ejemplo de código** → Links a gramáticas involucradas
- **Cada ejercicio práctico** → Gramática BNF como referencia

#### **3. Anchors Específicos en robotlangbnf.html**:
```html
<!-- Los links deben apuntar a anchors específicos: -->
<a href="robotlangbnf.html#number">NumberParser</a>
<a href="robotlangbnf.html#boolean">BooleanParser</a> 
<a href="robotlangbnf.html#movement_command">MovementCommandParser</a>
<a href="robotlangbnf.html#if_statement">IfStatementParser</a>
<!-- etc. para cada uno de los 16 parsers -->
```

#### **4. Doble Presentación Obligatoria**:
**FORMATO ESTÁNDAR** para cada gramática mencionada:
```html
<div class="grammar-display">
    <!-- Texto BNF inline -->
    <div class="bnf-text">
        <code>&lt;if_stmt&gt; ::= "IF" "(" &lt;condition&gt; ")" &lt;statement_block&gt;</code>
    </div>
    
    <!-- Link a diagrama visual -->
    <div class="bnf-visual-link">
        <a href="robotlangbnf.html#if_statement" target="_blank">
            🔗 Ver representación visual de esta gramática
        </a>
    </div>
</div>
```

#### **5. Integración en Secciones**:

**Sección 1 (AST)**: 
- Cada nodo AST explicado debe mostrar su gramática BNF + link visual
- Ejemplo: `NumberNode` → gramática `<number>` + link a `robotlangbnf.html#number`

**Sección 2 (Parsers)**:
- Cada parser explicado debe incluir gramática completa + diagrama
- Ejemplos de código deben referenciar gramáticas específicas

**Sección 5 (Implementación)**:
- Cada tarjeta de parser debe incluir:
  - Gramática BNF en texto
  - Link directo a diagrama visual en `robotlangbnf.html`

#### **6. CSS para Estilos BNF**:
```css
.bnf-reference {
    background: #f8fafc;
    border-left: 4px solid #3b82f6;
    padding: 12px;
    margin: 16px 0;
    border-radius: 6px;
}

.bnf-inline code {
    background: #e2e8f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
}

.bnf-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
}

.bnf-link:hover {
    text-decoration: underline;
}
```

#### **7. JavaScript para Links Dinámicos**:
```javascript
// Auto-generar links a robotlangbnf.html
function createBNFLink(grammarName, displayText) {
    return `<a href="robotlangbnf.html#${grammarName}" target="_blank">${displayText}</a>`;
}

// Ejemplos de uso:
// createBNFLink('number', 'Ver diagrama de <number>')
// createBNFLink('if_statement', 'Ver diagrama de <if_stmt>')
```

### **Objetivo**: 
Que los estudiantes **siempre** tengan acceso tanto al **texto BNF formal** como a la **representación visual** de cada gramática, facilitando la comprensión desde múltiples perspectivas de aprendizaje.

## Contenido Educativo Específico

### Parsers a Implementar (con ubicaciones exactas):

#### Literal Parsers (Básico ⭐):
1. **NumberParser** - `src/main/java/parser/parsers/literals/NumberParser.java`
   - Gramática: `<number> ::= [0-9]+`
   - Tiempo: 15-20 minutos

2. **BooleanParser** - `src/main/java/parser/parsers/literals/BooleanParser.java`
   - Gramática: `<boolean> ::= "true" | "false"`

3. **BooleanSensorParser** - `src/main/java/parser/parsers/literals/BooleanSensorParser.java`
   - Gramática: `<boolean_sensor> ::= "OBSTACLE" | "BLOCKED"`

4. **NumericSensorParser** - `src/main/java/parser/parsers/literals/NumericSensorParser.java`
   - Gramática: `<numeric_sensor> ::= "BATTERY" | "LIGHT" | "TEMP" | "DIST"`

#### Command Parsers (Medio ⭐⭐):
5. **MovementCommandParser** - `src/main/java/parser/parsers/commands/MovementCommandParser.java`
   - Gramática: `<movement_command> ::= "UP" | "DOWN" | "LEFT" | "RIGHT"`

6. **PenCommandParser** - `src/main/java/parser/parsers/commands/PenCommandParser.java`
   - Gramática: `<pen_command> ::= "PENUP" | "PENDOWN"`

7. **SimpleCommandParser** - `src/main/java/parser/parsers/commands/SimpleCommandParser.java`
   - Gramática: `<simple_command> ::= <movement_command> ";" | <pen_command> ";"`
   - Dependencias: MovementCommandParser, PenCommandParser
   - Tiempo: 30-45 minutos

#### Expression Parsers (Avanzado ⭐⭐⭐):
8. **ComparisonExpressionParser** - `src/main/java/parser/parsers/expressions/ComparisonExpressionParser.java`
   - Gramática: `<comparison> ::= <value> <operator> <value>`

9. **NotExpressionParser** - `src/main/java/parser/parsers/expressions/NotExpressionParser.java`
   - Gramática: `<not_expr> ::= "NOT" <primary_expr>`

10. **AndExpressionParser** - `src/main/java/parser/parsers/expressions/AndExpressionParser.java`
    - Gramática: `<and_expr> ::= <not_expr> ("AND" <not_expr>)*`

11. **OrExpressionParser** - `src/main/java/parser/parsers/expressions/OrExpressionParser.java`
    - Gramática: `<or_expr> ::= <and_expr> ("OR" <and_expr>)*`

12. **ConditionParser** - `src/main/java/parser/parsers/expressions/ConditionParser.java`
    - Gramática: `<condition> ::= <or_expr>`

#### Statement Parsers (Experto ⭐⭐⭐⭐):
13. **IfStatementParser** - `src/main/java/parser/parsers/statements/IfStatementParser.java`
    - Gramática: `<if_stmt> ::= "IF" "(" <condition> ")" <statement_block>`

14. **WhileStatementParser** - `src/main/java/parser/parsers/statements/WhileStatementParser.java`
    - Gramática: `<while_stmt> ::= "WHILE" "(" <condition> ")" <statement_block>`

15. **RepeatStatementParser** - `src/main/java/parser/parsers/statements/RepeatStatementParser.java`
    - Gramática: `<repeat_stmt> ::= "REPEAT" "(" <number> ")" <statement_block>`

16. **StatementBlockParser** - `src/main/java/parser/parsers/statements/StatementBlockParser.java`
    - Gramática: `<statement_block> ::= "{" <statement_list> "}"`

### Ejemplos de Código Java

#### Interface Parser:
```java
// src/main/java/parser/parsers/Parser.java
public interface Parser<T> {
    T parse(ParseContext context) throws ParseException;
}
```

#### ParseContext Methods:
```java
// Métodos principales que los estudiantes usarán:
Token getCurrentToken()         // Obtener token actual sin avanzar
void advance()                 // Avanzar al siguiente token
boolean match(TokenType... types) // Verificar y consumir si coincide
void consume(TokenType type, String message) // Consumir o error
boolean check(TokenType type)  // Solo verificar sin consumir
boolean isAtEnd()             // ¿Llegamos al final?
```

#### Ejemplo de Parser Simple:
```java
public class NumberParser implements Parser<NumberNode> {
    @Override
    public NumberNode parse(ParseContext context) throws ParseException {
        Token token = context.getCurrentToken();
        
        if (token.getType() == TokenType.NUMBER) {
            context.advance();
            return new NumberNode(Integer.parseInt(token.getValue()));
        }
        
        throw new ParseException("Se esperaba un número", token);
    }
}
```

## Pedagogía y Experiencia de Usuario

### Enfoque de Autoestudio:
**CRÍTICO**: Este sitio web debe funcionar como una **guía completa de autoestudio** donde los estudiantes pueden aprender y trabajar de manera **autónoma** sin necesidad de instructor presente.

### Principios Educativos para Autoestudio:
1. **Secuencia Obligatoria**: 
   - Arquitectura/AST → Parsers → Tests → GUI → Implementación
   - Cada sección prepara para la siguiente
   - No se puede "saltar" conceptos fundamentales

2. **Comprensión Antes de Implementación**:
   - Primero ENTENDER qué es un AST y cómo funciona
   - Luego VER cómo se construyen parsers
   - Después APLICAR con tests
   - Finalmente IMPLEMENTAR con confianza

3. **Aprendizaje Progresivo Estructurado**:
   - **Teoría → Ejemplo → Práctica → Verificación**
   - De simple a complejo (Literal → Command → Expression → Statement)
   - Cada parser usa conocimientos del anterior

4. **Autovalidación Continua**:
   - Checkboxes para seguimiento personal
   - Tests para verificar corrección
   - GUI para validación visual
   - Progreso medible y visible

5. **Recursos de Apoyo Integrados**:
   - Ejemplos completos de código
   - Debugging guides incorporados
   - Referencias a gramática BNF
   - Patrones de implementación claros

6. **Feedback Inmediato**:
   - Ejemplos ejecutables
   - Errores comunes explicados
   - Soluciones paso a paso
   - Verificación automática de progreso

### Flujo de Autoestudio Diseñado:
1. **Fase de Comprensión** (Secciones 1-2): Entender fundamentos
2. **Fase de Validación** (Sección 3): Aprender a verificar
3. **Fase de Herramientas** (Sección 4): Conocer recursos
4. **Fase de Implementación** (Sección 5): Trabajo práctico

### Experiencia Interactiva:
- **Checkboxes sin salto**: JavaScript previene scroll al top
- **Progreso visual**: Contador dinámico de parsers completados
- **Animaciones sutiles**: Feedback visual sin distraer
- **Responsive design**: Funciona en móvil y desktop
- **Accesibilidad**: Navegación por teclado, screen readers

### Recursos de Apoyo:
- **Gramática BNF visual**: Enlaces dinámicos a `robotlangbnf.html`
- **Acceso al código fuente**: Links directos a implementaciones
- **Guía de debugging**: Errores comunes y soluciones
- **Patrones de implementación**: Templates de código
- **Tiempo estimado por parser**: Planificación realista

## Instrucciones de Implementación

### Paso 1: Crear estructura base HTML5
- DOCTYPE, meta tags, semantic structure
- Navigation con smooth scroll
- Secciones principales con IDs

### Paso 2: Implementar CSS responsive
- Sistema de colores consistente
- Grid/flexbox layouts
- Mobile-first approach
- Print styles

### Paso 3: Agregar JavaScript interactivo
- Progress tracking
- Smooth navigation
- Checkbox management sin page jump
- Prism.js para syntax highlighting

### Paso 4: Contenido educativo
- Explanaciones pedagógicas claras
- Ejemplos de código progresivos
- Lista completa de 16 parsers
- Misiones de implementación

### Paso 5: Testing y optimización
- Validación HTML/CSS
- Testing responsive
- Performance optimization
- Accessibility review

## Resultado Esperado

### Un Sitio Web de Autoestudio Completo que:

#### **🎓 Funcionalidad Educativa**:
- **Guíe autónomamente** a estudiantes desde cero hasta implementación completa
- **Reemplace la necesidad de instructor** con explicaciones detalladas y progresivas
- **Provea estructura obligatoria** de las 5 secciones en orden secuencial
- **Incluya 16 parsers específicos** con ubicaciones exactas y gramáticas BNF
- **Mantenga engagement** con elementos interactivos y progreso visual

#### **🏗️ Estructura Técnica**:
- **Sección 1**: Fundamentos de AST con ejemplos completos
- **Sección 2**: Construcción de parsers paso a paso
- **Sección 3**: Testing para validación de implementaciones
- **Sección 4**: GUI para herramientas de desarrollo
- **Sección 5**: Lista detallada de tareas de implementación

#### **✨ Experiencia de Usuario**:
- **Navegación secuencial** que respete el flujo de aprendizaje
- **Checkboxes interactivos** sin page jumping para tracking de progreso
- **Ejemplos ejecutables** y debugging guides integrados
- **Responsive design** que funcione en móvil y desktop
- **Accesibilidad completa** para todos los estudiantes

#### **🎯 Objetivos de Aprendizaje**:
- **Comprensión profunda** de AST y su construcción
- **Dominio práctico** de implementación de parsers
- **Habilidades de testing** para validación de código
- **Uso de herramientas** GUI para desarrollo
- **Capacidad autónoma** de implementar compiladores

#### **📚 Calidad Académica**:
- **Rigor técnico universitario** con precisión en conceptos
- **Ejemplos de código funcional** y testeado
- **Referencias exactas** a ubicaciones de archivos
- **Documentación completa** de patrones y prácticas
- **Estándares profesionales** de desarrollo de software

### **El sitio debe funcionar como:**
- ✅ **Manual oficial** de la Universidad EAM
- ✅ **Guía de autoestudio** completa y autosuficiente  
- ✅ **Referencia técnica** para implementación
- ✅ **Herramienta de trabajo** durante desarrollo
- ✅ **Recurso de consulta** permanente

**Tono**: Profesional pero accesible, técnicamente preciso pero pedagógicamente claro, universitario pero moderno.

---

## ⚠️ RECORDATORIO CRÍTICO FINAL

### **INTEGRACIÓN OBLIGATORIA CON robotlangbnf.html**

**NO OLVIDES**: Cada mención de gramática, parser o nodo AST debe incluir:

1. **📝 Gramática BNF en texto** - Formato `<regla> ::= definición`
2. **🔗 Link visual** - Enlace directo a `robotlangbnf.html#anchor`
3. **🎯 Doble presentación** - Texto + imagen para máximo aprendizaje

**Ejemplos obligatorios en cada sección**:
- ✅ `NumberParser` → Mostrar `<number> ::= [0-9]+` + link a `robotlangbnf.html#number`
- ✅ `IfStatementParser` → Mostrar gramática completa + link visual
- ✅ `MovementCommandNode` → Gramática + diagrama visual

**Objetivo**: Que los estudiantes **siempre** vean tanto la definición formal como la representación visual de cada gramática para maximizar la comprensión.