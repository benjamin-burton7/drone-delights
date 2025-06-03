import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div>
        <Header />
        <main>
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

export default App;
