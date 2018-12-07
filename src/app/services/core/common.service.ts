import { HttpHeaders } from '@angular/common/http';

export let httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'Bearer '+localStorage.getItem('token'),
	})
}

export let preAuthOptions = { headers: new HttpHeaders().set('Content-Type', 'text/plain') };
