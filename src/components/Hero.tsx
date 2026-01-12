import Image from "next/image";
import { FaShoppingCart, FaShippingFast } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { GoPackage } from "react-icons/go";

export default function Hero() {
    return (
        <section className="w-full bg-radial from-yellow-100 to-purple-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8">

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="font-extrabold text-3xl md:text-5xl text-gray-900 drop-shadow-lg">
                            Encontre o café perfeito <br /> para qualquer hora do dia
                        </h1>
                        <p className="pt-4 text-gray-700 text-base md:text-lg">
                            Com o Coffee Delivery você recebe seu café onde estiver, <br className="hidden md:block" /> a qualquer hora
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-8 md:mt-12">
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-yellow-600 w-6 h-6 rounded-full flex items-center justify-center text-white">
                                    <FaShoppingCart />
                                </div>
                                <span className="text-sm text-gray-800">Compra simples e segura</span>
                            </div>

                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center text-white">
                                    <GoPackage />
                                </div>
                                <span className="text-sm text-gray-800">Embalagem mantém o café intacto</span>
                            </div>

                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center text-white">
                                    <FaShippingFast />
                                </div>
                                <span className="text-sm text-gray-800">Entrega rápida e rastreada</span>
                            </div>

                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-violet-600 w-6 h-6 rounded-full flex items-center justify-center text-white">
                                    <GiCoffeeCup size={14} />
                                </div>
                                <span className="text-sm text-gray-800">O café chega fresquinho até você</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Image
                            src="/Coffe.png"
                            width={476}
                            height={360}
                            alt="Copo de café"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}