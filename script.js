const detailsData = {
    java: {
        title: "Java",
        pros: [
            {
                text: "Platform Independence",
                description: "Java's 'Write Once, Run Anywhere' capability allows code compiled on one machine to run on any other machine with a Java Virtual Machine (JVM).",
                example: "// Compiles to bytecode, runs on JVM\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}"
            },
            {
                text: "Robust Ecosystem",
                description: "Decades of development have produced a massive library of frameworks (Spring, Hibernate) and tools for every conceivable use case.",
                example: null
            },
            {
                text: "Strong Typing",
                description: "Statically typed variables catch errors at compile-time, leading to more reliable and maintainable large-scale applications.",
                example: "int count = 10;\n// count = \"string\"; // Compile-time error"
            },
            {
                text: "Multithreading",
                description: "Built-in support for multithreading allows for concurrent execution of two or more parts of a program for maximum CPU utilization.",
                example: "Thread t = new Thread(() -> {\n    System.out.println(\"Running in a thread\");\n});\nt.start();"
            }
        ],
        cons: [
            {
                text: "Verbose Syntax",
                description: "Requires more lines of code to accomplish tasks compared to Python or Go, which can increase development time.",
                example: "public class Main {\n    public static void main(String[] args) {\n        // Boilerplate just to print\n    }\n}"
            },
            {
                text: "Slower Startup",
                description: "The JVM takes time to initialize and load classes, making it less ideal for short-lived serverless functions.",
                example: null
            },
            {
                text: "Memory Consumption",
                description: "Java applications generally consume more memory due to the JVM overhead and object management.",
                example: null
            }
        ],
        useCases: "Enterprise backends, Android apps, Big Data processing (Hadoop, Spark)"
    },
    go: {
        title: "Go (Golang)",
        pros: [
            {
                text: "Fast Compilation & Execution",
                description: "Compiles directly to machine code very quickly, offering performance close to C++ with faster build times.",
                example: "// Compiles to a single binary\npackage main\nimport \"fmt\"\nfunc main() {\n    fmt.Println(\"Fast!\")\n}"
            },
            {
                text: "Concurrency (Goroutines)",
                description: "Goroutines are lightweight threads managed by the Go runtime, allowing thousands of concurrent operations with minimal overhead.",
                example: "go func() {\n    fmt.Println(\"I'm a goroutine\")\n}()"
            },
            {
                text: "Simplicity",
                description: "Designed with a small feature set to be easy to learn and read, avoiding 'magic' code.",
                example: null
            },
            {
                text: "Static Binary",
                description: "Compiles into a single static binary with all dependencies included, making deployment trivial.",
                example: "# Just copy the binary and run\n./myapp"
            }
        ],
        cons: [
            {
                text: "Lack of Generics (Historical)",
                description: "While recently added, the ecosystem is still adapting, and it can be less expressive than Java's generics.",
                example: null
            },
            {
                text: "Smaller Ecosystem",
                description: "Fewer libraries and frameworks compared to Java or Python, though growing rapidly for cloud-native tech.",
                example: null
            },
            {
                text: "Error Handling",
                description: "Explicit error checking can lead to verbose code patterns.",
                example: "if err != nil {\n    return err\n}"
            }
        ],
        useCases: "Microservices, Cloud-native apps (Kubernetes, Docker), System tools"
    },
    python: {
        title: "Python",
        pros: [
            {
                text: "Readability",
                description: "Syntax designed to be readable and clean, often resembling English pseudo-code.",
                example: "def greet(name):\n    return f\"Hello, {name}\""
            },
            {
                text: "Massive Libraries",
                description: "Unmatched ecosystem for Data Science (Pandas), AI (PyTorch), and Web (Django).",
                example: "import pandas as pd\ndf = pd.read_csv('data.csv')"
            },
            {
                text: "Versatility",
                description: "Used everywhere from web servers to scripts to scientific computing.",
                example: null
            }
        ],
        cons: [
            {
                text: "Slower Execution",
                description: "As an interpreted language, it is significantly slower than compiled languages like Java or Go.",
                example: null
            },
            {
                text: "GIL (Global Interpreter Lock)",
                description: "A mutex that allows only one thread to hold control of the Python interpreter, limiting true parallelism.",
                example: null
            },
            {
                text: "Runtime Errors",
                description: "Dynamic typing means type errors are often caught only when the code is actually executed.",
                example: "x = 10\nx = \"string\" # Valid, but risky"
            }
        ],
        useCases: "Data Science, AI/ML, Web Development, Scripting, Education"
    }
};

