# FlowScript Compiler Documentation - Status Report

**Fecha**: 2025-11-10
**Estado**: 🟡 EN PROGRESO (31% completado - 20/67 nodos)

---

## 📊 Resumen General

### Documentación Web Creada

✅ **Infraestructura completa**:
- `index.html` - Estructura HTML con navegación sidebar
- `styles.css` - Tema profesional dark mode
- `script.js` - Navegación y scroll highlighting
- `nodes-data.js` - Datos estructurados de nodos (1259 líneas)
- `render-nodes.js` - Motor de renderizado dinámico

### Sistema de Documentación

Cada nodo AST se documenta con:
1. **📖 Gramática**: Regla BNF que genera el nodo
2. **🌳 Estructura AST**: Campos y métodos del nodo
3. **⚙️ Análisis Sintáctico**: Cómo el parser construye el nodo
4. **🔍 Análisis Semántico**: Validaciones aplicadas
5. **⚙️ Generación de Código**: Cómo se traduce a Java
6. **💡 Ejemplos**: Código FlowScript → Java generado

---

## ✅ NODOS DOCUMENTADOS (20/67)

### Literales (7/7) ✅ COMPLETO
1. ✅ IntegerLiteral - Números enteros con soporte BigInteger
2. ✅ DecimalLiteral - Números decimales con BigDecimal
3. ✅ StringLiteral - Cadenas con escape sequences
4. ✅ BooleanLiteral - verdadero/falso
5. ✅ NullLiteral - nulo
6. ✅ ListLiteral - Listas inmutables `[1, 2, 3]`
7. ✅ ObjectLiteral - Objetos JSON-like `{key: value}`

### Expresiones Básicas (4/4) ✅ COMPLETO
8. ✅ Identifier - Referencias a variables/funciones
9. ✅ FunctionCall - Llamadas a funciones
10. ✅ PropertyAccess - Acceso a propiedades `obj.prop`
11. ✅ IndexAccess - Acceso por índice `list[0]`

### Expresiones Binarias (6/6) ✅ COMPLETO
12. ✅ AdditiveExpression - Suma y resta `a + b - c`
13. ✅ MultiplicativeExpression - Multiplicación, división, módulo
14. ✅ RelationalExpression - Comparaciones `<, >, <=, >=`
15. ✅ EqualityExpression - Igualdad `==, !=`
16. ✅ LogicalAndExpression - AND lógico `a y b`
17. ✅ LogicalOrExpression - OR lógico `a o b`

### Expresiones Especiales (3/3) ✅ COMPLETO
18. ✅ UnaryExpression - Operadores unarios `-, +, no`
19. ✅ TernaryExpression - Operador ternario `cond ? t : f`
20. ✅ PostfixExpression - Cadenas de operaciones

---

## 🟡 NODOS PENDIENTES (47/67)

### Operaciones Especiales (0/5) ⏳ EN PROGRESO
- ⏳ DbExecuteNode - `db.ejecutar(query, params)`
- ⏳ DbQueryNode - `db.consultar(query, params)`
- ⏳ HttpGetNode - `http.get(url, headers?)`
- ⏳ HttpPostNode - `http.post(url, body, headers?)`
- ⏳ HttpDeleteNode - `http.delete(url, headers?)`

### Control de Flujo (0/9) 🔴 PENDIENTE
- ❌ IfStatementNode - Condicionales `si/sino_si/sino`
- ❌ WhileStatementNode - Bucle while `mientras`
- ❌ ForStatementNode - Bucle for clásico
- ❌ ForRangeStatementNode - Bucle for-in `para x en lista`
- ❌ TryStatementNode - Manejo de errores `intentar/capturar`
- ❌ ReturnStatementNode - Retorno de función
- ❌ ThrowStatementNode - Lanzar excepción
- ❌ BreakStatementNode - Romper bucle
- ❌ ContinueStatementNode - Continuar bucle

### Statements Básicos (0/3) 🔴 PENDIENTE
- ❌ BlockNode - Bloque de código `{ }`
- ❌ ExpressionStatementNode - Expresión como statement
- ❌ VariableDeclarationStatementNode - Declaración de variable

