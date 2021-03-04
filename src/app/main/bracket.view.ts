import { Component, OnDestroy, OnInit } from "@angular/core";
import { BracketService } from "./bracket.service";

@Component({
    selector: "bracket-view",
    templateUrl: 'bracket.view.html',
    styleUrls: ['bracket.view.scss']
})

export class BracketView implements OnInit, OnDestroy {
    public groupA = [];
    public groupB = [];
    public semifinalsA = [];
    public semifinalsB = [];
    public polufinalA = [];
    public polufinalB = [];
    public finalA;
    public finalB;
    public winner;
    private _countTeam = 0;
    constructor(public bracketService: BracketService) { }

    ngOnInit() {
        this.bracketService.getTeam().subscribe((respons:any ) => {
            this._countTeam = respons.data.length / 2
            this.groupA = respons.data.slice(0, this._countTeam)
            this.groupB = respons.data.slice(this._countTeam)   
        })
    }

    private _getWinner(array) {
        let winner;
        if (Math.floor(Math.random() * 10) % 2) {
            winner = array.slice(0, 1)
        } else {
            winner = array.slice(1, 2)
        }

        return winner;
    }

    public goWin() {
        if(this.winner){
            alert('Winnner ' + this.winner.team_name )
            console.log(this.winner)
            return
        }
        if (this.semifinalsA.length) {

            if (this.polufinalA.length) {
                if(this.finalA){
                    this.winner =this._getWinner([this.finalA,this.finalB])[0];
                    alert('Winnner ' + this.winner.team_name )
                }else{
                    this.finalA = this._getWinner(this.polufinalA[0])[0];
                    this.finalB = this._getWinner(this.polufinalB[0])[0];
                    console.log(this.finalA)
                }
            } else {
                let newsemifinalsA = this.semifinalsA;
                let newsemifinalsB = this.semifinalsB;
                while (newsemifinalsA.slice(0, 1).length) {
                    let winnerSfinalA = this._getWinner(newsemifinalsA.slice(0, 1)[0])[0];
                    let winnerSfinalB = this._getWinner(newsemifinalsB.slice(0, 1)[0])[0];

                    if (typeof this.polufinalA[0] !== 'undefined') {
                        this.polufinalA[0].push(winnerSfinalA);
                        this.polufinalB[0].push(winnerSfinalB);
                    } else {
                        this.polufinalA.push([winnerSfinalA]);
                        this.polufinalB.push([winnerSfinalB]);
                    }

                    newsemifinalsA = newsemifinalsA.slice(1)
                    newsemifinalsB = newsemifinalsB.slice(1)

                }
            }

            console.log(this.polufinalA,this.polufinalB)
        }
        else {
            let newGroupA = this.groupA;
            let newGroupB = this.groupB;
            let arrayGroupA = [];
            let arrayGroupB = [];
            while (newGroupA.slice(0, 2).length) {
                let winnerA = this._getWinner(newGroupA);
                let winnerB = this._getWinner(newGroupB);

                if (arrayGroupA.length == 2) {
                    this.semifinalsA.push(arrayGroupA);
                    this.semifinalsB.push(arrayGroupB);
                    arrayGroupA = [];
                    arrayGroupB = [];
                }


                arrayGroupA.push(winnerA[0]);
                arrayGroupB.push(winnerB[0]);
                newGroupA = newGroupA.slice(2)
                newGroupB = newGroupB.slice(2)


            }

            this.semifinalsA.push(arrayGroupA);
            this.semifinalsB.push(arrayGroupB);
            //  console.log(this.semifinalsA)
        }

    }

    ngOnDestroy() { }
}