const codeExamples = {
    "HTTP Server": {
        java: `import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.io.OutputStream;

public class Server {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(
            new InetSocketAddress(8080), 0
        );
        server.createContext("/", exchange -> {
            byte[] res = "Hello, World!".getBytes();
            exchange.sendResponseHeaders(200, res.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(res);
            }
        });
        server.start();
        System.out.println("Listening on :8080");
    }
}`,
        go: `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Listening on :8080")
    http.ListenAndServe(":8080", nil)
}`,
        python: `from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Hello, World!")

    def log_message(self, format, *args):
        pass  # silence default logging

if __name__ == "__main__":
    server = HTTPServer(("", 8080), Handler)
    print("Listening on :8080")
    server.serve_forever()`
    },
    "File I/O": {
        java: `import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

Path path = Path.of("data.txt");

// Read all lines
List<String> lines = Files.readAllLines(path);
lines.forEach(System.out::println);

// Write (creates or overwrites)
Files.writeString(path, "Hello, File!\\n");

// Append to existing file
Files.writeString(path, "More content",
    StandardOpenOption.APPEND);`,
        go: `import (
    "fmt"
    "os"
)

// Read entire file
data, err := os.ReadFile("data.txt")
if err != nil {
    panic(err)
}
fmt.Println(string(data))

// Write file (creates or truncates)
err = os.WriteFile(
    "data.txt",
    []byte("Hello, File!\\n"),
    0644,
)
if err != nil {
    panic(err)
}`,
        python: `# Read all lines
with open("data.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        print(line.strip())

# Write to file (creates or overwrites)
with open("data.txt", "w") as f:
    f.write("Hello, File!\\n")

# Append to existing file
with open("data.txt", "a") as f:
    f.write("More content")`
    },
    "Concurrency": {
        java: `import java.util.concurrent.*;

ExecutorService pool =
    Executors.newFixedThreadPool(4);

// Submit tasks asynchronously
Future<String> f1 = pool.submit(() -> "Task 1 done");
Future<String> f2 = pool.submit(() -> "Task 2 done");
Future<String> f3 = pool.submit(() -> "Task 3 done");

// Block until each result is ready
System.out.println(f1.get());
System.out.println(f2.get());
System.out.println(f3.get());

pool.shutdown();`,
        go: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go worker(i, &wg) // launch goroutine
    }
    wg.Wait() // block until all done
}`,
        python: `import asyncio

async def worker(id):
    await asyncio.sleep(0)  # yield to event loop
    return f"Worker {id} done"

async def main():
    # Launch all tasks concurrently
    tasks = [worker(i) for i in range(5)]
    results = await asyncio.gather(*tasks)
    for r in results:
        print(r)

asyncio.run(main())`
    },
    "Error Handling": {
        java: `import java.io.*;
import java.nio.file.*;

public String readFile(String path) {
    try {
        return Files.readString(Path.of(path));
    } catch (NoSuchFileException e) {
        System.err.println("Not found: " + path);
        return null;
    } catch (IOException e) {
        throw new RuntimeException(
            "Read failed: " + e.getMessage(), e);
    } finally {
        // Runs whether or not an exception occurred
        System.out.println("Read attempted");
    }
}`,
        go: `import (
    "errors"
    "fmt"
    "os"
)

func readFile(path string) (string, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        if errors.Is(err, os.ErrNotExist) {
            return "", fmt.Errorf("%s: not found", path)
        }
        return "", fmt.Errorf("read %s: %w", path, err)
    }
    return string(data), nil
}

// Caller handles the error explicitly
content, err := readFile("data.txt")
if err != nil {
    log.Fatal(err)
}`,
        python: `def read_file(path):
    try:
        with open(path, "r") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Not found: {path}")
        return None
    except IOError as e:
        raise RuntimeError(
            f"Read failed: {e}") from e
    finally:
        # Runs whether or not an exception occurred
        print("Read attempted")`
    },
    "JSON Parsing": {
        java: `import com.fasterxml.jackson.databind.ObjectMapper;

// Define a record (Java 16+)
record User(String name, int age) {}

ObjectMapper mapper = new ObjectMapper();

// Deserialize JSON string -> object
String json = "{\\"name\\":\\"Alice\\",\\"age\\":30}";
User user = mapper.readValue(json, User.class);
System.out.println(user.name()); // Alice

