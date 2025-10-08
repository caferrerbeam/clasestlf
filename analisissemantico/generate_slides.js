#!/usr/bin/env node

/**
 * Generador de Slides HTML para Análisis Semántico
 * Lee prompmt.md y genera 23 archivos HTML individuales
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo markdown
const promptContent = fs.readFileSync('prompmt.md', 'utf-8');

// Dividir por páginas
const pages = promptContent.split(/^## Página \d+:/gm);

// Función para aplicar resaltado de sintaxis a código Java
function highlightJavaCode(code) {
    const javaKeywords = [
        'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
        'void', 'int', 'String', 'boolean', 'double', 'float', 'long', 'char', 'byte', 'short',
        'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue',
        'return', 'new', 'this', 'super', 'null', 'true', 'false', 'static', 'final',
        'try', 'catch', 'throw', 'throws', 'finally', 'import', 'package', 'enum'
    ];

    const types = ['Type', 'Symbol', 'SymbolTable', 'SemanticException', 'ASTNode',
                   'BinaryOpNode', 'VariableNode', 'FunctionNode', 'Node', 'Map',
                   'HashMap', 'List', 'ArrayList', 'Token', 'Visitor', 'Scope'];

    // Escapar HTML primero
    let highlighted = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Arrays para guardar los elementos procesados
    const comments = [];
    const strings = [];
    const keywords = [];
    const typeSpans = [];
    const numbers = [];

    // 1. Extraer comentarios
    highlighted = highlighted.replace(/\/\/(.+)$/gm, (match, content) => {
        const placeholder = `###COMMENT_${comments.length}###`;
        comments.push(`<span class="comment">//${content}</span>`);
        return placeholder;
    });

    // 2. Extraer strings
    highlighted = highlighted.replace(/"([^"]*)"/g, (match, content) => {
        const placeholder = `###STRING_${strings.length}###`;
        strings.push(`<span class="string">"${content}"</span>`);
        return placeholder;
    });
    highlighted = highlighted.replace(/'([^']*)'/g, (match, content) => {
        const placeholder = `###STRING_${strings.length}###`;
        strings.push(`<span class="string">'${content}'</span>`);
        return placeholder;
    });

    // 3. Extraer keywords
    javaKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        highlighted = highlighted.replace(regex, (match, p1, offset, string) => {
            // No procesar si está dentro de un placeholder
            if (string.substring(0, offset).match(/###(COMMENT|STRING|KEYWORD|TYPE|NUMBER)_\d+$/)) {
                return match;
            }
            const placeholder = `###KEYWORD_${keywords.length}###`;
            keywords.push(`<span class="keyword">${p1}</span>`);
            return placeholder;
        });
    });

    // 4. Extraer types
    types.forEach(type => {
        const regex = new RegExp(`\\b(${type})\\b`, 'g');
        highlighted = highlighted.replace(regex, (match) => {
            const placeholder = `###TYPE_${typeSpans.length}###`;
            typeSpans.push(`<span class="class">${match}</span>`);
            return placeholder;
        });
    });

    // 5. Extraer numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => {
        const placeholder = `###NUMBER_${numbers.length}###`;
        numbers.push(`<span class="number">${match}</span>`);
        return placeholder;
    });

    // 6. Restaurar todos los placeholders en orden inverso
    numbers.forEach((num, index) => {
        highlighted = highlighted.replace(`###NUMBER_${index}###`, num);
    });
    typeSpans.forEach((type, index) => {
        highlighted = highlighted.replace(`###TYPE_${index}###`, type);
    });
    keywords.forEach((kw, index) => {
        highlighted = highlighted.replace(`###KEYWORD_${index}###`, kw);
    });
    strings.forEach((str, index) => {
        highlighted = highlighted.replace(`###STRING_${index}###`, str);
    });
    comments.forEach((comment, index) => {
        highlighted = highlighted.replace(`###COMMENT_${index}###`, comment);
    });

    return highlighted;
}

// Función helper para procesar contenido de celdas (bold, code, etc)
function processCellContent(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')  // **bold**
        .replace(/`(.+?)`/g, '<code>$1</code>');            // `code`
}

// Función para convertir markdown a HTML correctamente
function markdownToHTML(content) {
    // Extraer y guardar bloques de código PRIMERO
    const codeBlocks = [];
    let processedContent = content.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
        const placeholder = `###CODE_BLOCK_${codeBlocks.length}###`;
        if (lang === 'java') {
            codeBlocks.push(`<div class="code-block">${highlightJavaCode(code)}</div>`);
        } else {
            codeBlocks.push(`<pre><code class="language-${lang || ''}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
        }
        return placeholder;
    });

    // Detectar y convertir TABLAS markdown
    const tables = [];
    processedContent = processedContent.replace(/(\|.+\|\n)+/g, (match) => {
        const tableLines = match.trim().split('\n');
        if (tableLines.length < 2) return match;

        // Primera línea = headers
        const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);

        // Segunda línea debería ser el separador (|---|---|)
        if (!tableLines[1].includes('---')) return match;

        // Resto = filas
        const rows = tableLines.slice(2).map(line =>
            line.split('|').map(cell => cell.trim()).filter(cell => cell)
        );

        let tableHTML = '<table>\n<thead>\n<tr>\n';
        headers.forEach(h => {
            tableHTML += `<th>${processCellContent(h)}</th>\n`;
        });
        tableHTML += '</tr>\n</thead>\n<tbody>\n';

        rows.forEach(row => {
            tableHTML += '<tr>\n';
            row.forEach(cell => {
                tableHTML += `<td>${processCellContent(cell)}</td>\n`;
            });
            tableHTML += '</tr>\n';
        });

        tableHTML += '</tbody>\n</table>';

        const placeholder = `###TABLE_${tables.length}###`;
        tables.push(tableHTML);
        return placeholder;
    });

    // Procesar línea por línea
    const lines = processedContent.split('\n');
    const htmlLines = [];
    let inList = false;
    let listType = null;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Placeholders (tablas, código) - pasar directo sin envolver en <p>
        if (line.match(/^###(TABLE|CODE_BLOCK)_\d+###$/)) {
            if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
            htmlLines.push(line);
        }
        // Headers
        else if (line.match(/^####\s+(.+)/)) {
            if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
            htmlLines.push(`<h4>${line.replace(/^####\s+\*\*(.+?)\*\*/, '$1').replace(/^####\s+/, '')}</h4>`);
        } else if (line.match(/^###\s+(.+)/)) {
            if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
            htmlLines.push(`<h3>${line.replace(/^###\s+\*\*(.+?)\*\*/, '$1').replace(/^###\s+/, '')}</h3>`);
        }
        // Listas desordenadas
        else if (line.match(/^-\s+(.+)/)) {
            const content = line.replace(/^-\s+/, '');
            if (!inList || listType !== 'ul') {
                if (inList) htmlLines.push('</ol>');
                htmlLines.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            htmlLines.push(`<li>${content}</li>`);
        }
        // Listas ordenadas
        else if (line.match(/^\d+\.\s+(.+)/)) {
            const content = line.replace(/^\d+\.\s+/, '');
            if (!inList || listType !== 'ol') {
                if (inList) htmlLines.push('</ul>');
                htmlLines.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            htmlLines.push(`<li>${content}</li>`);
        }
        // Línea vacía - cerrar listas
        else if (line.trim() === '') {
            if (inList) {
                htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>');
                inList = false;
                listType = null;
            }
            // No agregar párrafos vacíos
        }
        // Texto normal
        else if (line.trim() !== '') {
            if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
            htmlLines.push(`<p>${line}</p>`);
        }
    }

    // Cerrar listas abiertas
    if (inList) {
        htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>');
    }

    let html = htmlLines.join('\n');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Restaurar bloques de código
    codeBlocks.forEach((block, index) => {
        html = html.replace(`###CODE_BLOCK_${index}###`, block);
    });

    // Restaurar tablas
    tables.forEach((table, index) => {
        html = html.replace(`###TABLE_${index}###`, table);
    });

    return html;
}

// Función para crear HTML de un slide
function createSlideHTML(pageNumber, content, title) {
    const prevSlide = pageNumber > 1 ? `slide${String(pageNumber - 1).padStart(2, '0')}.html` : '../index.html';
    const nextSlide = pageNumber < 23 ? `slide${String(pageNumber + 1).padStart(2, '0')}.html` : '../index.html';

    // Extraer y guardar diagramas mermaid ANTES de convertir markdown
    const mermaidBlocks = [];
    let contentWithoutMermaid = content.replace(/```mermaid\n([\s\S]+?)```/g, (match, code) => {
        mermaidBlocks.push(code.trim());
        return ''; // Eliminar el bloque mermaid del contenido
    });

    // Convertir markdown a HTML
    const htmlContent = markdownToHTML(contentWithoutMermaid);

    // Generar HTML para los diagramas mermaid
    const mermaidHTML = mermaidBlocks.map(code =>
        `<div class="mermaid">${code}</div>`
    ).join('\n        ');

    const template = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Análisis Semántico - ${title}</title>
    <link rel="stylesheet" href="syntax-highlight.css">
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
            color: white;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            animation: fadeIn 1s ease-out;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-shadow: 0 4px 15px rgba(0,0,0,0.3);
            background: linear-gradient(45deg, #FFD700, #FFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        h2 {
            font-size: 2rem;
            margin: 1.5rem 0 1rem 0;
            color: #FFD700;
        }

        h3 {
            font-size: 1.5rem;
            margin: 1rem 0;
            color: #FFF;
        }

        h4 {
            font-size: 1.2rem;
            margin: 0.8rem 0;
            color: #E0E0E0;
        }

        .content {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .content p {
            margin: 0.8rem 0;
        }

        pre {
            background: rgba(0, 0, 0, 0.3);
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
            margin: 1rem 0;
            border-left: 4px solid #FFD700;
        }

        code {
            font-family: 'Fira Code', 'Cascadia Code', 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            color: #a8e6cf;
        }

        pre code {
            color: #a8e6cf;
        }

        .content code {
            background: rgba(255, 215, 0, 0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            color: #FFD700;
        }

        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 1.5rem;
            border-radius: 10px;
            font-family: 'Fira Code', 'Cascadia Code', 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
            margin: 1rem 0;
            border-left: 4px solid #FFD700;
            white-space: pre-wrap;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            overflow: hidden;
        }

        th, td {
            padding: 0.8rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-align: left;
        }

        th {
            background: rgba(255, 215, 0, 0.3);
            font-weight: bold;
        }

        ul, ol {
            margin-left: 2rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        li {
            margin: 0.5rem 0;
        }

        strong {
            color: #FFD700;
        }

        .mermaid {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            margin: 1.5rem auto;
            max-width: 1400px;
        }

        .highlight {
            background: rgba(255, 215, 0, 0.2);
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #FFD700;
            margin: 1rem 0;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .navigation {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            gap: 15px;
            z-index: 100;
        }

        .nav-btn {
            background: rgba(255,255,255,0.2);
            border: 2px solid rgba(255,255,255,0.3);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s;
            backdrop-filter: blur(10px);
        }

        .nav-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .page-number {
            position: fixed;
            top: 30px;
            right: 30px;
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="page-number">Página ${pageNumber} de 23</div>

    <div class="container">
        <h1>${title}</h1>
        <div class="content">
            ${htmlContent}
        </div>
        ${mermaidHTML ? mermaidHTML : ''}
    </div>

    <div class="navigation">
        ${pageNumber > 1 ? `<a href="${prevSlide}" class="nav-btn">← Anterior</a>` : '<a href="../index.html" class="nav-btn">⌂ Inicio</a>'}
        ${pageNumber < 23 ? `<a href="${nextSlide}" class="nav-btn">Siguiente →</a>` : '<a href="../index.html" class="nav-btn">⌂ Inicio</a>'}
    </div>

    <script>
        mermaid.initialize({ startOnLoad: true, theme: 'default' });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && ${pageNumber} > 1) {
                window.location.href = '${prevSlide}';
            } else if ((e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') && ${pageNumber} < 23) {
                window.location.href = '${nextSlide}';
            } else if (e.key === 'Escape') {
                window.location.href = '../index.html';
            }
        });
    </script>
</body>
</html>`;

    return template;
}

// Parsear páginas
console.log('Generando slides...\n');

// Extraer títulos y contenido de cada página
const pageRegex = /## Página (\d+): (.+?)(?=\n\n|$)([\s\S]+?)(?=\n---\n|## Página|$)/g;
let match;
const pagesData = [];

while ((match = pageRegex.exec(promptContent)) !== null) {
    const [, pageNum, title, content] = match;
    pagesData.push({
        number: parseInt(pageNum),
        title: title.trim(),
        content: content.trim()
    });
}

// Generar archivos HTML
pagesData.forEach(page => {
    const filename = `slide${String(page.number).padStart(2, '0')}.html`;
    const html = createSlideHTML(page.number, page.content, page.title);

    fs.writeFileSync(filename, html);
    console.log(`✓ Generado ${filename}: ${page.title}`);
});

console.log(`\n✅ Generados ${pagesData.length} slides exitosamente!`);
console.log('Archivos creados: slide01.html hasta slide23.html');
