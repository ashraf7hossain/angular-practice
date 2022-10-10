import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})

export class ToasterComponent implements OnInit {

  @Input() toaster:string = "";
  @Input() message:string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
