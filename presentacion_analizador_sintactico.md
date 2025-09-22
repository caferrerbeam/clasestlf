# 📘 Presentación: Analizador Sintáctico - De Tokens a Árboles

## Página 1: Portada
- Título: *"Analizador Sintáctico: De Tokens a Árboles de Sintaxis"*
- Curso: Compiladores y Teoría de Lenguajes
- Nombre del expositor y fecha

---

## Página 2: Arquitectura del Analizador Sintáctico

**¿Cómo se organiza todo el sistema?**

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPILADOR COMPLETO                      │
├─────────────────────────────────────────────────────────────┤
│  Código fuente: "if (x > 0) y = x + 1;"                    │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         📝 ANALIZADOR LÉXICO                        │    │
│  │  ┌─────────────┐    ┌─────────────┐                │    │
│  │  │   Scanner   │    │ Token Table │                │    │
│  │  │  (caracteres│→   │(IF, ID, NUM,│                │    │
│  │  │   → tokens) │    │ +, =, etc.) │                │    │
│  │  └─────────────┘    └─────────────┘                │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ↓                                │
│         [IF, (, ID, >, NUM, ), ID, =, ID, +, NUM, ;]       │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         🌳 ANALIZADOR SINTÁCTICO (Top-Down)         │    │
│  │  ┌─────────────┐    ┌─────────────┐                │    │
│  │  │   Parser    │    │  Grammar    │                │    │
│  │  │ (tokens →   │←   │ (reglas BNF)│                │    │
│  │  │    AST)     │    │             │                │    │
│  │  └─────────────┘    └─────────────┘                │    │
│  │  ┌─────────────┐    ┌─────────────┐                │    │
│  │  │ TokenStream │    │ErrorHandler │                │    │
│  │  │(navegación) │    │(recuperación│                │    │
│  │  │             │    │ de errores) │                │    │
│  │  └─────────────┘    └─────────────┘                │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ↓                                │
│                         AST Tree                            │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         🧠 ANALIZADOR SEMÁNTICO                     │    │
│  │         (tipos, scopes, etc.)                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         ⚙️ GENERADOR DE CÓDIGO                      │    │
│  │         (AST → código máquina)                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### **Componentes del Analizador Sintáctico:**

**🎯 Parser (núcleo):** Implementa el algoritmo Top-Down, toma decisiones sobre qué reglas aplicar
**📖 Grammar:** Contiene las reglas BNF del lenguaje
**🚀 TokenStream:** Maneja la navegación por los tokens (current(), advance(), peek())
**🚨 ErrorHandler:** Detecta errores sintácticos y genera mensajes descriptivos

---

## Página 3: ¿Qué hace el Analizador Sintáctico?
- El analizador sintáctico es la **segunda fase del compilador**
- **Input**: secuencia de tokens del analizador léxico  
- **Output**: árbol de sintaxis (AST) que representa la estructura del programa
- **Objetivo**: verificar que el código sigue las reglas gramaticales del lenguaje

**Ejemplo:**
```c
if (x == 5) {
    y = 10;
}
```

**Tokens:** `IF ( ID == NUM ) { ID = NUM ; }`

**Los tokens son como palabras sueltas** - necesitamos entender cómo se relacionan para formar la estructura del programa.

---

## Página 4: ¿Por qué necesitamos un ÁRBOL?

**Piensa en esta oración:** "El gato grande come pescado"

**Como lista de palabras:** `[El, gato, grande, come, pescado]`
- ¿"grande" describe a "gato" o a "come"?
- ¿Cuál es el sujeto? ¿Cuál es el objeto?

**Como árbol:**
```
        Oración
       /        \
   Sujeto      Predicado
   /    \        /      \
  El   gato   come    pescado
       |
     grande
```

**Ahora está claro:**
- "grande" modifica a "gato"
- Sujeto: "El gato grande"
- Predicado: "come pescado"

**Lo mismo pasa con código:** `x + y * z`
- ¿Es `(x + y) * z` o `x + (y * z)`?
- La lista de tokens no nos dice: `[x, +, y, *, z]`
- El árbol sí nos dice la precedencia y agrupación

---

