"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { PiMapPinLine, PiCurrencyDollar } from "react-icons/pi";
import { CiCreditCard1, CiBank, CiMoneyBill } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/contexts/CartContext";
import { coffes } from "@/data/coffes";

// Schema para validação do formulário, define as regras de validação para cada campo
const checkoutFormSchema = z.object({
    cep: z
        .string()
        .min(1, "CEP é obrigatório")
        .regex(/^\d{5}-\d{3}$/, "CEP precisa estar no formato 00000-000"),
    rua: z.string().min(1, "Informe a rua"),
    numero: z.string().min(1, "Informe o número"),
    complemento: z.string().optional(), // esse campo é opcional
    bairro: z.string().min(1, "Informe o bairro"),
    cidade: z.string().min(1, "Informe a cidade"),
    uf: z.string().length(2, "UF inválida"),
    pagamento: z.enum(["credito", "debito", "dinheiro"], {
        message: "Selecione uma forma de pagamento",
    }),
});

// Tipo TypeScript gerado automaticamente a partir do schema
type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Função auxiliar para formatar o CEP, transforma "12345678" em "12345-678"
function formatCEP(value: string) {
    return value
        .replace(/\D/g, "") // Remove tudo que não é número
        .replace(/^(\d{5})(\d)/, "$1-$2") // Adiciona o hífen
        .slice(0, 9); // Limita a 9 caracteres
}

