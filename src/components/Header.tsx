'use client'

import Image from "next/image"
import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

// Cidades em que o Coffe Delivery está disponível 
const availableCities = [
    { name: "Goiânia", state: "GO" },
    { name: "Senador Canedo", state: "GO" },
    { name: "Caldas Novas", state: "GO" },
    { name: "Brasília", state: "DF" },
];

export default function Header() {
    const { cartQuantity } = useCart();

    // Estado para controlar qual cidade está selecionada
    const [selectedCity, setSelectedCity] = useState(availableCities[0]);

    // Estado para controlar se o dropdown está aberto
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Carrega a cidade salva do localStorage quando o componente monta
    useEffect(() => {
        const savedCity = localStorage.getItem("@coffee-delivery:selected-city");
        if (savedCity) {
            setSelectedCity(JSON.parse(savedCity));
        }
    }, []);

    // Função para selecionar uma cidade
    const handleCitySelect = (city: typeof availableCities[0]) => {
        setSelectedCity(city);
        setIsDropdownOpen(false);
        // Salva a cidade no localStorage
        localStorage.setItem("@coffee-delivery:selected-city", JSON.stringify(city));
    };

    return (
        <header className="w-full bg-white">
            <div className="flex items-center justify-between px-4 md:px-40 py-8">
                <Link href="/">
                    <Image
                        src="/Logo.png"
                        width={85}
                        height={40}
                        alt="Logo Coffe Delivery"
                    />
                </Link>

                <div className="flex items-center gap-4">
                    {/* Dropdown de cidades */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1 text-violet-600 bg-violet-100 px-3 py-2 rounded hover:bg-violet-200 transition-colors"
                        >
                            <FaLocationDot />
                            <span className="text-sm">
                                {selectedCity.name}, {selectedCity.state}
                            </span>
                        </button>

                        {/* Menu dropdown */}
                        {isDropdownOpen && (
                            <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded shadow-lg w-48 max-h-64 overflow-y-auto z-50">
                                {availableCities.map((city) => (
                                    <button
                                        key={`${city.name}-${city.state}`}
                                        onClick={() => handleCitySelect(city)}
                                        className={`w-full text-left px-4 py-2 hover:bg-violet-50 transition-colors text-sm
                                            ${selectedCity.name === city.name && selectedCity.state === city.state
                                                ? "bg-violet-100 text-violet-700 font-semibold"
                                                : "text-gray-700"
                                            }`}
                                    >
                                        {city.name}, {city.state}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Carrinho */}
                    <div className="relative bg-yellow-100 w-8 h-8 rounded flex items-center justify-center">
                        <Link href={"/cart"}>
                            <FaShoppingCart className="text-yellow-600" />
                        </Link>

                        {cartQuantity > 0 && (
                            <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                {cartQuantity}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}