import { coffes } from "@/data/coffes";
import CoffeCard from "../components/CoffeCard";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

        <h1 className="text-3xl font-bold text-gray-800 mb-12">
          Nossos cafés
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pt-12">
          {coffes.map((coffe) => (
            <CoffeCard key={coffe.id} props={coffe} />
          ))}
        </div>
      </div>
    </main>
  );
}

