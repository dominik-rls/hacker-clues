import SearchView from "@/components/pages/search-view/SearchView";
import PageFooter from "@/components/molecules/app-footer/AppFooter";

function App() {
  return (
    <div className="pt-4 sm:pt-16 outline min-h-screen flex flex-col
    justify-between items-center bg-slate-800 text-slate-100">
      <SearchView />
      <PageFooter />
    </div>
  );
}

export default App;
