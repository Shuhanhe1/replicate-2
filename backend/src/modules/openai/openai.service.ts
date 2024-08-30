import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI(this.configService.get('OPENAI_API_KEY'));
  }

  public async createCompetition({ content }: { content: string }) {
    const messagesHistory = [
      {
        role: 'user',
        content,
      },
    ];

    let output = '';
    let lastChoice = null;

    let i = 0;
    while (!lastChoice || lastChoice?.finish_reason === 'length') {
      console.log('Iteration', i, lastChoice);
      if (i > 8) throw new Error('Too many iterations');
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        // @ts-ignore
        messages: messagesHistory,
      });

      lastChoice = response.choices[response.choices.length - 1];

      if (lastChoice)
        messagesHistory.push(
          {
            role: 'assistant',
            content: lastChoice.message.content,
          },
          {
            role: 'user',
            content: 'Truncated, please continue',
          },
        );

      output += lastChoice.message.content;
      i++;
    }

    return output;
  }

  public async generateImage(
    params: OpenAI.Images.ImageGenerateParams,
  ): Promise<Buffer> {
    const {
      model = 'dall-e-3',
      n = 1,
      size = '1024x1024',
      ...restParams
    } = params;
    const response = await this.openai.images.generate({
      model,
      n,
      size,
      ...restParams,
    });

    const arrayBuffer = await axios.get(response.data[0].url, {
      responseType: 'arraybuffer',
    });

    return Buffer.from(arrayBuffer.data, 'binary');
  }
}