// Serialize object -> JSON string
String output = mapper.writeValueAsString(user);
System.out.println(output);
// {"name":"Alice","age":30}`,
        go: `import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

// Deserialize JSON bytes -> struct
raw := []byte(\`{"name":"Alice","age":30}\`)
var user User
json.Unmarshal(raw, &user)
fmt.Println(user.Name) // Alice

// Serialize struct -> JSON bytes
output, _ := json.Marshal(user)
fmt.Println(string(output))
// {"name":"Alice","age":30}`,
        python: `import json

# Deserialize JSON string -> dict
raw = '{"name": "Alice", "age": 30}'
user = json.loads(raw)
print(user["name"])  # Alice

# Serialize dict -> JSON string
output = json.dumps(user, indent=2)
print(output)
# {
#   "name": "Alice",
#   "age": 30
# }

# Directly from/to a file
with open("user.json") as f:
    data = json.load(f)`
    }
};

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function getCode(category, lang) {
    return (codeExamples[category] && codeExamples[category][lang])
        ? codeExamples[category][lang]
        : '// No example available';
}

function langDisplayName(lang) {
    return { java: '☕ Java', go: '🐹 Go', python: '🐍 Python' }[lang] || lang;
}

function showDetails(lang) {
    const data = detailsData[lang];
    const modalContent = document.getElementById('modal-content');

    const createListItems = (items) => items.map(item => `
        <li class="detail-item">
            <strong>${item.text}</strong>
            <p class="description">${item.description}</p>
            ${item.example ? `<pre class="code-snippet"><code class="language-${lang}">${escapeHtml(item.example)}</code></pre>` : ''}
        </li>
    `).join('');

    const categories = Object.keys(codeExamples);
    const catButtons = categories.map((cat, i) =>
        `<button class="cat-btn${i === 0 ? ' active' : ''}" onclick="showCategory('${lang}', '${cat}', this)">${cat}</button>`
    ).join('');

    modalContent.innerHTML = `
        <h2 class="modal-title" style="color: var(--${lang}-color)">${data.title}</h2>

        <div class="modal-tabs">
            <button class="tab-btn active" onclick="showTab('overview', '${lang}', this)">Overview</button>
            <button class="tab-btn" onclick="showTab('examples', '${lang}', this)">Code Examples</button>
        </div>

        <div class="tab-panel" id="tab-overview-${lang}">
            <div class="modal-section">
                <h3>Why it shines</h3>
                <ul class="pros-list">${createListItems(data.pros)}</ul>
            </div>
            <div class="modal-section">
                <h3>Trade-offs</h3>
                <ul class="cons-list">${createListItems(data.cons)}</ul>
            </div>
            <div class="modal-section">
                <h3>Best For</h3>
                <p class="use-cases">${data.useCases}</p>
            </div>
        </div>

        <div class="tab-panel hidden" id="tab-examples-${lang}">
            <div class="category-buttons">${catButtons}</div>
            <div class="code-block-wrapper" id="code-display-${lang}"></div>
        </div>
    `;

    modalContent.querySelectorAll('.code-snippet code').forEach(el => hljs.highlightElement(el));
    const catContainer = modalContent.querySelector('.category-buttons');
    if (catContainer) {
        catContainer.setAttribute('role', 'toolbar');
        catContainer.setAttribute('aria-label', 'Code example categories');
        setupArrowNav(catContainer, '.cat-btn');
    }
    renderCodeBlock('code-display-' + lang, lang, categories[0]);
    const overlay = document.getElementById('details-overlay');
    overlay.classList.remove('closing');
    overlay.classList.remove('hidden');
}

function showTab(panel, lang, clickedBtn) {
    clickedBtn.closest('.modal-tabs')
        .querySelectorAll('.tab-btn')
        .forEach(b => b.classList.remove('active'));
    clickedBtn.classList.add('active');

    document.getElementById('tab-overview-' + lang).classList.toggle('hidden', panel !== 'overview');
    document.getElementById('tab-examples-' + lang).classList.toggle('hidden', panel !== 'examples');
}

function showCategory(lang, category, clickedBtn) {
    const container = clickedBtn.closest('.category-buttons');
    container.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('tabindex', '-1');
    });
    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('tabindex', '0');
    renderCodeBlock('code-display-' + lang, lang, category);
}

