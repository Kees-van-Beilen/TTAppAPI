//task=search
export interface SearchResult{
    matches:unknown,
    clubs:unknown,
    uid:string,
    players:SearchResultPlayer[]
}
export interface SearchResultPlayer{
    ///De organisatie waarbij de speler en zijn club staan ingeschreven zoals de NTTB
    orglabel:string,
    ///bondsnummer
    playerid:number,
    orgid:number,
    ///naam van de speler
    playername:string
    hasloggedin:0|1,
    hasemail:0|1,
    userid:number
    teamname:string|null,
    clubs:string[],
    playerextid:string
}
//task=player
export interface Player{
    poules:PouleData[],
    ratings:TimeStampELORating[],
    player:PlayerData
}
type unixTimeStamp = number
type bool = 0|1
type TimeStampELORating = [unixTimeStamp,number]
export interface PouleData{
    teamname:string,
    pouleid:number,
    sub:number,
    regionname:string,
    poulename:string
    groupname:string,
    collapsepoules:number,
    seasonname:string
}
export interface PlayerData{
    anonymous:0|1,
    ratingtype:number,
    extid:string,
    orglabel:string,
    playerid:number,
    orgid:number,
    playername:string
}
//task=poule
export interface Poule{
    matches:MatchData[],
    tabp:bool,
    tabm:bool,
    matchtypeid?:number,
    issub:bool,
    tabs:number,
    ownteam:number,
    pouleid:number,
    ratingtype:number,///TODO: weten welke rating types er zijn en omzetten naar enum
    knockout:unknown,
    groupname:string,
    standingsmethod:number,
    preliminary:bool,
    error:string,
    seasonname:string,
    published:bool,
    tournamentid:number,
    prevsemester:number,
    groupid:number,
    poulename:string,
    secrname:string,
    regionname:string,
    basepoule:unknown,
    semester:number,
    latetime:unknown
}

export interface MatchData{
    canceled: 0|1;
    confirmed0: unknown;
    confirmed1: unknown;
    confirmed2: unknown;
    confirmtime0: unknown;
    confirmtime1?: unixTimeStamp;
    confirmtime2: unknown;
    dwfdone: unknown;
    enablecards: number;
    extreqrefreshtime: number;
    hasissue: 0|1;
    id: number;
    imageid?: string;
    issub1: unknown;
    issub2: unknown;
    lastupdate: unixTimeStamp;
    lineupissues: unknown;
    locationid: unknown;
    matchnr: number;
    matchtypeid: unknown;
    ownteam1: 0|1;
    ownteam2: 0|1;
    playdate: string;
    playtime: string;
    postponed: number;
    pouleid: number;
    remark?: string;
    remarks0: unknown;
    remarks1: unknown;
    remarks2: unknown;
    result: string;
    rotatechoice: number;
    score1: number;
    score2: number;
    secsago: number;
    source: number;
    status: number;///TODO: convert status naar enum zodra ik weet wat de status betekent
    team1id: number;
    team1name: string;
    team2id: number;
    team2name: string;
    unfinishedsets: number;
    updatefreq: number;
}
//task=match
export interface Match{
   groupname:string,
   teamh2hcount:number,
   contacts:unknown[],
   postponed:bool,
   canceled:bool,
   managed:bool,
   matchtypeid:unknown,
   playtime:string,
   maygrant:bool,
   published:bool,
   pouleid:number,
   imageuploadtime:unknown,
   team2id:number,
   islate:bool,
   team1id:number,
   team1withdrawn:bool,
   team2withdrawn:bool,
   tournamentid:number|0,
   ratingfactor:number,
   enablecards:bool,
   remark?:string,
   ratingtype:number,
   orgid:number,
   imageid:unknown,
   team2name:string,
   imageplayerid:unknown,
   mayedit:bool,
   team1name:string,
   canwatch:bool,
   matchnr:number,
   teamplayersordered:bool,
   canpostponematch:bool,
   seasonname:string,
   poulename:string,
   status:number,
   imageplayername:unknown,
   maymovematch:bool,
   rotatechoice:number,
   regionname:string,
   pscores:Score[],
   sets:MatchSet[],
   result:MatchResult,
   lineupissues:unknown[]

}

export interface Score{
    order:number,
    loose:number,
    sub:number,
    playerid:number,
    ishome:bool,
    win:number
}

export enum SetType{
    single=1,
    double=2
}
export type MatchResult = Game;
///Ratings zijn niet beschikbaar in dubbels
export interface MatchSet{
    player2id?:number,
    matchid:number,
    dbl21:number,
    player2name:string,
    dbl22:number,
    ratinggain1?:number,
    rating1?:number,
    id:number,
    h2hcount:number,///TODO: wat is h2h
    setscorefail:number,
    gaveup1:number,
    anonymous2:unknown,
    dbl11:number,
    score1:number,
    anonymous1:unknown,
    score2:number,
    dbl12:number,
    player1id?:number,
    ratingdiff?:number,
    sub1:bool,
    player1name:string,
    disabled:bool,
    adv1:unknown,
    rating2?:number,
    ratinggain2?:number,
    seq:number,
    gaveup2:bool,
    edittime:unknown,
    sub2:bool,
    type:SetType,//
    live:bool,
    adv2:unknown,
    games:Game[]
}

export interface Game{
    score1:number,
    score2:number
}