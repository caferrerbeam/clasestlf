// Render node documentation from nodes-data.js

function renderNodeDocumentation() {
    const container = document.getElementById('nodes-content');

    if (!container || !window.nodesData) {
        console.error('Container or nodesData not found');
        return;
    }

    // Render each node
    for (const [nodeId, nodeData] of Object.entries(window.nodesData)) {
        const section = createNodeSection(nodeId, nodeData);
        container.appendChild(section);
    }
}

function createNodeSection(nodeId, data) {
    const section = document.createElement('section');
    section.id = nodeId;
    section.className = 'node-section';

    // Header
    const header = document.createElement('div');
    header.className = 'node-header';
    header.innerHTML = `
        <h2 class="node-title">${data.title}</h2>
        <span class="node-category">${data.category}</span>
    `;
    section.appendChild(header);

    // Grammar
    if (data.grammar) {
        const grammarSection = createSubsection('📖 Gramática', data.grammar, 'grammar-rule');
        section.appendChild(grammarSection);
    }

    // AST Structure
    if (data.astStructure && data.astStructure.length > 0) {
        const astSection = document.createElement('div');
        astSection.className = 'node-subsection';
        astSection.innerHTML = '<h3>🌳 Estructura del Nodo AST</h3>';

        const astDiv = document.createElement('div');
        astDiv.className = 'ast-structure';

        // Fields
        data.astStructure.forEach(field => {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'ast-field';
            fieldDiv.innerHTML = `
                <span class="field-name">${field.name}</span>
                <span class="field-type">${field.type}</span>
                <span class="field-description">${field.description}</span>
            `;
            astDiv.appendChild(fieldDiv);
        });

        // Methods (if any)
        if (data.astMethods && data.astMethods.length > 0) {
            const methodsHeader = document.createElement('h4');
            methodsHeader.textContent = 'Métodos:';
            methodsHeader.style.marginTop = '1rem';
            astDiv.appendChild(methodsHeader);

            data.astMethods.forEach(method => {
                const methodDiv = document.createElement('div');
                methodDiv.className = 'ast-field';
                methodDiv.innerHTML = `
                    <span class="field-name">${method.name}</span>
                    <span class="field-type">${method.returns}</span>
                    <span class="field-description">${method.description}</span>
                `;
                astDiv.appendChild(methodDiv);
            });
        }

        astSection.appendChild(astDiv);
        section.appendChild(astSection);
    }

    // Parsing
    if (data.parsing) {
        const parsingSection = document.createElement('div');
        parsingSection.className = 'node-subsection';
        parsingSection.innerHTML = `
            <h3>⚙️ Análisis Sintáctico (Parser)</h3>
            ${formatMarkdown(data.parsing)}
        `;
        section.appendChild(parsingSection);
    }

    // Semantic Analysis
    if (data.semantic) {
        const semanticSection = document.createElement('div');
        semanticSection.className = 'node-subsection';
        semanticSection.innerHTML = `
            <h3>🔍 Análisis Semántico</h3>
            ${formatMarkdown(data.semantic)}
        `;
        section.appendChild(semanticSection);
    }

    // Code Generation
    if (data.codegen) {
        const codegenSection = document.createElement('div');
        codegenSection.className = 'node-subsection';
        codegenSection.innerHTML = `
            <h3>⚙️ Generación de Código</h3>
            ${formatMarkdown(data.codegen)}
        `;
        section.appendChild(codegenSection);
    }

    // Examples
    if (data.examples && data.examples.length > 0) {
        const examplesSection = document.createElement('div');
        examplesSection.className = 'node-subsection';
        examplesSection.innerHTML = '<h3>💡 Ejemplos</h3>';

        data.examples.forEach((example, index) => {
            const exampleDiv = document.createElement('div');
            exampleDiv.className = 'code-comparison';

            // FlowScript panel
            const flowscriptPanel = document.createElement('div');
            flowscriptPanel.className = 'code-panel';
            flowscriptPanel.innerHTML = '<div class="code-panel-header flowscript">FlowScript</div>';
            const flowscriptPre = document.createElement('pre');
            const flowscriptCode = document.createElement('code');
            flowscriptCode.className = 'language-javascript'; // Similar syntax
            flowscriptCode.textContent = example.flowscript;
            flowscriptPre.appendChild(flowscriptCode);
            flowscriptPanel.appendChild(flowscriptPre);

            // Java panel
            const javaPanel = document.createElement('div');
            javaPanel.className = 'code-panel';
            javaPanel.innerHTML = '<div class="code-panel-header java">Java Generado</div>';
            const javaPre = document.createElement('pre');
            const javaCode = document.createElement('code');
            javaCode.className = 'language-java';
            javaCode.textContent = example.java;
            javaPre.appendChild(javaCode);
            javaPanel.appendChild(javaPre);

            exampleDiv.appendChild(flowscriptPanel);
            exampleDiv.appendChild(javaPanel);

            // Apply syntax highlighting
            if (typeof hljs !== 'undefined') {
                hljs.highlightElement(flowscriptCode);
                hljs.highlightElement(javaCode);
            }

            if (example.explanation) {
                const explanation = document.createElement('p');
                explanation.className = 'text-muted';
                explanation.style.marginTop = '0.5rem';
                explanation.textContent = `📝 ${example.explanation}`;
                exampleDiv.appendChild(explanation);
            }

            examplesSection.appendChild(exampleDiv);
        });

        section.appendChild(examplesSection);
    }

    return section;
}

