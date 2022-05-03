// {"task":"srch","text":"Kees van Beilen","options":{"withclubs":1,"withmatches":1},"uid":"YP2mXOsIadK1vWvZ7GtX4VsPOUoZCQdq","c":"site-324","token":"45633427162677"}
const endpoint = "https://ttapp.nl/api";
import * as t from "./apiTypes.ts"
// if (UID && (_0x5a44e9[_0x1edc('0x145c')] = UID), _0x5a44e9['c'] = CLIENTTYPE + '-' + CLIENTVERSION, _tc) {
//     var _0x4c299e = ('' + Math[_0x1edc('0xf8')]((new Date()['getTime']() + _tc) / 0x3e8 + 0x1ccae2ed))[_0x1edc('0xe6')]('');
//     _0x5a44e9['token'] = '' + _0x4c299e[0x4] + _0x4c299e[0x9] + _0x4c299e[0x5] + _0x4c299e[0x2] + Math[_0x1edc('0xf8')](0xa * Math['random']()) + _0x4c299e[0x3] + _0x4c299e[0x0] + _0x4c299e[0x6] + _0x4c299e[0x1] + _0x4c299e[0x7] + _0x4c299e[0x8] + Math[_0x1edc('0xf8')](0x3e8 * Math['random']());
// }

export class TTApp{

    public uid = "";
    private tc = 0;

    public get token():number{
        const e = ('' + Math.floor((new Date().getTime() + this.tc) / 1000 + 483058413)).split('')
        const token = '' + e[4] + e[9] + e[5] + e[2] + Math.floor(10*Math.random()) + e[3] + e[0] + e[6] + e[1] + e[7] + e[8] + Math.floor(Math.random()*1000)
        return parseInt(token);
    }
    constructor(){
        
    }
    ///verkrijg informatie over een speler met zijn playerid
    async player(id:string):Promise<t.Player>{
        return await player(this.token,id)
    }
    async search(name:string):Promise<t.SearchResult>{
        return await search(this.token,name);
    }
    async poule(pouleid:number):Promise<t.Poule>{
        return await poule(this.token,pouleid);
    }
    async match(matchid:number):Promise<t.Match>{
        return await match(this.token,matchid);
    }
    async login(){
        const {token,uid} = await login();
        this.uid = uid;
        this.tc = 1000 * token - (new Date()).getTime()
    }
}
export async function poule(token:number,poule:number) {
    return await sendMessage({
        "task":"poule",
        "p":poule,
        ///TODO: Uitvogelen wat tab:m betekend
        "tab":"m",
        "uid":"YP2mXOsIadK1vWvZ7GtX4VsPOUoZCQdq",
        "c":"site-324",
        "token":token
    })
}
export async function match(token:number,matchid:number){
    return await sendMessage({
        "task":"match",
        "matchid":matchid,
        "uid":"YP2mXOsIadK1vWvZ7GtX4VsPOUoZCQdq",
        "c":"site-324",
        "token":token
    })
}
export async function player(token:number,id:string) {
    return await sendMessage({
        "task":"player",
        "playerid":id,
        "teams":1,
        "rating":1,
        "uid":"YP2mXOsIadK1vWvZ7GtX4VsPOUoZCQdq",
        "c":"site-324",
        "token":token
    })
}
export async function login() {
    return await sendMessage({
        "task":"login",
        "buildts":1651260125643,
        "uid":"YP2mXOsIadK1vWvZ7GtX4VsPOUoZCQdq",
        "c":"site-324"
    })
}
export async function search(token:number,name:string){
    return await sendMessage({
        "task":"srch",
        "text":name,
        "options":{"withclubs":1,"withmatches":1},
        "uid":"YP2mXOsIadK1vWvZ7GtX4VsPOUoZCQdq",
        "c":"site-324",
        "token":token
    })
}

export async function sendMessage(data:Object){
    const obj = await fetch(endpoint,{"headers":{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},"method":"POST","body":encodeMessage(JSON.stringify(data))}).then(e=>e.json());
    // console.log(txt)
    if(!obj.gd)throw JSON.stringify(obj);
    const res = obj.gd.split("\n").join("")
    // return res.map((e:string)=>e.length<1?null:JSON.parse(decodeMessage(e))).slice(0,-1)
    // console.log(res,res.length)
    const a = decodeMessage(res)
    // console.log(a.replace(/[^A-Za-z0-9_ :.,"{}\[\]]/g,""))
    return JSON.parse(a.replace(/[^A-Za-z0-9_ :.,"{}\[\]]/g,""))
    // if(res.length===2&&res[1].length<1)return JSON.parse(decodeMessage(res[0]))
    // return obj.gd.split("\n").map((e:string)=>e.lengthJSON.parse(decodeMessage(e)));
}

function base64_decrypt(_0x5a44e9:string) {
    // console.log(_0x5a44e9)
    return decodeURIComponent(Array.prototype.map.call(atob(_0x5a44e9.replace(/\s/g, '')), function (t) {
        return '%' + ('00' + t.charCodeAt(0x0).toString(0x10)).slice(-0x2);
    }).join(''));
}

function base64_encrypt(message:string){
    return btoa(encodeURIComponent(message).replace(/%([0-9A-F]{2})/g,function (_:string, component:string) {
                return String.fromCharCode(parseInt(component, 0x10));
    }))
}

function encodeMessage(message:string){
    const randomMatchPattern = String.fromCharCode(0x1a * Math.random()+0x41)
    const secondRandomMatchPattern = String.fromCharCode(0x1a * Math.random()+0x61)
    return base64_encrypt(message)
    .replace(/e/g, '@')
    .replace(new RegExp(randomMatchPattern, 'g'), 'e')
    .replace(/@/g, randomMatchPattern)
    .replace(/A/g, '@')
    .replace(new RegExp(secondRandomMatchPattern, 'g'), 'A')
    .replace(/@/g, secondRandomMatchPattern)
    .replace(/^../, randomMatchPattern + secondRandomMatchPattern)

}
export function decodeMessage(message:string){
    const randomMatchPattern = message[0];
    const secondRandomMatchPattern = message[1];
    const data =  base64_decrypt(message
        .replaceAll(secondRandomMatchPattern,"@")
        .replace(/A/g,secondRandomMatchPattern)
        .replace(/@/g,'A')
        .replaceAll(randomMatchPattern,"@")
        .replace(/e/g,randomMatchPattern)
        .replace(/@/g,'e')
    )
    if(data[0]==="x"){
        return data.replace("x","{\"");
    }else{
        throw "Somthing went wrong " + data[0]
    }
}

