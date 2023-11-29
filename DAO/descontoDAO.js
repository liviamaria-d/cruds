const Database = require('../repository/database');
const Desconto = require('../mvc/models/descontoModel');

class DescontoDAO {
    #conexao;

    constructor() {
        this.#conexao = new Database();
    }

    async consultarDesconto() {
        const lista_desconto = [];
        const descontos = await this.#conexao.selecionarDescontos();

        if (descontos) {
            for (const desconto of descontos) {
                const objDesconto = new Desconto();

                objDesconto.id_desconto = desconto.id_desconto;
                objDesconto.valor_desconto = desconto.valor_desconto;

                lista_desconto.push(objDesconto.toJson());
            }
        }

        return lista_desconto;
    }

    registrarDesconto(valor){

        const desconto = new Desconto()

        desconto.valorDesconto = valor

        this.#conexao.insertDesconto(desconto.valorDesconto)
        
        
    }
    async apagarDesconto(id){
        const dados = await this.#conexao.deleteDesconto(id);
        return dados;
    }

    async consultarDescontoId(id) {

        const desconto = await this.#conexao.consultarDescontoId(id)
              
        const objdesconto = new Desconto()

      
        objdesconto.valorDesconto = desconto[0].valor_desconto
      

        return objdesconto.toJson()
    }

    async atualizarDesconto(id, valor){

        const desconto = new Cupom()

        desconto.id = id
        
    
        desconto.valorDesconto = valor

        const dt = await this.#conexao.updateDesconto( desconto.valorDesconto, desconto.id)
        return dt
    }

   
}

module.exports = DescontoDAO;
