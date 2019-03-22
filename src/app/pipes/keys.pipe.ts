import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'keys',  pure: false })
export class KeysPipe implements PipeTransform {
	transform(value: any, args: any[] = null): any {
		// for(var o in value) console.log(o, value[o]);
		return Object.keys(value);
	}
}