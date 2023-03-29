import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopWinnersStudiosComponent } from './top-winners-studios.component';



@NgModule({
    declarations: [
        TopWinnersStudiosComponent
    ],
    exports: [
        TopWinnersStudiosComponent
    ],
    imports: [
        CommonModule
    ]
})
export class TopWinnersStudiosModule { }
