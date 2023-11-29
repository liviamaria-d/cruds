const DescontoDAO = require("../../DAO/descontoDAO");
const path = require('path');

module.exports = (app) => {
    
    app.get("/desconto", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.sendFile(path.resolve("mvc/views/ctrldev/desconto/adddescontos.html"));
    });


    app.get("/desconto/lista", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const descontoDAO = new DescontoDAO();
        const lista_desconto = await descontoDAO.consultarDesconto();
        res.render('desconto/listdesconto', { descontoDAO: lista_desconto });
    });
    

    app.get("/descontos", async (req, res) => {
        const descontoDAO = new DescontoDAO();
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.status(201).json(await descontoDAO.consultarDesconto());
    });

    app.post("/registrardesconto", (req, res) => {
        const descontoDAO = new DescontoDAO();
        res.setHeader("Access-Control-Allow-Origin", "*");

        const { txtvalordesconto } = req.body;
        descontoDAO.registrarDesconto(txtvalordesconto);
        console.log(txtvalordesconto)

        res.status(201).json({ msg: "ok" });
    });


    app.delete("/desconto/apagar/:id", async (req,res) =>{
        const descontoDAO = new DescontoDAO();
        res.setHeader("Access-Control-Allow-Origin","*");
        res.json(await descontoDAO.apagarDesconto(req.params.id));
    })

    app.get("/desconto/alterar/:id", async (req, res) => {
        const descontoDAO = new DescontoDAO();
    
        const dtdesconto = await descontoDAO.consultarDescontoId(req.params.id);
    
        res.render("desconto/updesconto", { desconto: dtdesconto });  // Certifique-se de passar 'desconto' como um objeto
    });
    
};
