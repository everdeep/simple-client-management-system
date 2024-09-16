import api from './axiosConfig';
import { Client } from '../types';

export const getClients = async () => {
  return api.get('/clients');
};

export const getClientById = async (id: string) => {
  return api.get(`/clients/${id}`);
};

export const getClientLanguages = async (id: string) => {
  return api.get(`/clients/${id}/languages`);
};

export const deleteClient = async (id: string) => {
  return api.delete(`/clients/${id}`);
};

export const updateClientDetails = async (client: Client) => {
  return api.put('/clients', { ...client });
};

export const updateClientLanguages = async (languages: any) => {
  return api.put('/clients/languages', { password: password });
};