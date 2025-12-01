import { Injectable } from '@nestjs/common';
import { StreamClient } from '@stream-io/node-sdk';
import { StreamChat } from 'stream-chat';

@Injectable()
export class StreamChatService {
    private readonly client: StreamChat;
    private readonly videoClient: StreamClient;

    constructor() {
        const apiKey = process.env.STREAM_KEY!;
        const apiSecret = process.env.STREAM_SECRET!;

        this.client = StreamChat.getInstance(apiKey, apiSecret);
        this.videoClient = new StreamClient(apiKey, apiSecret);
    }

    getClient() {
        return this.client;
    }

    getVideoClient() {
        return this.videoClient;
    }

    async upsertUser(user: { id: string; name?: string; image?: string }) {
        await this.client.upsertUser(user);
    }

    async partialUpdateUser(updateData: any) {
        return this.client.partialUpdateUser(updateData);
    }

    createUserToken(userId: string) {
        return this.client.createToken(userId);
    }

}
