# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an educational repository for a Spanish-language university course on "Teoría de Lenguajes Formales y Compiladores" (Formal Language Theory and Compilers) at Universidad EAM. The repository contains interactive HTML presentations, educational materials, and a comprehensive parser implementation project.

## Project Structure

### Main Components

- `index.html` - Main course landing page with navigation to all 6 course topics
- `analisislexico/` - Lexical analysis module (14+ HTML slides covering AFD vs Regular Expressions)
- `analisissintactico/` - Syntactic analysis module (13 HTML slides covering Top-Down parsers, AST, BNF grammars)
- `robotlang-parser/` - Complete RoboLang parser implementation guide and exercises
- `ejerciciosintatico/` - Additional syntactic analysis exercises
- `presentacion_analizador_lexico.md` - Markdown source for lexical analyzer presentation
- `presentacion_analizador_sintactico.md` - Markdown source for syntactic analyzer presentation

### RoboLang Parser Project

The `robotlang-parser/` directory is a structured educational project for implementing parsers:

**Core Documentation:**
- `index.html` - Main landing page with 6-section learning path
- `robotlangbnf.html` - Complete BNF grammar specification with visual diagrams
- `ast.html` - AST (Abstract Syntax Tree) architecture guide
- `parsers.html` - Parser construction patterns and examples
- `main-parser.html` - Main Parser.java coordinator explanation
- `testing.html` - Testing methodology for parsers
- `gui.html` - GUI tools for parser debugging and visualization
- `implementation.html` - Complete list of 16 parsers to implement organized by difficulty

**Assignment Structure:**
Students implement 16 parsers organized by complexity:
- 4 Literal Parsers (⭐ Basic)
- 3 Command Parsers (⭐⭐ Medium)
- 5 Expression Parsers (⭐⭐⭐ Advanced)
- 4 Statement Parsers (⭐⭐⭐⭐ Expert)

GitHub Classroom link: https://classroom.github.com/a/op8zExKN

## Development Commands

Since this is a static HTML presentation repository:

**Viewing Content:**
- Open any `.html` file directly in a web browser
- Start from `index.html` for main navigation
- For RoboLang project: start from `robotlang-parser/index.html`

**No Build Required:**
- All HTML files are self-contained with embedded CSS and JavaScript
- No compilation, bundling, or build steps needed
- No package manager dependencies

## Architecture

### Course Module Organization

The course covers 6 topics with progressive complexity:

1. **Análisis Léxico** (Available) - 14 slides, 45-60 min, Java code examples
2. **Análisis Sintáctico** (Available) - 20 pages, 75-90 min, TypeScript code examples
   - Includes RoboLang parser exercises
3. **Análisis Semántico** (Coming soon) - Type checking, symbol tables
4. **Generación de Código** (Coming soon) - Code generation
5. **Herramientas** (Coming soon) - ANTLR, Flex/Bison, DSL construction
6. **Casos Avanzados** (Coming soon) - Error recovery, JIT compilation

### Presentation Design Pattern

Each module follows a consistent pattern:
- **Standalone HTML files**: Each slide is self-contained
- **Embedded styling**: No external CSS dependencies
- **Keyboard navigation**: Arrow keys or Enter/Space to navigate
- **Animations**: CSS transitions for visual engagement
- **Color scheme**: Purple/blue gradients with white text and gold accents
- **Responsive**: Works across different screen sizes

### RoboLang Parser Learning Path

The parser project follows a strict sequential learning structure:

1. **AST Architecture** → Understanding node hierarchy and Composite pattern
2. **Parser Construction** → Learning Parser<T> interface and ParseContext
3. **Main Parser** → Understanding Facade pattern and parser coordination
4. **Testing** → JUnit tests with AAA pattern (Arrange-Act-Assert)
5. **GUI Tools** → Visual debugging with RoboLang IDE
6. **Implementation** → Hands-on coding of 16 parsers

Students must follow this order as each section builds upon previous knowledge.

## Educational Context

### Theoretical Foundations

**Lexical Analysis (Módulo 1):**
- Finite State Automata (AFD - Autómata Finito Determinista)
- Regular expressions for pattern matching
- Maximal munch principle
- Keyword tables and token construction
- Performance: Serialized AFD vs Unified Global AFD approaches

**Syntactic Analysis (Módulo 2):**
- Formal grammars and BNF notation
- Top-Down parsing (recursive descent)
- Abstract Syntax Trees (AST)
- Left recursion elimination
- Error handling and recovery
- RoboLang language specification

### Implementation Technologies

- **Lexical examples**: Java code implementations
- **Syntactic examples**: TypeScript code implementations
- **RoboLang parsers**: Java-based with JUnit testing
- **Visualization**: Custom HTML/CSS/JavaScript GUI tools

### Target Audience

Computer Science and Software Engineering students at Universidad EAM taking "Teoría de Lenguajes Formales" course.

## Content Language

All educational content, code comments, and documentation are in **Spanish**.
