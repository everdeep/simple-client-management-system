import type { Language } from '@/api/language/languageModel';
import pool from '@/common/utils/db';
import { RowDataPacket } from 'mysql2';

export class LanguageRepository {
    async findAllAsync(): Promise<Language[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM languages');
        return rows as Language[];
    }
}
