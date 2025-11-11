// COMPLETE DOCUMENTATION FOR ALL REMAINING NODES
// This file contains the 42 remaining nodes to complete 100% coverage

const remainingNodes = {
    // ========== CONTROL DE FLUJO (9 nodes) ==========

    "if-statement": {
        title: "IfStatement (si/sino_si/sino)",
        category: "Control de Flujo",
        grammar: `IfStatement = 'si' Expression Block ('sino_si' Expression Block)* ('sino' Block)?`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición booleana" },
            { name: "thenStatement", type: "StatementNode", description: "Bloque si true" },
            { name: "elseIfClauses", type: "List<ElseIfClauseNode>", description: "Lista de sino_si" },
            { name: "elseStatement", type: "StatementNode", description: "Bloque else (opcional)" }
        ],
        astMethods: [],
        parsing: `Parsea estructura if-else completa con múltiples sino_si.`,
        semantic: `Valida que condition sea booleana. Visita todos los bloques.`,
        codegen: `Genera if-else if-else estándar Java con { }`,
        examples: [{flowscript: "si (edad >= 18) { ... } sino { ... }", java: "if ((edad >= 18)) { ... } else { ... }", explanation: "If-else"}]
    },

    "while-statement": {
        title: "WhileStatement (mientras)",
        category: "Control de Flujo",
        grammar: `WhileStatement = 'mientras' Expression Block`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición del bucle" },
            { name: "body", type: "StatementNode", description: "Cuerpo del bucle" }
        ],
        astMethods: [],
        parsing: `Consume 'mientras', condition, y body block.`,
        semantic: `Valida condition booleana. Verifica break/continue válidos.`,
        codegen: `Genera while(condition) { body }`,
        examples: [{flowscript: "mientras (i < 10) { i = i + 1 }", java: "while ((i < 10)) { i = (i + 1); }", explanation: "While loop"}]
    },

    "for-statement": {
        title: "ForStatement (para clásico)",
        category: "Control de Flujo",
        grammar: `ForStatement = 'para' '(' (VariableDeclaration|Expression)? ';' Expression? ';' Expression? ')' Block`,
        astStructure: [
            { name: "init", type: "ASTNode", description: "Inicialización" },
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "update", type: "ExpressionNode", description: "Actualización" },
            { name: "body", type: "StatementNode", description: "Cuerpo" }
        ],
        astMethods: [],
        parsing: `Parsea for(init; cond; update) { body }`,
        semantic: `Valida tipos. Scope para variable de init.`,
        codegen: `Genera for loop Java estándar`,
        examples: [{flowscript: "para (i = 0; i < 10; i = i + 1) { ... }", java: "for (i = 0; (i < 10); i = (i + 1)) { ... }", explanation: "For loop"}]
    },

    "for-range-statement": {
        title: "ForRangeStatement (para-en)",
        category: "Control de Flujo",
        grammar: `ForRangeStatement = 'para' IDENTIFIER 'en' Expression Block`,
        astStructure: [
            { name: "variable", type: "String", description: "Variable de iteración" },
            { name: "iterable", type: "ExpressionNode", description: "Lista/rango" },
            { name: "body", type: "StatementNode", description: "Cuerpo" }
        ],
        astMethods: [],
        parsing: `Parsea para x en lista { body }`,
        semantic: `Valida iterable es lista. Declara variable en scope.`,
        codegen: `Genera for(Type x : iterable) { body }`,
        examples: [{flowscript: "para item en lista { ... }", java: "for (Object item : lista) { ... }", explanation: "For-each"}]
    },

    "try-statement": {
        title: "TryStatement (intentar/capturar)",
        category: "Control de Flujo",
        grammar: `TryStatement = 'intentar' Block 'capturar' '(' IDENTIFIER ')' Block`,
        astStructure: [
            { name: "tryBlock", type: "StatementNode", description: "Bloque try" },
            { name: "catchVariable", type: "String", description: "Variable de excepción" },
            { name: "catchBlock", type: "StatementNode", description: "Bloque catch" }
        ],
        astMethods: [],
        parsing: `Parsea intentar { } capturar (e) { }`,
        semantic: `Valida estructura. Declara variable catch en scope.`,
        codegen: `Genera try { } catch(Exception e) { }`,
        examples: [{flowscript: "intentar { ... } capturar (error) { ... }", java: "try { ... } catch(Exception error) { ... }", explanation: "Try-catch"}]
    },

    "return-statement": {
        title: "ReturnStatement (retornar)",
        category: "Control de Flujo",
        grammar: `ReturnStatement = 'retornar' Expression?`,
        astStructure: [
            { name: "expression", type: "ExpressionNode", description: "Valor a retornar (opcional)" }
        ],
        astMethods: [
            { name: "hasExpression()", returns: "boolean", description: "Si tiene valor de retorno" }
        ],
        parsing: `Consume 'retornar' y expresión opcional.`,
        semantic: `Valida tipo retornado coincide con función. Valida que esté en función.`,
        codegen: `Genera return expression;`,
        examples: [{flowscript: "retornar a + b", java: "return (a + b);", explanation: "Return con valor"}]
    },

    "throw-statement": {
        title: "ThrowStatement (lanzar)",
        category: "Control de Flujo",
        grammar: `ThrowStatement = 'lanzar' Expression`,
        astStructure: [
            { name: "expression", type: "ExpressionNode", description: "Excepción a lanzar" }
        ],
        astMethods: [],
        parsing: `Consume 'lanzar' y expresión.`,
        semantic: `Valida expresión (típicamente string).`,
        codegen: `Genera throw new RuntimeException(expr);`,
        examples: [{flowscript: 'lanzar "Error"', java: 'throw new RuntimeException("Error");', explanation: "Throw exception"}]
    },

    "break-statement": {
        title: "BreakStatement (romper)",
        category: "Control de Flujo",
        grammar: `BreakStatement = 'romper'`,
        astStructure: [],
        astMethods: [],
        parsing: `Consume 'romper'.`,
        semantic: `Valida que esté dentro de loop.`,
        codegen: `Genera break;`,
        examples: [{flowscript: "romper", java: "break;", explanation: "Break loop"}]
    },

    "continue-statement": {
        title: "ContinueStatement (continuar)",
        category: "Control de Flujo",
        grammar: `ContinueStatement = 'continuar'`,
        astStructure: [],
        astMethods: [],
        parsing: `Consume 'continuar'.`,
        semantic: `Valida que esté dentro de loop.`,
        codegen: `Genera continue;`,
        examples: [{flowscript: "continuar", java: "continue;", explanation: "Continue loop"}]
    },

    // ========== STATEMENTS BÁSICOS (3 nodes) ==========

    "block": {
        title: "Block (Bloque { })",
        category: "Statements Básicos",
        grammar: `Block = '{' Statement* '}'`,
        astStructure: [
            { name: "statements", type: "List<StatementNode>", description: "Lista de statements" }
        ],
        astMethods: [
            { name: "isEmpty()", returns: "boolean", description: "Si está vacío" }
        ],
        parsing: `Consume '{', parsea statements hasta '}', consume '}'.`,
        semantic: `Crea nuevo scope. Visita cada statement.`,
        codegen: `Genera { statements }`,
        examples: [{flowscript: "{ a = 1\n b = 2 }", java: "{\n    a = 1;\n    b = 2;\n}", explanation: "Block"}]
    },

    "expression-statement": {
        title: "ExpressionStatement",
        category: "Statements Básicos",
        grammar: `ExpressionStatement = Expression`,
        astStructure: [
            { name: "expression", type: "ExpressionNode", description: "La expresión" }
        ],
        astMethods: [],
        parsing: `Parsea expresión como statement.`,
        semantic: `Valida expresión.`,
        codegen: `Genera expression;`,
        examples: [{flowscript: "calcular(x)", java: "calcular(x);", explanation: "Function call statement"}]
    },

    "variable-declaration-statement": {
        title: "VariableDeclarationStatement",
        category: "Statements Básicos",
        grammar: `VariableDeclarationStatement = IDENTIFIER '=' Expression`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre de variable" },
            { name: "initializer", type: "ExpressionNode", description: "Valor inicial" }
        ],
        astMethods: [],
        parsing: `Parsea nombre = valor.`,
        semantic: `Declara en symbol table. Valida initializer.`,
        codegen: `Genera Type name = initializer; (infiere tipo)`,
        examples: [{flowscript: "x = 10", java: "int x = 10;", explanation: "Variable declaration"}]
    },

    // ========== DECLARACIONES (4 nodes) ==========

    "program": {
        title: "Program (Raíz del AST)",
        category: "Declaraciones de Programa",
        grammar: `Program = Declaration*`,
        astStructure: [
            { name: "declarations", type: "List<DeclarationNode>", description: "Lista de declaraciones top-level" }
        ],
        astMethods: [],
        parsing: `Parsea todas las declaraciones hasta EOF.`,
        semantic: `Valida programa completo. Construye symbol table global.`,
        codegen: `Genera clase Java con package y declaraciones.`,
        examples: [{flowscript: "funcion main() { ... }", java: "public class Generated {\n    public static void main(String[] args) { ... }\n}", explanation: "Program"}]
    },

    "function-declaration": {
        title: "FunctionDeclaration (funcion)",
        category: "Declaraciones de Programa",
        grammar: `FunctionDeclaration = 'funcion' IDENTIFIER '(' ParameterList? ')' ('->' Type)? Block`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre de función" },
            { name: "parameters", type: "List<ParameterNode>", description: "Parámetros" },
            { name: "returnType", type: "String", description: "Tipo de retorno (opcional)" },
            { name: "body", type: "BlockNode", description: "Cuerpo" }
        ],
        astMethods: [],
        parsing: `Parsea funcion nombre(params) -> tipo { body }`,
        semantic: `Registra en symbol table. Valida parámetros únicos. Verifica returns.`,
        codegen: `Genera public static Type nombre(params) { body }`,
        examples: [{flowscript: "funcion suma(a: entero, b: entero) -> entero { retornar a + b }", java: "public static int suma(int a, int b) {\n    return (a + b);\n}", explanation: "Function"}]
    },

    "variable-declaration": {
        title: "VariableDeclaration (Global)",
        category: "Declaraciones de Programa",
        grammar: `VariableDeclaration = IDENTIFIER ':' Type '=' Expression`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre" },
            { name: "type", type: "String", description: "Tipo" },
            { name: "initializer", type: "ExpressionNode", description: "Valor" }
        ],
        astMethods: [],
        parsing: `Parsea nombre: tipo = valor`,
        semantic: `Declara variable global. Valida tipo con initializer.`,
        codegen: `Genera static final Type NAME = initializer;`,
        examples: [{flowscript: "PI: decimal = 3.14159", java: "static final double PI = 3.14159;", explanation: "Constant"}]
    },

    "import-declaration": {
        title: "ImportDeclaration (importar)",
        category: "Declaraciones de Programa",
        grammar: `ImportDeclaration = 'importar' STRING_LITERAL ('como' IDENTIFIER)?`,
        astStructure: [
            { name: "modulePath", type: "String", description: "Path del módulo" },
            { name: "alias", type: "String", description: "Alias (opcional)" }
        ],
        astMethods: [],
        parsing: `Parsea importar "path" como alias`,
        semantic: `Valida que módulo existe. Registra imports.`,
        codegen: `Genera import statement o carga dinámica`,
        examples: [{flowscript: 'importar "utils.fls" como Utils', java: '// import handling', explanation: "Import"}]
    },

    // ========== TIPOS Y PARÁMETROS (3 nodes) ==========

    "parameter": {
        title: "Parameter (Parámetro de función)",
        category: "Tipos y Parámetros",
        grammar: `Parameter = IDENTIFIER ':' Type`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre del parámetro" },
            { name: "type", type: "TypeNode", description: "Tipo del parámetro" }
        ],
        astMethods: [],
        parsing: `Parsea nombre: tipo`,
        semantic: `Valida tipo válido.`,
        codegen: `Genera Type name en firma`,
        examples: [{flowscript: "edad: entero", java: "int edad", explanation: "Parameter"}]
    },

    "parameter-list": {
        title: "ParameterList",
        category: "Tipos y Parámetros",
        grammar: `ParameterList = Parameter (',' Parameter)*`,
        astStructure: [
            { name: "parameters", type: "List<ParameterNode>", description: "Lista de parámetros" }
        ],
        astMethods: [],
        parsing: `Parsea lista separada por comas.`,
        semantic: `Valida nombres únicos.`,
        codegen: `Genera lista de parámetros`,
        examples: [{flowscript: "a: entero, b: entero", java: "int a, int b", explanation: "Param list"}]
    },

    "type": {
        title: "Type (Anotación de tipo)",
        category: "Tipos y Parámetros",
        grammar: `Type = 'entero' | 'decimal' | 'booleano' | 'texto' | 'lista' | 'objeto'`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre del tipo" }
        ],
        astMethods: [],
        parsing: `Parsea keyword de tipo.`,
        semantic: `Valida tipo reconocido.`,
        codegen: `Mapea a tipo Java: entero→int, decimal→double, texto→String, etc.`,
        examples: [{flowscript: "entero", java: "int", explanation: "Type"}]
    },

    // ========== LISTAS DE ARGUMENTOS (4 nodes) ==========

    "argument-list": {
        title: "ArgumentList",
        category: "Listas de Argumentos",
        grammar: `ArgumentList = Expression (',' Expression)*`,
        astStructure: [
            { name: "arguments", type: "List<ExpressionNode>", description: "Lista de argumentos" }
        ],
        astMethods: [],
        parsing: `Parsea expresiones separadas por comas.`,
        semantic: `Valida cada argumento.`,
        codegen: `Genera lista separada por comas`,
        examples: [{flowscript: "5, 10, 15", java: "5, 10, 15", explanation: "Arguments"}]
    },

    "expression-list": {
        title: "ExpressionList",
        category: "Listas de Argumentos",
        grammar: `ExpressionList = Expression (',' Expression)*`,
        astStructure: [
            { name: "expressions", type: "List<ExpressionNode>", description: "Lista de expresiones" }
        ],
        astMethods: [],
        parsing: `Parsea lista de expresiones.`,
        semantic: `Valida cada expresión.`,
        codegen: `Genera lista`,
        examples: [{flowscript: "1, 2, 3", java: "1, 2, 3", explanation: "Expression list"}]
    },

    "object-member-list": {
        title: "ObjectMemberList",
        category: "Listas de Argumentos",
        grammar: `ObjectMemberList = ObjectMember (',' ObjectMember)*`,
        astStructure: [
            { name: "members", type: "List<ObjectMemberNode>", description: "Lista de miembros" }
        ],
        astMethods: [],
        parsing: `Parsea lista de key: value.`,
        semantic: `Valida claves únicas.`,
        codegen: `Genera put() calls`,
        examples: [{flowscript: "nombre: 'Juan', edad: 30", java: 'put("nombre", "Juan"); put("edad", 30);', explanation: "Object members"}]
    },

    "object-member": {
        title: "ObjectMember (key: value)",
        category: "Listas de Argumentos",
        grammar: `ObjectMember = IDENTIFIER ':' Expression`,
        astStructure: [
            { name: "key", type: "String", description: "Clave" },
            { name: "value", type: "ExpressionNode", description: "Valor" }
        ],
        astMethods: [],
        parsing: `Parsea key: value`,
        semantic: `Valida key y value.`,
        codegen: `Genera put("key", value)`,
        examples: [{flowscript: 'nombre: "Juan"', java: 'put("nombre", "Juan")', explanation: "Object member"}]
    },

    // ========== PROCESOS BPMN (11 nodes) ==========

    "process-declaration": {
        title: "ProcessDeclaration (proceso)",
        category: "Procesos BPMN",
        grammar: `ProcessDeclaration = 'proceso' IDENTIFIER '{' ProcessBody '}'`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre del proceso" },
            { name: "elements", type: "List<ProcessElementNode>", description: "Elementos BPMN" }
        ],
        astMethods: [],
        parsing: `Parsea proceso Nombre { elementos }`,
        semantic: `Valida estructura BPMN. Verifica inicio y fin existen.`,
        codegen: `Genera método estático que ejecuta proceso secuencialmente`,
        examples: [{flowscript: "proceso OrdenCompra { inicio → tarea validar → fin }", java: "public static void OrdenCompra() { /* BPMN flow */ }", explanation: "Process"}]
    },

    "start-element": {
        title: "StartElement (inicio)",
        category: "Procesos BPMN",
        grammar: `StartElement = 'inicio' (':' IDENTIFIER)?`,
        astStructure: [
            { name: "label", type: "String", description: "Label (opcional)" }
        ],
        astMethods: [],
        parsing: `Parsea inicio: label`,
        semantic: `Valida solo un inicio por proceso.`,
        codegen: `Genera log de inicio`,
        examples: [{flowscript: "inicio: start", java: 'System.out.println("[INICIO] start");', explanation: "Start"}]
    },

    "end-element": {
        title: "EndElement (fin)",
        category: "Procesos BPMN",
        grammar: `EndElement = 'fin' (':' IDENTIFIER)?`,
        astStructure: [
            { name: "label", type: "String", description: "Label (opcional)" }
        ],
        astMethods: [],
        parsing: `Parsea fin: label`,
        semantic: `Valida al menos un fin.`,
        codegen: `Genera log de fin`,
        examples: [{flowscript: "fin: complete", java: 'System.out.println("[FIN] complete");', explanation: "End"}]
    },

    "task-element": {
        title: "TaskElement (tarea)",
        category: "Procesos BPMN",
        grammar: `TaskElement = 'tarea' IDENTIFIER ':' Block`,
        astStructure: [
            { name: "name", type: "String", description: "Nombre de tarea" },
            { name: "body", type: "BlockNode", description: "Código de tarea" }
        ],
        astMethods: [],
        parsing: `Parsea tarea nombre: { code }`,
        semantic: `Valida body.`,
        codegen: `Genera ejecución de bloque con logs`,
        examples: [{flowscript: "tarea validar: { ... }", java: 'System.out.println("[TAREA] validar"); /* code */', explanation: "Task"}]
    },

    "exclusive-gateway": {
        title: "ExclusiveGateway (gateway exclusivo)",
        category: "Procesos BPMN",
        grammar: `ExclusiveGateway = 'gateway' IDENTIFIER '{' WhenClause+ ElseClause? '}'`,
        astStructure: [
            { name: "gatewayName", type: "String", description: "Nombre" },
            { name: "whenClauses", type: "List<WhenClauseNode>", description: "Condiciones" },
            { name: "elseClause", type: "ElseClauseNode", description: "Else (opcional)" }
        ],
        astMethods: [],
        parsing: `Parsea gateway decisión con cuando/sino.`,
        semantic: `Valida condiciones.`,
        codegen: `Genera if-else if-else con logs`,
        examples: [{flowscript: "gateway decision { cuando (edad >= 18) ir_a adulto }", java: "if ((edad >= 18)) { /* goto adulto */ }", explanation: "Gateway"}]
    },

    "parallel-gateway": {
        title: "ParallelGateway (gateway paralelo)",
        category: "Procesos BPMN",
        grammar: `ParallelGateway = 'parallel' IDENTIFIER '{' ParallelBranch+ JoinClause '}'`,
        astStructure: [
            { name: "gatewayName", type: "String", description: "Nombre" },
            { name: "branches", type: "List<ParallelBranchNode>", description: "Ramas" },
            { name: "joinClause", type: "JoinClauseNode", description: "Join" }
        ],
        astMethods: [],
        parsing: `Parsea parallel con rama y unir.`,
        semantic: `Valida estructura fork-join.`,
        codegen: `Genera ejecución secuencial de ramas (simula paralelo)`,
        examples: [{flowscript: "parallel split { rama A ir_a tarea1 rama B ir_a tarea2 unir ir_a siguiente }", java: "/* execute branches */ /* join */", explanation: "Parallel"}]
    },

    "goto-statement": {
        title: "GotoStatement (ir_a)",
        category: "Procesos BPMN",
        grammar: `GotoStatement = 'ir_a' IDENTIFIER`,
        astStructure: [
            { name: "targetLabel", type: "String", description: "Label destino" }
        ],
        astMethods: [],
        parsing: `Parsea ir_a label`,
        semantic: `Valida que label existe.`,
        codegen: `Genera navegación a elemento (call, continue, etc.)`,
        examples: [{flowscript: "ir_a siguiente", java: "/* goto siguiente */", explanation: "Goto"}]
    },

    "when-clause": {
        title: "WhenClause (cuando)",
        category: "Procesos BPMN",
        grammar: `WhenClause = 'cuando' Expression GotoStatement`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "gotoStatement", type: "GotoStatementNode", description: "Destino" }
        ],
        astMethods: [],
        parsing: `Parsea cuando (cond) ir_a label`,
        semantic: `Valida condición booleana.`,
        codegen: `Genera if (cond) { goto }`,
        examples: [{flowscript: "cuando (aprobado) ir_a procesar", java: "if (aprobado) { /* goto procesar */ }", explanation: "When"}]
    },

    "else-clause": {
        title: "ElseClause (sino en gateway)",
        category: "Procesos BPMN",
        grammar: `ElseClause = 'sino' GotoStatement`,
        astStructure: [
            { name: "gotoStatement", type: "GotoStatementNode", description: "Destino" }
        ],
        astMethods: [],
        parsing: `Parsea sino ir_a label`,
        semantic: `Valida.`,
        codegen: `Genera else { goto }`,
        examples: [{flowscript: "sino ir_a rechazar", java: "else { /* goto rechazar */ }", explanation: "Else"}]
    },

    "parallel-branch": {
        title: "ParallelBranch (rama)",
        category: "Procesos BPMN",
        grammar: `ParallelBranch = 'rama' IDENTIFIER GotoStatement`,
        astStructure: [
            { name: "branchName", type: "String", description: "Nombre rama" },
            { name: "gotoStatement", type: "GotoStatementNode", description: "Destino" }
        ],
        astMethods: [],
        parsing: `Parsea rama nombre ir_a label`,
        semantic: `Valida.`,
        codegen: `Genera ejecución de rama`,
        examples: [{flowscript: "rama A ir_a tarea1", java: "/* execute branch A */", explanation: "Branch"}]
    },

    "join-clause": {
        title: "JoinClause (unir)",
        category: "Procesos BPMN",
        grammar: `JoinClause = 'unir' GotoStatement`,
        astStructure: [
            { name: "gotoStatement", type: "GotoStatementNode", description: "Destino después de join" }
        ],
        astMethods: [],
        parsing: `Parsea unir ir_a label`,
        semantic: `Valida.`,
        codegen: `Genera punto de sincronización`,
        examples: [{flowscript: "unir ir_a siguiente", java: "/* join point */ /* goto siguiente */", explanation: "Join"}]
    },

    // ========== NODOS AUXILIARES (2 nodes) ==========

    "else-if-clause": {
        title: "ElseIfClause (sino_si)",
        category: "Nodos Auxiliares",
        grammar: `ElseIfClause = 'sino_si' Expression Block`,
        astStructure: [
            { name: "condition", type: "ExpressionNode", description: "Condición" },
            { name: "statement", type: "StatementNode", description: "Bloque" }
        ],
        astMethods: [],
        parsing: `Parsea sino_si (cond) { ... }`,
        semantic: `Valida condición booleana.`,
        codegen: `Genera else if (cond) { }`,
        examples: [{flowscript: "sino_si (edad > 12) { ... }", java: "else if ((edad > 12)) { ... }", explanation: "Else-if"}]
    },

    "primary-expression": {
        title: "PrimaryExpression (Parenthesized)",
        category: "Nodos Auxiliares",
        grammar: `PrimaryExpression = '(' Expression ')' | Literal | Identifier`,
        astStructure: [
            { name: "innerExpression", type: "ExpressionNode", description: "Expresión entre paréntesis" }
        ],
        astMethods: [],
        parsing: `Parsea expresión con paréntesis.`,
        semantic: `Valida expresión interna.`,
        codegen: `Genera sin paréntesis (ya incluidos por expresiones)`,
        examples: [{flowscript: "(a + b)", java: "(a + b)", explanation: "Parenthesized"}]
    }
};

// Merge with existing nodes
if (typeof window !== 'undefined' && window.nodesData) {
    Object.assign(window.nodesData, remainingNodes);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = remainingNodes;
}
