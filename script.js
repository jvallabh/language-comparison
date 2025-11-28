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

function showDetails(lang) {
    const data = detailsData[lang];
    const modalContent = document.getElementById('modal-content');

    const createListItems = (items) => items.map(item => `
        <li class="detail-item">
            <strong>${item.text}</strong>
            <p class="description">${item.description}</p>
            ${item.example ? `<pre class="code-snippet"><code>${item.example}</code></pre>` : ''}
        </li>
    `).join('');

    modalContent.innerHTML = `
        <h2 class="modal-title" style="color: var(--${lang}-color)">${data.title}</h2>
        
        <div class="modal-section">
            <h3>Why it shines</h3>
            <ul class="pros-list">
                ${createListItems(data.pros)}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Trade-offs</h3>
            <ul class="cons-list">
                ${createListItems(data.cons)}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Best For</h3>
            <p class="use-cases">${data.useCases}</p>
        </div>
    `;

    document.getElementById('details-overlay').classList.remove('hidden');
}

function closeDetails() {
    document.getElementById('details-overlay').classList.add('hidden');
}

// Close modal when clicking outside
document.getElementById('details-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'details-overlay') {
        closeDetails();
    }
});

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetails();
    }
});
