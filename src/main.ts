import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app.module';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const port = config.get<number>('PORT');

	const options = new DocumentBuilder()
		.setTitle('Learnify')
		.setDescription('The learnify API description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api/v1');
	app.enableCors({
		allowedHeaders: config.get<string>('ALLOWED_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	});

	await app.listen(port);
}
bootstrap();
