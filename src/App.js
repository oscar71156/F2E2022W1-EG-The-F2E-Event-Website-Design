import AppContent from "./components/AppContent";
import { LayoutProvider } from "./contexts/Layout";
function App() {
  return (
    <LayoutProvider>
      <div>
        <AppContent />
      </div>
    </LayoutProvider>
  );
}
export default App;
