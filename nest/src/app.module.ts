import { Module } from '@nestjs/common';
import { ConsoleModule } from './_console/_console.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './_user/_user.module';
import { TestModule } from './_test/_test.module';

@Module({
  imports: [
    TestModule
    , UserModule
    , ConsoleModule
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
