import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }
  commoncls:string = "carousel-caption d-none d-md-block "
  sliders:any = [
    {
      src: "https://cdn.pixabay.com/photo/2016/11/29/13/33/cocktails-1869868_1280.jpg",
      h5: "Enjoy Your Drinks",
      p: "With your family",
      cls: `${this.commoncls}animate__animated animate__fadeInLeft`


    },
    {
      src: "https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_1280.jpg",
      h5: "Order Your Pizza Now",
      p: "Super Delicious",
      cls: `${this.commoncls}animate__animated animate__fadeInRight`

    },
    {
      src: "https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_1280.jpg",
      h5: "Enjoy French fries with friends",
      p: "On weekend",
      cls: `${this.commoncls}animate__animated animate__fadeInUp`

    },
    {
      src: "https://cdn.pixabay.com/photo/2014/09/26/19/51/drink-462776_1280.jpg",
      h5: "Enjoy Your Foods",
      p: "We live for foods",
      cls: `${this.commoncls}animate__animated animate__fadeInDown`

    }
  ]

  ngOnInit(): void {
  }

}
