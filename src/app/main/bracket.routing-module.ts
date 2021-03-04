import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BracketView } from "./bracket.view";

const bracketRoutes:Routes = [
    {
        path:'',
        component:BracketView
    }
]

@NgModule({
    imports:[RouterModule.forChild(bracketRoutes)],
    exports:[RouterModule]
})

export class BrascketRoutingModule {}