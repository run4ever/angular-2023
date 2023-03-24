import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { ArticleService } from './services/article.service';
import { BackArticleService } from './services/back-article.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent, HomeComponent, LegalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    HttpClientModule,
  ],

  //dependancy injections : au lieu d'utiliser la classe ArticleService on va utiliser BackArticleService
  //dans la vraie vie on modifierait directement la classe ArticleService mais là c'est à but pédagogique
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: ArticleService, useClass: BackArticleService },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