### Declaraciones de Programa (0/4) 🔴 PENDIENTE
- ❌ ProgramNode - Raíz del AST
- ❌ FunctionDeclarationNode - Declaración de función
- ❌ VariableDeclarationNode - Declaración de variable global
- ❌ ImportDeclarationNode - Importación de módulos

### Tipos y Parámetros (0/3) 🔴 PENDIENTE
- ❌ ParameterNode - Parámetro de función
- ❌ ParameterListNode - Lista de parámetros
- ❌ TypeNode - Anotación de tipo

### Listas de Argumentos (0/3) 🔴 PENDIENTE
- ❌ ArgumentListNode - Lista de argumentos
- ❌ ExpressionListNode - Lista de expresiones
- ❌ ObjectMemberListNode - Lista de miembros de objeto
- ❌ ObjectMemberNode - Miembro individual de objeto

### Procesos BPMN (0/7) 🔴 PENDIENTE
- ❌ ProcessDeclarationNode - `proceso NombreProceso { }`
- ❌ StartElementNode - Evento de inicio
- ❌ EndElementNode - Evento de fin
- ❌ TaskElementNode - Tarea BPMN
- ❌ ExclusiveGatewayNode - Gateway exclusivo (decisión)
- ❌ ParallelGatewayNode - Gateway paralelo (fork/join)
- ❌ GotoStatementNode - Navegación entre elementos

### Cláusulas de Control BPMN (0/4) 🔴 PENDIENTE
- ❌ WhenClauseNode - Condición en gateway exclusivo
- ❌ ElseClauseNode - Rama else en gateway
- ❌ ParallelBranchNode - Rama paralela
- ❌ JoinClauseNode - Unión de ramas paralelas

### Literales Primarios (0/1) 🔴 PENDIENTE
- ❌ PrimaryExpressionNode - Expresión primaria con paréntesis

---

## 📈 Progreso por Categoría

| Categoría | Completado | Total | Porcentaje |
|-----------|------------|-------|------------|
| Literales | 7 | 7 | **100%** ✅ |
| Expresiones Básicas | 4 | 4 | **100%** ✅ |
| Expresiones Binarias | 6 | 6 | **100%** ✅ |
| Expresiones Especiales | 3 | 3 | **100%** ✅ |
| Operaciones Especiales | 0 | 5 | **0%** ⏳ |
| Control de Flujo | 0 | 9 | **0%** 🔴 |
| Statements Básicos | 0 | 3 | **0%** 🔴 |
| Declaraciones | 0 | 4 | **0%** 🔴 |
| Tipos y Parámetros | 0 | 3 | **0%** 🔴 |
| Listas | 0 | 4 | **0%** 🔴 |
| Procesos BPMN | 0 | 11 | **0%** 🔴 |
| **TOTAL** | **20** | **67** | **30%** |

---

## 🎯 Siguiente Fase

### Prioridad 1: Operaciones Especiales (5 nodos)
Documentar los nodos de operaciones especiales DB/HTTP que usan lambda IIFE:
- Inline JDBC code generation
- Inline HTTP client code generation
- Error handling patterns

### Prioridad 2: Control de Flujo (9 nodos)
Documentar estructuras de control fundamentales:
- If/Else statements
- While/For loops
- Try/Catch exception handling
- Return/Throw/Break/Continue

### Prioridad 3: Declaraciones (7 nodos)
Documentar la estructura de programa:
- Program root node
- Function declarations
- Variable declarations
- Parameter lists

### Prioridad 4: Procesos BPMN (11 nodos)
Documentar la característica única de FlowScript:
- Process declarations
- BPMN elements (Start, Task, End)
- Gateways (Exclusive, Parallel)
- Flow control (Goto, When, Join)

---

## 📝 Formato de Documentación

Cada nodo sigue esta estructura en `nodes-data.js`:

