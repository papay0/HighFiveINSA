import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilterResume',
    pure: false
})
export class MyFilterResumePipe implements PipeTransform {
    transform(resumes: any[], checkOptions): any {
        let filteredResume = [];
        if (resumes) {
            for (let resume of resumes) {
                for (let spe of checkOptions) {
                    if (resume.spe.toLowerCase() === spe.toLowerCase()) {
                        filteredResume.push(resume);
                    }
                }
            }
            return filteredResume;
        } else {
            return [];
        }
    }
}

