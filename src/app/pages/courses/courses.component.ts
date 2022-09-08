import { Component, OnInit } from '@angular/core';

interface cards {
  image: string;
  btn: string;
}
interface category {
  name: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cards: cards [] = [
    {
      image: "assets/images/u2.webp",
      btn: "btn-danger",
    },
    {
      image: "assets/images/u3.webp",
      btn: "btn-warning",
    },
    {
      image: "assets/images/u4.webp",
      btn: "btn-info",
    },
  ]

  categories: category[] = [
    { name: "Java" },
    { name: ".NET" },
    { name: "Python" },
    { name: "Node.js" },
    { name: "Javascript" },
    { name: "Testing QA" },
    { name: "Android" },
    { name: "Blockchain" },
    { name: "Front End Web Developer" },
    { name: "Internet of things" },
  ]

}
