import "./App.css";
import { Header } from "./components/Header/Header";
import { Body } from "./components/Body/Body";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div id="container">
        <header>
          <Header />
        </header>
        <main>
          <Body />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
