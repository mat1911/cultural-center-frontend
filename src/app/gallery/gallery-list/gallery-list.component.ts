import { Component, OnInit } from '@angular/core';
import { IGallery } from '../shared/gallery';
import { GalleryService } from '../shared/gallery.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {

  selectedPictureUrl: string;

  galleryList: IGallery[];
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.loadGalleryList();
  }

  loadGalleryList(): void{
    this.galleryService.getGallery(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.galleryList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

}