## Página 5: ¿Cómo Definimos las Reglas del Lenguaje?
- Necesitamos **reglas formales** que definan qué es válido
- Ejemplo informal: "Un if-statement tiene una condición entre paréntesis seguida de un bloque"
- Estas reglas se formalizan usando **Gramáticas Libres de Contexto**

**¿Qué es una gramática?**
- Es como las reglas gramaticales del español, pero para programación
- Define qué combinaciones de tokens son válidas
- Nos permite construir el árbol paso a paso

**Ejemplo de regla:**
`Statement → if ( Expression ) Block`
- Significa: "Un Statement puede ser la palabra 'if', seguida de '(', seguida de una Expression, seguida de ')', seguida de un Block"
- Como receta de cocina: ingredientes + orden = resultado válido

---

## Página 6: Gramáticas Libres de Contexto (CFG)
Una gramática es una tupla G = (V, T, P, S) donde:
- **V**: variables o no-terminales (Statement, Expression) - son como "categorías"
- **T**: terminales (tokens: IF, ID, NUM, +, etc.) - son las "palabras" reales
- **P**: producciones (reglas de reescritura) - son las "recetas"
- **S**: símbolo inicial - es donde empezamos a construir

**Pensemos en esto como construcción con LEGO:**
- **Terminales** = piezas básicas individuales (🔵🔴🟡)
- **No-terminales** = estructuras complejas (Casa, Torre, Carro)
- **Producciones** = instrucciones de cómo construir (Casa → Techo + Paredes + Puerta)

---

## Página 7: Ejemplo de Gramática Completa en BNF
```
Program    → Statement+
Statement  → IfStmt | Assignment | Block
IfStmt     → if ( Expression ) Statement
Assignment → ID = Expression ;
Expression → ID | NUM | Expression + Expression
Block      → { Statement* }
```

**Interpretando estas reglas:**
- `Program → Statement+` = "Un programa es uno o más statements"
- `Statement → IfStmt | Assignment | Block` = "Un statement puede ser cualquiera de estas 3 cosas"
- `IfStmt → if ( Expression ) Statement` = "Un if-statement tiene esta estructura exacta"
- `Assignment → ID = Expression ;` = "Una asignación es: variable, igual, expresión, punto y coma"
- `Expression → ID | NUM | Expression + Expression` = "Una expresión puede ser variable, número, o suma de expresiones"

**Pregunta clave:** ¿Cómo convertimos estas reglas en código que funcione?

---

## Página 8: Enfoques para Implementar el Parser

**Existen dos estrategias principales:**

### **🔻 Top-Down (Descendente) - NUESTRO ENFOQUE**
- **Estrategia:** Una función por cada no-terminal
- `Expression` → función `parseExpression()`
- Cada alternativa `|` → condicional `if/switch`
- **Analogía:** Como seguir una receta paso a paso
- **Ventaja:** Fácil de entender y implementar
- **Desventaja:** Requiere transformar la gramática para manejar recursión izquierda

### **🔺 Bottom-Up (Ascendente) - SOLO MENCIÓN**
- **Estrategia:** Usar stack y tabla de acciones para "reducir" tokens
- **Analogía:** Como armar un rompecabezas - juntar piezas hasta formar la imagen completa  
- **Ventaja:** Más poderoso, maneja cualquier gramática
- **Desventaja:** Más complejo de entender e implementar

**En esta presentación nos enfocaremos en Top-Down** porque es más didáctico y directo para aprender los conceptos fundamentales.

---

## Página 9: Jerarquía Completa de Nodos AST

**Necesitamos clases para TODAS las construcciones del lenguaje:**

```java
// ===== CLASE BASE =====
abstract class ASTNode {
    protected int lineNumber;    // Para reportar errores específicos
    protected int columnNumber;  // "Error en línea 5, columna 10"
}

// ===== EXPRESIONES =====
abstract class ExpressionNode extends ASTNode { }

class IdentifierNode extends ExpressionNode {
    String name;  // "x", "variable", "contador"
}

class NumberNode extends ExpressionNode {
    double value;  // 5, 3.14, -10
}

class BinaryOpNode extends ExpressionNode {
    ExpressionNode left;   // lado izquierdo
    TokenType operator;    // +, -, *, /, ==, !=, etc.
    ExpressionNode right;  // lado derecho
}

// ===== STATEMENTS =====
abstract class StatementNode extends ASTNode { }

class IfStatementNode extends StatementNode {
    ExpressionNode condition;      // la condición del if
    StatementNode thenBranch;      // qué hacer si es true
    StatementNode elseBranch;      // qué hacer si es false (puede ser null)
}

class AssignmentNode extends StatementNode {
    String variableName;           // variable a asignar
    ExpressionNode value;          // valor a asignar
}

class BlockNode extends StatementNode {
    List<StatementNode> statements; // lista de statements dentro del bloque
}

class WhileStatementNode extends StatementNode {
    ExpressionNode condition;      // condición del while
    StatementNode body;            // cuerpo del loop
}

// ===== PROGRAMA COMPLETO =====
class ProgramNode extends ASTNode {
    List<StatementNode> statements; // todo el programa
}
```

