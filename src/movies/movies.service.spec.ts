import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

const createData = [
  {
    title: 'test title1',
    year: 2022,
    geners: ['action', 'adventure'],
  },
  {
    title: 'test title2',
    year: 2022,
    geners: ['drama'],
  },
];

const updateData = [
  {
    title: 'updated title',
  },
  {
    year: 2030,
  },
];

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create(createData[0]);
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getAll', () => {
    it('should be return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should be return a Movie', () => {
      service.create(createData[1]);
      const movie = service.getOne('1');
      expect(movie).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create(createData[0]);
      const beforeDelete = service.getAll().length;
      service.deleteOne('1');
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should be NotFoundException', () => {
      try {
        service.deleteOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create(createData[0]);
      service.update('1', updateData[0]);
      service.update('1', updateData[1]);
      const movie = service.getOne('1');
      expect(movie.title).toEqual('updated title');
      expect(movie.year).toEqual(2030);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update('999', updateData[0]);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('search', () => {
    it('should be return movies', () => {
      service.create(createData[0]);
      service.create(createData[1]);
      const movies = service.search('2022');
      expect(movies).toBeInstanceOf(Array);
    });
  });
});
