import type { Request, RequestHandler, Response } from 'express';

import { clientService } from '@/api/client/clientService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

class ClientController {
    public getClients: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await clientService.findAll();
        return handleServiceResponse(serviceResponse, res);
    };

    public getClient: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await clientService.findById(id);
        return handleServiceResponse(serviceResponse, res);
    };

    public createClient: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await clientService.createClient(req.body);
        return handleServiceResponse(serviceResponse, res);
    };

    public updateClient: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await clientService.updateClient(id, req.body);
        return handleServiceResponse(serviceResponse, res);
    };

    public deleteClient: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await clientService.deleteClient(id);
        return handleServiceResponse(serviceResponse, res);
    };

    public getClientLanguages: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await clientService.getClientLanguages(id);
        return handleServiceResponse(serviceResponse, res);
    };
}

export const clientController = new ClientController();
