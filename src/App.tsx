import Navbar from "./components/Navbar.jsx";
import type { ReactNode } from "react";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />

      <main className="page-shell">
        {children}
      </main>
    </div>
  );
};

export default App;