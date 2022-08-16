import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { EntityRepository } from './database/typeorm.decorator';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);

    return board;
  }
}