**¿Por qué separamos Expressions de Statements?**
- **Expressions** producen valores: `x + 5`, `y == 10`
- **Statements** ejecutan acciones: `if`, `while`, `x = 5`
- Esta separación mantiene el código organizado y type-safe

---

## Página 10: Integración de Nodos - Ejemplo Completo

**Código de ejemplo:**
```c
if (x > 0) {
    y = x + 1;
    z = y * 2;
}
```

**AST resultante integrado:**
```java
ProgramNode(
  statements = [
    IfStatementNode(
      condition = BinaryOpNode(
        left = IdentifierNode("x"),
        operator = GREATER_THAN,
        right = NumberNode(0)
      ),
      thenBranch = BlockNode(
        statements = [
          AssignmentNode(
            variableName = "y",
            value = BinaryOpNode(
              left = IdentifierNode("x"),
              operator = PLUS,
              right = NumberNode(1)
            )
          ),
          AssignmentNode(
            variableName = "z",
            value = BinaryOpNode(
              left = IdentifierNode("y"),
              operator = MULTIPLY,
              right = NumberNode(2)
            )
          )
        ]
      ),
      elseBranch = null
    )
  ]
)
```

**Observa cómo:**
- **Expressions se anidan en Statements:** `BinaryOpNode` dentro de `IfStatementNode`
- **Statements se agrupan en Blocks:** `AssignmentNode` dentro de `BlockNode`  
- **Todo se organiza jerárquicamente:** desde `ProgramNode` hasta `NumberNode`
- **Los tipos se respetan:** expressions donde se necesitan valores, statements donde se necesitan acciones

---

## Página 11: BNF → Top-Down: Transformación Directa

**Regla BNF:**
```
Expression → ID | NUM | Expression + Expression
```

**Transformación ingenua a código:**
```java
private ExpressionNode parseExpression() {
    // Expression → ID
    if (currentToken.type == ID) {
        String name = currentToken.value;
        advance();
        return new IdentifierNode(name);
    }
    // Expression → NUM  
    else if (currentToken.type == NUM) {
        double value = Double.parseDouble(currentToken.value);
        advance();
        return new NumberNode(value);
    }
    // Expression → Expression + Expression
    // PROBLEMA: esto causa recursión infinita!
    else if (currentToken.type == ???) {  // ¿Cómo sabemos cuándo aplicar esta regla?
        ExpressionNode left = parseExpression();  // ¡RECURSIÓN INFINITA!
        match(PLUS);
        ExpressionNode right = parseExpression();
        return new BinaryOpNode(left, PLUS, right);
    }
    else {
        throw new ParseException("Expected expression");
    }
}
```

**¡Houston, tenemos un problema! La recursión por la izquierda no funciona.**

---

## Página 11: ¿Por qué falla la Recursión por la Izquierda?

**Problema con:**
```
Expression → Expression + Expression | ID | NUM
```

**Veamos qué pasa cuando intentamos derivar "x + y" con Top-Down:**

### **Derivación problemática:**
```
Paso 1: Expression (símbolo inicial)
Paso 2: ¿Qué regla usar?
        - Expression → Expression + Expression
        - Expression → ID  
        - Expression → NUM

Miramos el primer token: "x" (es ID)
¿Esto nos ayuda a decidir entre Expression → Expression + Expression vs Expression → ID?

Si elegimos Expression → Expression + Expression:
Paso 3: Expression + Expression
         ↑
         Necesitamos expandir este Expression otra vez
         ¿Qué regla usar? ¡El mismo problema!
         
Si elegimos Expression → ID:
Paso 3: ID
         Pero perdimos el "+ y" que viene después
```