function createSubsection(title, content, className) {
    const subsection = document.createElement('div');
    subsection.className = 'node-subsection';

    const heading = document.createElement('h3');
    heading.textContent = title;
    subsection.appendChild(heading);

    const contentDiv = document.createElement('div');
    contentDiv.className = className || '';
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.className = 'language-bnf';
    code.textContent = content;
    pre.appendChild(code);
    contentDiv.appendChild(pre);
    subsection.appendChild(contentDiv);

    // Apply syntax highlighting
    if (typeof hljs !== 'undefined') {
        hljs.highlightElement(code);
    }

    return subsection;
}

function formatMarkdown(text) {
    // Code blocks FIRST (before other processing) - handle escaped backticks from template strings
    const codeBlocks = [];

    // Handle escaped backticks: \`\`\` becomes ```
    text = text.replace(/\\`\\`\\`(\w+)?\n([\s\S]*?)\\`\\`\\`/g, (match, lang, code) => {
        const idx = codeBlocks.length;
        codeBlocks.push({ lang: lang || 'java', code });
        return `__CODE_BLOCK_${idx}__`;
    });

    // Handle regular backticks
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const idx = codeBlocks.length;
        codeBlocks.push({ lang: lang || 'java', code });
        return `__CODE_BLOCK_${idx}__`;
    });

    // Simple markdown-like formatting
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); // **bold**
    text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>'); // `code`
    text = text.replace(/\n\n/g, '</p><p>'); // Paragraphs
    text = text.replace(/^- (.+)$/gm, '<li>$1</li>'); // List items

    // Wrap lists
    text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    const result = '<p>' + text + '</p>';

    // Replace code block placeholders with actual HTML
    let finalResult = result.replace(/__CODE_BLOCK_(\d+)__/g, (match, idStr) => {
        const idx = parseInt(idStr);
        const block = codeBlocks[idx];
        if (!block) return match; // Keep placeholder if block not found

        return `</p><div class="code-example" id="code-block-${idx}-container">
            <div class="code-label">${block.lang}</div>
            <pre><code id="code-block-${idx}" class="language-${block.lang}">${escapeHtml(block.code)}</code></pre>
        </div><p>`;
    });

    // Apply syntax highlighting to code blocks after DOM insertion
    setTimeout(() => {
        codeBlocks.forEach((block, idx) => {
            const element = document.getElementById(`code-block-${idx}`);
            if (element && typeof hljs !== 'undefined') {
                hljs.highlightElement(element);
            }
        });
    }, 100);

    return finalResult;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderNodeDocumentation();
        initializeNavigation();
    });
} else {
    renderNodeDocumentation();
    initializeNavigation();
}

// Initialize navigation AFTER sections are rendered
function initializeNavigation() {
    console.log('Initializing navigation...');

    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            console.log('Clicked:', targetId, 'Found element:', !!targetElement);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Highlight current section on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.doc-section, .node-section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    console.log('Navigation initialized. Total sections:', document.querySelectorAll('.node-section').length);
}
