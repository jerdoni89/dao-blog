import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditorComponent } from './pages/article-editor/article-editor.component';
import { ArticlePreviewComponent } from './pages/article-preview/article-preview.component';

const routes: Routes = [
  {
    path: 'article/editor', component: ArticleEditorComponent
  },
  {
    path: 'article/preview', component: ArticlePreviewComponent
  },
  {
    path: '', redirectTo: 'article/editor', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
