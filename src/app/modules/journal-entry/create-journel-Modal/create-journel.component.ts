import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import 'quill-mention';
import Quill from 'quill';
// import QuillMention from 'quill-mention';

@Component({
  selector: 'app-create-journel',
  templateUrl: './create-journel.component.html',
  styleUrls: ['./create-journel.component.scss'],
})
export class CreateJournelComponent {
  editorContent: string = '';
  showCustomFields: boolean = false;
  customField1: string = '';
  customField2: string = '';
  selectedAccounts: number[] = [];
  htmlText = "<p>Testing</p>";
  subject: string = '';
  journalEntryForm: any;

  constructor(private fb: FormBuilder) { 
    this.journalEntryForm = this.fb.group({
      number: ['', Validators.required],
      journalDate: ['', Validators.required],
    });
  }
  journal = [
    { id: 1, name: 'No', },
    { id: 2, name: 'Every 1 month' },
    { id: 3, name: 'Every 2 month' },
    { id: 4, name: 'Every 3 montht' },
    { id: 5, name: 'Every 4 monthe' },
    { id: 6, name: 'Every 5 month' },
    { id: 7, name: 'Every 6 months'  },
    { id: 8, name: 'Custom'},

  ];
  Schdule =[
    {id:1, name: 'Day(s)'},
    {id:2, name: 'Week(s)'},
    {id:3, name: 'Month(s)'},
    {id:4, name: 'Year(s)'},

  ]

  ReucuringJournalEntry = [...this. journal];


  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ];

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean'],
        ['link']
      ],
    },
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm: string, renderList: (values: any[], searchTerm: string) => void, mentionChar: string) => {
        const values = mentionChar === "@" ? this.atValues : this.hashValues;

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = values.filter(value => value.value.toLowerCase().includes(searchTerm.toLowerCase()));
          renderList(matches, searchTerm);
        }
      },
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          handler: (range: any, context: any) => {
            console.log("enter");
            return true;
          }
        }
      }
    }
  };

  onSelectionChange(event: any): void {
    // Check if the "Custom" option is selected
    this.showCustomFields = this.selectedAccounts.includes(8);
  }

  onSelectionChanged(event: any) {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged(event: any) {
  }

  onFocus() {
    console.log("On Focus");
  }

  onBlur() {
    console.log("Blurred");
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.journalEntryForm.valid) {
      console.log(this.journalEntryForm.value);
    } else {
      this.journalEntryForm.markAllAsTouched();
    }
  }
}
