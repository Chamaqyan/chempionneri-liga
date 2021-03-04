import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrascketRoutingModule } from "./bracket.routing-module";
import { BracketService } from "./bracket.service";
import { BracketView } from "./bracket.view";

@NgModule({
    declarations: [
        BracketView
    ],
    imports: [
        CommonModule,
        BrascketRoutingModule
    ],
    exports: [],
    providers: [BracketService]
})

export class BrascketModule { }