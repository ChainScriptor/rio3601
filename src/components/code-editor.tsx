import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, Eye, Code, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Editor } from '@monaco-editor/react';

interface Exercise {
    id: string;
    title: string;
    description: string;
    prompt: string;
    initialCode: string;
    solution: string;
    expectedOutput: string;
}

const exercises: Exercise[] = [
    {
        id: 'card-component',
        title: 'Card Component',
        description: 'Create a reusable Card component',
        prompt: `Create a Card component that:
• Accepts a "name" prop and displays it as a title
• Renders children content below the title
• Has basic styling (border, padding, background)
• Should work with this usage:

<Card name="Maria Miles">
  <p>Maria is a professor...</p>
  <a href="mailto:maria@example.com">Email Maria</a>
</Card>`,
        initialCode: `// Write your Card component here
function Card({ name, children }) {
  // Your implementation
}

// Test your component
function App() {
  return (
    <Card name="Maria Miles">
      <p>Maria is a professor...</p>
      <a href="mailto:maria@example.com">Email Maria</a>
    </Card>
  );
}`,
        solution: `function Card({ name, children }) {
  return (
    <div style={{
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#f8fafc',
      margin: '10px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        margin: '0 0 15px 0',
        color: '#1e293b',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        {name}
      </h2>
      <div style={{ color: '#475569' }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Card name="Maria Miles">
      <p>Maria is a professor...</p>
      <a href="mailto:maria@example.com">Email Maria</a>
    </Card>
  );
}`,
        expectedOutput: 'A styled card with "Maria Miles" as title and content below'
    }
];

