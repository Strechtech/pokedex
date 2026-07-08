import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { JoivalidationSchema } from './config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot({load: [envConfig], validationSchema: JoivalidationSchema}),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }), 
  MongooseModule.forRoot(process.env.MONGODB!, {
    dbName: 'pokemondb',
  }),
  PokemonModule,
  SeedModule],
})
export class AppModule {
  
}
