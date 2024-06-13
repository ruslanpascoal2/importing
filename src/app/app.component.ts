import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'importing';
  files: File[] = [];

  onChange(ev: any){
    this.files = ev.target.files;

  }

  upload(){
    Array.from(this.files)
    .forEach((file) => {
      const _file = {
        name: file.name,
        file: file,
        uploadOptions: {
          uploadSync: true
        }
      }
      uploadRequest(`https://ib.adnxs.com/ut/v3/prebid`, token, 'pt_BR', 'e2e', _file)
    })
  }
}

const token = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDbGhPUlYxMHJkMjBXUHd2SGdZY0FmTDZGVnhKeXppazZDenRzM0NuVUJJIn0.eyJleHAiOjE3MTgyOTAzNDUsImlhdCI6MTcxODI4Njc0NSwianRpIjoiMGU0MzFiYjItYjljNi00MDZiLThjMjgtNDc2MDQ0ZDNhZTEyIiwiaXNzIjoiaHR0cHM6Ly9lbXByZXNhcy1nYXRld2F5LnN0YWdpbmcucHJvanVyaXMuY29tLmJyL2F1dGgvcmVhbG1zL2UyZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiZTcxODVlMy0zMTcwLTRkM2MtODQ0Zi0wNGQ0YjliNGU4MmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwcm9qdXJpcy1lbnRlcnByaXNlLWNsaSIsInNlc3Npb25fc3RhdGUiOiI2ZDkzMTUyOC00NDQxLTQ4NGItOWUxNi00YzI3ZDkzNWE2YzQiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lMmUiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNmQ5MzE1MjgtNDQ0MS00ODRiLTllMTYtNGMyN2Q5MzVhNmM0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJ0ZW5hbnROYW1lIjoiZTJlIiwidGVuYW50SWQiOiIxMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJjYXJsYS5zaWx2YUBwcm9qdXJpcy5jb20uYnIifQ.JPd-t4aLdVRlBYS5M70bEkvS6pwia_Wwm1LGrY64SzEHBvxuB4O0FVE5cVo2SmVaznKLBI3tdbSg7Z6nL7FM_mG4WF4QmFfAZbPYZ-BmFJDLBfIHlG4l61aDK1Iw1x5q-kIHOIwvY6lKx7KA1jJFgc9z-u4qUwHU_aWr9cRAlVmrxqzE--0kvX9PZu3HnTlX86UNqJrBD83scMH35KK_M76NliRx1Je0D6WvPmtjlaAvSt47VfccEHrW5hE2HWY6fD-q91os4yHi2OYh_3HSkH_OrQg5A5u30o9tYMde5sfKZ1A5uUmCtx-dmc7OzP7umeFAOguj8kEEaMhN6x5k5A`

export function createHeaders(authToken: string, language: string, tenant: string): Headers {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('X-Language', language);
  headers.append('X-TenantID', tenant);

  return headers;
}

function createBody(arquivo: any): FormData {
  const formData = new FormData();
  formData.append('name', arquivo.name);
  formData.append('file', new Blob([arquivo.file.name], { type: arquivo.file.type }), arquivo.file.name);
  formData.append('uploadOptions', JSON.stringify({ uploadSync: true, uuid: '', path: '' }));

  return formData;
}

function uploadRequest(apiUrl: string, authToken: string, language: string, tenant: string, arquivo: any) {
  const headers = createHeaders(authToken, language, tenant);
  const body = createBody(arquivo);

  return fetch(apiUrl, { body, headers, method: 'POST'});
}