**Simulemos en código parseExpression() con input "x + y":**
```java
parseExpression() {
    // currentToken = "x" (ID)
    
    // ¿Cuál regla elegir?
    // Si elegimos Expression → Expression + Expression:
    ExpressionNode left = parseExpression(); // ¡Llamada recursiva inmediata!
        // Entramos de nuevo con currentToken = "x" (ID)
        // ¡Mismo estado, misma decisión!
        ExpressionNode left = parseExpression(); // ¡Otra vez!
            // currentToken = "x" (ID) - ¡infinito!
            ExpressionNode left = parseExpression();
                // ... Stack overflow!
```

**El problema fundamental:** 
1. No consumimos ningún token antes de la recursión
2. Llegamos al mismo estado infinitamente
3. Nunca progresamos en el input

**Necesitamos leer tokens ANTES de llamarnos recursivamente.**

---

## Página 12: Algoritmo de Eliminación de Recursión Izquierda

**Regla general para transformar:**
```
A → A α | β
```
**Se convierte en:**
```
A → β A'
A' → α A' | ε
```

**Aplicando a nuestro caso:**
```
Expression → Expression + Expression | ID | NUM
```

**Paso 1: Identificar las partes**
- A = Expression
- α = + Expression (la parte recursiva)
- β = ID | NUM (las alternativas no recursivas)

**Paso 2: Aplicar la transformación**
```
Expression → ID Expression' | NUM Expression'
Expression' → + Expression Expression' | ε
```

**Resultado:** Ahora siempre comenzamos leyendo un token (ID o NUM) antes de la recursión.

---

## Página 13: Solución - Derivación Correcta

**Gramática transformada:**
```
Expression → ID Expression' | NUM Expression'
Expression' → + Expression Expression' | ε
```

**Ahora derivemos "x + y" con la gramática corregida:**

### **Derivación que SÍ funciona:**
```
Paso 1: Expression (símbolo inicial)
Paso 2: ¿Qué regla usar?
        - Expression → ID Expression'
        - Expression → NUM Expression'
        
Miramos el primer token: "x" (es ID)
¡Perfecto! Elegimos Expression → ID Expression'

Paso 3: ID Expression'
         ↓   ↓
        "x"  ¿Qué sigue?

Paso 4: Expandir Expression'
        Input restante: [+, y]
        Miramos "+": Expression' → + Expression Expression'
        
Paso 5: ID + Expression Expression'
         ↓  ↓      ↓         ↓
        "x" "+"   ¿Qué?   ¿Qué?
        
Paso 6: Expandir Expression (miramos "y"):
        Expression → ID Expression'
        
Paso 7: ID + ID Expression' Expression'
         ↓  ↓  ↓      ↓         ↓
        "x" "+" "y"   ¿Qué?   ¿Qué?
        
Paso 8: No hay más tokens → Expression' → ε
        
Resultado final: "x + y" ✓
```

**¿Por qué funciona ahora?**
1. **Siempre consumimos un token primero** (ID o NUM)
2. **Progresamos en el input** antes de cualquier recursión
3. **No hay estados idénticos infinitos**

---

## Página 14: Implementación Paso a Paso

**Implementación:**
```java
// Expression → ID Expression' | NUM Expression'
private ExpressionNode parseExpression() {
    ExpressionNode left;
    
    if (currentToken.type == ID) {
        left = new IdentifierNode(currentToken.value);
        advance(); // ¡CLAVE! Progresamos antes de recursión
    } else if (currentToken.type == NUM) {
        left = new NumberNode(Double.parseDouble(currentToken.value));
        advance(); // ¡CLAVE! Progresamos antes de recursión
    } else {
        throw new ParseException("Expected ID or NUM");
    }
    
    // Llamar Expression' con el nodo izquierdo ya construido
    return parseExpressionPrime(left);
}

// Expression' → + Expression Expression' | ε
private ExpressionNode parseExpressionPrime(ExpressionNode left) {
    if (currentToken.type == PLUS) {
        advance(); // consume '+', progresamos
        ExpressionNode right = parseExpression(); // recursión SEGURA
        ExpressionNode combined = new BinaryOpNode(left, PLUS, right);
        return parseExpressionPrime(combined); // continuar con más operadores
    }
    // Expression' → ε (caso base: no hay más operadores)
    return left;
}
```

