import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostStatus } from './const/post-status';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async getPostById(postId: string) {
    return this.prisma.post.findFirst({ where: { id: postId } });
  }

  async getPosts() {
    return this.prisma.post.findMany();
  }

  async createPost(newPost: CreatePostDto) {
    return this.prisma.post.create({
      data: { ...newPost, status: PostStatus.pending },
    });
  }
}
