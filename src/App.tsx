import { NavBar } from "@/presentation/components/shared";
import { SearchBar } from "@/presentation/components/weather";

export const App = () => {
  return (
    <main className="bg-brand-950 w-full h-dvh px-3">
      <div className="mx-auto max-w-7xl">
        <NavBar />

        <h1 className="text-white text-center text-4xl md:text-5xl font-bricolage font-semibold my-20">
          How's the sky looking today?
        </h1>

        <div className="mx-auto w-full sm:max-w-1/2">
          <SearchBar />
        </div>
      </div>
    </main>
  )
}
