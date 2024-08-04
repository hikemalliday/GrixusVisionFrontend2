import "./App.css";
import { MainPage } from "./components/MainPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ItemAndCharacterProvider } from "./context/ItemAndCharacterContext";
import { PaginationProvider } from "./context/PaginationContext";
import { SignUp } from "./components/SignUp";

function App() {
  const queryClient = new QueryClient();

  return (
    // This div is probably not needed
    <div className="app-container">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ItemAndCharacterProvider>
            <PaginationProvider>
              <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                  <Route index={true} element={<MainPage />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </Routes>
            </PaginationProvider>
          </ItemAndCharacterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
