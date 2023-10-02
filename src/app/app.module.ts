import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentComponent } from './components/document/document.component';
import { CategoryComponent } from './components/category/category.component';
import { SearchComponent } from './components/search/search.component';
import { StoreModule } from '@ngrx/store';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { getDataReducer } from './domain/store/get-data.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GetDataEffects } from './domain/store/get-data.effects';
import { CategoryDirective } from './directives/category.directive';
import { DocumentDirective } from './directives/document.directive';
import { BookmarkButtonComponent } from './components/bookmark-button/bookmark-button.component';
import { NewTypeButtonComponent } from './components/new-type-button/new-type-button.component';
import { NewDocumentButtonComponent } from './components/new-document-button/new-document-button.component';

@NgModule({
  declarations: [AppComponent, DocumentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ data: getDataReducer }),
    EffectsModule.forRoot([GetDataEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    WrapperComponent,
    CategoryComponent,
    SearchComponent,
    BookmarkButtonComponent,
    NewTypeButtonComponent,
    NewDocumentButtonComponent,
    CategoryDirective,
    DocumentDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
