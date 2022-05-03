# TTApp API V0.1.0
[Official TTApp](https://ttapp.nl) | 
[My Custom TTApp](https://ttapp.inpolen.nl) | 
[API Docs](https://docs.inpolen.nl/api/ttapp)

# Table of Contents
1. [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Simple Example](#simple-example)
  - [Complex Example](#complex-example-typescript--deno)

This is a code repository and documentation for the TTApp api.
## Getting started
### Installation:
**web**:
1. download ttapp.mjs from https://deno.land/x/ttapp/dist/ttapp.mjs and it's typedefinition at https://deno.land/x/ttapp/dist/ttapp.d.ts
2. add ttapp.mjs and (optionally) ttapp.d.ts to your projects directory
3. import the module: 
```js 
import {TTapp} from "./ttapp.mjs"
```

**Deno**:
```ts 
import {TTapp} from "https://deno.land/x/ttapp@0.1.0/mod.ts"
```
### Simple example:
```js
//Create an API instance
const api = new TTApp();

//before performing any request, login. Note: this may fail
await api.login();

//Perform a search 
const result = await api.search("Kees van Beilen")
console.log(result)
```
### Complex example: (typescript & deno)
You can try this example from the commandline using 
```bash
deno run --allow-net https://deno.land/x/ttapp@0.1.0/demo.ts
```
```ts
import {TTApp,SetType} from "./mod.ts"

//Create an API instance
const api = new TTApp();

//before performing any request, login. Note: this may fail
await api.login();

//get a random match and random set in the most recent poule Kees van Beilen played in.
const kees = (await api.search("Kees van Beilen")).players[0]!;
const player = await api.player(kees.playerextid);
const poule = await api.poule(player.poules[0].pouleid)
const randomMatch = poule.matches[Math.floor(Math.random()*poule.matches.length)];
const match = await api.match(randomMatch.id);
const set = match.sets[Math.floor(Math.random()*match.sets.length)];

//log the information to the console
console.log(`====Random Wedstrijd====`);
console.log(`${match.team1name} vs ${match.team2name}`);
console.log(`eindstand: ${match.result.score1}-${match.result.score2}`)
console.log(`====Random (${set.type==SetType.single?"enkel":"dubbel"}) Set in Wedstrijd====`);
console.log(`${set.player1name} vs ${set.player2name}`);
console.log(`eindstand: ${set.score1}-${set.score2}`);
console.log(`games: ${set.games.map(e=>`${e.score1}-${e.score2}`).join(", ")}`);
//doubles don't influence the rating so check if it's not null
if(set.rating1&&set.rating2){
    console.log(`rating: ${set.rating1}-${set.rating2}`)
}
```





