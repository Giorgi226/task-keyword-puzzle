import { Injectable, NotFoundException } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleImageService {

    private customSearch = google.customsearch('v1');

  async fetchImages(keyword: string): Promise<string[]> {
    const apiKey = process.env.GOOGLE_API_KEY; 
    const cx = process.env.GOOGLE_CX; 

    const response = await this.customSearch.cse.list({
      q: keyword,
      cx,
      key: apiKey,
      searchType: 'image',
      num: 5,
    });

    if (!response.data.items || response.data.items.length < 5) {
      throw new NotFoundException(
        'ar moipoveba sakmarisisuratebi GOOGLE APIs tvis am keywordit',
      );
    }

    return response.data.items.map((item) => item.link); 
  }
}
