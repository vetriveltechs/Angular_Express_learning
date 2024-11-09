import { HttpHeaders } from '@angular/common/http';

// Define your credentials
const username = 'manoj';
const password = 'manoj@123';

// Encode credentials to base64
const credentials = btoa(`${username}:${password}`);

// Create HTTP options including the Authorization header
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Basic ${credentials}`
  })
};
