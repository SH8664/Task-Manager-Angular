import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  prompt: string;
  images?: string[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text?: string;
  imageUrl?: string;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private http = inject(HttpClient);
  private readonly channelsUrl = 'http://localhost:3000/channels';

  getChannels(): Observable<ChatChannel[]> {
    return this.http.get<ChatChannel[]>(this.channelsUrl);
  }

  createChannel(channel: ChatChannel): Observable<ChatChannel> {
    return this.http.post<ChatChannel>(this.channelsUrl, channel);
  }

  async getBotTextResponse(channel: ChatChannel, history: ChatMessage[]): Promise<string> {
    const message = history
      .map((message) => {
        if (message.sender === 'user') {
          return `User: ${message.text || ''}`;
        }
        return `Assistant: ${message.text || ''}`;
      })
      .join('\n');

    const body = {
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'user',
          content: `Channel: ${channel.name}\nPrompt: ${channel.prompt}\nConversation:\n${message}`,
        },
      ],
    };

    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${environment.MistralApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status}`);
      }

      const data = await response.json();
      const content =
        data?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.content?.[0]?.text ||
        data?.choices?.[0]?.text ||
        null;

      if (typeof content === 'string') {
        return content.trim();
      }

      throw new Error('Unexpected Mistral response format');
    } catch (error) {
      console.error('Mistral text response failed:', error);
      return channel.prompt;
    }
  }

  async getBotImageResponse(userInput: string): Promise<string | undefined> {
    async function queryImage(data: { inputs: string }): Promise<Blob> {
      const HF_TOKEN = `Bearer ${environment.HuggingFaceApiKey}`;
      const response = await fetch(
        'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell',
        {
          headers: {
            Authorization: HF_TOKEN,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error(`Image generation failed with status ${response.status}`);
      }

      return response.blob();
    }

    try {
      const blob = await queryImage({ inputs: userInput });
      const imageUrl = URL.createObjectURL(blob);
      console.log('Generated image URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Failed to generate image:', error);
      return undefined;
    }
  }
}