**Simulación con "x + y + z":**
```
parseExpression():
  Token actual: "x"
  - Consume "x", crea IdentifierNode("x")
  - Token actual ahora: "+"
  - llama parseExpressionPrime(IdentifierNode("x"))
    
    parseExpressionPrime(IdentifierNode("x")):
    Token actual: "+"
    - Consume "+", Token actual ahora: "y"
    - llama parseExpression()
      
      parseExpression():
      Token actual: "y"
      - Consume "y", crea IdentifierNode("y")
      - Token actual ahora: "+"
      - llama parseExpressionPrime(IdentifierNode("y"))
        
        parseExpressionPrime(IdentifierNode("y")):
        Token actual: "+"
        - Consume "+", Token actual ahora: "z"
        - llama parseExpression()
          
          parseExpression():
          Token actual: "z"
          - Consume "z", crea IdentifierNode("z")
          - Token actual ahora: EOF
          - llama parseExpressionPrime(IdentifierNode("z"))
            
            parseExpressionPrime(IdentifierNode("z")):
            Token actual: EOF
            - No hay "+", retorna IdentifierNode("z")
            
        - crea BinaryOpNode(IdentifierNode("y"), +, IdentifierNode("z"))
        - llama parseExpressionPrime(ese BinaryOpNode)
          - No hay más "+", retorna el BinaryOpNode
    
    - crea BinaryOpNode(IdentifierNode("x"), +, BinaryOpNode(...))
    - llama parseExpressionPrime(ese BinaryOpNode final)
      - No hay más "+", retorna el BinaryOpNode final

Resultado: BinaryOpNode(IdentifierNode("x"), +, BinaryOpNode(IdentifierNode("y"), +, IdentifierNode("z")))
```

**¡Clave del éxito:** Cada llamada recursiva ocurre con un token diferente, garantizando progreso.**

---

## Página 15: Arquitectura del Analizador Sintáctico

**¿Cómo se organiza todo el sistema?**

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPILADOR COMPLETO                      │
├─────────────────────────────────────────────────────────────┤
│  Código fuente: "if (x > 0) y = x + 1;"                    │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         📝 ANALIZADOR LÉXICO                        │    │
│  │  ┌─────────────┐    ┌─────────────┐                │    │
│  │  │   Scanner   │    │ Token Table │                │    │
│  │  │  (caracteres│→   │(IF, ID, NUM,│                │    │
│  │  │   → tokens) │    │ +, =, etc.) │                │    │
│  │  └─────────────┘    └─────────────┘                │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ↓                                │
│         [IF, (, ID, >, NUM, ), ID, =, ID, +, NUM, ;]       │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         🌳 ANALIZADOR SINTÁCTICO                    │    │
│  │  ┌─────────────┐    ┌─────────────┐                │    │
│  │  │   Parser    │    │  Grammar    │                │    │
│  │  │ (tokens →   │←   │ (reglas BNF)│                │    │
│  │  │    AST)     │    │             │                │    │
│  │  └─────────────┘    └─────────────┘                │    │
│  │  ┌─────────────┐    ┌─────────────┐                │    │
│  │  │ TokenStream │    │ErrorHandler │                │    │
│  │  │(navegación) │    │(recuperación│                │    │
│  │  │             │    │ de errores) │                │    │
│  │  └─────────────┘    └─────────────┘                │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ↓                                │
│                         AST Tree                            │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         🧠 ANALIZADOR SEMÁNTICO                     │    │
│  │         (tipos, scopes, etc.)                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                            ↓                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         ⚙️ GENERADOR DE CÓDIGO                      │    │
│  │         (AST → código máquina)                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### **Componentes del Analizador Sintáctico:**

**🎯 Parser (núcleo):**
- Implementa el algoritmo (Top-Down o Bottom-Up)
- Toma decisiones sobre qué reglas aplicar
- Construye el AST paso a paso

**📖 Grammar:**
- Contiene las reglas BNF del lenguaje
- Define qué construcciones son válidas
- Se consulta para saber qué hacer en cada paso

