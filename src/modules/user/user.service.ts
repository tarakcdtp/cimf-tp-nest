import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

      async create(userData: Partial<UserEntity>): Promise<UserEntity> {
            const user = await this.userRepository.create(userData);
            return this.userRepository.save(user); 
        }

        async findByEmail(email: string): Promise<UserEntity | null> {
      return await this.userRepository.findOne({ where: { email } });
    }
}