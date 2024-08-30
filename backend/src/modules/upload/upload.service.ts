import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { join } from 'path';
import * as fs from 'fs';

const uploadPaths = join(process.cwd(), 'public/uploads');

@Injectable()
export class UploadService {
  async uploadFile(
    file: Buffer,
    params: {
      filename: string;
    },
  ): Promise<{ path: string; filename: string; ext?: string }> {
    const id = `${crypto.randomBytes(8).toString('hex')}_${Date.now()}`;
    const [name, ext] = params.filename.split('.');
    const finalName = name
      .replace(/ /g, '-')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .slice(0, 15)
      .toLowerCase();
    const finalFilename = ext
      ? `${finalName}_${id}.${ext}`
      : `${finalName}_${id}`;
    const filePath = join(uploadPaths, finalFilename);
    await fs.promises.writeFile(filePath, file);
    return {
      path: `/uploads/${finalFilename}`,
      filename: finalFilename,
      ext,
    };
  }
}