```javascript
"node-id": {
    title: "NodeName",
    category: "Categoría",
    grammar: `Regla BNF`,
    astStructure: [
        { name: "field", type: "Type", description: "Descripción" }
    ],
    astMethods: [
        { name: "method()", returns: "Type", description: "Qué hace" }
    ],
    parsing: `Explicación del proceso de parsing`,
    semantic: `Validaciones semánticas aplicadas`,
    codegen: `Estrategia de generación de código`,
    examples: [
        {
            flowscript: "código FlowScript",
            java: "código Java generado",
            explanation: "Explicación del ejemplo"
        }
    ]
}
```

---

## 🔧 Implementación Técnica

### Archivos del Sistema

1. **index.html** (260 líneas)
   - Estructura principal con sidebar navigation
   - Secciones organizadas por categoría
   - Placeholder `<div id="nodes-content"></div>` para contenido dinámico

2. **styles.css** (618 líneas)
   - Dark theme professional (#0f172a background)
   - Syntax highlighting para código
   - Layout responsive (sidebar + content)
   - Componentes: node-section, ast-structure, code-comparison

3. **script.js** (66 líneas)
   - Smooth scrolling para navegación
   - Active section highlighting on scroll
   - Mobile menu toggle

4. **nodes-data.js** (1259 líneas actualmente)
   - Estructura de datos JSON con toda la información
   - 20 nodos completamente documentados
   - Exporta `window.nodesData` para uso global

5. **render-nodes.js** (~150 líneas)
   - Motor de renderizado que lee `window.nodesData`
   - Genera HTML dinámicamente para cada nodo
   - Formatea markdown simple (bold, code, listas)
   - Maneja code blocks con syntax highlighting

### Flujo de Renderizado

```
1. Usuario abre index.html
2. Browser carga scripts en orden:
   - script.js (navegación)
   - nodes-data.js (datos)
   - render-nodes.js (renderizado)
3. render-nodes.js ejecuta al cargar:
   - Lee window.nodesData
   - Para cada nodo:
     - Crea <section class="node-section">
     - Genera subsecciones (gramática, AST, etc.)
     - Inserta en #nodes-content
4. script.js activa navegación interactiva
5. Usuario navega y ve documentación completa
```

---

## 🎨 Características de la UI

### Sidebar Navigation
- Navegación fija a la izquierda
- Secciones agrupadas por categoría
- Links activos destacados
- Scroll independiente

### Content Area
- Máximo 1200px de ancho
- Padding generoso para legibilidad
- Código con fondo oscuro (#1e1e1e)
- Ejemplos side-by-side (FlowScript | Java)

### Componentes Visuales
- **node-section**: Cada nodo en su propia sección con borde
- **ast-structure**: Tabla de campos con tipos coloreados
- **grammar-rule**: Reglas BNF en fuente monospace
- **code-comparison**: Grid 2 columnas para ejemplos
- **info-box**: Cajas destacadas para notas importantes

---

## 🚀 Próximos Pasos

### Inmediato
1. ✅ Completar operaciones especiales (DB/HTTP)
2. ✅ Documentar control de flujo
3. ✅ Documentar declaraciones
4. ✅ Documentar procesos BPMN

### Mejoras Futuras
- 🔮 Agregar búsqueda en tiempo real
- 🔮 Agregar copy-to-clipboard para ejemplos
- 🔮 Agregar breadcrumbs de navegación
- 🔮 Agregar modo claro/oscuro toggle
- 🔮 Agregar exportación a PDF

---

## 📚 Referencias

- Código fuente: `/Users/caferrerb/IdeaProjects/flowscript/`
- Documentación: `/Users/caferrerb/IdeaProjects/flowscript/docs/`
- AST Nodes: `src/main/java/com/flowscript/sintactic/ast/`
- Parsers: `src/main/java/com/flowscript/sintactic/parsers/`
- Code Generators: `src/main/java/com/flowscript/codegen/generators/`

---

**Última actualización**: 2025-11-10
**Estado**: Infraestructura completa, 30% de contenido documentado
**Próximo objetivo**: Completar las 5 operaciones especiales (DB/HTTP)
