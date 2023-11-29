const Promo = require("../mvc/models/promocoesModel");
const Database = require("../repository/database");

class PromoDAO {

    #conexao

    constructor() {
        this.#conexao = new Database();
    }

    async consultarPromos() {

        const lista_promos = []
        const promocao = await this.#conexao.selecionarPromos()

        if (promocao) {
            for (const promos of promocao) {
                const objpromo = new Promo()

                objpromo.id = promos.id_promocao
                objpromo.startPromo = promos.dt_start_promocao
                objpromo.endPromo = promos.dt_end_promocao
                objpromo.nomePromo = promos.nome_promocao
                objpromo.descPromo = promos.descr_promocao
                objpromo.ativaPromo = promos.ativa_promocao
                lista_promos.push(objpromo.toJson())
            }
        }

        return lista_promos
    }

    registrarPromo(nome, start, end, desc, ativa){

        const promos = new Promo()

        promos.nomePromo = nome
        promos.startPromo = start
        promos.endPromo = end
        promos.descrPromo = desc
        promos.ativaPromo = ativa

        this.#conexao.insertPromo(promos.nomePromo, promos.startPromo, promos.endPromo, promos.descrPromo, promos.ativaPromo)
    }

    async apagarPromo(id){
     const dados =  await this.#conexao.deletePromo(id)
     return dados
    }

    async atualizarPromocao(id, nome, start, end, desc, ativa){

        const promos = new Promo()

        promos.id = id
        promos.nomePromo = nome
        promos.startPromo = start
        promos.endPromo = end
        promos.descrPromo = desc
        promos.ativaPromo = ativa

        const dt = await this.#conexao.updatePromocao(promos.nomePromo, promos.startPromo, promos.endPromo, promos.descrPromo, promos.ativaPromo, promos.id)
        return dt
    }
    async consultarPromocaoId(id) {

        const promos = await this.#conexao.selecionarPromocaoId(id)
              
        const objpromo = new Promo()

            objpromo.id = promos[0].id_promocao
            objpromo.startPromo = promos[0].dt_start_promocao
            objpromo.endPromo = promos[0].dt_end_promocao
            objpromo.nomePromo = promos[0].nome_promocao
            objpromo.descPromo = promos[0].descr_promocao
            objpromo.ativaPromo = promos[0].ativa_promocao
      

        return objpromo.toJson()
    }
}

module.exports = PromoDAO

