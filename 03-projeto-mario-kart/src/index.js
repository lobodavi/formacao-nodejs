///criação dos players
const Mario = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

const Luigi = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

const Peach= {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
}

const Yoshi = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
}

const Bowser = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}

const Donkey = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}

//função para rolar o dado
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

//função para gerar o trecho aleatorio da corrida
async function getRandomBlock() {
    let random = Math.floor(Math.random() * 3)
    let result 

    switch (true) {
        case random == 0:
            result = "reta"
            break;
        case random == 1:
            result = "curva"
            break
        default:
            result = "confronto"
            break;
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} e possui ${attribute} de ${block} totalizando ${diceResult + attribute}`)
}

//funcao que controla cada trecho da corrida 
async function playRaceEngine(character1,character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`Rodada ${round}: `)

    

    let block = await getRandomBlock()
    console.log(`Trecho: ${block}`)

    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()
    let totalTesteSkill1 = 0
    let totalTesteSkill2 = 0
    
    if (block == "reta") {
        totalTesteSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTesteSkill2 = diceResult2 + character2.VELOCIDADE;

        await logRollResult(
            character1.NOME,
            "velocidade",
            diceResult1,
            character1.VELOCIDADE,
        )

        await logRollResult(
            character2.NOME,
            "velocidade",
            diceResult2,
            character2.VELOCIDADE,
        )
    }

    if (block == "curva") {
        totalTesteSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTesteSkill2 = diceResult2 + character2.MANOBRABILIDADE;

        await logRollResult(
            character1.NOME,
            "manobrabilidade",
            diceResult1,
            character1.MANOBRABILIDADE,
        )

        await logRollResult(
            character2.NOME,
            "manobrabilidade",
            diceResult2,
            character2.MANOBRABILIDADE,
        )
    }

    if (block == "confronto") {
        let powerResult1 = diceResult1 + character1.PODER;
        let powerResult2 = diceResult2 + character2.PODER;
        let weapon = await rollDice()
        let turbo = await rollDice()

        console.log("⚔ CONFRONTO ⚔ ")
        console.log(`${character1.NOME} 🆚 ${character2.NOME}`)

        await logRollResult(
            character1.NOME,
            "poder",
            diceResult1,
            character1.PODER,
        )

         await logRollResult(
            character2.NOME,
            "poder",
            diceResult2,
            character2.PODER,
        )

        if (powerResult1 > powerResult2 && character2.PONTOS > 0){
            if (weapon > 3 && character2.PONTOS > 1) {
                console.log(`${character1.NOME} jogou uma bomba e ${character2.NOME} perdeu 2 ponto.`)
                character2.PONTOS-= 2;
            } else{
                console.log(`${character1.NOME} jogou um casco e ${character2.NOME} perdeu 1 ponto.`)
                character2.PONTOS--;
            }
            
            // se tirar mais que 3 no dado aciona o turbo
            if(turbo > 3) {
                character1.PONTOS++
                console.log("🔥 Turbo 🔥")
            }
        } 

        if (powerResult2 > powerResult1 && character1.PONTOS > 0){
            if (weapon > 3 && character1.PONTOS > 1) {
            console.log(`${character2.NOME} jogou uma bomba e ${character1.NOME} perdeu 2 ponto.`)
            character1.PONTOS-= 2;
            } else {
                console.log(`${character2.NOME} jogou um casco e ${character1.NOME} perdeu 1 ponto.`)
            character1.PONTOS--;
            }

            let turbo = await rollDice()
            
            if(turbo > 3) {
                character2.PONTOS++
                console.log("🔥 Turbo 🔥")
            }
        }

        //if ternario dentro do console.log
        console.log(powerResult1 === powerResult2 ? "Confronto empatado" : "")
    }

    if (totalTesteSkill1 > totalTesteSkill2){
        console.log(`${character1.NOME} marcou um ponto`);
        character1.PONTOS++;
    } else if (totalTesteSkill2 > totalTesteSkill1){
        console.log(`${character2.NOME} marcou um ponto`);
        character2.PONTOS++;
    }else if(totalTesteSkill1 == totalTesteSkill2 && block != "confronto"){
        console.log("Empate")
    }


    console.log("----------------------")
 }
}

async function declareWinner(character1,character2) {
    console.log("🏆 Resultado Final 🏆");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`${character1.NOME} venceu a corrida`)
    }else if (character2.PONTOS > character1.PONTOS) {
        console.log(`${character2.NOME} venceu a corrida`)
    }else console.log("A corrida terminou empatada.")
}

//função principal que chama a função da mecanica do jogo
(async function main() {
    console.log(`🚥 Inicio da corrida 🚥`)

   
    
    //escolha dos jogadores
    
    let player1 = Mario
    let player2 = Yoshi

    await playRaceEngine(player1,player2)
    await declareWinner(player1,player2)
})()
