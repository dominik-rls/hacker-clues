import Search from "./components/molecules/search/Search";
import placeholderImage from "./assets/clues-placeholder.png";

function App() {
  return (
    <div className="outline focus:outline-yellow-300 min-h-screen flex flex-col justify-center items-center bg-slate-800">
      <header className="gap-4 flex flex-row justify-center items-center">
        <h1 className="uppercase tracking-widest text-3xl text-slate-100 font-thin">
          Hacker Clues
        </h1>
        <Search onSubmit={x => console.log(x)}/>
      </header>
      <img alt="" className="opacity-10" src={placeholderImage} />
    </div>
  );
}

export default App;
