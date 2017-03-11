import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilterResume',
    pure: false
})
export class MyFilterResumePipe implements PipeTransform {
    transform(resumes: any[], checkOptions, checkYears): any {
        let filteredResume = [];
        if (resumes) {
            for (let resume of resumes) {
                for (let spe of checkOptions) {
                    for (let year of checkYears) {
                        if (resume.spe.toLowerCase() === spe.toLowerCase() && resume.year.toLowerCase() === year.toLowerCase()) {
                            filteredResume.push(resume);
                        }
                    }
                }
            }
            return filteredResume;
        } else {
            return [];
        }
    }
}