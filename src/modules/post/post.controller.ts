import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts() {
    console.log('running');
    return this.postService.getPosts();
  }

  @Get(':postId')
  getPostById(@Param('postId') postId: string) {
    return this.postService.getPostById(postId);
  }

  @Post()
  createPost(@Body() newPost: CreatePostDto) {
    return this.postService.createPost(newPost);
  }
}
