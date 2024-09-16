import type { Client } from '@/api/client/clientModel';
import pool from '@/common/utils/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Language } from '@/api/language/languageModel';
import { toSnakeCase } from '@/common/utils/helpers';

export class ClientRepository {
    async findAll(): Promise<RowDataPacket[]> {
        const [rows] = await pool.query<RowDataPacket[]>(`
            SELECT
                c.id, 
                c.first_name as firstName, 
                c.middle_name as middleName, 
                c.last_name as lastName,
                c.email,
                c.dob, 
                c.created_at as createdAt, 
                c.updated_at as updatedAt,
                f.name AS fundingSource,
                l.name AS languageName,
                l.id AS languageId,
                cl.is_primary as isPrimary
            FROM clients c
            LEFT JOIN client_languages cl ON c.id = cl.client_id
            LEFT JOIN languages l ON cl.language_id = l.id
            LEFT JOIN funding_sources f ON c.funding_id = f.id
        `);
        return rows;
    }

    async findById(id: number): Promise<RowDataPacket[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `
            SELECT
                c.id, 
                c.first_name as firstName, 
                c.middle_name as middleName, 
                c.last_name as lastName,
                c.email,
                c.dob, 
                c.created_at as createdAt, 
                c.updated_at as updatedAt,
                f.name AS fundingSource,
                l.name AS languageName, 
                l.id AS languageId,
                cl.is_primary as isPrimary
            FROM clients c
            LEFT JOIN client_languages cl ON c.id = cl.client_id
            LEFT JOIN languages l ON cl.language_id = l.id
            LEFT JOIN funding_sources f ON c.funding_id = f.id
            WHERE c.id = ?`,
            [id]
        );
        return rows;
    }

    async createClient(client: Client, languages: Language[]): Promise<number> {
        let clientId: number;
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Create client
            client = toSnakeCase(client);
            let [result] = await connection.query<ResultSetHeader>('INSERT INTO clients SET ?', client);
            clientId = result.insertId;

            // Create client languages
            const values = languages.map((language) => [clientId, language.id, language.isPrimary]);
            [result] = await connection.query<ResultSetHeader>(
                'INSERT INTO client_languages (client_id, language_id, is_primary) VALUES ?',
                [values]
            );

            await connection.commit();
        } catch (e) {
            console.error('Error creating client', e);
            await connection.rollback();
            return 0;
        } finally {
            connection.release();
        }

        return clientId;
    }

    async updateClient(id: number, client: Client, languages: Language[]): Promise<number> {
        let affectedRows = 0;
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Update client information
            client = toSnakeCase(client);
            let [result] = await connection.query<ResultSetHeader>('UPDATE clients SET ? WHERE id = ?', [client, id]);
            affectedRows = result.affectedRows;

            // Update client languages
            if (languages) {
                await connection.query('DELETE FROM client_languages WHERE client_id = ?', [id]);
                const values = languages.map((language) => [id, language.id, language.isPrimary]);
                [result] = await connection.query<ResultSetHeader>(
                    'INSERT INTO client_languages (client_id, language_id, is_primary) VALUES ?',
                    [values]
                );
            }
            affectedRows += result.affectedRows;

            await connection.commit();
        } catch (e) {
            console.error('Error updating client', e);
            await connection.rollback();
            return 0;
        } finally {
            connection.release();
        }

        return affectedRows;
    }

    async deleteClient(id: number): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM clients WHERE id = ?', [id]);
        return result.affectedRows;
    }

    async getClientLanguages(clientId: number): Promise<Language[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `
            SELECT
                l.id,
                l.name,
                cl.is_primary AS isPrimary
            FROM client_languages cl
            LEFT JOIN languages l ON cl.language_id = l.id
            WHERE cl.client_id = ?`,
            [clientId]
        );
        return rows as Language[];
    }
}
