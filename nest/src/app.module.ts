import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConsoleModule } from './_console/_console.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './_user/_user.module';
import { TestModule } from './_test/_test.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './_auth/_auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './shared/middlewares/jwt.middleware';
import { GenreModule } from './_genre/_genre.module';
import { RankModule } from './_rank/_rank.module';
import { DeveloppersModule } from './_developper/_developper.module';
import { DistributersModule } from './_distributer/_distributer.module';
import { GalleryModule } from './_gallery/_gallery.module';

@Module({
  imports: [
    TestModule
    , UserModule
    , ConsoleModule
    , GenreModule
    , DeveloppersModule
    , DistributersModule
    , RankModule
    , AuthModule
    , GalleryModule
    , TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pff_sbiltresse_webapps23',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      autoLoadEntities : true,
      synchronize: true,
      //logging : "all"
    })
    , ConfigModule.forRoot({isGlobal : true})
    , JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // Clé secrète pour signer les tokens JWT (peut être récupérée depuis le fichier .env)
      signOptions: { expiresIn: '24h' }, // Options de signature des tokens (par exemple : expiration)
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