// Componente principal
export default function Cart() {

    const router = useRouter(); // Hook do Next.js para navegação entre páginas, usado para redirecionar para a página de sucesso após confirmar o pedido. 

    // Pega as funções do carrinho (Context API)
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

    // Junta os itens do carrinho com os detalhes dos cafés
    const cartWithDetails = cartItems
        .map((item) => {
            const coffee = coffes.find((c) => c.id === item.id);
            if (!coffee) return null;
            return { ...coffee, quantity: item.quantity };
        })
        .filter(Boolean); // Remove valores nulos

    // Configuração do React Hook Form
    const {
        register, // Registra os campos do formulário
        handleSubmit, // Função para submeter o form
        setValue, // Define valor de um campo manualmente
        watch, // Observa mudanças em um campo
        formState: { errors }, // Erros de validação
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutFormSchema), // Usa o Zod para validar
    });

    // Observa os valores desses campos em tempo real
    const cepValue = watch("cep");
    const paymentValue = watch("pagamento");

    // Função chamada quando o formulário é enviado
    function handleCheckout(data: CheckoutFormData) {
        // Salva os dados do pedido no localStorage
        const orderData = {
            ...data,
            items: cartWithDetails,
            timestamp: new Date().toISOString(),
        };

        localStorage.setItem("@coffee-delivery:last-order", JSON.stringify(orderData));

        // Limpa o carrinho
        clearCart();

        // Redireciona para a página de sucesso
        router.push("/success");
    }

    // Renderização do componente
    return (
        <main>
            <Header />

            {/* Formulário principal */}
            <form
                onSubmit={handleSubmit(handleCheckout)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-60 pt-8"
            >
                <div>
                    <h1 className="text-lg font-bold mb-4">Complete o seu pedido</h1>

                    {/* Parte do endereço */}
                    <div className="bg-gray-50 border border-gray-100 rounded drop-shadow-sm p-6 space-y-4">
                        {/* Título da seção */}
                        <div className="flex gap-2">
                            <PiMapPinLine size={22} className="text-yellow-600" />
                            <div>
                                <p>Endereço de Entrega</p>
                                <p className="text-sm text-gray-600">
                                    Informe o endereço onde deseja receber o seu pedido
                                </p>
                            </div>
                        </div>

                        {/* Campo CEP */}
                        <div>
                            <input
                                type="text"
                                placeholder="CEP"
                                maxLength={9}
                                {...register("cep")}
                                value={cepValue || ""}
                                onChange={(e) =>
                                    setValue("cep", formatCEP(e.target.value), {
                                        shouldValidate: true,
                                    })
                                }
                                className="w-full bg-gray-100 border border-gray-200 p-2"
                            />
                            {errors.cep && (
                                <span className="text-sm text-red-500">{errors.cep.message}</span>
                            )}
                        </div>

                        {/* Campo Rua */}
                        <input
                            type="text"
                            placeholder="Rua"
                            {...register("rua")}
                            className="w-full bg-gray-100 border border-gray-200 p-2"
                        />
                        {errors.rua && (
                            <span className="text-sm text-red-500">{errors.rua.message}</span>
                        )}

                        {/* Número e Complemento */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="w-full sm:w-1/3">
                                <input
                                    type="text"
                                    placeholder="Número"
                                    {...register("numero")}
                                    className="w-full bg-gray-100 border border-gray-200 p-2"
                                />
                                {errors.numero && (
                                    <span className="text-sm text-red-500">{errors.numero.message}</span>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Complemento"
                                {...register("complemento")}
                                className="w-full sm:w-2/3 bg-gray-100 border border-gray-200 p-2"
                            />
                        </div>

                        {/* Bairro, Cidade e UF */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="w-full sm:w-1/3">
                                <input
                                    type="text"
                                    placeholder="Bairro"
                                    {...register("bairro")}
                                    className="w-full bg-gray-100 border border-gray-200 p-2"
                                />
                                {errors.bairro && (
                                    <span className="text-sm text-red-500">{errors.bairro.message}</span>
                                )}
                            </div>
                            <div className="w-full sm:w-1/2">
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    {...register("cidade")}
                                    className="w-full bg-gray-100 border border-gray-200 p-2"
                                />
                                {errors.cidade && (
                                    <span className="text-sm text-red-500">{errors.cidade.message}</span>
                                )}
                            </div>
                            <div className="w-full sm:w-1/6">
                                <input
                                    type="text"
                                    placeholder="UF"
                                    maxLength={2}
                                    {...register("uf")}
                                    className="w-full bg-gray-100 border border-gray-200 p-2"
                                />
                                {errors.uf && (
                                    <span className="text-sm text-red-500">{errors.uf.message}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pagamento */}
                    <div className="bg-gray-50 border border-gray-100 rounded drop-shadow-sm p-6 space-y-4 mt-6">
                        <div className="flex gap-2">
                            <PiCurrencyDollar size={22} className="text-purple-600" />
                            <div>
                                <p>Pagamento</p>
                                <p className="text-sm text-gray-600">
                                    O pagamento é feito na entrega. Escolha a forma como deseja pagar
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setValue("pagamento", "credito", { shouldValidate: true })}
                                className={`flex items-center justify-center gap-2 p-3 border rounded text-sm
                                    ${paymentValue === "credito"
                                        ? "bg-purple-200 border-purple-500 text-purple-800"
                                        : "bg-gray-100 border-gray-200 text-gray-600"
                                    }`}
                            >
                                <CiCreditCard1 size={20} className="text-purple-600" />
                                Cartão de crédito
                            </button>

                            <button
                                type="button"
                                onClick={() => setValue("pagamento", "debito", { shouldValidate: true })}
                                className={`flex items-center justify-center gap-2 p-3 border rounded text-sm
                                    ${paymentValue === "debito"
                                        ? "bg-purple-200 border-purple-500 text-purple-800"
                                        : "bg-gray-100 border-gray-200 text-gray-600"
                                    }`}
                            >
                                <CiBank size={20} className="text-purple-600" />
                                Cartão de débito
                            </button>

                            <button
                                type="button"
                                onClick={() => setValue("pagamento", "dinheiro", { shouldValidate: true })}
                                className={`flex items-center justify-center gap-2 p-3 border rounded text-sm
                                    ${paymentValue === "dinheiro"
                                        ? "bg-purple-200 border-purple-500 text-purple-800"
                                        : "bg-gray-100 border-gray-200 text-gray-600"
                                    }`}
                            >
                                <CiMoneyBill size={20} className="text-purple-600" />
                                Dinheiro
                            </button>
                        </div>

                        {errors.pagamento && (
                            <span className="text-sm text-red-500">{errors.pagamento.message}</span>
                        )}
                    </div>
                </div>

                <div>
                    <h1 className="text-lg font-bold mb-4">Cafés Selecionados</h1>

                    <div className="w-full md:w-md bg-gray-50 border border-gray-100 rounded-tr-4xl rounded-bl-4xl drop-shadow-sm p-6">
                        {/* Verifica se o carrinho está vazio */}
                        {cartWithDetails.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
                        ) : (
                            <>
                                {/* Lista de itens no carrinho */}
                                {cartWithDetails.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 pb-4"
                                    >
                                        {/* Imagem do café */}
                                        <img src={item.image} className="w-16 h-16" alt={item.title} />

                                        <div className="flex-1">
                                            {/* Nome do café */}
                                            <p className="mb-2">{item.title}</p>

                                            {/* Controles de quantidade e remover */}
                                            <div className="flex items-center gap-2">
                                                {/* Botões de + e - */}
                                                <div className="flex items-center bg-gray-100 rounded">
                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="px-2 text-purple-600"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-2 py-2 text-sm">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="px-2 text-purple-600"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Botão remover */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center gap-1 px-2 py-2 bg-gray-100 rounded text-xs text-gray-700 hover:bg-gray-300"
                                                >
                                                    <FaRegTrashAlt className="text-purple-600" />
                                                    Remover
                                                </button>
                                            </div>
                                        </div>

                                        {/* Preço total do item */}
                                        <strong className="self-end sm:self-start">
                                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                                        </strong>
                                    </div>
                                ))}

                                {/* Resumo de valores */}
                                <div className="space-y-3 pt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total de itens</span>
                                        <span className="text-gray-800">
                                            R$ {cartWithDetails.reduce((total, item: any) => total + (item.price * item.quantity), 0).toFixed(2).replace(".", ",")}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Entrega</span>
                                        <span className="text-gray-800">R$ 3,50</span>
                                    </div>

                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-gray-800">Total</span>
                                        <span className="text-gray-800">
                                            R$ {(cartWithDetails.reduce((total, item: any) => total + (item.price * item.quantity), 0) + 3.5).toFixed(2).replace(".", ",")}
                                        </span>
                                    </div>
                                </div>

                                {/* Botão final de confirmar pedido */}
                                <button
                                    type="submit"
                                    disabled={cartWithDetails.length === 0}
                                    className="w-full mt-4 py-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded"
                                >
                                    CONFIRMAR PEDIDO
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </main>
    );
}