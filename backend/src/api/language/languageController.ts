import type { Request, RequestHandler, Response } from 'express';

import { languageService } from '@/api/language/languageService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

class LanguageController {
    public getLanguages: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await languageService.findAll();
        return handleServiceResponse(serviceResponse, res);
    };
}

export const languageController = new LanguageController();