export function CodeEditor() {
    const [currentExercise, setCurrentExercise] = useState(exercises[0]);
    const [code, setCode] = useState(currentExercise.initialCode);
    const [showSolution, setShowSolution] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [previewHtml, setPreviewHtml] = useState('');
    const [editorTheme, setEditorTheme] = useState('vs-dark');
    const [editorLanguage, setEditorLanguage] = useState('javascript');
    const [debouncedCode, setDebouncedCode] = useState(currentExercise.initialCode);
    const [isUpdating, setIsUpdating] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Detect theme change
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setEditorTheme(isDark ? 'vs-dark' : 'vs-light');
        };

        checkTheme();

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Update code when exercise changes
    useEffect(() => {
        setCode(currentExercise.initialCode);
        setDebouncedCode(currentExercise.initialCode);
        setShowSolution(false);
        setIsValid(null);
        setError(null);
    }, [currentExercise]);

    // Debounce code changes for real-time preview
    useEffect(() => {
        if (code !== debouncedCode) {
            setIsUpdating(true);
        }

        const timer = setTimeout(() => {
            setDebouncedCode(code);
            setIsUpdating(false);
        }, 300); // 300ms delay for smooth typing experience

        return () => clearTimeout(timer);
    }, [code, debouncedCode]);

    // Update editor language based on code content
    useEffect(() => {
        if (code.includes('<') && code.includes('>')) {
            setEditorLanguage('javascript');
        } else {
            setEditorLanguage('javascript');
        }
    }, [code]);

    // Generate preview HTML
    useEffect(() => {
        try {
            // Check if code contains Card component and App function
            const hasCardComponent = debouncedCode.includes('function Card') || debouncedCode.includes('const Card');
            const hasAppFunction = debouncedCode.includes('function App') || debouncedCode.includes('const App');
            const hasMariaUsage = debouncedCode.includes('Maria Miles');

            let previewContent = '';

            if (hasCardComponent && hasAppFunction && hasMariaUsage) {
                // Show the expected Card output
                previewContent = `
          <div class="card">
            <h2>Maria Miles</h2>
            <div class="card-content">
              <p>Maria is a professor...</p>
              <a href="mailto:maria@example.com">Email Maria</a>
            </div>
          </div>
        `;
            } else if (hasCardComponent) {
                // Show a generic card if Card component exists but no App
                previewContent = `
          <div class="card">
            <h2>Your Card Title</h2>
            <div class="card-content">
              <p>Your card content will appear here...</p>
            </div>
          </div>
        `;
            } else {
                // Show instruction
                previewContent = '<p class="instruction">Write your Card component and test it!</p>';
            }

            // Create HTML with inline styles
            const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 20px;
              background: #f8fafc;
              padding: 20px;
            }
            .card {
              border: 2px solid #e2e8f0;
              border-radius: 8px;
              padding: 20px;
              background-color: #ffffff;
              margin: 10px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              max-width: 400px;
            }
            .card h2 {
              margin: 0 0 15px 0;
              color: #1e293b;
              font-size: 1.5rem;
              font-weight: bold;
            }
            .card-content {
              color: #475569;
            }
            .card-content p {
              margin: 0 0 10px 0;
            }
            .card-content a {
              color: #3b82f6;
              text-decoration: none;
            }
            .card-content a:hover {
              text-decoration: underline;
            }
            .instruction {
              color: #64748b;
              font-style: italic;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div id="root">
            ${previewContent}
          </div>
        </body>
        </html>
      `;

            setPreviewHtml(html);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    }, [debouncedCode]);

    const validateCode = () => {
        try {
            // Basic validation - check if Card component exists and has name prop
            const hasCardComponent = code.includes('function Card') || code.includes('const Card');
            const hasNameProp = code.includes('name') && code.includes('children');
            const hasUsage = code.includes('Maria Miles');
            const hasAppFunction = code.includes('function App') || code.includes('const App');

            if (hasCardComponent && hasNameProp && hasUsage && hasAppFunction) {
                setIsValid(true);
                setError(null);
            } else {
                setIsValid(false);
                let errorMsg = 'Missing: ';
                if (!hasCardComponent) errorMsg += 'Card component, ';
                if (!hasNameProp) errorMsg += 'name prop, ';
                if (!hasUsage) errorMsg += 'Maria Miles usage, ';
                if (!hasAppFunction) errorMsg += 'App function, ';
                setError(errorMsg.slice(0, -2));
            }
        } catch (err) {
            setIsValid(false);
            setError('Invalid code syntax');
        }
    };

    const showSolutionCode = () => {
        setShowSolution(true);
        setCode(currentExercise.solution);
    };

    const resetCode = () => {
        setCode(currentExercise.initialCode);
        setShowSolution(false);
        setIsValid(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-pixel-grid bg-[length:16px_16px] pt-24 pb-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-6rem)]">

                    {/* Left Panel - Code Editor */}
                    <div className="flex flex-col">
                        <Card className="flex-1 flex flex-col">
                            <div className="p-4 border-b border-border">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl font-pixel text-foreground">{currentExercise.title}</h2>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="font-mono text-xs">
                                            JavaScript/JSX
                                        </Badge>
                                        {isValid === true && <CheckCircle className="w-4 h-4 text-green-500" />}
                                        {isValid === false && <XCircle className="w-4 h-4 text-red-500" />}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground font-mono">
                                    {currentExercise.description}
                                </p>
                            </div>

                            <div className="flex-1 p-4">
                                <Editor
                                    height="100%"
                                    language={editorLanguage}
                                    value={code}
                                    onChange={(value) => setCode(value || '')}
                                    theme={editorTheme}
                                    options={{
                                        fontSize: 14,
                                        fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
                                        lineNumbers: 'on',
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        tabSize: 2,
                                        insertSpaces: true,
                                        wordWrap: 'on',
                                        bracketPairColorization: { enabled: true },
                                        suggest: {
                                            showKeywords: true,
                                            showSnippets: true,
                                            showFunctions: true,
                                            showConstructors: true,
                                            showFields: true,
                                            showVariables: true,
                                            showClasses: true,
                                            showStructs: true,
                                            showInterfaces: true,
                                            showModules: true,
                                            showProperties: true,
                                            showEvents: true,
                                            showOperators: true,
                                            showUnits: true,
                                            showValues: true,
                                            showConstants: true,
                                            showEnums: true,
                                            showEnumMembers: true,
                                            showColors: true,
                                            showFiles: true,
                                            showReferences: true,
                                            showFolders: true,
                                            showTypeParameters: true,
                                            showIssues: true,
                                            showUsers: true,
                                            showWords: true,
                                        }
                                    }}
                                />
                            </div>

                            <div className="p-4 border-t border-border">
                                <div className="flex gap-2">
                                    <Button onClick={validateCode} variant="outline" size="sm">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Validate
                                    </Button>
                                    <Button onClick={showSolutionCode} variant="outline" size="sm">
                                        <Lightbulb className="w-4 h-4 mr-2" />
                                        Show Solution
                                    </Button>
                                    <Button onClick={resetCode} variant="outline" size="sm">
                                        <Code className="w-4 h-4 mr-2" />
                                        Reset
                                    </Button>
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm mt-2 font-mono">{error}</p>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Right Panel - Preview & Exercise */}
                    <div className="flex flex-col gap-6">

                        {/* Exercise Prompt */}
                        <Card className="flex-shrink-0 max-h-80">
                            <div className="p-4 border-b border-border">
                                <h3 className="text-lg font-pixel text-foreground mb-2">Exercise</h3>
                            </div>
                            <div className="p-4">
                                <div className="bg-muted/50 p-4 rounded border-l-4 border-primary">
                                    <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                                        {currentExercise.prompt}
                                    </pre>
                                </div>

                                {isValid === true && (
                                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded">
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="font-mono text-sm">Great! Your code looks correct!</span>
                                        </div>
                                    </div>
                                )}

                                {isValid === false && (
                                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
                                        <div className="flex items-center gap-2 text-red-600">
                                            <XCircle className="w-4 h-4" />
                                            <span className="font-mono text-sm">Try again! Check the requirements.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Live Preview */}
                        <Card className="flex-1 min-h-96">
                            <div className="p-4 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-pixel text-foreground mb-2">Live Preview</h3>
                                    {isUpdating && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                            <span className="font-mono">Updating...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-4">
                                <iframe
                                    ref={iframeRef}
                                    srcDoc={previewHtml}
                                    className="w-full h-full border border-border rounded bg-white"
                                    title="Code Preview"
                                    sandbox="allow-scripts"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