**🚀 TokenStream:**
- Maneja la navegación por los tokens
- Operaciones: current(), advance(), peek()
- Mantiene posición actual en el input

**🚨 ErrorHandler:**
- Detecta errores sintácticos
- Genera mensajes descriptivos
- Implementa estrategias de recuperación

---

## Página 16: BNF → Top-Down: Ejemplo Completo con Statements

**BNF para Statements (sin recursión izquierda):**
```
Statement → IfStmt | Assignment
IfStmt → if ( Expression ) Statement
Assignment → ID = Expression ;
```

**Primero definamos los nodos AST para statements:**
```java
abstract class StatementNode extends ASTNode { }

class IfStatementNode extends StatementNode {
    ExpressionNode condition;
    StatementNode thenBranch;
    
    public IfStatementNode(ExpressionNode condition, StatementNode thenBranch) {
        this.condition = condition;
        this.thenBranch = thenBranch;
    }
}

class AssignmentNode extends StatementNode {
    String variableName;
    ExpressionNode value;
    
    public AssignmentNode(String variableName, ExpressionNode value) {
        this.variableName = variableName;
        this.value = value;
    }
}
```

**Implementación directa (no hay recursión izquierda aquí):**
```java
// Statement → IfStmt | Assignment
private StatementNode parseStatement() {
    if (currentToken.type == IF) {
        return parseIfStmt();
    } else if (currentToken.type == ID) {
        return parseAssignment();
    } else {
        throw new ParseException("Expected 'if' or identifier");
    }
}

// IfStmt → if ( Expression ) Statement
private StatementNode parseIfStmt() {
    match(IF);          // consume 'if'
    match(LPAREN);      // consume '('
    ExpressionNode condition = parseExpression();
    match(RPAREN);      // consume ')'
    StatementNode body = parseStatement();
    return new IfStatementNode(condition, body);
}

// Assignment → ID = Expression ;
private StatementNode parseAssignment() {
    String varName = currentToken.value;
    match(ID);          // consume variable name
    match(ASSIGN);      // consume '='
    ExpressionNode value = parseExpression();
    match(SEMICOLON);   // consume ';'
    return new AssignmentNode(varName, value);
}
```

---

## Página 17: Implementación del Parser Completo

**Ahora implementemos un parser completo que maneje todos los tipos de nodos:**

```java
class RecursiveDescentParser {
    private TokenStream tokens;
    private ErrorHandler errorHandler;
    
    // Program → Statement+
    public ProgramNode parseProgram() {
        List<StatementNode> statements = new ArrayList<>();
        while (!tokens.isAtEnd()) {
            statements.add(parseStatement());
        }
        return new ProgramNode(statements);
    }
    
    // Statement → IfStmt | Assignment | Block | WhileStmt
    private StatementNode parseStatement() {
        switch (tokens.current().type) {
            case IF:
                return parseIfStatement();
            case WHILE:
                return parseWhileStatement();
            case LBRACE:
                return parseBlock();
            case ID:
                return parseAssignment();
            default:
                throw new ParseException("Expected statement, found: " + tokens.current().type);
        }
    }
    
    // IfStmt → if ( Expression ) Statement (else Statement)?
    private IfStatementNode parseIfStatement() {
        match(IF);
        match(LPAREN);
        ExpressionNode condition = parseExpression();
        match(RPAREN);
        StatementNode thenBranch = parseStatement();
        
        StatementNode elseBranch = null;
        if (tokens.match(ELSE)) {
            elseBranch = parseStatement();
        }
        
        return new IfStatementNode(condition, thenBranch, elseBranch);
    }
    
    // Assignment → ID = Expression ;
    private AssignmentNode parseAssignment() {
        String varName = tokens.current().value;
        match(ID);
        match(ASSIGN);
        ExpressionNode value = parseExpression();
        match(SEMICOLON);
        return new AssignmentNode(varName, value);
    }
    
    // Block → { Statement* }
    private BlockNode parseBlock() {
        match(LBRACE);
        List<StatementNode> statements = new ArrayList<>();
        while (!tokens.check(RBRACE) && !tokens.isAtEnd()) {
            statements.add(parseStatement());
        }
        match(RBRACE);
        return new BlockNode(statements);
    }
}
```

---

## Página 18: Manejo de Errores y Testing

