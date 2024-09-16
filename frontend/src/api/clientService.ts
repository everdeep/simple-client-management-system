import api from './axiosConfig';
import { Client, ClientLanguage, JsonApiResponse } from '../types';
import { AxiosResponse } from 'axios';

export const getClients = async (): Promise<
  AxiosResponse<JsonApiResponse<Client[]>>
> => {
  return api.get('/clients');
};

export const getClientById = async (
  id: string,
): Promise<AxiosResponse<JsonApiResponse<Client>>> => {
  return api.get(`/clients/${id}`);
};

export const getClientLanguages = async (
  id: string,
): Promise<AxiosResponse<JsonApiResponse<ClientLanguage[]>>> => {
  return api.get(`/clients/${id}/languages`);
};

export const createClient = async (client: any) => {
  return api.post('/clients', { ...client });
}

export const deleteClient = async (id: string) => {
  return api.delete(`/clients/${id}`);
};

export const updateClientDetails = async (id: string, client: Client) => {
  return api.put(`/clients/${id}`, { ...client });
};
