# Guía de Implementación del Transpilador RoboLang

Este directorio contiene material educativo para implementar el transpilador de RoboLang a JavaScript.

## Contenido

### 📚 Guía Principal

**`guia_implementacion_transpilador.html`**
- Guía interactiva completa para estudiantes
- Explica CÓMO implementar cada método del visitor
- Muestra código completo SOLO del método REPEAT como ejemplo
- Los demás métodos se explican con el PROCESO de pensamiento, no código directo
- Incluye checklist de implementación completo

## Cómo usar esta guía

### Para Estudiantes

1. Abre `guia_implementacion_transpilador.html` en tu navegador
2. Lee la introducción para entender qué es un transpilador
3. Estudia el método `transpile()` del orquestador
4. Para cada método visitor:
   - Lee la sección "Proceso de Pensamiento"
   - Analiza los pasos de implementación
   - Intenta implementarlo tú mismo ANTES de buscar código
5. Usa el checklist al final para verificar tu implementación

### Filosofía de la Guía

Esta guía sigue el principio: **"Enseñar a pescar, no dar el pescado"**

- ❌ NO te da código completo para copiar
- ✅ SÍ te enseña cómo PENSAR la solución
- ❌ NO resuelve el problema por ti
- ✅ SÍ te guía en el PROCESO de resolución

## Contenido de la Guía

1. **Introducción**: ¿Qué es un Transpilador?
2. **El Método transpile()**: Orquestando las 4 Fases
3. **Estructura del JavaScriptCodeGenerator**
4. **Implementando visitProgram()**
5. **Implementando Statements** (REPEAT con código completo)
6. **Implementando Commands**
7. **Implementando Expressions**
8. **Implementando Values y Literals**
9. **Implementando Funciones (v3.0)**
10. **Métodos Helper**: Indentación y Variables Aleatorias
11. **Checklist de Implementación**

## Ejemplo: Método REPEAT (único con código completo)

La guía muestra el código completo de `visitRepeatStatement()` como referencia, incluyendo:

- Generación de variables aleatorias para loops
- Manejo de indentación
- Procesamiento del cuerpo del loop
- Manejo de loops anidados

Para todos los demás métodos, se explica:
- ¿Qué información tienes disponible?
- ¿Qué debes generar?
- ¿En qué orden?
- ¿Qué casos especiales existen?
- Pasos específicos de implementación

## Recursos Relacionados

En el proyecto principal (`robot_lang`):

- `docs/CODIGO_INTERMEDIO_JS.md` - Especificación de mapeo RoboLang → JavaScript
- `docs/IMPLEMENTACION_CODEGEN.md` - Guía de implementación detallada
- `src/main/java/transpiler/JavaScriptCodeGenerator.java` - Implementación de referencia
- `src/test/java/codegen/` - Tests completos (78 tests)

## Estructura del Transpilador

```
Transpiler.transpile(String roboLangCode)
    ↓
Fase 1: Lexer → List<Token>
    ↓
Fase 2: Parser → ProgramNode (AST)
    ↓
Fase 3: SemanticAnalyzer → SymbolTable
    ↓
Fase 4: JavaScriptCodeGenerator → String (JavaScript)
    ↓
TranspilationResult
```

## Verificación de tu Implementación

Después de implementar, verifica con el checklist:

- ✅ Todos los 27 métodos visitor implementados
- ✅ Código genera JavaScript sintácticamente correcto
- ✅ Indentación correcta en todos los niveles
- ✅ Movimientos usan `await`
- ✅ Comandos de pluma NO usan `await`
- ✅ Variables de loop son aleatorias y únicas
- ✅ Operadores convertidos correctamente (= → ===)
- ✅ Sensores usan `robot.getSensor('...')`
- ✅ Programa completo con header y llamada a main
- ✅ Tests pasan
- ✅ Código ejecuta correctamente en el simulador

## Contacto

Esta guía fue creada para el curso de Teoría de Lenguajes Formales.
Para preguntas sobre el proyecto, consulta con tu instructor.

---

**¡Buena suerte con tu implementación!** 🚀
