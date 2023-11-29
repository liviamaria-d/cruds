class Desconto {
    #id_desconto
    #valor_desconto

    constructor(valor_desconto) {
        this.#valor_desconto = valor_desconto;
    }

    get id_desconto() {
        return this.#id_desconto;
    }
    set id_desconto(value){
        this.#id_desconto = value
    }

    get valor_desconto() {
        return this.#valor_desconto;
    }
    set valor_desconto(value){
        this.#valor_desconto = value
    }

    

    toJson() {
        return {
            "id_desconto": this.#id_desconto,
            "valor_desconto": this.#valor_desconto
        };
    }
}

module.exports = Desconto;
