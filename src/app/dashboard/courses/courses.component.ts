import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UniversalService } from 'src/app/services/universal.service';
export interface Course {
  id: number;
  name: string;
  fee: number;
}
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent {
  searchInput!:string;
  p: number = 1;
  data: Course[]=[];
  ngOnInit(): void {
    this.observe()
  }
  constructor(private contract: ContractService, private cd:ChangeDetectorRef,
    private router:Router) {
    LoaderService.loader.next(true)
    this.getCourses()
  }
  async getCourses() {
    const courses = await this.contract.getCourses()
    courses?.map((course: any) => {
      this.data.push({
        id: course[0].toNumber(),
        name: course[1],
        fee: course.fee.toNumber(),
      })
    })
    await LoaderService.loader.next(false)
  }
  route(){
    UniversalService.header.next('Add Course')
    this.router.navigateByUrl('dashboard/courses/add-course')
  }
  async observe() {
    UniversalService.AddCourse.subscribe((res: boolean) => {
      if (res) {
        this.data =[]
        this.getCourses()
      } else {
        return
      }
      this.cd.detectChanges();
    });
  }
}
