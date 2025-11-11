// FlowScript Compiler Node Documentation - EDUCATIONAL VERSION
// Guía de implementación para estudiantes
// Esta documentación NO incluye código de solución (excepto db.* y http.*)
// Los estudiantes deben implementar el análisis semántico y generación de código

const nodesData = {
    // ========== LITERALES ==========
    "integer-literal": {
        title: "IntegerLiteral",
        category: "Literales",
        grammar: `IntegerLiteral = INTEGER_LITERAL

INTEGER_LITERAL = DIGIT+ ('_' DIGIT+)*
DIGIT = [0-9]`,
        astStructure: [
            { name: "rawValue", type: "String", description: "El valor tal como aparece en el código fuente (puede incluir guiones bajos)" },
            { name: "value", type: "BigInteger", description: "El valor numérico parseado (sin guiones bajos)" }
        ],
        astMethods: [
            { name: "fitsInInt()", returns: "boolean", description: "Verifica si el valor cabe en un int de 32 bits" },
            { name: "fitsInLong()", returns: "boolean", description: "Verifica si el valor cabe en un long de 64 bits" }
        ],
        parsing: `El parser IntegerLiteralParser reconoce tokens de tipo INTEGER_LITERAL.

**Proceso de parsing**:
1. Verifica que el token actual sea INTEGER_LITERAL
2. Extrae el valor del token (rawValue)
3. Limpia los guiones bajos: rawValue.replace("_", "")
4. Convierte a BigInteger para soportar números arbitrariamente grandes
5. Crea el nodo IntegerLiteralNode con el token

**Soporte de guiones bajos**:
FlowScript permite usar guiones bajos como separadores visuales:
- \`1_000_000\` → 1000000
- \`999_999_999\` → 999999999`,
        semantic: `**🎯 Objetivo**: Los literales enteros no requieren validación semántica.

**Validaciones a implementar**:
- ✅ Ninguna (los literales son siempre válidos después del parsing)

**Mapeo de tipos FlowScript → Java**:
- FlowScript: \`42\` → Java: \`BigInteger\` (por defecto)
- Optimización opcional: Si cabe en \`int\` → usar \`int\`
- Optimización opcional: Si cabe en \`long\` → usar \`long\`

**📁 Rutas en el código**:
- Nodo AST: \`src/main/java/com/flowscript/sintactic/ast/functions/literales/IntegerLiteralNode.java\`
- Analizador semántico: \`src/main/java/com/flowscript/semantic/SemanticAnalyzer.java\`
- Test semántico: \`src/test/java/com/flowscript/semantic/SemanticAnalyzerTest.java\`

**💡 Métodos útiles del nodo**:
- \`node.getValue()\` → Retorna BigInteger
- \`node.fitsInInt()\` → true si cabe en 32 bits
- \`node.fitsInLong()\` → true si cabe en 64 bits`,
        codegen: `**🎯 Objetivo**: Generar código Java que represente el literal entero.

**Código Java a generar**:
Convertir el BigInteger a su representación como String.

**Mapeo FlowScript → Java**:
\`\`\`
FlowScript: 42
Java: 42

FlowScript: 1_000_000
Java: 1000000  (sin guiones bajos)

FlowScript: 999999999999999999
Java: 999999999999999999  (BigInteger)
\`\`\`

**📁 Rutas en el código**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\`
- Método: \`generateIntegerLiteral(IntegerLiteralNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/CodeGeneratorTest.java\`

**🔧 Pistas de implementación**:
1. Obtener el valor del nodo
2. Convertirlo a String
3. Los guiones bajos ya fueron eliminados en parsing

**⚠️ Consideraciones**:
- No necesitas sufijos como \`L\` en Java
- Java infiere el tipo del contexto`,
        examples: [
            {
                flowscript: "42",
                java: "42",
                explanation: "Literal entero simple"
            },
            {
                flowscript: "1_000_000",
                java: "1000000",
                explanation: "Con guiones bajos (eliminados)"
            },
            {
                flowscript: "999999999999999999",
                java: "999999999999999999",
                explanation: "Número grande (BigInteger)"
            }
        ]
    },

    "decimal-literal": {
        title: "DecimalLiteral",
        category: "Literales",
        grammar: `DecimalLiteral = DECIMAL_LITERAL

DECIMAL_LITERAL = DIGIT+ '.' DIGIT+ ('_' DIGIT+)*
                | DIGIT+ 'e' [+-]? DIGIT+
                | DIGIT+ '.' DIGIT+ 'e' [+-]? DIGIT+`,
        astStructure: [
            { name: "rawValue", type: "String", description: "El valor tal como aparece en el código" },
            { name: "value", type: "BigDecimal", description: "El valor numérico con precisión arbitraria" }
        ],
        astMethods: [
            { name: "fitsInFloat()", returns: "boolean", description: "Verifica si cabe en float de 32 bits" },
            { name: "fitsInDouble()", returns: "boolean", description: "Verifica si cabe en double de 64 bits" }
        ],
        parsing: `El parser DecimalLiteralParser reconoce tokens DECIMAL_LITERAL.

**Proceso**:
1. Verifica token DECIMAL_LITERAL
2. Extrae valor y limpia guiones bajos
3. Convierte a BigDecimal para precisión exacta
4. Crea DecimalLiteralNode

**Formatos soportados**:
- Decimal: \`3.14\`, \`0.5\`
- Científica: \`1e6\`, \`2.5e-3\`
- Con guiones: \`1_000.5\``,
        semantic: `**🎯 Objetivo**: No requiere validación semántica.

**Validaciones**:
- ✅ Ninguna (validado en parsing)

**Mapeo FlowScript → Java**:
- FlowScript: \`3.14\` → Java: \`BigDecimal\`
- Optimización: Si cabe en \`double\` → usar \`double\`

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/literales/DecimalLiteralNode.java\`
- Semántico: \`src/main/java/com/flowscript/semantic/SemanticAnalyzer.java\`
- Test: \`src/test/java/com/flowscript/semantic/SemanticAnalyzerTest.java\``,
        codegen: `**🎯 Objetivo**: Generar representación decimal en Java.

**Código a generar**:
Convertir BigDecimal a String.

**Mapeo**:
\`\`\`
FlowScript: 3.14
Java: 3.14

FlowScript: 1e6
Java: 1000000.0 (o 1e6)

FlowScript: 0.000001
Java: 0.000001 (o 1e-6)
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\`
- Método: \`generateDecimalLiteral(DecimalLiteralNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/CodeGeneratorTest.java\`

**🔧 Pistas**:
1. Usar \`node.getValue().toString()\`
2. Mantener precisión del BigDecimal

**⚠️ Consideraciones**:
- No agregar sufijo \`f\` o \`d\`
- Notación científica es válida en Java`,
        examples: [
            {
                flowscript: "3.14",
                java: "3.14",
                explanation: "Decimal simple"
            },
            {
                flowscript: "1e6",
                java: "1000000",
                explanation: "Notación científica"
            },
            {
                flowscript: "0.5",
                java: "0.5",
                explanation: "Decimal menor que 1"
            }
        ]
    },

    "string-literal": {
        title: "StringLiteral",
        category: "Literales",
        grammar: `StringLiteral = STRING_LITERAL

STRING_LITERAL = '"' CHAR* '"'
CHAR = [^"\\] | ESCAPE_SEQUENCE
ESCAPE_SEQUENCE = '\\' [nrt"\\]`,
        astStructure: [
            { name: "rawValue", type: "String", description: "Contenido sin comillas externas" },
            { name: "value", type: "String", description: "Alias de rawValue" }
        ],
        astMethods: [],
        parsing: `El parser StringLiteralParser reconoce STRING_LITERAL.

**Proceso**:
1. Token STRING_LITERAL ya tiene contenido sin comillas
2. Secuencias de escape YA procesadas por el lexer
3. Crea StringLiteralNode con valor procesado

**Secuencias de escape**:
- \`\\\\n\` → Salto de línea
- \`\\\\r\` → Retorno de carro
- \`\\\\t\` → Tabulación
- \`\\\\"\` → Comilla doble
- \`\\\\\\\\\` → Barra invertida`,
        semantic: `**🎯 Objetivo**: No requiere validación.

**Validaciones**:
- ✅ Ninguna (lexer garantiza formato válido)

**Mapeo FlowScript → Java**:
- FlowScript: \`"Hola"\` → Java: \`String\`

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/literales/StringLiteralNode.java\`
- Semántico: \`src/main/java/com/flowscript/semantic/SemanticAnalyzer.java\`
- Test: \`src/test/java/com/flowscript/semantic/SemanticAnalyzerTest.java\``,
        codegen: `**🎯 Objetivo**: Generar String Java con escapes correctos.

**Código a generar**:
Cadena entre comillas con caracteres especiales RE-escapados.

**Mapeo**:
\`\`\`
FlowScript: "Hola Mundo"
Java: "Hola Mundo"

FlowScript: "Línea 1\\nLínea 2"
Java: "Línea 1\\n Línea 2"  (RE-escapar)

FlowScript: "El dijo \\"Hola\\""
Java: "El dijo \\"Hola\\""  (RE-escapar)
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\`
- Método: \`generateStringLiteral(StringLiteralNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/CodeGeneratorTest.java\`

**🔧 Pistas**:
1. El valor en AST tiene caracteres reales (\\n procesado)
2. Debes RE-escapar para Java:
   - \` \\\\ \` → \` \\\\\\\\ \`
   - \` " \` → \` \\\\" \`
   - Salto de línea real → \` \\\\n \`
3. Envolver resultado entre comillas

**⚠️ Importante**:
El valor ya tiene escapes procesados, DEBES re-escapar para código Java válido.`,
        examples: [
            {
                flowscript: '"Hola Mundo"',
                java: '"Hola Mundo"',
                explanation: "Cadena simple"
            },
            {
                flowscript: '"Línea 1\\nLínea 2"',
                java: '"Línea 1\\n Línea 2"',
                explanation: "Con salto de línea (re-escaped)"
            },
            {
                flowscript: '"El dijo \\"Hola\\""',
                java: '"El dijo \\"Hola\\""',
                explanation: "Comillas escapadas"
            }
        ]
    },

    "boolean-literal": {
        title: "BooleanLiteral",
        category: "Literales",
        grammar: `BooleanLiteral = 'verdadero' | 'falso'`,
        astStructure: [
            { name: "value", type: "boolean", description: "true o false" }
        ],
        astMethods: [],
        parsing: `Reconoce palabras clave \`verdadero\` y \`falso\`.`,
        semantic: `**🎯 Objetivo**: Sin validaciones.

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/literales/BooleanLiteralNode.java\``,
        codegen: `**🎯 Objetivo**: Generar \`true\` o \`false\` en Java.

**Mapeo**:
\`\`\`
FlowScript: verdadero → Java: true
FlowScript: falso → Java: false
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\`
- Método: \`generateBooleanLiteral(BooleanLiteralNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/CodeGeneratorTest.java\``,
        examples: [
            { flowscript: "verdadero", java: "true", explanation: "Booleano true" },
            { flowscript: "falso", java: "false", explanation: "Booleano false" }
        ]
    },

    "null-literal": {
        title: "NullLiteral",
        category: "Literales",
        grammar: `NullLiteral = 'nulo'`,
        astStructure: [],
        astMethods: [],
        parsing: `Reconoce palabra clave \`nulo\`.`,
        semantic: `**🎯 Objetivo**: Sin validaciones.

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/literales/NullLiteralNode.java\``,
        codegen: `**🎯 Objetivo**: Generar \`null\` en Java.

**Mapeo**:
\`\`\`
FlowScript: nulo → Java: null
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\`
- Método: \`generateNullLiteral(NullLiteralNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/CodeGeneratorTest.java\``,
        examples: [
            { flowscript: "nulo", java: "null", explanation: "Literal nulo" }
        ]
    },

    "list-literal": {
        title: "ListLiteral",
        category: "Literales",
        grammar: `ListLiteral = '[' ExpressionList? ']'
ExpressionList = Expression (',' Expression)*`,
        astStructure: [
            { name: "elements", type: "List<ExpressionNode>", description: "Elementos de la lista" },
            { name: "leftBracket", type: "Token", description: "Token '['" },
            { name: "rightBracket", type: "Token", description: "Token ']'" }
        ],
        astMethods: [
            { name: "isEmpty()", returns: "boolean", description: "Verifica si está vacía" },
            { name: "size()", returns: "int", description: "Número de elementos" }
        ],
        parsing: `Parsea \`[\` + expresiones separadas por comas + \`]\`.`,
        semantic: `**🎯 Objetivo**: Validar recursivamente cada elemento.

**Validaciones**:
1. Visitar cada expresión en \`node.getElements()\`
2. Cada elemento debe ser válido

**Mapeo FlowScript → Java**:
- FlowScript: \`[]\` → Java: \`List<Object>\` (lista vacía)
- FlowScript: \`[1, 2, 3]\` → Java: \`List<Integer>\`
- FlowScript: \`[1, "hola"]\` → Java: \`List<Object>\` (heterogénea)

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/literales/ListLiteralNode.java\`
- Semántico: \`src/main/java/com/flowscript/semantic/SemanticAnalyzer.java\`
- Test: \`src/test/java/com/flowscript/semantic/SemanticAnalyzerTest.java\``,
        codegen: `**🎯 Objetivo**: Generar \`List.of(...)\` inmutable.

**Código a generar**:
Usar \`List.of()\` de Java 9+ con elementos separados por comas.

**Mapeo**:
\`\`\`
FlowScript: []
Java: List.of()

FlowScript: [1, 2, 3]
Java: List.of(1, 2, 3)

FlowScript: [1, "hola", verdadero]
Java: List.of(1, "hola", true)
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\`
- Método: \`generateListLiteral(ListLiteralNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/CodeGeneratorTest.java\`

**🔧 Pistas**:
1. Si lista vacía → \`"List.of()"\`
2. Si tiene elementos:
   - Generar cada elemento recursivamente
   - Unir con \`, \`
   - Envolver en \`List.of(...)\`

**⚠️ Consideraciones**:
- \`List.of()\` crea listas INMUTABLES
- Soporta tipos heterogéneos → \`List<Object>\``,
        examples: [
            { flowscript: "[]", java: "List.of()", explanation: "Lista vacía" },
            { flowscript: "[1, 2, 3]", java: "List.of(1, 2, 3)", explanation: "Lista de enteros" },
            { flowscript: '[1, "hola"]', java: 'List.of(1, "hola")', explanation: "Lista heterogénea" }
        ]
    },

    "object-literal": {
        title: "ObjectLiteral",
        category: "Literales",
        grammar: `ObjectLiteral = '{' ObjectMemberList? '}'
ObjectMemberList = ObjectMember (',' ObjectMember)*
ObjectMember = IDENTIFIER ':' Expression`,
        astStructure: [
            { name: "members", type: "List<ObjectMemberNode>", description: "Lista de pares clave-valor" },
            { name: "leftBrace", type: "Token", description: "Token '{'" },
            { name: "rightBrace", type: "Token", description: "Token '}'" }
        ],
        astMethods: [
            { name: "isEmpty()", returns: "boolean", description: "Verifica si está vacío" },
            { name: "size()", returns: "int", description: "Número de propiedades" },
            { name: "hasKey(String)", returns: "boolean", description: "Verifica si existe una clave" }
        ],
        parsing: `Parsea \`{\` + pares clave:valor + \`}\`.`,
        semantic: `**🎯 Objetivo**: Validar no haya claves duplicadas.

**Validaciones**:
1. Detectar claves duplicadas:
   \`{nombre: "Juan", nombre: "Pedro"}\` → ERROR
2. Visitar recursivamente cada valor
3. Claves deben ser identificadores válidos

**Mapeo FlowScript → Java**:
- FlowScript: \`{}\` → Java: \`Map<String, Object>\`
- FlowScript: \`{nombre: "Juan"}\` → Java: \`HashMap<String, Object>\`

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/literales/ObjectLiteralNode.java\`
- Semántico: \`src/main/java/com/flowscript/semantic/SemanticAnalyzer.java\`
- Test: \`src/test/java/com/flowscript/semantic/SemanticAnalyzerTest.java\``,
        codegen: `**🎯 Objetivo**: Generar HashMap mutable con inicializador de bloque.

**Código a generar**:
Usar \`new HashMap<String, Object>() {{ put(...); }}\`

**Mapeo**:
\`\`\`
FlowScript: {}
Java: new HashMap<>()

FlowScript: {nombre: "Juan", edad: 30}
Java: new HashMap<String, Object>() {{
    put("nombre", "Juan");
    put("edad", 30);
}}
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\`
- Método: \`generateObjectLiteral(ObjectLiteralNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/CodeGeneratorTest.java\`

**🔧 Pistas**:
1. Si vacío → \`"new HashMap<>()"\`
2. Si tiene miembros:
   - StringBuilder con \`"new HashMap<String, Object>() {{ "\`
   - Para cada miembro: \`put("clave", valor);\`
   - Cerrar con \`"}}"

**⚠️ Por qué HashMap y no Map.of()**:
- Map.of() es inmutable
- Map.of() tiene límite de 10 pares
- HashMap permite modificación posterior`,
        examples: [
            { flowscript: "{}", java: "new HashMap<>()", explanation: "Objeto vacío" },
            { flowscript: '{nombre: "Juan"}', java: 'new HashMap<String, Object>() {{ put("nombre", "Juan"); }}', explanation: "Objeto simple" }
        ]
    },

    // ========== EXPRESIONES BÁSICAS ==========
    "identifier": {
        title: "Identifier",
        category: "Expresiones Básicas",
        grammar: `Identifier = IDENTIFIER
IDENTIFIER = [a-zA-Z_][a-zA-Z0-9_]*`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre del identificador" }
        ],
        astMethods: [],
        parsing: `Reconoce identificadores (nombres de variables, funciones).`,
        semantic: `**🎯 Objetivo**: Verificar que el identificador esté declarado.

**Validaciones**:
1. Buscar en tabla de símbolos
2. Si no existe → Error: "Variable no declarada"

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/expresiones/IdentifierNode.java\``,
        codegen: `**🎯 Objetivo**: Emitir el nombre del identificador.

**Mapeo**: \`usuario\` → \`usuario\` (mismo nombre en Java)

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\``,
        examples: [
            { flowscript: "usuario", java: "usuario", explanation: "Referencia a variable" }
        ]
    },

    "function-call": {
        title: "FunctionCall",
        category: "Expresiones Básicas",
        grammar: `FunctionCall = IDENTIFIER '(' ArgumentList? ')'
ArgumentList = Expression (',' Expression)*`,
        astStructure: [
            { name: "functionName", type: "String", description: "Nombre de la función" },
            { name: "arguments", type: "List<ExpressionNode>", description: "Lista de argumentos" }
        ],
        astMethods: [],
        parsing: `Parsea nombre + \`(\` + argumentos + \`)\`.`,
        semantic: `**🎯 Objetivo**: Verificar que la función existe y tipos coincidan.

**Validaciones**:
1. Función declarada
2. Número correcto de argumentos
3. Tipos compatibles

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/expresiones/FunctionCallNode.java\``,
        codegen: `**🎯 Objetivo**: Generar \`nombreFuncion(arg1, arg2, ...)\`.

**Mapeo**: \`suma(a, b)\` → \`suma(a, b)\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\``,
        examples: [
            { flowscript: "suma(10, 20)", java: "suma(10, 20)", explanation: "Llamada a función" }
        ]
    },

    "property-access": {
        title: "PropertyAccess",
        category: "Expresiones Básicas",
        grammar: `PropertyAccess = Expression '.' IDENTIFIER`,
        astStructure: [
            { name: "object", type: "ExpressionNode", description: "Objeto base" },
            { name: "property", type: "String", description: "Nombre de la propiedad" }
        ],
        astMethods: [],
        parsing: `Parsea expresión + \`.\` + identificador.`,
        semantic: `**🎯 Objetivo**: Validar que el objeto tenga la propiedad.

**Validaciones**: Visitar objeto recursivamente

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/expresiones/PropertyAccessNode.java\``,
        codegen: `**🎯 Objetivo**: Generar acceso con \`.get("propiedad")\` para Map.

**Mapeo**:
\`\`\`
FlowScript: usuario.nombre
Java: ((Map)usuario).get("nombre")
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\``,
        examples: [
            { flowscript: "usuario.nombre", java: '((Map)usuario).get("nombre")', explanation: "Acceso a propiedad" }
        ]
    },

    "index-access": {
        title: "IndexAccess",
        category: "Expresiones Básicas",
        grammar: `IndexAccess = Expression '[' Expression ']'`,
        astStructure: [
            { name: "array", type: "ExpressionNode", description: "Lista/objeto base" },
            { name: "index", type: "ExpressionNode", description: "Índice/clave" }
        ],
        astMethods: [],
        parsing: `Parsea expresión + \`[\` + índice + \`]\`.`,
        semantic: `**🎯 Objetivo**: Validar expresiones recursivamente.

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/expresiones/IndexAccessNode.java\``,
        codegen: `**🎯 Objetivo**: Generar \`.get(index)\` para listas.

**Mapeo**:
\`\`\`
FlowScript: lista[0]
Java: ((List)lista).get(0)
\`\`\`

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/CodeGenerator.java\``,
        examples: [
            { flowscript: "lista[0]", java: "((List)lista).get(0)", explanation: "Acceso por índice" }
        ]
    },

    // ========== EXPRESIONES BINARIAS (RESUMEN) ==========
    "additive-expression": {
        title: "AdditiveExpression (+ -)",
        category: "Expresiones Binarias",
        grammar: `AdditiveExpression = MultiplicativeExpression (('+' | '-') MultiplicativeExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Operandos (n-ario)" },
            { name: "operators", type: "List<String>", description: "Operadores (+, -)" }
        ],
        astMethods: [],
        parsing: `Parsea expresiones con + y - (n-ario: a + b + c).`,
        semantic: `**🎯 Objetivo**: Validar operandos recursivamente.

**📁 AST**: \`AdditiveExpressionNode.java\``,
        codegen: `**🎯 Objetivo**: Generar expresión con operadores.

**Mapeo**: \`a + b - c\` → \`a + b - c\`

**🔧 Pista**: Intercalar operandos y operadores.`,
        examples: [
            { flowscript: "10 + 20", java: "10 + 20", explanation: "Suma" },
            { flowscript: "a + b - c", java: "a + b - c", explanation: "N-ario" }
        ]
    },

    "multiplicative-expression": {
        title: "MultiplicativeExpression (* / %)",
        category: "Expresiones Binarias",
        grammar: `MultiplicativeExpression = UnaryExpression (('*' | '/' | '%') UnaryExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Operandos" },
            { name: "operators", type: "List<String>", description: "Operadores (*, /, %)" }
        ],
        astMethods: [],
        parsing: `N-ario: a * b / c`,
        semantic: `**🎯**: Validar operandos.`,
        codegen: `**Mapeo**: \`a * b / c\` → \`a * b / c\``,
        examples: [{ flowscript: "10 * 2", java: "10 * 2", explanation: "Multiplicación" }]
    },

    "relational-expression": {
        title: "RelationalExpression (< > <= >=)",
        category: "Expresiones Binarias",
        grammar: `RelationalExpression = AdditiveExpression (('<' | '>' | '<=' | '>=') AdditiveExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Operandos" },
            { name: "operators", type: "List<String>", description: "Operadores" }
        ],
        astMethods: [],
        parsing: `Comparaciones: a < b`,
        semantic: `**🎯**: Validar operandos.`,
        codegen: `**Mapeo**: \`a < b\` → \`a < b\``,
        examples: [{ flowscript: "edad >= 18", java: "edad >= 18", explanation: "Comparación" }]
    },

    "equality-expression": {
        title: "EqualityExpression (== !=)",
        category: "Expresiones Binarias",
        grammar: `EqualityExpression = RelationalExpression (('==' | '!=') RelationalExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Operandos" },
            { name: "operators", type: "List<String>", description: "Operadores" }
        ],
        astMethods: [],
        parsing: `Igualdad: a == b`,
        semantic: `**🎯**: Validar operandos.`,
        codegen: `**Mapeo**: \`a == b\` → \`a == b\` (para primitivos) o \`.equals()\` (objetos)`,
        examples: [{ flowscript: "nombre == \"Juan\"", java: "nombre == \"Juan\"", explanation: "Igualdad" }]
    },

    "logical-and-expression": {
        title: "LogicalAndExpression (y)",
        category: "Expresiones Binarias",
        grammar: `LogicalAndExpression = EqualityExpression ('y' EqualityExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Operandos" }
        ],
        astMethods: [],
        parsing: `AND lógico: a y b`,
        semantic: `**🎯**: Validar operandos booleanos.`,
        codegen: `**Mapeo**: \`a y b\` → \`a && b\``,
        examples: [{ flowscript: "activo y verificado", java: "activo && verificado", explanation: "AND lógico" }]
    },

    "logical-or-expression": {
        title: "LogicalOrExpression (o)",
        category: "Expresiones Binarias",
        grammar: `LogicalOrExpression = LogicalAndExpression ('o' LogicalAndExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Operandos" }
        ],
        astMethods: [],
        parsing: `OR lógico: a o b`,
        semantic: `**🎯**: Validar operandos booleanos.`,
        codegen: `**Mapeo**: \`a o b\` → \`a || b\``,
        examples: [{ flowscript: "admin o propietario", java: "admin || propietario", explanation: "OR lógico" }]
    },

    // ========== EXPRESIONES ESPECIALES ==========
    "unary-expression": {
        title: "UnaryExpression (- no)",
        category: "Expresiones Especiales",
        grammar: `UnaryExpression = ('-' | 'no') Expression`,
        astStructure: [
            { name: "operator", type: "String", description: "Operador (-, no)" },
            { name: "operand", type: "ExpressionNode", description: "Expresión" }
        ],
        astMethods: [],
        parsing: `Unario: -x, no activo`,
        semantic: `**🎯**: Validar operando.`,
        codegen: `**Mapeo**: \`-x\` → \`-x\`, \`no x\` → \`!x\``,
        examples: [
            { flowscript: "-10", java: "-10", explanation: "Negación numérica" },
            { flowscript: "no activo", java: "!activo", explanation: "Negación lógica" }
        ]
    },

    "ternary-expression": {
        title: "TernaryExpression (? :)",
        category: "Expresiones Especiales",
        grammar: `TernaryExpression = Expression '?' Expression ':' Expression`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "thenExpr", type: "ExpressionNode", description: "Si true" },
            { name: "elseExpr", type: "ExpressionNode", description: "Si false" }
        ],
        astMethods: [],
        parsing: `Condicional: cond ? a : b`,
        semantic: `**🎯**: Validar condición booleana y ambas ramas.`,
        codegen: `**Mapeo**: \`cond ? a : b\` → \`cond ? a : b\``,
        examples: [{ flowscript: "edad >= 18 ? \"Mayor\" : \"Menor\"", java: "edad >= 18 ? \"Mayor\" : \"Menor\"", explanation: "Ternario" }]
    },

    "postfix-expression": {
        title: "PostfixExpression (++ --)",
        category: "Expresiones Especiales",
        grammar: `PostfixExpression = PrimaryExpression ('++' | '--')?`,
        astStructure: [
            { name: "operand", type: "ExpressionNode", description: "Expresión base" },
            { name: "operator", type: "String", description: "++, --, o null" }
        ],
        astMethods: [],
        parsing: `Postfijo: x++, x--`,
        semantic: `**🎯**: Validar que operando sea modificable.`,
        codegen: `**Mapeo**: \`x++\` → \`x++\`, \`x--\` → \`x--\``,
        examples: [{ flowscript: "contador++", java: "contador++", explanation: "Incremento postfijo" }]
    },

    // ========== OPERACIONES ESPECIALES DB/HTTP (CON CÓDIGO COMPLETO) ==========
    "db-execute": {
        title: "db.ejecutar() - Operación BD",
        category: "Operaciones Especiales",
        grammar: `DbExecute = 'db' '.' 'ejecutar' '(' Expression (',' Expression)* ')'`,
        astStructure: [
            { name: "queryExpr", type: "ExpressionNode", description: "Expresión SQL (String)" },
            { name: "parameters", type: "List<ExpressionNode>", description: "Parámetros del query" }
        ],
        astMethods: [],
        parsing: `Parsea \`db.ejecutar(sql, ...params)\`.`,
        semantic: `**🎯 Objetivo**: Validar expresiones recursivamente.

**Validaciones**:
1. Primer argumento debe ser String (SQL)
2. Parámetros adicionales son valores para PreparedStatement

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/expresiones/DbExecuteNode.java\``,
        codegen: `**🎯 IMPLEMENTACIÓN COMPLETA**: Generar lambda IIFE con JDBC inline.

**Código Java a generar**:

\`\`\`java
private String generateDbExecute(DbExecuteNode node) {
    StringBuilder code = new StringBuilder();

    // Lambda IIFE que retorna el resultado
    code.append("((java.util.function.Supplier<Integer>)(() -> {\\n");
    code.append("    try (java.sql.Connection __conn = java.sql.DriverManager.getConnection(\\n");
    code.append("            System.getenv(\\"DB_URL\\"),\\n");
    code.append("            System.getenv(\\"DB_USER\\"),\\n");
    code.append("            System.getenv(\\"DB_PASSWORD\\"));\\n");
    code.append("         java.sql.PreparedStatement __stmt = __conn.prepareStatement(");
    code.append(generate(node.getQueryExpr())); // SQL
    code.append(")) {\\n");

    // Set parameters
    List<ExpressionNode> params = node.getParameters();
    for (int i = 0; i < params.size(); i++) {
        code.append("        __stmt.setObject(").append(i + 1).append(", ");
        code.append(generate(params.get(i)));
        code.append(");\\n");
    }

    // Execute
    code.append("        int __result = __stmt.executeUpdate();\\n");
    code.append("        return __result;\\n");
    code.append("    } catch (java.sql.SQLException __e) {\\n");
    code.append("        throw new RuntimeException(\\"Error en db.ejecutar: \\" + __e.getMessage(), __e);\\n");
    code.append("    }\\n");
    code.append("})).get()");

    return code.toString();
}
\`\`\`

**Características clave**:
1. **Lambda IIFE**: \`((Supplier<Integer>)(() -> { ... })).get()\`
2. **Try-with-resources**: Cierra conexión y statement automáticamente
3. **PreparedStatement**: Usa \`setObject()\` para parámetros
4. **Variables con doble guión bajo** (\`__conn\`, \`__stmt\`) para evitar colisiones

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/ExpressionGenerator.java\`
- Método: \`generateDbExecute(DbExecuteNode node)\`
- Test: \`src/test/java/com/flowscript/codegen/DbOperationsTest.java\`

**⚠️ Variables de entorno requeridas**:
- \`DB_URL\`: jdbc:postgresql://localhost:5432/mydb
- \`DB_USER\`: usuario
- \`DB_PASSWORD\`: contraseña`,
        examples: [
            {
                flowscript: 'db.ejecutar("INSERT INTO usuarios (nombre) VALUES (?)", "Juan")',
                java: `((java.util.function.Supplier<Integer>)(() -> {
    try (java.sql.Connection __conn = java.sql.DriverManager.getConnection(
            System.getenv("DB_URL"),
            System.getenv("DB_USER"),
            System.getenv("DB_PASSWORD"));
         java.sql.PreparedStatement __stmt = __conn.prepareStatement("INSERT INTO usuarios (nombre) VALUES (?)")) {
        __stmt.setObject(1, "Juan");
        int __result = __stmt.executeUpdate();
        return __result;
    } catch (java.sql.SQLException __e) {
        throw new RuntimeException("Error en db.ejecutar: " + __e.getMessage(), __e);
    }
})).get()`,
                explanation: "INSERT con parámetro"
            }
        ]
    },

    "db-query": {
        title: "db.consultar() - Query BD",
        category: "Operaciones Especiales",
        grammar: `DbQuery = 'db' '.' 'consultar' '(' Expression (',' Expression)* ')'`,
        astStructure: [
            { name: "queryExpr", type: "ExpressionNode", description: "Expresión SQL SELECT" },
            { name: "parameters", type: "List<ExpressionNode>", description: "Parámetros del query" }
        ],
        astMethods: [],
        parsing: `Parsea \`db.consultar(sql, ...params)\`.`,
        semantic: `**🎯 Objetivo**: Validar expresiones.

**📁 Rutas**:
- AST: \`src/main/java/com/flowscript/sintactic/ast/functions/expresiones/DbQueryNode.java\``,
        codegen: `**🎯 IMPLEMENTACIÓN COMPLETA**: Lambda IIFE que retorna List<Map<String, Object>>.

**Código Java a generar**:

\`\`\`java
private String generateDbQuery(DbQueryNode node) {
    StringBuilder code = new StringBuilder();

    // Lambda IIFE que retorna lista de mapas
    code.append("((java.util.function.Supplier<java.util.List<java.util.Map<String, Object>>>)(() -> {\\n");
    code.append("    try (java.sql.Connection __conn = java.sql.DriverManager.getConnection(\\n");
    code.append("            System.getenv(\\"DB_URL\\"),\\n");
    code.append("            System.getenv(\\"DB_USER\\"),\\n");
    code.append("            System.getenv(\\"DB_PASSWORD\\"));\\n");
    code.append("         java.sql.PreparedStatement __stmt = __conn.prepareStatement(");
    code.append(generate(node.getQueryExpr()));
    code.append(")) {\\n");

    // Set parameters
    List<ExpressionNode> params = node.getParameters();
    for (int i = 0; i < params.size(); i++) {
        code.append("        __stmt.setObject(").append(i + 1).append(", ");
        code.append(generate(params.get(i)));
        code.append(");\\n");
    }

    // Execute query
    code.append("        java.sql.ResultSet __rs = __stmt.executeQuery();\\n");
    code.append("        java.sql.ResultSetMetaData __meta = __rs.getMetaData();\\n");
    code.append("        int __colCount = __meta.getColumnCount();\\n");
    code.append("        java.util.List<java.util.Map<String, Object>> __results = new java.util.ArrayList<>();\\n");
    code.append("        while (__rs.next()) {\\n");
    code.append("            java.util.Map<String, Object> __row = new java.util.HashMap<>();\\n");
    code.append("            for (int __i = 1; __i <= __colCount; __i++) {\\n");
    code.append("                __row.put(__meta.getColumnName(__i), __rs.getObject(__i));\\n");
    code.append("            }\\n");
    code.append("            __results.add(__row);\\n");
    code.append("        }\\n");
    code.append("        return __results;\\n");
    code.append("    } catch (java.sql.SQLException __e) {\\n");
    code.append("        throw new RuntimeException(\\"Error en db.consultar: \\" + __e.getMessage(), __e);\\n");
    code.append("    }\\n");
    code.append("})).get()");

    return code.toString();
}
\`\`\`

**Características**:
- Retorna \`List<Map<String, Object>>\`
- Cada fila es un Map con nombres de columnas como claves
- Usa ResultSetMetaData para obtener columnas dinámicamente

**📁 Rutas**:
- Generador: \`src/main/java/com/flowscript/codegen/ExpressionGenerator.java\`
- Método: \`generateDbQuery(DbQueryNode node)\``,
        examples: [
            {
                flowscript: 'db.consultar("SELECT * FROM usuarios WHERE edad > ?", 18)',
                java: `((java.util.function.Supplier<java.util.List<java.util.Map<String, Object>>>)(() -> {
    try (java.sql.Connection __conn = java.sql.DriverManager.getConnection(...);
         java.sql.PreparedStatement __stmt = __conn.prepareStatement("SELECT * FROM usuarios WHERE edad > ?")) {
        __stmt.setObject(1, 18);
        java.sql.ResultSet __rs = __stmt.executeQuery();
        java.sql.ResultSetMetaData __meta = __rs.getMetaData();
        int __colCount = __meta.getColumnCount();
        java.util.List<java.util.Map<String, Object>> __results = new java.util.ArrayList<>();
        while (__rs.next()) {
            java.util.Map<String, Object> __row = new java.util.HashMap<>();
            for (int __i = 1; __i <= __colCount; __i++) {
                __row.put(__meta.getColumnName(__i), __rs.getObject(__i));
            }
            __results.add(__row);
        }
        return __results;
    } catch (java.sql.SQLException __e) {
        throw new RuntimeException("Error en db.consultar: " + __e.getMessage(), __e);
    }
})).get()`,
                explanation: "SELECT con parámetro"
            }
        ]
    },

    "http-get": {
        title: "http.get() - HTTP GET",
        category: "Operaciones Especiales",
        grammar: `HttpGet = 'http' '.' 'get' '(' Expression (',' Expression)? ')'`,
        astStructure: [
            { name: "urlExpr", type: "ExpressionNode", description: "URL" },
            { name: "headersExpr", type: "ExpressionNode", description: "Headers (opcional Map)" }
        ],
        astMethods: [],
        parsing: `Parsea \`http.get(url)\` o \`http.get(url, headers)\`.`,
        semantic: `**🎯**: Validar expresiones.

**📁 AST**: \`HttpGetNode.java\``,
        codegen: `**🎯 IMPLEMENTACIÓN COMPLETA**: Usa HttpClient de Java 11+.

**Código Java a generar**:

\`\`\`java
private String generateHttpGet(HttpGetNode node) {
    StringBuilder code = new StringBuilder();

    code.append("((java.util.function.Supplier<String>)(() -> {\\n");
    code.append("    try {\\n");
    code.append("        java.net.http.HttpClient __client = java.net.http.HttpClient.newHttpClient();\\n");
    code.append("        java.net.http.HttpRequest.Builder __builder = java.net.http.HttpRequest.newBuilder()\\n");
    code.append("                .uri(java.net.URI.create(");
    code.append(generate(node.getUrlExpr()));
    code.append("))\\n");
    code.append("                .GET();\\n");

    // Add headers if present
    if (node.getHeadersExpr() != null) {
        code.append("        java.util.Map<String, Object> __headers = (java.util.Map<String, Object>)");
        code.append(generate(node.getHeadersExpr()));
        code.append(";\\n");
        code.append("        for (java.util.Map.Entry<String, Object> __entry : __headers.entrySet()) {\\n");
        code.append("            __builder.header(__entry.getKey(), String.valueOf(__entry.getValue()));\\n");
        code.append("        }\\n");
    }

    code.append("        java.net.http.HttpRequest __request = __builder.build();\\n");
    code.append("        java.net.http.HttpResponse<String> __response = __client.send(__request,\\n");
    code.append("                java.net.http.HttpResponse.BodyHandlers.ofString());\\n");
    code.append("        return __response.body();\\n");
    code.append("    } catch (Exception __e) {\\n");
    code.append("        throw new RuntimeException(\\"Error en http.get: \\" + __e.getMessage(), __e);\\n");
    code.append("    }\\n");
    code.append("})).get()");

    return code.toString();
}
\`\`\`

**📁 Generador**: \`ExpressionGenerator.java\`, método \`generateHttpGet()\``,
        examples: [
            {
                flowscript: 'http.get("https://api.example.com/users")',
                java: `((java.util.function.Supplier<String>)(() -> {
    try {
        java.net.http.HttpClient __client = java.net.http.HttpClient.newHttpClient();
        java.net.http.HttpRequest __request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://api.example.com/users"))
                .GET()
                .build();
        java.net.http.HttpResponse<String> __response = __client.send(__request,
                java.net.http.HttpResponse.BodyHandlers.ofString());
        return __response.body();
    } catch (Exception __e) {
        throw new RuntimeException("Error en http.get: " + __e.getMessage(), __e);
    }
})).get()`,
                explanation: "GET simple"
            }
        ]
    },

    "http-post": {
        title: "http.post() - HTTP POST",
        category: "Operaciones Especiales",
        grammar: `HttpPost = 'http' '.' 'post' '(' Expression ',' Expression (',' Expression)? ')'`,
        astStructure: [
            { name: "urlExpr", type: "ExpressionNode", description: "URL" },
            { name: "bodyExpr", type: "ExpressionNode", description: "Body (String)" },
            { name: "headersExpr", type: "ExpressionNode", description: "Headers (opcional)" }
        ],
        astMethods: [],
        parsing: `Parsea \`http.post(url, body)\` o \`http.post(url, body, headers)\`.`,
        semantic: `**🎯**: Validar expresiones.`,
        codegen: `**🎯 IMPLEMENTACIÓN COMPLETA**: Similar a GET pero con body.

**Pistas clave**:
- Usar \`.POST(HttpRequest.BodyPublishers.ofString(body))\`
- Headers opcionales igual que GET

**📁 Generador**: \`generateHttpPost()\``,
        examples: [
            {
                flowscript: 'http.post("https://api.example.com/users", "{\\"name\\":\\"Juan\\"}")',
                java: `((java.util.function.Supplier<String>)(() -> {
    try {
        java.net.http.HttpClient __client = java.net.http.HttpClient.newHttpClient();
        java.net.http.HttpRequest __request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://api.example.com/users"))
                .POST(java.net.http.HttpRequest.BodyPublishers.ofString("{\\"name\\":\\"Juan\\"}"))
                .build();
        java.net.http.HttpResponse<String> __response = __client.send(__request,
                java.net.http.HttpResponse.BodyHandlers.ofString());
        return __response.body();
    } catch (Exception __e) {
        throw new RuntimeException("Error en http.post: " + __e.getMessage(), __e);
    }
})).get()`,
                explanation: "POST con JSON"
            }
        ]
    },

    "http-delete": {
        title: "http.delete() - HTTP DELETE",
        category: "Operaciones Especiales",
        grammar: `HttpDelete = 'http' '.' 'delete' '(' Expression (',' Expression)? ')'`,
        astStructure: [
            { name: "urlExpr", type: "ExpressionNode", description: "URL" },
            { name: "headersExpr", type: "ExpressionNode", description: "Headers (opcional)" }
        ],
        astMethods: [],
        parsing: `Parsea \`http.delete(url)\` o \`http.delete(url, headers)\`.`,
        semantic: `**🎯**: Validar expresiones.`,
        codegen: `**🎯**: Similar a GET pero con \`.DELETE()\`.

**📁 Generador**: \`generateHttpDelete()\``,
        examples: [
            {
                flowscript: 'http.delete("https://api.example.com/users/123")',
                java: `((java.util.function.Supplier<String>)(() -> {
    try {
        java.net.http.HttpClient __client = java.net.http.HttpClient.newHttpClient();
        java.net.http.HttpRequest __request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://api.example.com/users/123"))
                .DELETE()
                .build();
        java.net.http.HttpResponse<String> __response = __client.send(__request,
                java.net.http.HttpResponse.BodyHandlers.ofString());
        return __response.body();
    } catch (Exception __e) {
        throw new RuntimeException("Error en http.delete: " + __e.getMessage(), __e);
    }
})).get()`,
                explanation: "DELETE simple"
            }
        ]
    }
};

// Export for use in documentation
window.nodesData = nodesData;
