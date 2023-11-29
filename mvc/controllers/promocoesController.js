const path = require('path')
const PromoDAO = require('../../DAO/promocoesDAO')
module.exports = (app) => {   

   
    app.get("/promocao", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/promo/addpromo.html"))
    })

    app.get("/promocao/lista", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")

        const promoDAO = new PromoDAO()
        const lista_promos = await promoDAO.consultarPromos()
   
        res.render("promo/listpromo", { promos: lista_promos })
    })

    app.get("/promocoes", async (req, res) => {
        
        const promoDAO = new PromoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await promoDAO.consultarPromos())

    })


    app.post("/registrarpromo", (req, res) => {
        
        const promoDAO = new PromoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
        const {txtnomepromo, seldescpromo, dtstartpromo, dtendpromo, txtdescpromo, radioativapromosim, radioativapromonao} = req.body

        promoDAO.registrarPromo(txtnomepromo, dtstartpromo, dtendpromo, txtdescpromo, radioativapromonao)

        res.status(201).json({ 
            msg: "ok promocao"
        })

    })
    app.delete("/promocao/apagar/:id", async (req,res) =>{
        const promoDAO = new PromoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await promoDAO.apagarPromo(req.params.id))

    })
    app.get("/promocao/alterar/:id", async (req, res) => {
        const promoDAO = new PromoDAO()

        const dtpromocao = await promoDAO.consultarPromocaoId(req.params.id)
        

        res.render("promo/uppromo", { promocao: dtpromocao  })
    })

    app.put("/promocao/alterar", async (req, res) => {
        const promoDAO = new PromoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {id, nome_promo, dt_start, dt_end, descr_promo, ativa} = req.body

        const r = await promoDAO.atualizarPromocao(id, nome_promo, dt_start, dt_end, descr_promo, ativa)

        res.json({r})

    })
}

