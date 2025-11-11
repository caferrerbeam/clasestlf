// FlowScript Compiler Node Documentation Data
// This file contains comprehensive documentation for all 67 AST nodes

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
        semantic: `El análisis semántico de IntegerLiteralNode es **vacío** (método visit() retorna null).

**Razón**: Los literales enteros son siempre válidos sintácticamente. No requieren validación adicional porque:
- Ya fueron validados por el lexer (formato correcto)
- Ya fueron parseados a BigInteger (valor válido)
- El análisis de tipos se realiza en el contexto de uso, no en el literal mismo`,
        codegen: `La generación de código es trivial: simplemente emite el valor numérico.

**Implementación**:
\`\`\`java
private String generateIntegerLiteral(IntegerLiteralNode node) {
    return node.getValue().toString();
}
\`\`\`

**Estrategia**:
- Usa BigInteger.toString() para obtener representación decimal
- No necesita sufijos (L, etc.) porque Java infiere el tipo del contexto
- Los guiones bajos ya fueron eliminados durante el parsing`,
        examples: [
            {
                flowscript: "42",
                java: "42",
                explanation: "Literal entero simple"
            },
            {
                flowscript: "1_000_000",
                java: "1000000",
                explanation: "Literal con guiones bajos (eliminados en generación)"
            },
            {
                flowscript: "999999999999999999",
                java: "999999999999999999",
                explanation: "Número grande (BigInteger en AST, pero se genera como literal)"
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
            { name: "rawValue", type: "String", description: "El valor tal como aparece en el código fuente" },
            { name: "value", type: "BigDecimal", description: "El valor numérico parseado con precisión arbitraria" }
        ],
        astMethods: [
            { name: "fitsInFloat()", returns: "boolean", description: "Verifica si el valor cabe en un float de 32 bits" },
            { name: "fitsInDouble()", returns: "boolean", description: "Verifica si el valor cabe en un double de 64 bits" }
        ],
        parsing: `El parser DecimalLiteralParser reconoce tokens de tipo DECIMAL_LITERAL.

**Proceso de parsing**:
1. Verifica que el token actual sea DECIMAL_LITERAL
2. Extrae el valor del token
3. Limpia guiones bajos si existen
4. Convierte a BigDecimal para preservar precisión exacta
5. Crea el nodo DecimalLiteralNode

**Formatos soportados**:
- Notación decimal: \`3.14\`, \`0.5\`
- Notación científica: \`1e6\`, \`2.5e-3\`
- Con guiones bajos: \`1_000.5\``,
        semantic: `El análisis semántico es **vacío** (sin validaciones adicionales).

Los literales decimales son siempre válidos después del parsing porque BigDecimal garantiza representación exacta de cualquier número decimal.`,
        codegen: `Genera el valor usando BigDecimal.toString():

\`\`\`java
private String generateDecimalLiteral(DecimalLiteralNode node) {
    return node.getValue().toString();
}
\`\`\`

**Características**:
- Preserva la precisión exacta del valor original
- Java infiere el tipo (double) del contexto
- No necesita sufijos (f, d)`,
        examples: [
            {
                flowscript: "3.14",
                java: "3.14",
                explanation: "Literal decimal simple"
            },
            {
                flowscript: "1.5e6",
                java: "1500000",
                explanation: "Notación científica (BigDecimal normaliza a decimal)"
            },
            {
                flowscript: "0.000_001",
                java: "0.000001",
                explanation: "Decimal pequeño con guiones bajos"
            }
        ]
    },

    "string-literal": {
        title: "StringLiteral",
        category: "Literales",
        grammar: `StringLiteral = STRING_LITERAL

STRING_LITERAL = '"' CHAR* '"'
CHAR = [^"\\\\] | ESCAPE_SEQUENCE
ESCAPE_SEQUENCE = '\\\\' [nrt"\\\\]`,
        astStructure: [
            { name: "rawValue", type: "String", description: "El contenido de la cadena SIN las comillas externas" },
            { name: "value", type: "String", description: "Alias de rawValue (mismo contenido)" }
        ],
        astMethods: [],
        parsing: `El parser StringLiteralParser reconoce tokens de tipo STRING_LITERAL.

**Proceso de parsing**:
1. Verifica que el token actual sea STRING_LITERAL
2. El lexer ya extrajo el contenido (sin comillas)
3. Las secuencias de escape YA fueron procesadas por el lexer
4. Crea el nodo StringLiteralNode con el valor procesado

**Secuencias de escape soportadas**:
- \`\\\\n\` → Salto de línea
- \`\\\\r\` → Retorno de carro
- \`\\\\t\` → Tabulación
- \`\\\\"\` → Comilla doble
- \`\\\\\\\\\` → Barra invertida`,
        semantic: `El análisis semántico es **vacío**.

Los literales de cadena son siempre válidos después del parsing. El lexer garantiza que las comillas están balanceadas y las secuencias de escape son válidas.`,
        codegen: `Genera una cadena Java con escape apropiado:

\`\`\`java
private String generateStringLiteral(StringLiteralNode node) {
    String value = node.getValue();

    // Re-escape special characters for Java
    value = value.replace("\\", "\\\\");      // \\ -> \\\\
    value = value.replace("\\"", "\\\\\\"");   // " -> \\\\"
    value = value.replace("\\n", "\\\\n");    // newline -> \\\\n
    value = value.replace("\\r", "\\\\r");    // CR -> \\\\r
    value = value.replace("\\t", "\\\\t");    // tab -> \\\\t

    return "\\"" + value + "\\"";
}
\`\`\`

**Importante**: El valor en el AST ya tiene las secuencias de escape procesadas (caracteres reales). La generación debe RE-escapar para producir código Java válido.`,
        examples: [
            {
                flowscript: '"Hola Mundo"',
                java: '"Hola Mundo"',
                explanation: "Cadena simple"
            },
            {
                flowscript: '"Línea 1\\nLínea 2"',
                java: '"Línea 1\\n Línea 2"',
                explanation: "Cadena con salto de línea (re-escaped en Java)"
            },
            {
                flowscript: '"El dijo \\"Hola\\""',
                java: '"El dijo \\"Hola\\""',
                explanation: "Comillas escapadas dentro de la cadena"
            }
        ]
    },

    "boolean-literal": {
        title: "BooleanLiteral",
        category: "Literales",
        grammar: `BooleanLiteral = 'verdadero' | 'falso'`,
        astStructure: [
            { name: "value", type: "boolean", description: "El valor booleano (true o false)" },
            { name: "keyword", type: "Token", description: "El token original ('verdadero' o 'falso')" }
        ],
        astMethods: [],
        parsing: `El parser BooleanLiteralParser reconoce las palabras clave 'verdadero' y 'falso'.

**Proceso de parsing**:
1. Verifica si el token actual es la keyword 'verdadero' o 'falso'
2. Mapea 'verdadero' → true, 'falso' → false
3. Crea el nodo BooleanLiteralNode con el valor booleano
4. Guarda el token original para debugging/errores

**FlowScript usa español**:
- \`verdadero\` (no "true")
- \`falso\` (no "false")`,
        semantic: `El análisis semántico es **vacío**.

Los literales booleanos son siempre válidos - solo hay dos valores posibles y ambos son correctos.`,
        codegen: `Mapea el valor booleano a Java:

\`\`\`java
private String generateBooleanLiteral(BooleanLiteralNode node) {
    return String.valueOf(node.getValue());
}
\`\`\`

**Resultado**:
- \`verdadero\` → \`true\`
- \`falso\` → \`false\``,
        examples: [
            {
                flowscript: "verdadero",
                java: "true",
                explanation: "Literal booleano verdadero"
            },
            {
                flowscript: "falso",
                java: "false",
                explanation: "Literal booleano falso"
            },
            {
                flowscript: "activo = verdadero",
                java: "activo = true",
                explanation: "Asignación con literal booleano"
            }
        ]
    },

    "null-literal": {
        title: "NullLiteral",
        category: "Literales",
        grammar: `NullLiteral = 'nulo'`,
        astStructure: [
            { name: "keyword", type: "Token", description: "El token 'nulo'" }
        ],
        astMethods: [],
        parsing: `El parser NullLiteralParser reconoce la palabra clave 'nulo'.

**Proceso de parsing**:
1. Verifica que el token actual sea la keyword 'nulo'
2. Crea el nodo NullLiteralNode
3. No necesita almacenar valor (null es un singleton conceptual)

**FlowScript usa español**:
- \`nulo\` (no "null")`,
        semantic: `El análisis semántico es **vacío**.

El literal nulo es siempre válido. Representa la ausencia de valor para cualquier tipo de referencia.`,
        codegen: `Genera directamente "null" en Java:

\`\`\`java
if (node instanceof NullLiteralNode) {
    return "null";
}
\`\`\`

**Resultado**:
- \`nulo\` → \`null\``,
        examples: [
            {
                flowscript: "nulo",
                java: "null",
                explanation: "Literal nulo"
            },
            {
                flowscript: "usuario = nulo",
                java: "usuario = null",
                explanation: "Asignación de nulo a variable"
            },
            {
                flowscript: "si (usuario == nulo)",
                java: "if ((usuario == null))",
                explanation: "Comparación con nulo"
            }
        ]
    },

    "list-literal": {
        title: "ListLiteral",
        category: "Literales",
        grammar: `ListLiteral = '[' ExpressionList? ']'

ExpressionList = Expression (',' Expression)*`,
        astStructure: [
            { name: "elements", type: "List<ExpressionNode>", description: "Lista de expresiones que forman los elementos" },
            { name: "leftBracket", type: "Token", description: "Token '[' (para posición en código)" },
            { name: "rightBracket", type: "Token", description: "Token ']'" }
        ],
        astMethods: [
            { name: "isEmpty()", returns: "boolean", description: "Verifica si la lista está vacía" },
            { name: "size()", returns: "int", description: "Retorna el número de elementos" }
        ],
        parsing: `El parser ListLiteralParser construye listas literales.

**Proceso de parsing**:
1. Consume el token '['
2. Si el siguiente token NO es ']':
   - Parsea la primera expresión
   - Mientras haya comas:
     - Consume la coma
     - Parsea la siguiente expresión
3. Consume el token ']'
4. Crea el nodo ListLiteralNode con la lista de elementos

**Casos especiales**:
- \`[]\` → Lista vacía
- \`[1]\` → Lista con un elemento
- \`[1, 2, 3]\` → Lista con múltiples elementos
- \`[1, verdadero, "texto"]\` → Lista heterogénea (tipos mixtos)`,
        semantic: `El análisis semántico valida cada elemento recursivamente.

**Validaciones**:
1. Visita cada expresión en la lista
2. Cada elemento debe ser una expresión válida
3. FlowScript permite listas heterogéneas (sin restricción de tipo)

**Inferencia de tipo**:
- Lista vacía \`[]\` → \`List<Object>\`
- Lista homogénea \`[1, 2, 3]\` → \`List<Integer>\`
- Lista mixta \`[1, "hola"]\` → \`List<Object>\``,
        codegen: `Genera una lista inmutable usando List.of():

\`\`\`java
private String generateListLiteral(ListLiteralNode node) {
    if (node.getElements() == null || node.getElements().isEmpty()) {
        return "List.of()";
    }

    String elements = node.getElements().stream()
            .map(this::generate)
            .collect(Collectors.joining(", "));

    return "List.of(" + elements + ")";
}
\`\`\`

**Características**:
- Usa \`java.util.List.of()\` (Java 9+)
- Genera lista inmutable
- Soporta tipos heterogéneos (List<Object>)`,
        examples: [
            {
                flowscript: "[]",
                java: "List.of()",
                explanation: "Lista vacía"
            },
            {
                flowscript: "[1, 2, 3]",
                java: "List.of(1, 2, 3)",
                explanation: "Lista de enteros"
            },
            {
                flowscript: '[1, "hola", verdadero]',
                java: 'List.of(1, "hola", true)',
                explanation: "Lista heterogénea (tipos mixtos)"
            },
            {
                flowscript: "[[1, 2], [3, 4]]",
                java: "List.of(List.of(1, 2), List.of(3, 4))",
                explanation: "Lista anidada (lista de listas)"
            }
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
            { name: "isEmpty()", returns: "boolean", description: "Verifica si el objeto está vacío" },
            { name: "size()", returns: "int", description: "Retorna el número de propiedades" },
            { name: "hasKey(String)", returns: "boolean", description: "Verifica si existe una clave" }
        ],
        parsing: `El parser ObjectLiteralParser construye objetos literales (similar a JSON).

**Proceso de parsing**:
1. Consume el token '{'
2. Si el siguiente token NO es '}':
   - Parsea el primer miembro (clave: valor)
   - Mientras haya comas:
     - Consume la coma
     - Parsea el siguiente miembro
3. Consume el token '}'
4. Crea el nodo ObjectLiteralNode con la lista de miembros

**ObjectMemberNode**:
- \`key: String\` - Nombre de la propiedad
- \`value: ExpressionNode\` - Valor (cualquier expresión)

**Restricciones**:
- Las claves DEBEN ser identificadores simples (no expresiones)
- Las claves no pueden repetirse (validado en semántico)`,
        semantic: `El análisis semántico valida la estructura del objeto.

**Validaciones**:
1. Detecta claves duplicadas:
   \`\`\`flowscript
   {nombre: "Juan", nombre: "Pedro"}  // ERROR
   \`\`\`
2. Visita recursivamente cada valor
3. Las claves deben ser identificadores válidos

**Tipo generado**:
- \`Map<String, Object>\` en Java
- Soporta valores heterogéneos`,
        codegen: `Genera un HashMap mutable con inicialización en bloque:

\`\`\`java
private String generateObjectLiteral(ObjectLiteralNode node) {
    if (node.getMembers() == null || node.getMembers().isEmpty()) {
        return "new HashMap<>()";
    }

    var members = node.getMembers();

    StringBuilder sb = new StringBuilder();
    sb.append("new HashMap<String, Object>() {{ ");

    for (var member : members) {
        sb.append("put(\\"").append(member.getKey()).append("\\", ");
        sb.append(generate(member.getValue())).append("); ");
    }

    sb.append("}}");
    return sb.toString();
}
\`\`\`

**¿Por qué HashMap en lugar de Map.of()?**
- Map.of() crea mapas inmutables
- Map.of() tiene límite de 10 pares clave-valor
- Map.of() genera tipos de intersección complejos
- HashMap mutable permite modificación posterior`,
        examples: [
            {
                flowscript: "{}",
                java: "new HashMap<>()",
                explanation: "Objeto vacío"
            },
            {
                flowscript: '{nombre: "Juan", edad: 30}',
                java: 'new HashMap<String, Object>() {{ put("nombre", "Juan"); put("edad", 30); }}',
                explanation: "Objeto con propiedades heterogéneas"
            },
            {
                flowscript: '{activo: verdadero, config: {modo: "debug"}}',
                java: 'new HashMap<String, Object>() {{ put("activo", true); put("config", new HashMap<String, Object>() {{ put("modo", "debug"); }}); }}',
                explanation: "Objeto anidado"
            }
        ]
    },

    // ========== EXPRESIONES BÁSICAS ==========

    "identifier": {
        title: "Identifier",
        category: "Expresiones Básicas",
        grammar: `Identifier = IDENTIFIER

IDENTIFIER = [a-zA-Z_][a-zA-Z0-9_]*`,
        astStructure: [
            { name: "name", type: "String", description: "El nombre del identificador" }
        ],
        astMethods: [],
        parsing: `El parser usa IdentifierNode directamente cuando necesita un identificador.

**Uso en contextos**:
- Nombres de variables: \`edad = 25\`
- Nombres de funciones en llamadas: \`calcular(x)\`
- Referencias a parámetros: \`funcion suma(a, b) { retornar a + b }\`
- Claves en objetos: \`{nombre: "Juan"}\`

**Restricciones**:
- No puede ser una palabra clave reservada
- Debe comenzar con letra o guion bajo
- Puede contener dígitos después del primer carácter`,
        semantic: `El análisis semántico verifica que el identificador esté declarado.

**Validaciones**:
1. **Lookup en Symbol Table**: Busca el identificador en la tabla de símbolos
2. **Variable no declarada**: Error si no existe en el scope actual o ancestros
3. **Tipo inferido**: Obtiene el tipo del símbolo encontrado

**Ejemplo de error**:
\`\`\`flowscript
resultado = x + y  // ERROR: 'x' no declarado
\`\`\``,
        codegen: `Genera simplemente el nombre del identificador:

\`\`\`java
private String generateIdentifier(IdentifierNode node) {
    return node.getName();
}
\`\`\`

**Nota**: El mapeo de nombres se hace durante el parsing/semantic, no en codegen.`,
        examples: [
            {
                flowscript: "edad",
                java: "edad",
                explanation: "Referencia a variable"
            },
            {
                flowscript: "calcular_total",
                java: "calcular_total",
                explanation: "Identificador con guiones bajos"
            }
        ]
    },

    "function-call": {
        title: "FunctionCall",
        category: "Expresiones Básicas",
        grammar: `FunctionCall = Expression '(' ArgumentList? ')'

ArgumentList = Expression (',' Expression)*`,
        astStructure: [
            { name: "function", type: "ExpressionNode", description: "La expresión que produce la función (usualmente un IdentifierNode)" },
            { name: "arguments", type: "List<ExpressionNode>", description: "Lista de argumentos pasados a la función" }
        ],
        astMethods: [
            { name: "getArgumentCount()", returns: "int", description: "Retorna el número de argumentos" }
        ],
        parsing: `El parser FunctionCallNode se invoca cuando se detecta '(' después de una expresión.

**Proceso**:
1. Parsea la expresión base (función)
2. Consume el token '('
3. Si el siguiente token no es ')':
   - Parsea el primer argumento (expresión)
   - Mientras haya comas:
     - Consume la coma
     - Parsea el siguiente argumento
4. Consume el token ')'
5. Crea el nodo FunctionCallNode

**Contextos**:
- Llamada simple: \`suma(a, b)\`
- Sin argumentos: \`obtenerFechaActual()\`
- Expresiones como argumentos: \`calcular(x + y, z * 2)\``,
        semantic: `El análisis semántico valida la llamada a función.

**Validaciones**:
1. **Función existe**: Verifica que la función esté declarada
2. **Número de argumentos**: Coincide con la firma de la función
3. **Tipos de argumentos**: Compatible con los parámetros esperados
4. **Funciones especiales**: Valida db.ejecutar(), http.get(), etc.

**Ejemplo de errores**:
\`\`\`flowscript
// ERROR: suma() espera 2 argumentos
suma(5)

// ERROR: función no existe
calcularImpuesto(100)
\`\`\``,
        codegen: `Genera la llamada a función en Java:

\`\`\`java
private String generateFunctionCall(FunctionCallNode node) {
    ExpressionNode functionExpr = node.getFunction();
    String functionName;

    if (functionExpr instanceof IdentifierNode) {
        functionName = ((IdentifierNode) functionExpr).getName();
    } else {
        functionName = generate(functionExpr);
    }

    // Map built-in functions
    String mappedName = mapBuiltinFunction(functionName);

    // Generate arguments
    String argsList = node.getArguments().stream()
            .map(this::generate)
            .collect(Collectors.joining(", "));

    return mappedName + "(" + argsList + ")";
}
\`\`\`

**Mapeo de built-ins**:
- \`imprimir()\` → \`FlowScriptBuiltins.imprimir()\`
- Funciones de usuario → Nombres directos`,
        examples: [
            {
                flowscript: "suma(5, 3)",
                java: "suma(5, 3)",
                explanation: "Llamada a función con argumentos"
            },
            {
                flowscript: "obtenerConfiguracion()",
                java: "obtenerConfiguracion()",
                explanation: "Llamada sin argumentos"
            },
            {
                flowscript: "calcular(x + y, z * 2)",
                java: "calcular((x + y), (z * 2))",
                explanation: "Argumentos como expresiones"
            }
        ]
    },

    "property-access": {
        title: "PropertyAccess",
        category: "Expresiones Básicas",
        grammar: `PropertyAccess = Expression '.' IDENTIFIER`,
        astStructure: [
            { name: "object", type: "ExpressionNode", description: "La expresión que produce el objeto" },
            { name: "propertyName", type: "String", description: "El nombre de la propiedad a acceder" }
        ],
        astMethods: [],
        parsing: `El parser reconoce acceso a propiedades cuando encuentra '.' después de una expresión.

**Proceso**:
1. Parsea la expresión base (objeto)
2. Consume el token '.'
3. Consume el identificador (propiedad)
4. Crea el nodo PropertyAccessNode

**Casos especiales**:
- \`db.ejecutar\` → Operación especial de base de datos
- \`http.get\` → Operación especial HTTP
- \`usuario.nombre\` → Acceso a propiedad de objeto`,
        semantic: `El análisis semántico valida el acceso a propiedades.

**Validaciones**:
1. **Objeto existe**: El objeto debe estar declarado
2. **Tipo objeto**: Debe ser un tipo objeto/mapa, no primitivo
3. **Propiedad existe**: (Opcional) Verifica si la propiedad existe

**Nota**: FlowScript usa tipado dinámico para objetos (Map<String, Object>), por lo que la validación de propiedades es limitada en compile-time.`,
        codegen: `Genera acceso usando Map.get():

\`\`\`java
private String generatePropertyAccess(PropertyAccessNode node) {
    String object = generate(node.getObject());
    String property = node.getPropertyName();

    // For maps, use get() method
    return "((Map<String, Object>) " + object + ").get(\\"" + property + "\\")";
}
\`\`\`

**Estrategia**:
- Cast a Map<String, Object>
- Usa get() para obtener el valor
- Retorna Object (requiere cast en uso)`,
        examples: [
            {
                flowscript: "usuario.nombre",
                java: '((Map<String, Object>) usuario).get("nombre")',
                explanation: "Acceso a propiedad de objeto"
            },
            {
                flowscript: "config.servidor.puerto",
                java: '((Map<String, Object>) ((Map<String, Object>) config).get("servidor")).get("puerto")',
                explanation: "Acceso anidado a propiedades"
            }
        ]
    },

    "index-access": {
        title: "IndexAccess",
        category: "Expresiones Básicas",
        grammar: `IndexAccess = Expression '[' Expression ']'`,
        astStructure: [
            { name: "object", type: "ExpressionNode", description: "La expresión que produce la lista/array" },
            { name: "index", type: "ExpressionNode", description: "La expresión que produce el índice" }
        ],
        astMethods: [],
        parsing: `El parser reconoce acceso por índice cuando encuentra '[' después de una expresión.

**Proceso**:
1. Parsea la expresión base (objeto/lista)
2. Consume el token '['
3. Parsea la expresión del índice
4. Consume el token ']'
5. Crea el nodo IndexAccessNode

**Usos**:
- Acceso a lista: \`numeros[0]\`
- Índice calculado: \`lista[i + 1]\`
- Acceso a mapa: \`datos["clave"]\``,
        semantic: `El análisis semántico valida el acceso por índice.

**Validaciones**:
1. **Objeto es indexable**: Debe ser lista, array, o mapa
2. **Índice válido**: Para listas, debe ser entero
3. **Rango**: (Runtime) Verifica que el índice esté en rango

**Tipos de acceso**:
- Lista: índice entero
- Mapa: clave string`,
        codegen: `Genera acceso usando .get():

\`\`\`java
private String generateIndexAccess(IndexAccessNode node) {
    String object = generate(node.getObject());
    String index = generate(node.getIndex());

    // For lists, use get() method
    return "(" + object + ").get(" + index + ")";
}
\`\`\`

**Nota**: Funciona tanto para List como Map (ambos tienen get()).`,
        examples: [
            {
                flowscript: "numeros[0]",
                java: "(numeros).get(0)",
                explanation: "Acceso al primer elemento"
            },
            {
                flowscript: "matriz[i][j]",
                java: "((matriz).get(i)).get(j)",
                explanation: "Acceso a matriz bidimensional"
            },
            {
                flowscript: 'datos["nombre"]',
                java: '(datos).get("nombre")',
                explanation: "Acceso a mapa con clave string"
            }
        ]
    },

    // ========== EXPRESIONES BINARIAS ==========

    "additive-expression": {
        title: "AdditiveExpression (+ -)",
        category: "Expresiones Binarias",
        grammar: `AdditiveExpression = MultiplicativeExpression (('+' | '-') MultiplicativeExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Lista de operandos (N elementos)" },
            { name: "operators", type: "List<Token>", description: "Lista de operadores (N-1 elementos)" }
        ],
        astMethods: [
            { name: "getSimplified()", returns: "ExpressionNode", description: "Retorna el único operando si N=1" }
        ],
        parsing: `El parser AdditiveExpressionParser implementa parsing N-ario (soporta múltiples operandos).

**Proceso**:
1. Parsea el primer operando (MultiplicativeExpression)
2. Mientras el token actual sea '+' o '-':
   - Guarda el operador
   - Consume el operador
   - Parsea el siguiente operando
3. Si solo hay 1 operando, retorna directamente ese operando
4. Si hay múltiples, crea AdditiveExpressionNode

**Ejemplos**:
- \`a + b\` → 2 operandos, 1 operador
- \`a + b - c + d\` → 4 operandos, 3 operadores`,
        semantic: `El análisis semántico valida tipos compatibles.

**Validaciones**:
1. **Tipos numéricos**: Todos los operandos deben ser entero o decimal
2. **Concatenación de strings**: '+' permite strings
3. **Promoción de tipos**: entero + decimal → decimal

**Ejemplos de errores**:
\`\`\`flowscript
resultado = 5 + verdadero  // ERROR: incompatible
\`\`\``,
        codegen: `Genera expresión con paréntesis para preservar precedencia:

\`\`\`java
private String generateNaryExpression(ExpressionNode node) {
    List<ExpressionNode> operands = ((AdditiveExpressionNode) node).getOperands();
    List<Token> operators = ((AdditiveExpressionNode) node).getOperators();

    if (operands.size() == 1) {
        return generate(operands.get(0));
    }

    StringBuilder result = new StringBuilder("(");
    result.append(generate(operands.get(0)));

    for (int i = 0; i < operators.size(); i++) {
        result.append(" ").append(operators.get(i).getValue()).append(" ");
        result.append(generate(operands.get(i + 1)));
    }

    result.append(")");
    return result.toString();
}
\`\`\``,
        examples: [
            {
                flowscript: "a + b",
                java: "(a + b)",
                explanation: "Suma simple"
            },
            {
                flowscript: "a + b - c",
                java: "(a + b - c)",
                explanation: "Múltiples operaciones"
            },
            {
                flowscript: "5 + 3.14",
                java: "(5 + 3.14)",
                explanation: "Promoción de int a double"
            }
        ]
    },

    "multiplicative-expression": {
        title: "MultiplicativeExpression (* / %)",
        category: "Expresiones Binarias",
        grammar: `MultiplicativeExpression = UnaryExpression (('*' | '/' | '%') UnaryExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Lista de operandos" },
            { name: "operators", type: "List<Token>", description: "Lista de operadores (* / %)" }
        ],
        astMethods: [],
        parsing: `Similar a AdditiveExpression, pero con mayor precedencia.

**Operadores**:
- \`*\` → Multiplicación
- \`/\` → División
- \`%\` → Módulo (resto)`,
        semantic: `Valida tipos numéricos y previene división por cero (runtime).

**Validaciones**:
1. Todos los operandos deben ser numéricos
2. División por cero → Error en runtime (no compile-time)
3. Módulo solo con enteros (FlowScript)`,
        codegen: `Genera expresión similar a aditiva:

\`\`\`java
return "(a * b / c)";
\`\`\``,
        examples: [
            {
                flowscript: "a * b",
                java: "(a * b)",
                explanation: "Multiplicación"
            },
            {
                flowscript: "total / cantidad",
                java: "(total / cantidad)",
                explanation: "División"
            },
            {
                flowscript: "numero % 2",
                java: "(numero % 2)",
                explanation: "Módulo (verificar par/impar)"
            }
        ]
    },

    "relational-expression": {
        title: "RelationalExpression (< > <= >=)",
        category: "Expresiones Binarias",
        grammar: `RelationalExpression = AdditiveExpression (('<' | '>' | '<=' | '>=') AdditiveExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Lista de operandos" },
            { name: "operators", type: "List<Token>", description: "Lista de operadores relacionales" }
        ],
        astMethods: [],
        parsing: `Parser N-ario para comparaciones relacionales.

**Operadores**:
- \`<\` → Menor que
- \`>\` → Mayor que
- \`<=\` → Menor o igual
- \`>=\` → Mayor o igual`,
        semantic: `Valida que los operandos sean comparables.

**Validaciones**:
1. Operandos numéricos: entero/decimal
2. Operandos strings: comparación lexicográfica
3. Tipo de resultado: siempre boolean`,
        codegen: `Genera comparación directa:

\`\`\`java
return "(x < y)";
\`\`\``,
        examples: [
            {
                flowscript: "edad >= 18",
                java: "(edad >= 18)",
                explanation: "Mayor o igual"
            },
            {
                flowscript: "precio < presupuesto",
                java: "(precio < presupuesto)",
                explanation: "Menor que"
            }
        ]
    },

    "equality-expression": {
        title: "EqualityExpression (== !=)",
        category: "Expresiones Binarias",
        grammar: `EqualityExpression = RelationalExpression (('==' | '!=') RelationalExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Lista de operandos" },
            { name: "operators", type: "List<Token>", description: "Lista de operadores (== !=)" }
        ],
        astMethods: [],
        parsing: `Parser para igualdad y desigualdad.

**Operadores**:
- \`==\` → Igual a
- \`!=\` → Diferente de`,
        semantic: `Valida comparación de tipos compatibles.

**Nota**: FlowScript permite comparar cualquier tipo (usa equals() en Java).`,
        codegen: `Genera comparación usando == en Java:

\`\`\`java
return "(a == b)";
\`\`\``,
        examples: [
            {
                flowscript: "nombre == \"Juan\"",
                java: '(nombre == "Juan")',
                explanation: "Comparación de strings"
            },
            {
                flowscript: "activo != falso",
                java: "(activo != false)",
                explanation: "Desigualdad booleana"
            }
        ]
    },

    "logical-and-expression": {
        title: "LogicalAndExpression (y)",
        category: "Expresiones Binarias",
        grammar: `LogicalAndExpression = EqualityExpression ('y' EqualityExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Lista de operandos booleanos" }
        ],
        astMethods: [],
        parsing: `Parser para AND lógico (keyword 'y' en español).

**Proceso**:
1. Parsea el primer operando
2. Mientras el token sea 'y':
   - Consume 'y'
   - Parsea el siguiente operando
3. Crea LogicalAndExpressionNode`,
        semantic: `Valida que todos los operandos sean booleanos.

**Short-circuit**: Java && evalúa left-to-right y detiene si encuentra false.`,
        codegen: `Genera cadena de && en Java:

\`\`\`java
private String generateLogicalAnd(LogicalAndExpressionNode node) {
    StringBuilder result = new StringBuilder("(");
    result.append(generate(operands.get(0)));

    for (int i = 1; i < operands.size(); i++) {
        result.append(" && ");
        result.append(generate(operands.get(i)));
    }

    result.append(")");
    return result.toString();
}
\`\`\`

**Mapeo**: \`y\` → \`&&\``,
        examples: [
            {
                flowscript: "edad >= 18 y activo",
                java: "((edad >= 18) && activo)",
                explanation: "AND de dos condiciones"
            },
            {
                flowscript: "a y b y c",
                java: "(a && b && c)",
                explanation: "AND de múltiples condiciones"
            }
        ]
    },

    "logical-or-expression": {
        title: "LogicalOrExpression (o)",
        category: "Expresiones Binarias",
        grammar: `LogicalOrExpression = LogicalAndExpression ('o' LogicalAndExpression)*`,
        astStructure: [
            { name: "operands", type: "List<ExpressionNode>", description: "Lista de operandos booleanos" }
        ],
        astMethods: [],
        parsing: `Parser para OR lógico (keyword 'o' en español).

Similar a LogicalAnd pero con operador 'o'.`,
        semantic: `Valida operandos booleanos.

**Short-circuit**: Java || evalúa y detiene si encuentra true.`,
        codegen: `Genera cadena de || en Java:

\`\`\`java
return "(a || b || c)";
\`\`\`

**Mapeo**: \`o\` → \`||\``,
        examples: [
            {
                flowscript: "esAdmin o esModerador",
                java: "(esAdmin || esModerador)",
                explanation: "OR de dos condiciones"
            },
            {
                flowscript: "a o b o c",
                java: "(a || b || c)",
                explanation: "OR de múltiples condiciones"
            }
        ]
    },

    // ========== EXPRESIONES ESPECIALES ==========

    "unary-expression": {
        title: "UnaryExpression (- + no !)",
        category: "Expresiones Especiales",
        grammar: `UnaryExpression = ('-' | '+' | 'no' | '!') UnaryExpression
                | PostfixExpression`,
        astStructure: [
            { name: "operator", type: "String", description: "El operador unario (-, +, no, !)" },
            { name: "operand", type: "ExpressionNode", description: "El operando (puede ser otra expresión unaria)" }
        ],
        astMethods: [],
        parsing: `El parser UnaryExpressionParser es recursivo para soportar múltiples unarios.

**Proceso**:
1. Si el token actual es operador unario:
   - Guarda el operador
   - Consume el token
   - Parsea recursivamente otro UnaryExpression
   - Crea el nodo UnaryExpressionNode
2. Si no, parsea PostfixExpression

**Ejemplos**:
- \`-x\` → Negación aritmética
- \`no activo\` → Negación lógica
- \`--x\` → Doble negación (raro, pero válido)`,
        semantic: `Valida tipo del operando según el operador.

**Reglas**:
1. \`-\` y \`+\` requieren operando numérico
2. \`no\` y \`!\` requieren operando booleano`,
        codegen: `Mapea operadores FlowScript a Java:

\`\`\`java
private String generateUnaryExpression(UnaryExpressionNode node) {
    String operand = generate(node.getOperand());
    String operator = mapUnaryOperator(node.getOperator());
    return operator + operand;
}

private String mapUnaryOperator(String operator) {
    switch (operator) {
        case "-": return "-";
        case "+": return "+";
        case "no": return "!";
        case "!": return "!";
        default: return operator;
    }
}
\`\`\``,
        examples: [
            {
                flowscript: "-cantidad",
                java: "-cantidad",
                explanation: "Negación aritmética"
            },
            {
                flowscript: "no activo",
                java: "!activo",
                explanation: "Negación lógica"
            },
            {
                flowscript: "-(a + b)",
                java: "-(a + b)",
                explanation: "Negación de expresión"
            }
        ]
    },

    "ternary-expression": {
        title: "TernaryExpression (? :)",
        category: "Expresiones Especiales",
        grammar: `TernaryExpression = LogicalOrExpression ('?' Expression ':' Expression)?`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "La condición booleana" },
            { name: "trueExpression", type: "ExpressionNode", description: "Valor si la condición es verdadera" },
            { name: "falseExpression", type: "ExpressionNode", description: "Valor si la condición es falsa" }
        ],
        astMethods: [],
        parsing: `El parser TernaryExpressionParser reconoce el operador ternario '? :'.

**Proceso**:
1. Parsea la expresión de condición
2. Si el token actual es '?':
   - Consume '?'
   - Parsea la expresión verdadera
   - Consume ':'
   - Parsea la expresión falsa
   - Crea TernaryExpressionNode
3. Si no, retorna la expresión de condición

**Ejemplo**:
\`\`\`flowscript
resultado = edad >= 18 ? "Adulto" : "Menor"
\`\`\``,
        semantic: `Valida tipos y condiciones.

**Reglas**:
1. La condición debe ser booleana
2. Las ramas verdadera/falsa deben tener tipos compatibles
3. El tipo resultante es la unión de ambas ramas`,
        codegen: `Genera operador ternario en Java:

\`\`\`java
private String generateTernaryExpression(TernaryExpressionNode node) {
    String condition = generate(node.getCondition());
    String trueExpr = generate(node.getTrueExpression());
    String falseExpr = generate(node.getFalseExpression());

    return "(" + condition + " ? " + trueExpr + " : " + falseExpr + ")";
}
\`\`\``,
        examples: [
            {
                flowscript: "edad >= 18 ? \"Adulto\" : \"Menor\"",
                java: '((edad >= 18) ? "Adulto" : "Menor")',
                explanation: "Operador ternario simple"
            },
            {
                flowscript: "precio > 100 ? precio * 0.9 : precio",
                java: "((precio > 100) ? (precio * 0.9) : precio)",
                explanation: "Ternario con expresiones"
            }
        ]
    },

    "postfix-expression": {
        title: "PostfixExpression",
        category: "Expresiones Especiales",
        grammar: `PostfixExpression = PrimaryExpression PostfixOperator*

PostfixOperator = '.' IDENTIFIER        # PropertyAccess
                | '[' Expression ']'    # IndexAccess
                | '(' ArgumentList? ')' # FunctionCall`,
        astStructure: [
            { name: "primary", type: "ExpressionNode", description: "La expresión primaria base" },
            { name: "operators", type: "List<PostfixOperatorNode>", description: "Lista de operadores postfijos aplicados" }
        ],
        astMethods: [],
        parsing: `El parser PostfixExpressionParser construye cadenas de operaciones.

**Proceso**:
1. Parsea la expresión primaria (PrimaryExpression)
2. Mientras haya operadores postfijos:
   - Si es '.': Parsea PropertyAccess
   - Si es '[': Parsea IndexAccess
   - Si es '(': Parsea FunctionCall
   - Agrega el operador a la lista
3. Si no hay operadores, retorna la primaria
4. Si hay operadores, crea PostfixExpressionNode

**Ejemplo de cadena**:
\`\`\`flowscript
usuario.nombre.longitud()
\`\`\`
→ Base: usuario → .nombre → .longitud → ()`,
        semantic: `Valida cada operador en secuencia.

**Validaciones progresivas**:
1. Cada operador valida el tipo del resultado anterior
2. PropertyAccess requiere objeto
3. IndexAccess requiere lista/mapa
4. FunctionCall requiere función`,
        codegen: `Genera cadena de operaciones en Java:

\`\`\`java
private String generatePostfixExpression(PostfixExpressionNode node) {
    StringBuilder result = new StringBuilder(generate(node.getPrimary()));

    for (PostfixOperatorNode op : node.getOperators()) {
        if (op instanceof PropertyAccessOperatorNode) {
            result.append(".get(\\"").append(prop.getPropertyName()).append("\\")");
        } else if (op instanceof IndexAccessOperatorNode) {
            result.append(".get(").append(generate(index)).append(")");
        } else if (op instanceof FunctionCallOperatorNode) {
            String args = /* generate args */;
            result.append("(").append(args).append(")");
        }
    }

    return result.toString();
}
\`\`\``,
        examples: [
            {
                flowscript: "usuario.nombre",
                java: 'usuario.get("nombre")',
                explanation: "Acceso a propiedad"
            },
            {
                flowscript: "lista[0]",
                java: "lista.get(0)",
                explanation: "Acceso por índice"
            },
            {
                flowscript: "calcular()",
                java: "calcular()",
                explanation: "Llamada a función"
            },
            {
                flowscript: "usuarios[i].nombre.longitud()",
                java: 'usuarios.get(i).get("nombre").longitud()',
                explanation: "Cadena de operaciones"
            }
        ]
    },

    // ========== OPERACIONES ESPECIALES ==========

    "db-execute": {
        title: "db.ejecutar() - Database Execute",
        category: "Operaciones Especiales",
        grammar: `DbExecute = 'db' '.' 'ejecutar' '(' Expression ',' Expression ')'

# Sintaxis:
db.ejecutar(query: texto, params: lista) -> entero`,
        astStructure: [
            { name: "query", type: "ExpressionNode", description: "Expresión que produce la consulta SQL (string)" },
            { name: "parameters", type: "ExpressionNode", description: "Expresión que produce la lista de parámetros" }
        ],
        astMethods: [],
        parsing: `El parser reconoce 'db.ejecutar' como una operación especial.

**Proceso**:
1. Parsea 'db' como identificador
2. Consume '.'
3. Reconoce 'ejecutar' como operación especial de BD
4. Consume '('
5. Parsea la expresión de query (usualmente string literal)
6. Consume ','
7. Parsea la expresión de parámetros (usualmente lista literal)
8. Consume ')'
9. Crea DbExecuteNode

**Uso típico**:
\`\`\`flowscript
filasAfectadas = db.ejecutar(
    "INSERT INTO usuarios (nombre, email) VALUES (?, ?)",
    [nombre, email]
)
\`\`\``,
        semantic: `El análisis semántico valida la operación de BD.

**Validaciones**:
1. **Query es string**: El primer argumento debe ser texto
2. **Parámetros es lista**: El segundo argumento debe ser lista
3. **Tipo de retorno**: Siempre entero (número de filas afectadas)

**Base de datos**:
- Usa H2 in-memory por defecto
- URL: \`jdbc:h2:mem:flowscript;DB_CLOSE_DELAY=-1\`
- Usuario: \`sa\`, Password: \`""\``,
        codegen: `Genera código JDBC inline usando **Lambda IIFE** (Immediately Invoked Function Expression).

**Patrón Lambda IIFE**:
\`\`\`java
((Supplier<Integer>)(() -> {
    // Código JDBC aquí
    return resultado;
})).get()
\`\`\`

**Implementación completa**:
\`\`\`java
private String generateDbExecute(DbExecuteNode node) {
    String query = generate(node.getQuery());
    String params = generate(node.getParameters());

    return "((java.util.function.Supplier<Integer>)(() -> {\\n" +
           "        try (java.sql.Connection __conn = " +
           "java.sql.DriverManager.getConnection(" +
           "\\"jdbc:h2:mem:flowscript;DB_CLOSE_DELAY=-1\\", \\"sa\\", \\"\\");" +
           "\\n" +
           "             java.sql.PreparedStatement __stmt = " +
           "__conn.prepareStatement(" + query + ")) {\\n" +
           "            java.util.List<?> __params = " + params + ";\\n" +
           "            for (int i = 0; i < __params.size(); i++) {\\n" +
           "                __stmt.setObject(i + 1, __params.get(i));\\n" +
           "            }\\n" +
           "            int __result = __stmt.executeUpdate();\\n" +
           "            System.out.println(\\"[DB EXECUTE] \\" + " +
           query + " + \\" | Affected rows: \\" + __result);\\n" +
           "            return __result;\\n" +
           "        } catch (java.sql.SQLException __e) {\\n" +
           "            throw new RuntimeException(\\"Database execution " +
           "error: \\" + __e.getMessage(), __e);\\n" +
           "        }\\n" +
           "    })).get()";
}
\`\`\`

**Características**:
- **Try-with-resources**: Auto-cierra Connection y PreparedStatement
- **PreparedStatement**: Previene SQL injection
- **Logging inline**: Imprime query y filas afectadas
- **Exception wrapping**: Convierte SQLException a RuntimeException`,
        examples: [
            {
                flowscript: `db.ejecutar(
    "CREATE TABLE productos (id INT, nombre TEXT)",
    []
)`,
                java: `((java.util.function.Supplier<Integer>)(() -> {
    try (java.sql.Connection __conn = java.sql.DriverManager.getConnection("jdbc:h2:mem:flowscript;DB_CLOSE_DELAY=-1", "sa", "");
         java.sql.PreparedStatement __stmt = __conn.prepareStatement("CREATE TABLE productos (id INT, nombre TEXT)")) {
        java.util.List<?> __params = List.of();
        for (int i = 0; i < __params.size(); i++) {
            __stmt.setObject(i + 1, __params.get(i));
        }
        int __result = __stmt.executeUpdate();
        System.out.println("[DB EXECUTE] CREATE TABLE productos... | Affected rows: " + __result);
        return __result;
    } catch (java.sql.SQLException __e) {
        throw new RuntimeException("Database execution error: " + __e.getMessage(), __e);
    }
})).get()`,
                explanation: "Crear tabla con db.ejecutar"
            },
            {
                flowscript: `db.ejecutar(
    "INSERT INTO productos VALUES (?, ?)",
    [1, "Laptop"]
)`,
                java: `((java.util.function.Supplier<Integer>)(() -> {
    /* ... JDBC code with parameters ... */
    return __result;
})).get()`,
                explanation: "INSERT con parámetros"
            }
        ]
    },

    "db-query": {
        title: "db.consultar() - Database Query",
        category: "Operaciones Especiales",
        grammar: `DbQuery = 'db' '.' 'consultar' '(' Expression ',' Expression ')'

# Sintaxis:
db.consultar(query: texto, params: lista) -> lista`,
        astStructure: [
            { name: "query", type: "ExpressionNode", description: "Consulta SQL (SELECT)" },
            { name: "parameters", type: "ExpressionNode", description: "Lista de parámetros" }
        ],
        astMethods: [],
        parsing: `Similar a db.ejecutar pero reconoce 'consultar'.

**Diferencia clave**:
- \`ejecutar\` → Para INSERT/UPDATE/DELETE (retorna entero)
- \`consultar\` → Para SELECT (retorna lista de objetos)`,
        semantic: `Valida operación de consulta.

**Validaciones**:
1. Query es string
2. Parámetros es lista
3. **Tipo de retorno**: Lista de objetos (List<Map<String, Object>>)

**Estructura de resultado**:
Cada fila es un Map<String, Object> donde:
- Key: Nombre de columna
- Value: Valor de la celda`,
        codegen: `Genera código JDBC para SELECT con Lambda IIFE.

**Implementación**:
\`\`\`java
private String generateDbQuery(DbQueryNode node) {
    String query = generate(node.getQuery());
    String params = generate(node.getParameters());

    return "((java.util.function.Supplier<" +
           "java.util.List<java.util.Map<String, Object>>>)(() -> {\\n" +
           "        java.util.List<java.util.Map<String, Object>> " +
           "__results = new java.util.ArrayList<>();\\n" +
           "        try (java.sql.Connection __conn = " +
           "java.sql.DriverManager.getConnection(...);\\n" +
           "             java.sql.PreparedStatement __stmt = " +
           "__conn.prepareStatement(" + query + ")) {\\n" +
           "            // Set parameters\\n" +
           "            java.util.List<?> __params = " + params + ";\\n" +
           "            for (int i = 0; i < __params.size(); i++) {\\n" +
           "                __stmt.setObject(i + 1, __params.get(i));\\n" +
           "            }\\n" +
           "            // Execute query\\n" +
           "            try (java.sql.ResultSet __rs = __stmt.executeQuery()) {\\n" +
           "                java.sql.ResultSetMetaData __meta = __rs.getMetaData();\\n" +
           "                int __colCount = __meta.getColumnCount();\\n" +
           "                while (__rs.next()) {\\n" +
           "                    java.util.Map<String, Object> __row = " +
           "new java.util.LinkedHashMap<>();\\n" +
           "                    for (int i = 1; i <= __colCount; i++) {\\n" +
           "                        __row.put(__meta.getColumnLabel(i), " +
           "__rs.getObject(i));\\n" +
           "                    }\\n" +
           "                    __results.add(__row);\\n" +
           "                }\\n" +
           "            }\\n" +
           "            System.out.println(\\"[DB QUERY] \\" + " + query +
           " + \\" | Results: \\" + __results.size() + \\" rows\\");\\n" +
           "            return __results;\\n" +
           "        } catch (java.sql.SQLException __e) {\\n" +
           "            throw new RuntimeException(\\"Database query error: \\" " +
           "+ __e.getMessage(), __e);\\n" +
           "        }\\n" +
           "    })).get()";
}
\`\`\`

**Características**:
- **ResultSetMetaData**: Obtiene nombres de columnas dinámicamente
- **LinkedHashMap**: Preserva orden de columnas
- **Loop sobre filas**: Convierte cada fila a Map<String, Object>
- **Logging**: Imprime query y número de resultados`,
        examples: [
            {
                flowscript: `usuarios = db.consultar(
    "SELECT * FROM usuarios WHERE edad > ?",
    [18]
)`,
                java: `((java.util.function.Supplier<List<Map<String, Object>>>)(() -> {
    List<Map<String, Object>> __results = new ArrayList<>();
    try (Connection __conn = DriverManager.getConnection("jdbc:h2:mem:flowscript...");
         PreparedStatement __stmt = __conn.prepareStatement("SELECT * FROM usuarios WHERE edad > ?")) {
        // Set parameters
        List<?> __params = List.of(18);
        for (int i = 0; i < __params.size(); i++) {
            __stmt.setObject(i + 1, __params.get(i));
        }
        // Execute query and map results
        try (ResultSet __rs = __stmt.executeQuery()) {
            ResultSetMetaData __meta = __rs.getMetaData();
            int __colCount = __meta.getColumnCount();
            while (__rs.next()) {
                Map<String, Object> __row = new LinkedHashMap<>();
                for (int i = 1; i <= __colCount; i++) {
                    __row.put(__meta.getColumnLabel(i), __rs.getObject(i));
                }
                __results.add(__row);
            }
        }
        System.out.println("[DB QUERY] SELECT * FROM usuarios... | Results: " + __results.size() + " rows");
        return __results;
    } catch (SQLException __e) {
        throw new RuntimeException("Database query error: " + __e.getMessage(), __e);
    }
})).get()`,
                explanation: "SELECT con filtro parametrizado"
            }
        ]
    },

    "http-get": {
        title: "http.get() - HTTP GET Request",
        category: "Operaciones Especiales",
        grammar: `HttpGet = 'http' '.' 'get' '(' Expression (',' Expression)? ')'

# Sintaxis:
http.get(url: texto) -> objeto
http.get(url: texto, headers: objeto) -> objeto`,
        astStructure: [
            { name: "url", type: "ExpressionNode", description: "URL del recurso" },
            { name: "headers", type: "ExpressionNode", description: "Headers HTTP opcionales (puede ser null)" }
        ],
        astMethods: [
            { name: "hasHeaders()", returns: "boolean", description: "Verifica si se proporcionaron headers" }
        ],
        parsing: `Parser reconoce 'http.get' con 1 o 2 argumentos.

**Proceso**:
1. Parsea 'http.get'
2. Consume '('
3. Parsea URL (expresión)
4. Si hay coma:
   - Consume ','
   - Parsea headers (objeto)
5. Consume ')'
6. Crea HttpGetNode

**Argumentos opcionales**:
- 1 argumento: Solo URL
- 2 argumentos: URL + headers`,
        semantic: `Valida request HTTP GET.

**Validaciones**:
1. URL es string
2. Headers (si existe) es objeto Map<String, Object>
3. **Tipo de retorno**: Objeto con campos:
   - \`status: entero\` - Código HTTP (200, 404, etc.)
   - \`body: texto\` - Cuerpo de la respuesta
   - \`error: texto\` - Mensaje de error (si falla)`,
        codegen: `Genera código HTTP usando java.net.http.HttpClient con Lambda IIFE.

**Implementación**:
\`\`\`java
private String generateHttpGet(HttpGetNode node) {
    String url = generate(node.getUrl());
    String headers = node.hasHeaders() ?
        generate(node.getHeaders()) : "null";

    return "((java.util.function.Supplier<" +
           "java.util.Map<String, Object>>)(() -> {\\n" +
           "        try {\\n" +
           "            java.net.http.HttpClient __client = " +
           "java.net.http.HttpClient.newBuilder()\\n" +
           "                .connectTimeout(java.time.Duration.ofSeconds(30))\\n" +
           "                .build();\\n" +
           "            java.net.http.HttpRequest.Builder __builder = " +
           "java.net.http.HttpRequest.newBuilder()\\n" +
           "                .uri(java.net.URI.create(" + url + "))\\n" +
           "                .GET()\\n" +
           "                .timeout(java.time.Duration.ofSeconds(30));\\n" +
           "            java.util.Map<String, Object> __headers = " +
           headers + ";\\n" +
           "            if (__headers != null) {\\n" +
           "                for (java.util.Map.Entry<String, Object> __h : " +
           "__headers.entrySet()) {\\n" +
           "                    __builder.header(__h.getKey(), " +
           "String.valueOf(__h.getValue()));\\n" +
           "                }\\n" +
           "            }\\n" +
           "            java.net.http.HttpRequest __request = __builder.build();\\n" +
           "            java.net.http.HttpResponse<String> __response = " +
           "__client.send(__request, " +
           "java.net.http.HttpResponse.BodyHandlers.ofString());\\n" +
           "            java.util.Map<String, Object> __result = " +
           "new java.util.LinkedHashMap<>();\\n" +
           "            __result.put(\\"status\\", __response.statusCode());\\n" +
           "            __result.put(\\"body\\", __response.body());\\n" +
           "            System.out.println(\\"[HTTP GET] \\" + " + url +
           " + \\" | Status: \\" + __response.statusCode());\\n" +
           "            return __result;\\n" +
           "        } catch (Exception __e) {\\n" +
           "            java.util.Map<String, Object> __error = " +
           "new java.util.LinkedHashMap<>();\\n" +
           "            __error.put(\\"status\\", 0);\\n" +
           "            __error.put(\\"error\\", __e.getMessage());\\n" +
           "            return __error;\\n" +
           "        }\\n" +
           "    })).get()";
}
\`\`\`

**Características**:
- **HttpClient (Java 11+)**: Cliente HTTP moderno
- **Timeouts**: 30 segundos para conexión y request
- **Headers dinámicos**: Itera sobre mapa de headers
- **Error handling**: Retorna objeto con status=0 y error en caso de falla
- **Logging**: Imprime URL y status code`,
        examples: [
            {
                flowscript: `respuesta = http.get("https://api.ejemplo.com/usuarios/1")`,
                java: `((java.util.function.Supplier<Map<String, Object>>)(() -> {
    try {
        HttpClient __client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(30))
            .build();
        HttpRequest __request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.ejemplo.com/usuarios/1"))
            .GET()
            .timeout(Duration.ofSeconds(30))
            .build();
        HttpResponse<String> __response = __client.send(__request, HttpResponse.BodyHandlers.ofString());
        Map<String, Object> __result = new LinkedHashMap<>();
        __result.put("status", __response.statusCode());
        __result.put("body", __response.body());
        System.out.println("[HTTP GET] https://api.ejemplo.com/usuarios/1 | Status: " + __response.statusCode());
        return __result;
    } catch (Exception __e) {
        Map<String, Object> __error = new LinkedHashMap<>();
        __error.put("status", 0);
        __error.put("error", __e.getMessage());
        return __error;
    }
})).get()`,
                explanation: "GET simple sin headers"
            },
            {
                flowscript: `respuesta = http.get(
    "https://api.ejemplo.com/datos",
    {"Authorization": "Bearer token123"}
)`,
                java: `/* Similar but with headers loop */`,
                explanation: "GET con headers de autenticación"
            }
        ]
    },

    "http-post": {
        title: "http.post() - HTTP POST Request",
        category: "Operaciones Especiales",
        grammar: `HttpPost = 'http' '.' 'post' '(' Expression ',' Expression (',' Expression)? ')'

# Sintaxis:
http.post(url: texto, body: objeto) -> objeto
http.post(url: texto, body: objeto, headers: objeto) -> objeto`,
        astStructure: [
            { name: "url", type: "ExpressionNode", description: "URL del endpoint" },
            { name: "body", type: "ExpressionNode", description: "Cuerpo de la petición (objeto)" },
            { name: "headers", type: "ExpressionNode", description: "Headers HTTP opcionales" }
        ],
        astMethods: [
            { name: "hasHeaders()", returns: "boolean", description: "Verifica si hay headers" }
        ],
        parsing: `Parser reconoce 'http.post' con 2 o 3 argumentos.

**Argumentos**:
- Obligatorios: url, body
- Opcional: headers

**Body serialization**:
El body se serializa automáticamente a JSON usando Gson.`,
        semantic: `Valida POST request.

**Validaciones**:
1. URL es string
2. Body es objeto (será serializado a JSON)
3. Headers (opcional) es objeto
4. **Tipo de retorno**: Objeto con status, body, error`,
        codegen: `Genera código HTTP POST con serialización JSON.

**Diferencias vs GET**:
1. Usa Gson para serializar body a JSON
2. Establece header \`Content-Type: application/json\`
3. Usa \`.POST(BodyPublishers.ofString(jsonBody))\`

**Implementación**:
\`\`\`java
return "((java.util.function.Supplier<...>)(() -> {\\n" +
       "        try {\\n" +
       "            com.google.gson.Gson __gson = new com.google.gson.Gson();\\n" +
       "            String __jsonBody = __gson.toJson(" + body + ");\\n" +
       "            HttpClient __client = HttpClient.newBuilder()...\\n" +
       "            HttpRequest.Builder __builder = HttpRequest.newBuilder()\\n" +
       "                .uri(URI.create(" + url + "))\\n" +
       "                .POST(HttpRequest.BodyPublishers.ofString(__jsonBody))\\n" +
       "                .header(\\"Content-Type\\", \\"application/json\\")...\\n" +
       "            // ... similar a GET\\n" +
       "        }\\n" +
       "    })).get()";
\`\`\`

**Nota**: Requiere Gson en classpath para serialización JSON.`,
        examples: [
            {
                flowscript: `respuesta = http.post(
    "https://api.ejemplo.com/usuarios",
    {nombre: "Juan", edad: 25}
)`,
                java: `((java.util.function.Supplier<Map<String, Object>>)(() -> {
    try {
        Gson __gson = new Gson();
        String __jsonBody = __gson.toJson(new HashMap<String, Object>() {{
            put("nombre", "Juan");
            put("edad", 25);
        }});
        HttpClient __client = HttpClient.newBuilder().build();
        HttpRequest __request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.ejemplo.com/usuarios"))
            .POST(HttpRequest.BodyPublishers.ofString(__jsonBody))
            .header("Content-Type", "application/json")
            .build();
        HttpResponse<String> __response = __client.send(__request, HttpResponse.BodyHandlers.ofString());
        Map<String, Object> __result = new LinkedHashMap<>();
        __result.put("status", __response.statusCode());
        __result.put("body", __response.body());
        System.out.println("[HTTP POST] ... | Status: " + __response.statusCode());
        return __result;
    } catch (Exception __e) {
        /* error handling */
    }
})).get()`,
                explanation: "POST con objeto serializado a JSON"
            }
        ]
    },

    "http-delete": {
        title: "http.delete() - HTTP DELETE Request",
        category: "Operaciones Especiales",
        grammar: `HttpDelete = 'http' '.' 'delete' '(' Expression (',' Expression)? ')'

# Sintaxis:
http.delete(url: texto) -> objeto
http.delete(url: texto, headers: objeto) -> objeto`,
        astStructure: [
            { name: "url", type: "ExpressionNode", description: "URL del recurso a eliminar" },
            { name: "headers", type: "ExpressionNode", description: "Headers HTTP opcionales" }
        ],
        astMethods: [
            { name: "hasHeaders()", returns: "boolean", description: "Verifica si hay headers" }
        ],
        parsing: `Similar a http.get pero con método DELETE.

**Uso típico**:
\`\`\`flowscript
respuesta = http.delete("https://api.ejemplo.com/usuarios/123")
\`\`\``,
        semantic: `Valida DELETE request.

**Validaciones**:
1. URL es string
2. Headers (opcional) es objeto
3. **Tipo de retorno**: Objeto con status, body, error`,
        codegen: `Genera código HTTP DELETE (casi idéntico a GET).

**Diferencia con GET**:
\`\`\`java
.DELETE()  // en lugar de .GET()
\`\`\`

**Todo lo demás es igual**:
- Mismo timeout (30s)
- Mismo manejo de headers
- Mismo formato de respuesta
- Mismo error handling

**Logging**:
\`\`\`java
System.out.println("[HTTP DELETE] " + url + " | Status: " + status);
\`\`\``,
        examples: [
            {
                flowscript: `respuesta = http.delete("https://api.ejemplo.com/usuarios/123")`,
                java: `((java.util.function.Supplier<Map<String, Object>>)(() -> {
    try {
        HttpClient __client = HttpClient.newBuilder().build();
        HttpRequest __request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.ejemplo.com/usuarios/123"))
            .DELETE()
            .timeout(Duration.ofSeconds(30))
            .build();
        HttpResponse<String> __response = __client.send(__request, HttpResponse.BodyHandlers.ofString());
        Map<String, Object> __result = new LinkedHashMap<>();
        __result.put("status", __response.statusCode());
        __result.put("body", __response.body());
        System.out.println("[HTTP DELETE] ... | Status: " + __response.statusCode());
        return __result;
    } catch (Exception __e) {
        /* error handling */
    }
})).get()`,
                explanation: "DELETE de un recurso por ID"
            },
            {
                flowscript: `respuesta = http.delete(
    "https://api.ejemplo.com/sesiones/actual",
    {"Authorization": "Bearer " + token}
)`,
                java: `/* Similar con headers */`,
                explanation: "DELETE con autenticación"
            }
        ]
    }
};

// Export for use in main documentation
window.nodesData = nodesData;
