export type Coffe = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    tag: string | string[];
};

export const coffes: Coffe[] = [
    {
        id: 1,
        title: "Expresso Tradicional",
        image: "/coffes/Expresso.png",
        description: "O tradicional café feito com água quente e grãos moídos",
        price: 9.9,
        tag: "TRADICIONAL",
    },
    {
        id: 2,
        title: "Expresso Americano",
        image: "/coffes/Americano.png",
        description: "Expresso diluído, menos intenso que o tradicional",
        price: 9.0,
        tag: "TRADICIONAL",
    },
    {
        id: 3,
        title: "Expresso Cremoso",
        image: "/coffes/ExpressoCremoso.png",
        description: "Café expresso tradicional com espuma cremosa",
        price: 9.9,
        tag: "TRADICIONAL",
    },
    {
        id: 4,
        title: "Expresso Gelado",
        image: "/coffes/CafeGelado.png",
        description: "Bebida preparada com café expresso e cubos de gelo",
        price: 9.9,
        tag: ["TRADICIONAL", "GELADO"],
    }, {
        id: 5,
        title: "Café com Leite",
        image: "/coffes/CafeComLeite.png",
        description: "Meio a meio de expresso tradicional com leite vaporizado",
        price: 9.9,
        tag: ["TRADICIONAL", "COM LEITE"],
    },
    {
        id: 6,
        title: "Latte",
        image: "/coffes/Latte.png",
        description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
        price: 9.9,
        tag: ["TRADICIONAL", "COM LEITE"],
    }, {
        id: 7,
        title: "Capuccino",
        image: "/coffes/Capuccino.png",
        description: "Bebida com canela feita com doses iguais de café, leite e espuma",
        price: 9.9,
        tag: ["TRADICIONAL", "COM LEITE"],
    },
    {
        id: 8,
        title: "Macchiato",
        image: "/coffes/Macchiato.png",
        description: "Café expresso misturado com um pouco de leite quente e espuma",
        price: 9.9,
        tag: ["TRADICIONAL", "COM LEITE"],
    },
    {
        id: 9,
        title: "Mocaccino",
        image: "/coffes/Mocaccino.png",
        description: "Café expresso com calda de chocolate, pouco leite e espuma",
        price: 9.9,
        tag: ["TRADICIONAL", "COM LEITE"],
    },
    {
        id: 10,
        title: "Chocolate Quente",
        image: "/coffes/ChocolateQuente.png",
        description: "Bebida feita com chocolate dissolvido no leite quente e café",
        price: 9.9,
        tag: ["ESPECIAL", "COM LEITE"],
    },
    {
        id: 11,
        title: "Cubano",
        image: "/coffes/Cubano.png",
        description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
        price: 9.9,
        tag: ["ESPECIAL", "ALCOÓLICO", "GELADO"],
    },
    {
        id: 12,
        title: "Havaiano",
        image: "/coffes/Havaiano.png",
        description: "Bebida adocicada preparada com café e leite de coco ",
        price: 9.9,
        tag: ["ESPECIAL"],
    },
    {
        id: 13,
        title: "Arabe",
        image: "/coffes/Arabe.png",
        description: "Bebida preparada com grãos de café árabe e especiarias ",
        price: 9.9,
        tag: ["ESPECIAL"],
    },
    {
        id: 14,
        title: "Irlandês",
        image: "/coffes/Irlandes.png",
        description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
        price: 9.9,
        tag: ["ESPECIAL", "ALCOÓLICO"],
    },

];