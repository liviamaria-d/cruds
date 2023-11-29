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

    //
    async selecionarPromos() {
        const promosData = await this.#connection.query("SELECT * FROM promocoes;");
        return promosData[0];
    }
    async selecionarPromocaoId(id) {
        const promocaoData = await this.#connection.query("select * from promocoes where id_promocao ="+id)
        return promocaoData[0]
    }
    async updatePromocao(nome, start, end, desc, ativa, id) {
  
        const sql = `update promocoes
            set nome_promocao = "${nome}",
            dt_start_promocao = "${start}",
            dt_end_promocao = "${end}",
            descr_promocao = "${desc}",
            ativa_promocao = ${ativa}
            where id_promocao  = ${id}`

        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
    }


    async insertPromo(nome, start, end, desc, ativa) {

        const sql = `
            INSERT INTO promocoes (dt_start_promocao, dt_end_promocao, nome_promocao, descr_promocao, ativa_promocao)
            VALUES ('${start}', '${end}', '${nome}', '${desc}', '0');
        `;
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }

    async deletePromo(id) {
        const sql = `
            DELETE FROM promocoes
            WHERE id_promocao = ${id};
        `;

        const dt = await this.#connection.execute(sql);
        return dt[0];
    }


 }

module.exports = Database;
