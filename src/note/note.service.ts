import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const note: Note = await this.noteRepository.create(createNoteDto);
    const data = await this.noteRepository.save(note);
    if (data) {
      return {
        success: true,
        message: 'Note created successfully',
        data,
      };
    }

    return {
      success: false,
      message: 'Note creation failed',
    };
  }

  async findAll() {
    const data = await this.noteRepository.find();
    if (data) {
      return {
        success: true,
        message: 'Notes found',
        data,
      };
    }

    return {
      success: false,
      message: 'Notes not found',
      data: [],
    };
  }

  async findOne(id: number) {
    const data = await this.noteRepository.findOne({
      where: { id },
    });
    if (data) {
      return {
        success: true,
        message: 'Note found',
        data,
      };
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.noteRepository.update(id, updateNoteDto);
    const data = this.noteRepository.findOne({
      where: { id },
    });
    if (data) {
      return {
        success: true,
        message: 'Note updated successfully',
        data: data,
      };
    }

    return {
      success: false,
      message: 'Note update failed',
    };
  }

  async remove(id: number) {
    const data = await this.noteRepository.softDelete(id);
    if (data) {
      return {
        success: true,
        message: 'Note deleted successfully',
      };
    }
    return {
      success: false,
      message: 'Note deletion failed',
    };
  }
}
