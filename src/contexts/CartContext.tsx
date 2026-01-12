"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipos
interface CartItem {
    id: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    cartQuantity: number; // Total de itens no carrinho
    addToCart: (id: number, quantity?: number) => void; // Aceita quantidade opcional
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void; // Função nova para limpar o carrinho
}

// Criar contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// PROVIDER (Provedor do Carrinho)
export function CartProvider({ children }: { children: ReactNode }) {
    // Estado do carrinho (começa vazio)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Flag para saber se já carregou do localStorage
    const [isLoaded, setIsLoaded] = useState(false);

    // Carregar carrinho do localStorage (quando o componente monta)
    useEffect(() => {
        const savedCart = localStorage.getItem("@coffee-delivery:cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        setIsLoaded(true);
    }, []);

    // Salvar carrinho no localStorage (sempre que o carrinho mudar)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("@coffee-delivery:cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    // Adicionar item ao carrinho
    function addToCart(id: number, quantity: number = 1) {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === id);

            if (existingItem) {
                // Se já existe, aumenta a quantidade
                return prev.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // Se não existe, adiciona novo item
                return [...prev, { id, quantity }];
            }
        });
    }

    // Aumentar quantidade
    function increaseQuantity(id: number) {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    // Diminuir quantidade
    function decreaseQuantity(id: number) {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) // Remove se quantidade for 0
        );
    }

    // Remover item do carrinho
    function removeFromCart(id: number) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }

    // Limpar todo o carrinho
    function clearCart() {
        setCartItems([]);
    }

    // Calcula o total de itens no carrinho (soma das quantidades)
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartQuantity,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Hook customizado
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart deve ser usado dentro de um CartProvider");
    }

    return context;
}