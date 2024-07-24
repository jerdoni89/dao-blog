import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlePreviewComponent } from './pages/article-preview/article-preview.component';
import { ArticleEditorComponent } from './pages/article-editor/article-editor.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropScroll } from './utils/drag-drop.config';
import Quill from 'quill';

Quill.register(DragDropScroll);

@NgModule({
  declarations: [
    AppComponent,
    ArticlePreviewComponent,
    ArticleEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot({
      theme: 'bubble',
      modules: {
      }
    }),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
