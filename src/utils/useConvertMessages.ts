import { Message } from '@/validation/message';

export function convertMessages(messages: Message[]): string {
  return messages.reduce((result, message) => {
    const prefix = message.isUserMessage ? 'User:' : 'AI:';
    return result + prefix + message.text;
  }, '');
}
