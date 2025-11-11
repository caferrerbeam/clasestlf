// COMPLETE DOCUMENTATION FOR REMAINING NODES - EDUCATIONAL VERSION
// 36 nodos adicionales en formato educativo (sin código de solución)

const remainingNodes = {
    // ========== CONTROL DE FLUJO ==========
    "if-statement": {
        title: "IfStatement (si/sino_si/sino)",
        category: "Control de Flujo",
        grammar: `IfStatement = 'si' Expression Block ('sino_si' Expression Block)* ('sino' Block)?`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "thenStatement", type: "StatementNode", description: "Bloque if" },
            { name: "elseIfClauses", type: "List<ElseIfClauseNode>", description: "sino_si opcionales" },
            { name: "elseStatement", type: "StatementNode", description: "Bloque else opcional" }
        ],
        astMethods: [],
        parsing: `Parsea if-else completo con múltiples sino_si.`,
        semantic: `**🎯**: Validar condición booleana, visitar todos los bloques.

**📁 AST**: \`IfStatementNode.java\``,
        codegen: `**🎯**: Generar \`if-else if-else\` Java.

**Mapeo**:
\`\`\`
FlowScript: si (edad >= 18) { ... } sino { ... }
Java: if (edad >= 18) { ... } else { ... }
\`\`\`

**📁**: \`StatementGenerator.java\`, método \`generateIfStatement()\``,
        examples: [
            { flowscript: "si (x > 0) { return verdadero }", java: "if (x > 0) { return true; }", explanation: "If simple" }
        ]
    },

    "while-statement": {
        title: "WhileStatement (mientras)",
        category: "Control de Flujo",
        grammar: `WhileStatement = 'mientras' Expression Block`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "body", type: "StatementNode", description: "Cuerpo del loop" }
        ],
        astMethods: [],
        parsing: `Parsea \`mientras condicion { ... }\`.`,
        semantic: `**🎯**: Validar condición booleana, visitar cuerpo.`,
        codegen: `**Mapeo**: \`mientras (x < 10)\` → \`while (x < 10)\``,
        examples: [{ flowscript: "mientras (i < 10) { i++ }", java: "while (i < 10) { i++; }", explanation: "While loop" }]
    },

    "for-statement": {
        title: "ForStatement (para)",
        category: "Control de Flujo",
        grammar: `ForStatement = 'para' '(' Statement? ';' Expression? ';' Statement? ')' Block`,
        astStructure: [
            { name: "init", type: "StatementNode", description: "Inicialización" },
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "update", type: "StatementNode", description: "Actualización" },
            { name: "body", type: "StatementNode", description: "Cuerpo" }
        ],
        astMethods: [],
        parsing: `Parsea \`para (i = 0; i < 10; i++) { ... }\`.`,
        semantic: `**🎯**: Validar init, condición, update, body.`,
        codegen: `**Mapeo**: Igual sintaxis que Java.`,
        examples: [{ flowscript: "para (i = 0; i < 10; i++) { }", java: "for (i = 0; i < 10; i++) { }", explanation: "For clásico" }]
    },

    "for-range-statement": {
        title: "ForRangeStatement (para...en)",
        category: "Control de Flujo",
        grammar: `ForRangeStatement = 'para' IDENTIFIER 'en' Expression Block`,
        astStructure: [
            { name: "variable", type: "String", description: "Variable de iteración" },
            { name: "iterable", type: "ExpressionNode", description: "Lista/rango" },
            { name: "body", type: "StatementNode", description: "Cuerpo" }
        ],
        astMethods: [],
        parsing: `Parsea \`para item en lista { ... }\`.`,
        semantic: `**🎯**: Validar iterable, declarar variable en scope.`,
        codegen: `**Mapeo**: \`para x en lista\` → \`for (Object x : (List)lista)\``,
        examples: [{ flowscript: "para x en lista { }", java: "for (Object x : (List)lista) { }", explanation: "For-each" }]
    },

    "try-statement": {
        title: "TryStatement (intentar/capturar)",
        category: "Control de Flujo",
        grammar: `TryStatement = 'intentar' Block 'capturar' '(' IDENTIFIER ')' Block`,
        astStructure: [
            { name: "tryBlock", type: "BlockNode", description: "Bloque try" },
            { name: "catchVar", type: "String", description: "Variable de excepción" },
            { name: "catchBlock", type: "BlockNode", description: "Bloque catch" }
        ],
        astMethods: [],
        parsing: `Parsea \`intentar { ... } capturar (e) { ... }\`.`,
        semantic: `**🎯**: Validar bloques, declarar variable de excepción.`,
        codegen: `**Mapeo**: \`intentar/capturar\` → \`try/catch (Exception e)\``,
        examples: [{ flowscript: "intentar { } capturar (e) { }", java: "try { } catch (Exception e) { }", explanation: "Try-catch" }]
    },

    "return-statement": {
        title: "ReturnStatement (retornar)",
        category: "Control de Flujo",
        grammar: `ReturnStatement = 'retornar' Expression?`,
        astStructure: [{ name: "value", type: "ExpressionNode", description: "Valor a retornar (opcional)" }],
        astMethods: [],
        parsing: `Parsea \`retornar\` o \`retornar expr\`.`,
        semantic: `**🎯**: Validar que esté en función, tipo compatible con return type.`,
        codegen: `**Mapeo**: \`retornar x\` → \`return x\``,
        examples: [{ flowscript: "retornar 42", java: "return 42", explanation: "Return con valor" }]
    },

    "throw-statement": {
        title: "ThrowStatement (lanzar)",
        category: "Control de Flujo",
        grammar: `ThrowStatement = 'lanzar' Expression`,
        astStructure: [{ name: "exception", type: "ExpressionNode", description: "Expresión de excepción" }],
        astMethods: [],
        parsing: `Parsea \`lanzar expr\`.`,
        semantic: `**🎯**: Validar expresión.`,
        codegen: `**Mapeo**: \`lanzar e\` → \`throw new RuntimeException(String.valueOf(e))\``,
        examples: [{ flowscript: 'lanzar "Error"', java: 'throw new RuntimeException("Error")', explanation: "Throw" }]
    },

    "break-statement": {
        title: "BreakStatement (romper)",
        category: "Control de Flujo",
        grammar: `BreakStatement = 'romper'`,
        astStructure: [],
        astMethods: [],
        parsing: `Parsea \`romper\`.`,
        semantic: `**🎯**: Validar que esté en loop.`,
        codegen: `**Mapeo**: \`romper\` → \`break\``,
        examples: [{ flowscript: "romper", java: "break", explanation: "Break" }]
    },

    "continue-statement": {
        title: "ContinueStatement (continuar)",
        category: "Control de Flujo",
        grammar: `ContinueStatement = 'continuar'`,
        astStructure: [],
        astMethods: [],
        parsing: `Parsea \`continuar\`.`,
        semantic: `**🎯**: Validar que esté en loop.`,
        codegen: `**Mapeo**: \`continuar\` → \`continue\``,
        examples: [{ flowscript: "continuar", java: "continue", explanation: "Continue" }]
    },

    // ========== STATEMENTS BÁSICOS ==========
    "block": {
        title: "Block ({ ... })",
        category: "Statements Básicos",
        grammar: `Block = '{' Statement* '}'`,
        astStructure: [{ name: "statements", type: "List<StatementNode>", description: "Lista de statements" }],
        astMethods: [],
        parsing: `Parsea bloque entre llaves.`,
        semantic: `**🎯**: Crear nuevo scope, visitar statements.`,
        codegen: `**Mapeo**: Generar \`{ ... }\` con statements dentro.`,
        examples: [{ flowscript: "{ x = 10\n y = 20 }", java: "{\n    x = 10;\n    y = 20;\n}", explanation: "Bloque" }]
    },

    "expression-statement": {
        title: "ExpressionStatement",
        category: "Statements Básicos",
        grammar: `ExpressionStatement = Expression`,
        astStructure: [{ name: "expression", type: "ExpressionNode", description: "Expresión" }],
        astMethods: [],
        parsing: `Expresión usada como statement.`,
        semantic: `**🎯**: Validar expresión.`,
        codegen: `**Mapeo**: \`expr\` → \`expr;\` (agregar punto y coma)`,
        examples: [{ flowscript: "suma(1, 2)", java: "suma(1, 2);", explanation: "Expresión como statement" }]
    },

    "variable-declaration-statement": {
        title: "VariableDeclarationStatement",
        category: "Statements Básicos",
        grammar: `VariableDeclarationStatement = VariableDeclaration`,
        astStructure: [{ name: "declaration", type: "VariableDeclarationNode", description: "Declaración" }],
        astMethods: [],
        parsing: `Declaración de variable como statement.`,
        semantic: `**🎯**: Procesar declaración.`,
        codegen: `**Mapeo**: Generar declaración Java.`,
        examples: [{ flowscript: "x: entero = 10", java: "int x = 10;", explanation: "Declaración" }]
    },

    // ========== DECLARACIONES ==========
    "program": {
        title: "Program (Nodo raíz)",
        category: "Declaraciones",
        grammar: `Program = Declaration*`,
        astStructure: [{ name: "declarations", type: "List<DeclarationNode>", description: "Declaraciones top-level" }],
        astMethods: [],
        parsing: `Nodo raíz del AST.`,
        semantic: `**🎯**: Crear tabla de símbolos global, visitar declaraciones.`,
        codegen: `**Mapeo**: Generar clase Java con declaraciones.`,
        examples: [{ flowscript: "funcion main() { }", java: "public class Main {\n    public static void main() { }\n}", explanation: "Programa" }]
    },

    "function-declaration": {
        title: "FunctionDeclaration (funcion)",
        category: "Declaraciones",
        grammar: `FunctionDeclaration = 'funcion' IDENTIFIER '(' ParameterList? ')' ('->' Type)? Block`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre" },
            { name: "parameters", type: "List<ParameterNode>", description: "Parámetros" },
            { name: "returnType", type: "TypeNode", description: "Tipo retorno" },
            { name: "body", type: "BlockNode", description: "Cuerpo" }
        ],
        astMethods: [],
        parsing: `Parsea declaración de función.`,
        semantic: `**🎯**: Agregar a tabla, validar parámetros, return type.`,
        codegen: `**Mapeo**: Generar método Java static.`,
        examples: [{ flowscript: "funcion suma(a: entero, b: entero) -> entero { }", java: "public static int suma(int a, int b) { }", explanation: "Función" }]
    },

    "variable-declaration": {
        title: "VariableDeclaration",
        category: "Declaraciones",
        grammar: `VariableDeclaration = IDENTIFIER ':' Type ('=' Expression)?`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre" },
            { name: "type", type: "TypeNode", description: "Tipo" },
            { name: "initializer", type: "ExpressionNode", description: "Inicializador" }
        ],
        astMethods: [],
        parsing: `Parsea \`x: entero = 10\`.`,
        semantic: `**🎯**: Agregar a tabla, validar tipo e inicializador.`,
        codegen: `**Mapeo**: \`x: entero = 10\` → \`int x = 10\``,
        examples: [{ flowscript: "x: entero = 10", java: "int x = 10", explanation: "Variable con init" }]
    },

    "import-declaration": {
        title: "ImportDeclaration (importar)",
        category: "Declaraciones",
        grammar: `ImportDeclaration = 'importar' STRING_LITERAL ('como' IDENTIFIER)?`,
        astStructure: [
            { name: "path", type: "String", description: "Ruta del módulo" },
            { name: "alias", type: "String", description: "Alias opcional" }
        ],
        astMethods: [],
        parsing: `Parsea \`importar "path"\`.`,
        semantic: `**🎯**: Resolver módulo, agregar símbolos.`,
        codegen: `**Mapeo**: \`importar "java.util.List"\` → \`import java.util.List\``,
        examples: [{ flowscript: 'importar "java.util.List"', java: "import java.util.List", explanation: "Import" }]
    },

    // ========== TIPOS Y PARÁMETROS ==========
    "parameter": {
        title: "Parameter",
        category: "Tipos y Parámetros",
        grammar: `Parameter = IDENTIFIER ':' Type`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre" },
            { name: "type", type: "TypeNode", description: "Tipo" }
        ],
        astMethods: [],
        parsing: `Parsea \`x: entero\`.`,
        semantic: `**🎯**: Validar tipo existe.`,
        codegen: `**Mapeo**: \`x: entero\` → \`int x\``,
        examples: [{ flowscript: "x: entero", java: "int x", explanation: "Parámetro" }]
    },

    "parameter-list": {
        title: "ParameterList",
        category: "Tipos y Parámetros",
        grammar: `ParameterList = Parameter (',' Parameter)*`,
        astStructure: [{ name: "parameters", type: "List<ParameterNode>", description: "Lista de parámetros" }],
        astMethods: [],
        parsing: `Lista de parámetros separados por coma.`,
        semantic: `**🎯**: Validar cada parámetro.`,
        codegen: `**Mapeo**: Unir con comas.`,
        examples: [{ flowscript: "a: entero, b: texto", java: "int a, String b", explanation: "Lista parámetros" }]
    },

    "type": {
        title: "Type",
        category: "Tipos y Parámetros",
        grammar: `Type = 'entero' | 'decimal' | 'texto' | 'booleano' | 'lista' | 'objeto'`,
        astStructure: [{ name: "typeName", type: "String", description: "Nombre del tipo" }],
        astMethods: [],
        parsing: `Parsea tipo primitivo.`,
        semantic: `**🎯**: Validar tipo existe.`,
        codegen: `**Mapeo**: \`entero\`→\`int\`, \`texto\`→\`String\`, \`lista\`→\`List\`, \`objeto\`→\`Map\``,
        examples: [{ flowscript: "entero", java: "int", explanation: "Tipo" }]
    },

    // ========== LISTAS DE ARGUMENTOS ==========
    "argument-list": {
        title: "ArgumentList",
        category: "Listas",
        grammar: `ArgumentList = Expression (',' Expression)*`,
        astStructure: [{ name: "arguments", type: "List<ExpressionNode>", description: "Argumentos" }],
        astMethods: [],
        parsing: `Lista de expresiones.`,
        semantic: `**🎯**: Validar cada expresión.`,
        codegen: `**Mapeo**: Unir con comas.`,
        examples: [{ flowscript: "10, 20, 30", java: "10, 20, 30", explanation: "Args" }]
    },

    "expression-list": {
        title: "ExpressionList",
        category: "Listas",
        grammar: `ExpressionList = Expression (',' Expression)*`,
        astStructure: [{ name: "expressions", type: "List<ExpressionNode>", description: "Expresiones" }],
        astMethods: [],
        parsing: `Similar a ArgumentList.`,
        semantic: `**🎯**: Validar expresiones.`,
        codegen: `**Mapeo**: Unir con comas.`,
        examples: [{ flowscript: "1, 2, 3", java: "1, 2, 3", explanation: "Lista expr" }]
    },

    "object-member-list": {
        title: "ObjectMemberList",
        category: "Listas",
        grammar: `ObjectMemberList = ObjectMember (',' ObjectMember)*`,
        astStructure: [{ name: "members", type: "List<ObjectMemberNode>", description: "Miembros" }],
        astMethods: [],
        parsing: `Lista de pares clave:valor.`,
        semantic: `**🎯**: Validar miembros.`,
        codegen: `**Mapeo**: Generar puts en HashMap.`,
        examples: [{ flowscript: 'nombre: "Juan", edad: 30', java: 'put("nombre", "Juan"); put("edad", 30);', explanation: "Miembros objeto" }]
    },

    "object-member": {
        title: "ObjectMember",
        category: "Listas",
        grammar: `ObjectMember = IDENTIFIER ':' Expression`,
        astStructure: [
            { name: "key", type: "String", description: "Clave" },
            { name: "value", type: "ExpressionNode", description: "Valor" }
        ],
        astMethods: [],
        parsing: `Par clave:valor.`,
        semantic: `**🎯**: Validar valor.`,
        codegen: `**Mapeo**: \`nombre: "Juan"\` → \`put("nombre", "Juan")\``,
        examples: [{ flowscript: 'nombre: "Juan"', java: 'put("nombre", "Juan")', explanation: "Miembro" }]
    },

    // ========== PROCESOS BPMN ==========
    "process-declaration": {
        title: "ProcessDeclaration (proceso)",
        category: "Procesos BPMN",
        grammar: `ProcessDeclaration = 'proceso' IDENTIFIER '{' ProcessElement* '}'`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre" },
            { name: "elements", type: "List<ProcessElementNode>", description: "Elementos BPMN" }
        ],
        astMethods: [],
        parsing: `Parsea proceso BPMN.`,
        semantic: `**🎯**: Validar elementos, flujo completo.`,
        codegen: `**Mapeo**: Generar método con lógica de flujo.`,
        examples: [{ flowscript: "proceso MiProceso { }", java: "public static void MiProceso() { }", explanation: "Proceso" }]
    },

    "start-element": {
        title: "StartElement (inicio)",
        category: "Procesos BPMN",
        grammar: `StartElement = 'inicio' IDENTIFIER`,
        astStructure: [{ name: "label", type: "String", description: "Etiqueta" }],
        astMethods: [],
        parsing: `Punto de inicio.`,
        semantic: `**🎯**: Validar único inicio.`,
        codegen: `**Mapeo**: Label Java.`,
        examples: [{ flowscript: "inicio Empezar", java: "// Empezar:", explanation: "Inicio" }]
    },

    "end-element": {
        title: "EndElement (fin)",
        category: "Procesos BPMN",
        grammar: `EndElement = 'fin' IDENTIFIER`,
        astStructure: [{ name: "label", type: "String", description: "Etiqueta" }],
        astMethods: [],
        parsing: `Punto final.`,
        semantic: `**🎯**: Validar alcanzable.`,
        codegen: `**Mapeo**: Return o label.`,
        examples: [{ flowscript: "fin Terminar", java: "return; // Terminar", explanation: "Fin" }]
    },

    "task-element": {
        title: "TaskElement (tarea)",
        category: "Procesos BPMN",
        grammar: `TaskElement = 'tarea' IDENTIFIER Block`,
        astStructure: [
            { name: "label", type: "String", description: "Etiqueta" },
            { name: "body", type: "BlockNode", description: "Código" }
        ],
        astMethods: [],
        parsing: `Tarea con código.`,
        semantic: `**🎯**: Validar bloque.`,
        codegen: `**Mapeo**: Generar bloque con label.`,
        examples: [{ flowscript: "tarea Procesar { }", java: "// Procesar:\n{ }", explanation: "Tarea" }]
    },

    "exclusive-gateway": {
        title: "ExclusiveGateway (gateway exclusivo)",
        category: "Procesos BPMN",
        grammar: `ExclusiveGateway = 'gateway' IDENTIFIER '{' WhenClause+ ElseClause? '}'`,
        astStructure: [
            { name: "label", type: "String", description: "Etiqueta" },
            { name: "whenClauses", type: "List<WhenClauseNode>", description: "Ramas when" },
            { name: "elseClause", type: "ElseClauseNode", description: "Rama else" }
        ],
        astMethods: [],
        parsing: `Gateway con ramas condicionales.`,
        semantic: `**🎯**: Validar condiciones.`,
        codegen: `**Mapeo**: if-else if-else.`,
        examples: [{ flowscript: "gateway Decision { cuando (x > 0) go_to Positivo }", java: "if (x > 0) { goto Positivo; }", explanation: "Gateway" }]
    },

    "parallel-gateway": {
        title: "ParallelGateway (gateway paralelo)",
        category: "Procesos BPMN",
        grammar: `ParallelGateway = 'gateway' IDENTIFIER 'paralelo' '{' ParallelBranch+ JoinClause '}'`,
        astStructure: [
            { name: "label", type: "String", description: "Etiqueta" },
            { name: "branches", type: "List<ParallelBranchNode>", description: "Ramas" },
            { name: "join", type: "JoinClauseNode", description: "Punto de unión" }
        ],
        astMethods: [],
        parsing: `Gateway con ramas paralelas.`,
        semantic: `**🎯**: Validar ramas.`,
        codegen: `**Mapeo**: Ejecutar secuencialmente (simulación).`,
        examples: [{ flowscript: "gateway Paralelo paralelo { rama { } unir go_to Fin }", java: "// Parallel simulation", explanation: "Paralelo" }]
    },

    "goto-statement": {
        title: "GotoStatement (go_to)",
        category: "Procesos BPMN",
        grammar: `GotoStatement = 'go_to' IDENTIFIER`,
        astStructure: [{ name: "target", type: "String", description: "Etiqueta destino" }],
        astMethods: [],
        parsing: `Ir a etiqueta.`,
        semantic: `**🎯**: Validar etiqueta existe.`,
        codegen: `**Mapeo**: \`go_to Label\` → Log entry/exit.`,
        examples: [{ flowscript: "go_to Siguiente", java: '// go_to Siguiente', explanation: "Goto" }]
    },

    "when-clause": {
        title: "WhenClause (cuando)",
        category: "Procesos BPMN",
        grammar: `WhenClause = 'cuando' Expression GotoStatement`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "goto", type: "GotoStatementNode", description: "Destino" }
        ],
        astMethods: [],
        parsing: `Rama condicional.`,
        semantic: `**🎯**: Validar condición.`,
        codegen: `**Mapeo**: if con goto.`,
        examples: [{ flowscript: "cuando (x > 0) go_to Pos", java: "if (x > 0) { /* go_to Pos */ }", explanation: "When" }]
    },

    "else-clause": {
        title: "ElseClause (sino en gateway)",
        category: "Procesos BPMN",
        grammar: `ElseClause = 'sino' GotoStatement`,
        astStructure: [{ name: "goto", type: "GotoStatementNode", description: "Destino" }],
        astMethods: [],
        parsing: `Rama else.`,
        semantic: `**🎯**: OK.`,
        codegen: `**Mapeo**: else con goto.`,
        examples: [{ flowscript: "sino go_to Neg", java: "else { /* go_to Neg */ }", explanation: "Else" }]
    },

    "parallel-branch": {
        title: "ParallelBranch (rama)",
        category: "Procesos BPMN",
        grammar: `ParallelBranch = 'rama' Block`,
        astStructure: [{ name: "body", type: "BlockNode", description: "Código" }],
        astMethods: [],
        parsing: `Rama paralela.`,
        semantic: `**🎯**: Validar bloque.`,
        codegen: `**Mapeo**: Bloque secuencial.`,
        examples: [{ flowscript: "rama { x = 1 }", java: "{ x = 1; } // Rama paralela", explanation: "Rama" }]
    },

    "join-clause": {
        title: "JoinClause (unir)",
        category: "Procesos BPMN",
        grammar: `JoinClause = 'unir' GotoStatement`,
        astStructure: [{ name: "goto", type: "GotoStatementNode", description: "Destino después de unir" }],
        astMethods: [],
        parsing: `Punto de unión.`,
        semantic: `**🎯**: OK.`,
        codegen: `**Mapeo**: Goto después de ramas.`,
        examples: [{ flowscript: "unir go_to Fin", java: "/* unir -> go_to Fin */", explanation: "Join" }]
    },

    // ========== AUXILIARES ==========
    "else-if-clause": {
        title: "ElseIfClause (sino_si)",
        category: "Auxiliares",
        grammar: `ElseIfClause = 'sino_si' Expression Block`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "thenStatement", type: "StatementNode", description: "Bloque" }
        ],
        astMethods: [],
        parsing: `Cláusula sino_si.`,
        semantic: `**🎯**: Validar condición, bloque.`,
        codegen: `**Mapeo**: \`else if\`.`,
        examples: [{ flowscript: "sino_si (x == 0) { }", java: "else if (x == 0) { }", explanation: "Else-if" }]
    },

    "primary-expression": {
        title: "PrimaryExpression",
        category: "Auxiliares",
        grammar: `PrimaryExpression = '(' Expression ')' | Literal | Identifier`,
        astStructure: [{ name: "innerExpression", type: "ExpressionNode", description: "Expresión interna" }],
        astMethods: [],
        parsing: `Expresión base (paréntesis, literal, id).`,
        semantic: `**🎯**: Validar expresión interna.`,
        codegen: `**Mapeo**: Generar expresión (con paréntesis si aplica).`,
        examples: [{ flowscript: "(a + b)", java: "(a + b)", explanation: "Parenthesized" }]
    }
};

// Merge with existing nodes
if (typeof window !== 'undefined' && window.nodesData) {
    Object.assign(window.nodesData, remainingNodes);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = remainingNodes;
}
