import {TTApp,SetType} from "./mod.ts"


const api = new TTApp();
const maxTryCount = 3;
await doFetch();

async function doFetch(trycount=0){
    try{
        await api.login();
        const kees = (await api.search("Kees van Beilen")).players[0]!;
        const player = await api.player(kees.playerextid);
        const poule = await api.poule(player.poules[0].pouleid)
        const randomMatch = poule.matches[Math.floor(Math.random()*poule.matches.length)];
        const match = await api.match(randomMatch.id);
        const set = match.sets[Math.floor(Math.random()*match.sets.length)];

        console.log(`====Random Wedstrijd====`);
        console.log(`${match.team1name} vs ${match.team2name}`);
        console.log(`eindstand: ${match.result.score1}-${match.result.score2}`)
        console.log(`====Random (${set.type==SetType.single?"enkel":"dubbel"}) Set in Wedstrijd====`);
        console.log(`${set.player1name} vs ${set.player2name}`);
        console.log(`eindstand: ${set.score1}-${set.score2}`);
        console.log(`games: ${set.games.map(e=>`${e.score1}-${e.score2}`).join(", ")}`);
        if(set.rating1&&set.rating2){
            console.log(`rating: ${set.rating1}-${set.rating2}`)
        }
    }catch(error){
        if(trycount<maxTryCount){
            await doFetch(trycount+1);
        }else{
            console.error("Error: cannot fetch data",error)
        }
    }
}