function setupArrowNav(container, btnClass) {
    const sync = () =>
        container.querySelectorAll(btnClass).forEach(b =>
            b.setAttribute('tabindex', b.classList.contains('active') ? '0' : '-1'));
    sync();
    container.addEventListener('keydown', (e) => {
        const btns = Array.from(container.querySelectorAll(btnClass));
        const idx = btns.findIndex(b => b === document.activeElement);
        if (idx === -1) return;
        let next = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % btns.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')  next = (idx - 1 + btns.length) % btns.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End')  next = btns.length - 1;
        if (next !== -1) {
            e.preventDefault();
            btns[next].focus();
            btns[next].click();
            sync();
        }
    });
    return sync;
}

function renderCodeBlock(containerId, lang, category) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="code-block-header">
            <span class="lang-label ${lang}-label">${langDisplayName(lang)}</span>
            <button class="copy-btn" onclick="copyCode(this)" title="Copy to clipboard">${ICON_COPY}</button>
        </div>
        <pre class="code-block"><code class="language-${lang}">${escapeHtml(getCode(category, lang))}</code></pre>
    `;
    hljs.highlightElement(container.querySelector('code'));
}

const ICON_COPY = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

function copyCode(btn) {
    const wrapper = btn.closest('.comparison-col, .code-block-wrapper');
    const code = wrapper.querySelector('pre code').textContent;

    const doFeedback = () => {
        btn.innerHTML = ICON_CHECK;
        btn.classList.add('copy-success');
        setTimeout(() => {
            btn.innerHTML = ICON_COPY;
            btn.classList.remove('copy-success');
        }, 2000);
    };

    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(doFeedback).catch(() => fallbackCopy(code, doFeedback));
    } else {
        fallbackCopy(code, doFeedback);
    }
}

function fallbackCopy(text, callback) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    callback();
}

function closeDetails() {
    const overlay = document.getElementById('details-overlay');
    if (overlay.classList.contains('hidden') || overlay.classList.contains('closing')) return;
    overlay.classList.add('closing');
    overlay.addEventListener('animationend', () => {
        if (!overlay.classList.contains('closing')) return;
        overlay.classList.remove('closing');
        overlay.classList.add('hidden');
    }, { once: true });
}

document.getElementById('details-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'details-overlay') {
        closeDetails();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetails();
    }
});

let syncTopicTabindex = null;

function initComparison() {
    const selector = document.getElementById('comparison-topic-selector');
    if (!selector) return;
    const categories = Object.keys(codeExamples);

    categories.forEach((cat, i) => {
        const btn = document.createElement('button');
        btn.className = 'topic-btn' + (i === 0 ? ' active' : '');
        btn.textContent = cat;
        btn.addEventListener('click', () => showComparison(cat, btn));
        selector.appendChild(btn);
    });

    selector.setAttribute('role', 'toolbar');
    selector.setAttribute('aria-label', 'Code comparison topics');
    syncTopicTabindex = setupArrowNav(selector, '.topic-btn');
    showComparison(categories[0], selector.firstElementChild);
}

function showComparison(category, clickedBtn) {
    document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
    clickedBtn.classList.add('active');
    if (syncTopicTabindex) syncTopicTabindex();

    const grid = document.getElementById('comparison-grid');
    grid.innerHTML = ['java', 'go', 'python'].map(lang => `
        <div class="comparison-col ${lang}">
            <div class="comparison-col-header">
                <span class="lang-label ${lang}-label">${langDisplayName(lang)}</span>
                <button class="copy-btn" onclick="copyCode(this)" title="Copy to clipboard">${ICON_COPY}</button>
            </div>
            <pre class="code-block"><code class="language-${lang}">${escapeHtml(getCode(category, lang))}</code></pre>
        </div>
    `).join('');
    grid.querySelectorAll('code').forEach(el => hljs.highlightElement(el));
}

initComparison();

const ICON_SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const ICON_MOON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

(function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
})();

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    btn.innerHTML = theme === 'dark' ? ICON_SUN : ICON_MOON;
    localStorage.setItem('theme', theme);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Decision Quiz ────────────────────────────────────────────────────────────

const quizQuestions = [
    {
        text: 'What are you building?',
        options: [
            { label: 'Web API or microservice',   scores: { java: 1, go: 3, python: 1 } },
            { label: 'Data pipeline or ML model', scores: { java: 1, go: 0, python: 3 } },
            { label: 'Enterprise or Android app', scores: { java: 3, go: 1, python: 1 } },
            { label: 'CLI tool or system utility', scores: { java: 0, go: 3, python: 1 } },
        ],
    },
    {
        text: "What's your top priority?",
        options: [
            { label: 'Maximum performance',       scores: { java: 2, go: 3, python: 0 } },
            { label: 'Fast development cycle',    scores: { java: 0, go: 1, python: 3 } },
            { label: 'Battle-tested ecosystem',   scores: { java: 3, go: 1, python: 2 } },
            { label: 'Simple cloud deployment',   scores: { java: 1, go: 3, python: 1 } },
        ],
    },
    {
        text: "Who's on your team?",
        options: [
            { label: 'Large enterprise team',     scores: { java: 3, go: 0, python: 1 } },
            { label: 'Small team or solo dev',    scores: { java: 1, go: 2, python: 2 } },
            { label: 'Data scientists',           scores: { java: 0, go: 0, python: 3 } },
            { label: 'DevOps / infra engineers',  scores: { java: 1, go: 3, python: 1 } },
        ],
    },
];

const quizResults = {
    java: {
        icon: '☕',
        tagline: 'Go with Java',
        reason: "Your use case calls for the Java ecosystem's depth — mature frameworks, enterprise tooling, and a massive talent pool. The JVM's decades of production hardening will serve you well.",
    },
    go: {
        icon: '🐹',
        tagline: 'Go with Go',
        reason: "Go's single binary, goroutines, and minimal runtime footprint make it the ideal fit for your priorities. It ships fast, scales easily, and ops teams love it.",
    },
    python: {
        icon: '🐍',
        tagline: 'Go with Python',
        reason: "Python's rich ecosystem and concise syntax mean you'll move fastest here — especially when data, ML libraries, or rapid prototyping are in the mix.",
    },
};

const quizTotals = { java: 0, go: 0, python: 0 };
let quizStep = 0;

function initQuiz() {
    quizTotals.java = 0;
    quizTotals.go = 0;
    quizTotals.python = 0;
    quizStep = 0;
    renderQuizStep();
}

function renderQuizStep() {
    const q = quizQuestions[quizStep];
    const progress = document.getElementById('quiz-progress');
    const body = document.getElementById('quiz-body');

    progress.innerHTML = quizQuestions.map((_, i) =>
        `<span class="quiz-dot${i === quizStep ? ' active' : i < quizStep ? ' done' : ''}"></span>`
    ).join('');

    body.innerHTML = `
        <p class="quiz-step-label">Question ${quizStep + 1} of ${quizQuestions.length}</p>
        <p class="quiz-question">${q.text}</p>
        <div class="quiz-options">
            ${q.options.map((opt, i) =>
                `<button class="quiz-opt-btn" onclick="pickOption(${i})">${opt.label}</button>`
            ).join('')}
        </div>
    `;

    const card = document.getElementById('quiz-card');
    card.classList.remove('quiz-slide-in');
    void card.offsetWidth;
    card.classList.add('quiz-slide-in');
}

function pickOption(optionIndex) {
    const scores = quizQuestions[quizStep].options[optionIndex].scores;
    quizTotals.java   += scores.java;
    quizTotals.go     += scores.go;
    quizTotals.python += scores.python;

    quizStep++;
    if (quizStep < quizQuestions.length) {
        renderQuizStep();
    } else {
        renderQuizResult();
    }
}

function renderQuizResult() {
    const winner = Object.keys(quizTotals).reduce((a, b) => quizTotals[a] >= quizTotals[b] ? a : b);
    const result = quizResults[winner];

    const progress = document.getElementById('quiz-progress');
    progress.innerHTML = quizQuestions.map(() => `<span class="quiz-dot done"></span>`).join('');

    const body = document.getElementById('quiz-body');
    body.innerHTML = `
        <div class="quiz-result ${winner}">
            <div class="quiz-result-icon">${result.icon}</div>
            <h3 class="quiz-result-tagline">${result.tagline}</h3>
            <p class="quiz-result-reason">${result.reason}</p>
            <div class="quiz-result-actions">
                <button class="details-btn quiz-explore-btn" onclick="showDetails('${winner}')">Explore ${winner.charAt(0).toUpperCase() + winner.slice(1)}</button>
                <button class="quiz-restart-btn" onclick="initQuiz()">Start over</button>
            </div>
        </div>
    `;

    const card = document.getElementById('quiz-card');
    card.classList.remove('quiz-slide-in');
    void card.offsetWidth;
    card.classList.add('quiz-slide-in');
}

initQuiz();
