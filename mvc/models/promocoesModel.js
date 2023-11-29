class Promo{

    #id

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

   #nomePromo
    get nomePromo() {
        return this.#nomePromo
    }
    set nomePromo(value) {
        this.#nomePromo = value
    }
   #startPromo
    get startPromo() {
        return this.#startPromo
    }
    set startPromo(value) {
        this.#startPromo = value
    }
   #endPromo
    get endPromo() {
        return this.#endPromo
    }
    set endPromo(value) {
        this.#endPromo = value
    }
   #descPromo    
    get descPromo() {
        return this.#descPromo
    }
    set descPromo(value) {
        this.#descPromo = value
    }
    #ativaPromo    
    get ativaPromo() {
        return this.#ativaPromo
    }
    set ativaPromo(value) {
        this.#ativaPromo = value
    }
  

    constructor(nomePromo, startPromo, endPromo, descPromo, ativaPromo){
        this.#nomePromo = nomePromo
        this.#startPromo = startPromo
        this.#endPromo = endPromo
        this.#descPromo = descPromo
        this.#ativaPromo = ativaPromo
    }

     
    toJson(){
        return {
            "id": this.#id,
            "nome_promo": this.#nomePromo,
            "dt_start": this.#startPromo,
            "dt_end": this.#endPromo,
            "descr_promo": this.#descPromo,
            "ativa": this.#ativaPromo

        }
    }
}


module.exports = Promo