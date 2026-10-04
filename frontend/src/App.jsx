import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { TaskProvider } from "./context/TaskContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
    return (
        <BrowserRouter>
            <ToastProvider>
                <TaskProvider>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </TaskProvider>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;