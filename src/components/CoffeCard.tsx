"use client";

import Image from "next/image";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { Coffe } from "@/data/coffes";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface CoffeCardProps {
    props: Coffe;
}

export default function CoffeCard({ props }: CoffeCardProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleAddToCart = () => {
        addToCart(props.id, quantity); // Passa id e quantity separados
        setQuantity(1); // reseta após adicionar
    };

    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',');
    };

    return (
        <div className="w-full max-w-xs md:w-64 h-77.5 bg-gray-100 rounded-tr-3xl rounded-bl-3xl flex flex-col items-center px-4 pb-4 relative pt-16 mx-auto">
            <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2">
                <Image
                    src={props.image}
                    width={96}
                    height={96}
                    className="md:w-30 md:h-30"
                    alt="Imagem Café"
                />
            </div>

            <div className="flex gap-1 mt-4 mb-4 justify-center">
                {Array.isArray(props.tag) ? (
                    props.tag.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))
                ) : (
                    <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                        {props.tag}
                    </span>
                )}
            </div>

            <h3 className="font-bold text-xl text-gray-800 text-center">
                {props.title}
            </h3>

            <p className="text-sm text-gray-500 text-center mt-2">
                {props.description}
            </p>

            <div className="mt-auto w-full flex items-center justify-between pt-4">
                <span>
                    <span className="text-sm text-gray-600">R$</span>
                    <span className="text-2xl font-extrabold text-gray-800">
                        {formatPrice(props.price)}
                    </span>
                </span>

                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-gray-200 rounded-md px-2 py-2 gap-3">
                        <button
                            onClick={handleDecrement}
                            className="text-purple-700 hover:text-purple-800"
                            aria-label="Diminuir quantidade"
                        >
                            <FaMinus size={12} />
                        </button>

                        <span className="text-base font-medium text-gray-800 min-w-5 text-center">
                            {quantity}
                        </span>

                        <button
                            onClick={handleIncrement}
                            className="text-purple-700 hover:text-purple-800"
                            aria-label="Aumentar quantidade"
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-purple-900 hover:bg-purple-800 w-9 h-9 rounded-md flex items-center justify-center text-white"
                        aria-label="Adicionar ao carrinho"
                    >
                        <FaShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}