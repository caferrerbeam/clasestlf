# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an educational repository for a Spanish-language course on "Teoría de Lenguajes y Compiladores" (Language Theory and Compilers). The project contains interactive HTML presentations covering compiler construction topics, specifically focusing on lexical analysis.

## Project Structure

- `index.html` - Main course landing page with navigation to different topics
- `analisislexico/` - Contains 14+ HTML slides (slide01.html through slide14.html) covering lexical analysis
- `presentacion_analizador_lexico.md` - Markdown source for the lexical analyzer presentation content

## Key Content Areas

### Lexical Analysis Module
- **Topic**: AFD (Finite Automata) vs Regular Expressions for lexical analysis
- **Coverage**: Token construction, keyword handling, maximal munch principle, performance considerations
- **Implementation Strategy**: Covers both serialized AFD approach and unified global AFD approach
- **Language**: Content and examples are in Spanish
- **Target Audience**: Computer Science and Software Engineering students

## Development Commands

Since this is a static HTML presentation repository, there are no build commands, test suites, or compilation steps required. Content can be viewed directly by opening HTML files in a web browser.

## Architecture Notes

### Presentation Flow
- Main index page serves as course navigation hub
- Each slide is a standalone HTML file with embedded CSS and JavaScript
- Slides use modern CSS animations and responsive design
- Navigation between slides typically implemented via JavaScript

### Content Structure
- **Slide 01**: Course introduction and title page
- **Slides 02-14**: Progressive coverage of lexical analysis concepts
- **Special slide**: slide10a.html appears to be an additional/alternative slide

### Styling Approach
- Gradient backgrounds with modern CSS
- Embedded styles in each HTML file (no external CSS dependencies)
- Responsive design with animations
- Color scheme: Purple/blue gradients with white text and gold accents

## Educational Context

This repository implements theoretical computer science concepts related to:
- Finite State Automata (AFD - Autómata Finito Determinista)
- Regular expressions for pattern matching
- Token recognition strategies in compiler design
- Keyword table implementation
- Backtracking vs deterministic approaches in lexical analysis

The content bridges theory with practical implementation considerations for building lexical analyzers in real compilers.