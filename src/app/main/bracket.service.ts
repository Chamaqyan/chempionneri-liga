import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class BracketService {
    constructor(private _httpClient: HttpClient) { }

    public getTeam (){
        return this._httpClient.get('../../assets/data/response.json');
    }
}
