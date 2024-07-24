import { Component, HostListener, model } from '@angular/core';
import { QUILL_EDITOR_CONFIG, TITLE_PLACEHOLDER } from '../../utils/constants';
import Quill from 'quill';
import { ContentChange, EditorChangeContent, Focus, QuillEditorComponent, QuillModules, SelectionChange } from 'ngx-quill';
import { ArticleServiceService } from '../../services/article-service.service';
import { ArticleModel } from '../../models/article';
import { range } from 'rxjs';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css'
})
export class ArticleEditorComponent {

  constructor(private articleService: ArticleServiceService) { }

  // config quill editor
  qillEditorConfig: QuillModules = QUILL_EDITOR_CONFIG;

  article: ArticleModel = {
    title: '',
    contents: []
  }
  articleContent: string = '';

  id = 'plus-button' + new Date().getTime();
  showToolbar: boolean = false;

  onEditorCreated(event: Quill) {
    const quill: Quill = event;
    // add new line for content
    quill.clipboard.dangerouslyPasteHTML(0, '<p>' + TITLE_PLACEHOLDER + '</p><p><br></p>');
    // format title
    quill.formatLine(0, 1, 'header', 1);
    quill.formatText(0, TITLE_PLACEHOLDER.length, {
      'italic': true,
      'color': '#b3b3b1'
    });
    // focus to first line of content
    quill.setSelection(quill.getLength() - 1, 0);
  }

  onContentChanged(event: ContentChange) {
    console.log(event);
    const quill: Quill = event.editor;
    // enter text to title first time
    if (event.oldDelta.ops[0].insert === TITLE_PLACEHOLDER && event.source === 'user') {
      const insertText = event.delta.ops[1].insert ? event.delta.ops[1].insert : '';
      quill.deleteText(0, TITLE_PLACEHOLDER.length + 1);
      quill.insertEmbed(0, 'text', insertText);
      quill.setSelection(1, 0);
    }
    // add plus button
    const lines = quill.getLines();
    const range = quill.getSelection()?.index;
    if (range) {
      this.addPlusButton(range + 1, quill);
      lines.forEach((line, index: number) => {
        const lineDom = line.domNode;
        if (index > 0) {
          lineDom.classList.add('content-line');
        }
      });
      quill.focus;
    }

  }

  selectionChanged(event: SelectionChange) {
    let quill = event.editor;
    console.log(event);
    // title selected
    let currentText = quill.getText(0, TITLE_PLACEHOLDER.length);
    if (event.range && event.range.index === 0) {
      if (currentText === TITLE_PLACEHOLDER) {
        quill.setSelection(TITLE_PLACEHOLDER.length + 1, 0);
      }
    }

    // add plus button
    const range = quill.getSelection()?.index;
    if (range) {
      console.log(range);
      this.addPlusButton(range, quill);
    }

  }

  addPlusButton(range: number, quill: Quill) {
    const button = document.getElementById(this.id)!;
    const top = quill.getBounds(range)!.top;
    button.style.top = top - 10 + 'px';
    button.style.display = 'block';
    button.onclick = () => this.showToolbarToggle(top);
  }

  showToolbarToggle(index: number) {
    const menuToolt = document
      .getElementById(this.id)
      ?.parentElement?.querySelector('.menu-toolt') as HTMLElement;
    menuToolt.style.top = index + 'px';
    if (!this.showToolbar) {
      menuToolt.style.display = 'block';
    } else {
      menuToolt.style.display = 'none';
    }
    this.showToolbar = !this.showToolbar;
  }

  uploadImg(editor: QuillEditorComponent) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    const quillEditor = editor.quillEditor;
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      const range = quillEditor.getSelection()!;
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          quillEditor.insertEmbed(range!.index, 'image', reader.result, 'user');
          
        };
      }
    };
  }

  uploadVideo(editor: any) { }

  publish() {
    this.article.title = this.articleContent;
    this.articleService.addNewArticle(this.article);
  }

}

