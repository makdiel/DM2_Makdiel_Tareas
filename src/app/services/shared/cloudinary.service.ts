import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudinaryResponseDto } from 'src/app/dtos/shared/cloudinary-response.dto';
import { CloudinaryDto } from 'src/app/dtos/shared/cloudinary.dto';
import { environment } from 'src/environments/environment.prod';

const API_URL: string = `${environment.CLOUDINARY_URL_API}/image/upload`;

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  uploadImage(input: CloudinaryDto): Observable<CloudinaryResponseDto> {
    const formData = new FormData();
    formData.append('file', input.file);
    formData.append('upload_preset', environment.CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', input.folder);
    formData.append('public_id', input.fileName);
    return this._httpClient.post<CloudinaryResponseDto>(API_URL, formData);
  }
}
