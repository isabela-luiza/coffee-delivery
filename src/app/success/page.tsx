"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { PiMapPin, PiClock, PiCurrencyDollar } from "react-icons/pi";
import Image from "next/image";

// Tipos 
interface OrderData {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    pagamento: "credito" | "debito" | "dinheiro";
    items: Array<{
        id: number;
        title: string;
        price: number;
        quantity: number;
    }>;
    timestamp: string;
}

// Componente principal 
export default function Success() {
    const router = useRouter();
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    // Carrega os dados do pedido ao montar o componente
    useEffect(() => {
        const savedOrder = localStorage.getItem("@coffee-delivery:last-order");

        if (savedOrder) {
            setOrderData(JSON.parse(savedOrder));
        } else {
            // Se não tiver pedido, redireciona para home
            router.push("/");
        }
    }, [router]);

    // Exibe loading enquanto carrega os dados
    if (!orderData) {
        return (
            <main>
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500">Carregando...</p>
                </div>
            </main>
        );
    }

    // Mapeamento de formas de pagamento
    const paymentLabels = {
        credito: "Cartão de Crédito",
        debito: "Cartão de Débito",
        dinheiro: "Dinheiro",
    };

    return (
        <main>
            <Header />

            <div className="px-4 sm:px-8 lg:px-60 pt-20 pb-16">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-yellow-600 mb-2">
                        Uhu! Pedido confirmado
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Agora é só aguardar que logo o café chegará até você
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-purple-600 rounded-lg rounded-tr-[36px] rounded-bl-[36px]"></div>

                        <div className="relative bg-white rounded-lg rounded-tr-[36px] rounded-bl-[36px] p-10 m-0.5 space-y-8">
                            <div className="flex gap-3">
                                <div className="bg-purple-500 rounded-full p-2 h-fit">
                                    <PiMapPin size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-gray-700">
                                        Entrega em <strong>{orderData.rua}, {orderData.numero}</strong>
                                    </p>
                                    <p className="text-gray-700">
                                        {orderData.bairro} - {orderData.cidade}, {orderData.uf}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="bg-yellow-500 rounded-full p-2 h-fit">
                                    <PiClock size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-gray-700">Previsão de entrega</p>
                                    <p className="text-gray-700">
                                        <strong>20 min - 30 min</strong>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="bg-yellow-600 rounded-full p-2 h-fit">
                                    <PiCurrencyDollar size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-gray-700">Pagamento na entrega</p>
                                    <p className="text-gray-700">
                                        <strong>{paymentLabels[orderData.pagamento]}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <Image
                            src="/illustration.png"
                            width={492}
                            height={293}
                            alt="Entregador de moto"
                            className="w-full max-w-md"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}