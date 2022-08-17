import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ListenerService {

  @OnEvent('articleEvent')
  handleArticleCreatedEvent() {
    console.log('article');
  }

  @OnEvent('userEvent')
  handleUserCreatedEvent() {
    console.log('user');
  }
}