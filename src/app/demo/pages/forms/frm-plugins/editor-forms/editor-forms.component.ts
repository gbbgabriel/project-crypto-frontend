import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import jsonDoc from './editor';
import { Validators, Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-editor-forms',
  templateUrl: './editor-forms.component.html',
  styleUrls: ['./editor-forms.component.scss']
})
export class EditorFormsComponent implements OnDestroy, OnInit {
  // public props
  editorDoc = jsonDoc;

  editor!: Editor;

  // life cycle event
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // public method
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];

  form = new FormGroup({
    editorContent: new FormControl({ value: jsonDoc, disabled: false }, Validators.required())
  });
}
