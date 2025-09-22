/**
 * Syntax Highlighter for Code Blocks
 * Automatically highlights TypeScript, JavaScript, and BNF grammar
 */

class SyntaxHighlighter {
    constructor() {
        // Java/TypeScript/JavaScript keywords
        this.keywords = [
            'class', 'interface', 'function', 'const', 'let', 'var', 'if', 'else',
            'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return',
            'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'extends',
            'implements', 'abstract', 'static', 'public', 'private', 'protected',
            'import', 'export', 'default', 'from', 'as', 'async', 'await', 'typeof',
            'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined',
            // Java specific keywords
            'package', 'final', 'synchronized', 'volatile', 'transient', 'strictfp',
            'native', 'enum', 'assert', '@Override'
        ];

        // Types (Java and TypeScript)
        this.types = [
            'string', 'number', 'boolean', 'void', 'any', 'never', 'unknown',
            // Java primitive types
            'int', 'double', 'float', 'long', 'short', 'byte', 'char',
            // Java classes
            'String', 'Object', 'Integer', 'Double', 'Boolean', 'Character',
            'List', 'ArrayList', 'HashMap', 'Map', 'Set', 'HashSet',
            'System', 'Scanner', 'File', 'FileReader', 'BufferedReader',
            'RuntimeException', 'Exception', 'IOException',
            // AST classes
            'ASTNode', 'ExpressionNode', 'StatementNode', 'Token', 'TokenType',
            'Parser', 'Lexer', 'IfNode', 'WhileNode', 'BlockNode', 'BinaryOpNode',
            'UnaryOpNode', 'LiteralNode', 'VariableNode', 'AssignmentNode',
            'Visitor', 'Evaluator', 'PrettyPrinter', 'Environment'
        ];

        // BNF operators
        this.bnfOperators = ['::=', '→', '|', '+', '*', '?', 'ε'];
    }

    highlightCode(element) {
        let code = element.textContent;
        
        // Detect language
        const classList = element.className;
        if (classList.includes('bnf') || classList.includes('grammar')) {
            code = this.highlightBNF(code);
        } else {
            code = this.highlightTypeScript(code);
        }
        
        element.innerHTML = code;
    }

    highlightTypeScript(code) {
        // Escape HTML
        code = this.escapeHtml(code);
        
        // Comments
        code = code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
        code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
        
        // Strings
        code = code.replace(/(['"`])((?:\\.|(?!\1).)*?)\1/g, '<span class="string">$1$2$1</span>');
        
        // Numbers
        code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
        
        // Keywords
        this.keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            code = code.replace(regex, '<span class="keyword">$1</span>');
        });
        
        // Types
        this.types.forEach(type => {
            const regex = new RegExp(`\\b(${type})\\b`, 'g');
            code = code.replace(regex, '<span class="type">$1</span>');
        });
        
        // Functions
        code = code.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="function">$1</span>');
        
        // Properties
        code = code.replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, '.<span class="property">$1</span>');
        
        // Operators
        code = code.replace(/([+\-*/%=<>!&|^~?:]+)/g, '<span class="operator">$1</span>');
        
        return code;
    }

    highlightBNF(code) {
        // Escape HTML
        code = this.escapeHtml(code);
        
        // Productions (non-terminals on left side)
        code = code.replace(/^(\w+)\s*(→|::=)/gm, '<span class="grammar-rule">$1</span> <span class="grammar-operator">$2</span>');
        
        // Terminals (quoted strings)
        code = code.replace(/("[^"]*")/g, '<span class="grammar-terminal">$1</span>');
        
        // Non-terminals
        code = code.replace(/\b([A-Z][a-zA-Z]*)\b/g, '<span class="grammar-nonterminal">$1</span>');
        
        // BNF operators
        this.bnfOperators.forEach(op => {
            const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedOp, 'g');
            code = code.replace(regex, `<span class="grammar-operator">${op}</span>`);
        });
        
        return code;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    addLineNumbers(element) {
        const lines = element.textContent.split('\n');
        const numbered = lines.map((line, i) => {
            const lineNum = (i + 1).toString().padStart(3, ' ');
            return `<span class="line-number">${lineNum}</span>${line}`;
        }).join('\n');
        
        element.innerHTML = numbered;
        element.classList.add('with-line-numbers');
    }

    initializeAll() {
        // Auto-highlight all code blocks
        document.querySelectorAll('pre code, .code-block, .code-example, .parser-code, .grammar-example').forEach(element => {
            this.highlightCode(element);
            
            // Add line numbers if requested
            if (element.classList.contains('line-numbers')) {
                this.addLineNumbers(element);
            }
            
            // Add copy button
            this.addCopyButton(element);
        });
    }

    addCopyButton(element) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = '📋 Copiar';
        button.onclick = () => {
            const text = element.textContent;
            navigator.clipboard.writeText(text).then(() => {
                button.textContent = '✅ Copiado!';
                setTimeout(() => {
                    button.textContent = '📋 Copiar';
                }, 2000);
            });
        };
        
        // Wrap in container if needed
        if (!element.parentElement.classList.contains('code-container')) {
            const container = document.createElement('div');
            container.className = 'code-container';
            element.parentElement.insertBefore(container, element);
            container.appendChild(element);
        }
        
        element.parentElement.appendChild(button);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const highlighter = new SyntaxHighlighter();
    highlighter.initializeAll();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SyntaxHighlighter;
}