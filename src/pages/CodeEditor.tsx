import { CodeEditor } from "@/components/code-editor";
import { AnimatedNavbar } from "@/components/animated-navbar";
import { Footer } from "@/components/footer";

const CodeEditorPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <AnimatedNavbar />
            <main className="flex-grow">
                <CodeEditor />
            </main>
            <Footer />
        </div>
    );
};

export default CodeEditorPage;
