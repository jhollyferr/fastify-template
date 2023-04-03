import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	JWT_SECRET: z.string(),
	PORT: z.coerce.number().default(3333),

	POSTGRESQL_USERNAME: z.string(),
	POSTGRESQL_PASSWORD: z.string(),
	POSTGRESQL_DATABASE: z.string(),
	POSTGRESQL_PORT: z.coerce.number().default(5432),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error('❌️ Invalid environment variables', _env.error.format());

	throw new Error('Invalid environment variables.');
}

export const Env = _env.data;