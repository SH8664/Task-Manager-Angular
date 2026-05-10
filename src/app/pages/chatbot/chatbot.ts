import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatChannel, ChatMessage } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class ChatbotPage {
  private chatbotService = inject(ChatbotService);
  channels: ChatChannel[] = [];
  selectedChannel?: ChatChannel;
  mode: 'text' | 'image' = 'text';
  messageInput = '';
  newChannelName = '';
  history: ChatMessage[] = [];
  loading = false;
  error = '';

  ngOnInit() {
    this.chatbotService.getChannels().subscribe({
      next: (channels) => {
        this.channels = channels;
        this.selectedChannel = channels[0];
        this.resetHistory();
      },
      error: () => {
        this.error =
          'Unable to load chatbot channels. Make sure json-server is running on port 3000.';
      },
    });
  }

  selectChannel(channel: ChatChannel) {
    this.selectedChannel = channel;
    this.resetHistory();
  }

  addChannel() {
    const name = this.newChannelName.trim();
    if (!name) {
      return;
    }

    const id =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `channel-${Date.now()}`;
    const channel: ChatChannel = {
      id,
      name,
      description: `Custom chat channel for ${name}.`,
      prompt: `Welcome to ${name}. Ask a question and I will help you with this new topic.`,
      images: [],
    };

    this.chatbotService.createChannel(channel).subscribe({
      next: (created) => {
        this.channels = [...this.channels, created];
        this.newChannelName = '';
        this.selectChannel(created);
      },
      error: () => {
        this.error = 'Unable to create a new channel. Please try again.';
      },
    });
  }

  selectMode(mode: 'text' | 'image') {
    this.mode = mode;
    this.history = [
      {
        sender: 'bot',
        text: `You are in ${mode === 'text' ? 'text chat' : 'image'} mode. ${
          this.selectedChannel?.prompt || ''
        }`,
        time: new Date().toLocaleTimeString(),
      },
    ];
  }

  sendMessage() {
    if (!this.selectedChannel || !this.messageInput.trim()) {
      return;
    }

    const messageText = this.messageInput.trim();
    const userMessage: ChatMessage = {
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString(),
    };

    this.history = [...this.history, userMessage];
    this.messageInput = '';
    this.loading = true;

    setTimeout(async () => {
      if (this.mode === 'text') {
        const botText = await this.chatbotService.getBotTextResponse(this.selectedChannel!, this.history);
        this.history = [
          ...this.history,
          {
            sender: 'bot',
            text: botText,
            time: new Date().toLocaleTimeString(),
          },
        ];
      } else {
        const imageUrl = await this.chatbotService.getBotImageResponse(messageText);
        this.history = [
          ...this.history,
          {
            sender: 'bot',
            imageUrl,
            text: `Generated image for: "${messageText}"`,
            time: new Date().toLocaleTimeString(),
          },
        ];
      }

      this.loading = false;
    }, 400);
  }

  private resetHistory() {
    this.history = [
      {
        sender: 'bot',
        text: this.selectedChannel
          ? `Welcome to ${this.selectedChannel.name}. ${this.selectedChannel.prompt}`
          : 'Loading chatbot...',
        time: new Date().toLocaleTimeString(),
      },
    ];
  }
}