**El parser debe manejar código inválido graciosamente:**

```java
class ErrorHandler {
    public void handleError(String message, Token token) {
        System.err.println("Error sintáctico en línea " + token.line + 
                          ", columna " + token.column + ": " + message);
    }
    
    // Panic mode: buscar punto de sincronización
    public void synchronize(TokenStream tokens) {
        while (!tokens.isAtEnd()) {
            if (tokens.current().type == SEMICOLON || 
                tokens.current().type == IF || 
                tokens.current().type == WHILE) {
                break; // Encontramos un buen punto para reanudar
            }
            tokens.advance();
        }
    }
}

// Testing del parser
@Test
public void testValidIfStatement() {
    String code = "if (x > 0) y = 1;";
    List<Token> tokens = lexer.tokenize(code);
    
    RecursiveDescentParser parser = new RecursiveDescentParser();
    ProgramNode ast = parser.parse(tokens);
    
    // Verificar estructura del AST
    assertTrue(ast.statements.get(0) instanceof IfStatementNode);
    IfStatementNode ifNode = (IfStatementNode) ast.statements.get(0);
    assertTrue(ifNode.condition instanceof BinaryOpNode);
    assertTrue(ifNode.thenBranch instanceof AssignmentNode);
}

@Test
public void testSyntaxError() {
    String code = "if x > 0 y = 1;"; // Error: falta '(' y ')'
    
    assertThrows(ParseException.class, () -> {
        parser.parse(lexer.tokenize(code));
    });
}
```

---

## Página 19: Integración con el Compilador

```java
public class Compiler {
    public void compile(String sourceCode) {
        try {
            // Fase 1: Análisis Léxico
            LexicalAnalyzer lexer = new LexicalAnalyzer();
            List<Token> tokens = lexer.tokenize(sourceCode);
            System.out.println("✓ Análisis léxico completado: " + tokens.size() + " tokens");
            
            // Fase 2: Análisis Sintáctico  
            RecursiveDescentParser parser = new RecursiveDescentParser();
            ProgramNode ast = parser.parse(tokens);
            System.out.println("✓ Análisis sintáctico completado: AST construido");
            
            // Fase 3: Análisis Semántico (próxima clase)
            SemanticAnalyzer semantic = new SemanticAnalyzer();
            semantic.analyze(ast);
            System.out.println("✓ Análisis semántico completado");
            
            // Fase 4: Generación de Código
            CodeGenerator generator = new CodeGenerator();
            String output = generator.generate(ast);
            System.out.println("✓ Código generado exitosamente");
            
        } catch (LexicalException e) {
            System.err.println("❌ Error léxico: " + e.getMessage());
        } catch (ParseException e) {
            System.err.println("❌ Error sintáctico: " + e.getMessage());
        } catch (SemanticException e) {
            System.err.println("❌ Error semántico: " + e.getMessage());
        }
    }
}
```

---

## Página 20: Resumen y Conclusiones

### **🎯 Lo que hemos aprendido:**

1. **Arquitectura:** El analizador sintáctico es el corazón del compilador, transformando tokens en AST
2. **Jerarquía AST:** Separación clara entre Expressions (valores) y Statements (acciones)
3. **Top-Down parsing:** Enfoque intuitivo que mapea directamente BNF a funciones
4. **Recursión izquierda:** Principal desafío de Top-Down y cómo resolverlo
5. **Integración:** Cómo todos los tipos de nodos trabajan juntos para representar programas completos

### **🛠️ Habilidades desarrolladas:**
- Transformar gramáticas BNF a código funcional
- Diseñar jerarquías de clases para AST
- Implementar algoritmos de parsing recursivo descendente
- Manejar errores sintácticos graciosamente
- Integrar el parser en un compilador completo

### **🚀 Próximos pasos:**
- **Análisis Semántico:** Verificar tipos, scopes, declaraciones
- **Optimización:** Mejorar el AST para generar código más eficiente  
- **Generación de Código:** Transformar AST a código ejecutable

### **💡 Recuerda:**
- Top-Down es intuitivo y educativo, perfecto para aprender
- La separación Expression/Statement mantiene el código organizado
- Un buen manejo de errores es crucial para la experiencia del usuario
- El AST es la representación central que conecta todas las fases del compilador