const mysql = require("mysql2");

class Database {
    #connection;

    constructor() {
        this.#connection = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "bdgp"
        }).promise();
    }

    // async selecionarSkins() {
    //     const skinsData = await this.#connection.query("SELECT * FROM skins;");
    //     return skinsData[0];
    // } 
      // async insertSkin(categoria, nome, descricao, genero, valor, raridade, foto1, foto2, promocao) {
    //     const sql = `
    //         INSERT INTO skins (categoria, nome_skin, desc_skin,
    //             genero_skin, valor_skin, raridade_skin, foto1_skin, foto2_skin,
    //             promocao_id_promocao1) 
    //         VALUES ('${categoria}', '${nome}', '${descricao}', '${genero}',
    //             ${valor}, '${raridade}', '${foto1}', '${foto2}', ${promocao});
    //     `;

    //     const bd = await this.#connection.execute(sql);
    //     return bd[0];
    // }

    async selecionarCupons(){
        const cuponsData = await this.#connection.query("select * from cupons;")
        return cuponsData[0]
     } 
     async selecionarCuponId(id) {
        const cuponsData = await this.#connection.query("select * from cupons where id_cupom ="+id)
        return cuponsData[0]
    }
    async insertCupom(nome, codigo, validade, valor){
        const retorno = await this.#connection.execute(`
         INSERT INTO cupons (codigo_cupom, nome_cupom, validade_cupom, valor_cupom) VALUES
         ('${codigo}', '${nome}', '${validade}', ${valor});
       `)
     }
     async deleteCupom(id){
        const sql = `
        delete from cupons
        where id_cupom = ${id}
        `
        const dt = await this.#connection.execute(sql)
        return dt[0]
    }

    async updateCupom(codigo, nome, validade, valor, id) {
  
        const sql = `update cupons
            set codigo_cupom = "${codigo}",
                nome_cupom = "${nome}",
                validade_cupom = "${validade}",
                valor_cupom = ${valor}
            where id_cupom = ${id}`

        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
    }


   

    async insertCupom(nome, codigo, validade, valor) {
        const retorno = await this.#connection.execute(`
            INSERT INTO cupons (codigo_cupom, nome_cupom, validade_cupom, valor_cupom) VALUES
            ('${codigo}', '${nome}', '${validade}', ${valor});
        `);
    }
    async deleteCupom(id) {
        const sql = `DELETE FROM cupons WHERE id_cupom = ${id}`;

        const dt = await this.#connection.execute(sql);
        return dt[0];
    }
    

    async selecionarDescontos() {
        const descontosData = await this.#connection.query("SELECT * FROM descontos;");
        return descontosData[0];
    }
    async consultarDescontoId(id) {
        try {
            const [rows] = await this.#connection.query('SELECT * FROM descontos WHERE id_desconto = ?', [id]);
            return rows;
        } catch (error) {
            console.error('Erro ao consultar desconto por ID:', error);
            throw error;
        }
    }
    async insertDesconto(valor) {
        const sql = `INSERT INTO descontos (valor_desconto) VALUES ('${valor}')`;
        const query = await this.#connection.execute(sql);
        return query[0];
    }
    async deleteDesconto(id) {
        const sql = `DELETE FROM descontos WHERE id_desconto = ${id}`;
        
        const dt = await this.#connection.execute(sql);
        return dt[0];

    }
 
    async updateDesconto( valor, id) {
  
        const sql = `update cupons
            set 
                valor_desconto = ${valor}
            where id_desconto = ${id}`

        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
    }

//      async selectAtrativos(){
//         const query = await this.#connection.query("select * from atrativos")
//         return query[0]
//      }
//      async selectAtrativosId(id){
//         const query = await this.#connection.query("select * from atrativos where id_atrativo =" +id)
//         return query[0]
//      }
//      async insertAtrativo (param) {
//         const sql = `insert into atrativos (nome_atrativo, lat_atrativo, long_atrativo, desc_atrativo, image_atrativo) 
//                     values ( '${param.nome} ',  '${param.latitude} ',  '${param.longitude} ',  '${param.descricao} ', '${param.imagem} ')`
//         const query = await this.#connection.execute(sql) 
//         return query[0]
//      }

//      async deleteAtrativo(id){
//         const sql = 'delete from atrativos where id_atrativo =' +id

//         const res = await this.#connection.execute(sql)
//         console.log(res)
//         return res[0]
//      }
//      async updateAtrativo(nome, lat, long, desc, image, id){
//         const sql = `update atrativos
//         set nome_atrativo  = "${nome}",
//             lat_atrativo   = "${lat}",
//             long_atrativo  = "${long}",
//             desc_atrativo  = "${desc}",
//             image_atrativo = "${image}",
//             id_atrativo    = "${id}"
//         `
//         const r = await this.#connection.execute(sql)
//         return[0]
//      }
 }

module.exports = Database;
