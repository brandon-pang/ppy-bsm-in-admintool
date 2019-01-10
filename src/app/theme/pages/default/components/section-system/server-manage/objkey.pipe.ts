import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'objkey', pure: false })
export class ObjKeyPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)
        //.map(key => value[key]);
    }
}