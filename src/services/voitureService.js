import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const MOCK_CARS = [
  {
    id: 1,
    marque: 'Toyota',
    modele: 'Corolla',
    annee: 2022,
    prixVente: 280000,
    prixParJour: 450,
    kilometrage: 15000,
    carburant: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 1, nom: 'Berline' },
    ville: { id: 1, nom: 'Casablanca' },
    description: 'Toyota Corolla 2022, état neuf, faible kilométrage.',
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'],
    listingType: 'SALE',
    disponible: true
  },
  {
    id: 2,
    marque: 'Renault',
    modele: 'Clio',
    annee: 2021,
    prixVente: 180000,
    prixParJour: 300,
    kilometrage: 25000,
    carburant: 'ESSENCE',
    transmission: 'MANUELLE',
    categorie: { id: 1, nom: 'Citadine' },
    ville: { id: 2, nom: 'Rabat' },
    description: 'Renault Clio 5, très économique, idéale ville.',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'],
    listingType: 'SALE',
    disponible: true
  },
  {
    id: 3,
    marque: 'Dacia',
    modele: 'Duster',
    annee: 2023,
    prixVente: 220000,
    prixParJour: 400,
    kilometrage: 5000,
    carburant: 'DIESEL',
    transmission: 'MANUELLE',
    categorie: { id: 2, nom: 'SUV' },
    ville: { id: 3, nom: 'Marrakech' },
    description: 'Dacia Duster 2023, SUV robuste, 4x4.',
    images: ['https://images.unsplash.com/photo-1520030362455-4d9d9b8d3e8c?w=800'],
    listingType: 'SALE',
    disponible: true
  },
  {
    id: 4,
    marque: 'Peugeot',
    modele: '308',
    annee: 2022,
    prixParJour: 350,
    kilometrage: 12000,
    carburant: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 1, nom: 'Berline' },
    ville: { id: 1, nom: 'Casablanca' },
    description: 'Peugeot 308 location, confortable pour longs trajets.',
    images: ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'],
    listingType: 'RENTAL',
    disponible: true
  },
  {
    id: 5,
    marque: 'Volkswagen',
    modele: 'Golf',
    annee: 2022,
    prixParJour: 400,
    kilometrage: 18000,
    carburant: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 1, nom: 'Compacte' },
    ville: { id: 2, nom: 'Rabat' },
    description: 'VW Golf 8, moderne et fiable.',
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'],
    listingType: 'RENTAL',
    disponible: true
  },
  {
    id: 6,
    marque: 'Mercedes',
    modele: 'Classe A',
    annee: 2023,
    prixParJour: 600,
    kilometrage: 8000,
    carburant: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 3, nom: 'Premium' },
    ville: { id: 3, nom: 'Marrakech' },
    description: 'Mercedes Classe A, luxe et performance.',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'],
    listingType: 'RENTAL',
    disponible: true
  },
  {
    id: 7,
    marque: 'BMW',
    modele: 'Serie 3',
    annee: 2022,
    prixVente: 420000,
    prixParJour: 550,
    kilometrage: 22000,
    carburant: 'DIESEL',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 3, nom: 'Premium' },
    ville: { id: 1, nom: 'Casablanca' },
    description: 'BMW Serie 3, sportive et élégante.',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'],
    listingType: 'SALE',
    disponible: true
  },
  {
    id: 8,
    marque: 'Audi',
    modele: 'A4',
    annee: 2023,
    prixVente: 380000,
    prixParJour: 500,
    kilometrage: 10000,
    carburant: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 3, nom: 'Premium' },
    ville: { id: 2, nom: 'Rabat' },
    description: 'Audi A4, technologie et confort.',
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'],
    listingType: 'SALE',
    disponible: true
  },
  {
    id: 9,
    marque: 'Hyundai',
    modele: 'Tucson',
    annee: 2022,
    prixParJour: 450,
    kilometrage: 15000,
    carburant: 'HYBRIDE',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 2, nom: 'SUV' },
    ville: { id: 3, nom: 'Marrakech' },
    description: 'Hyundai Tucson hybride, spacieux et économe.',
    images: ['https://images.unsplash.com/photo-1542362567-b07e54358753?w=800'],
    listingType: 'RENTAL',
    disponible: true
  },
  {
    id: 10,
    marque: 'Kia',
    modele: 'Sportage',
    annee: 2023,
    prixVente: 290000,
    prixParJour: 420,
    kilometrage: 8000,
    carburant: 'ESSENCE',
    transmission: 'AUTOMATIQUE',
    categorie: { id: 2, nom: 'SUV' },
    ville: { id: 1, nom: 'Casablanca' },
    description: 'Kia Sportage, design moderne, garantie 7 ans.',
    images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=800'],
    listingType: 'SALE',
    disponible: true
  },
  {
    id: 11,
    marque: 'Fiat',
    modele: '500',
    annee: 2022,
    prixParJour: 250,
    kilometrage: 18000,
    carburant: 'ESSENCE',
    transmission: 'MANUELLE',
    categorie: { id: 1, nom: 'Citadine' },
    ville: { id: 2, nom: 'Rabat' },
    description: 'Fiat 500, icône italienne, parfaite en ville.',
    images: ['https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800'],
    listingType: 'RENTAL',
    disponible: true
  },
  {
    id: 12,
    marque: 'Citroen',
    modele: 'C3',
    annee: 2021,
    prixVente: 160000,
    prixParJour: 280,
    kilometrage: 30000,
    carburant: 'ESSENCE',
    transmission: 'MANUELLE',
    categorie: { id: 1, nom: 'Citadine' },
    ville: { id: 3, nom: 'Marrakech' },
    description: 'Citroen C3, confortable et personnalisable.',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'],
    listingType: 'SALE',
    disponible: true
  }
]

const isDev = import.meta.env.DEV

const voitureService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get(ENDPOINTS.voitures.list, { params })
      return response.data
    } catch (err) {
      if (err.response?.status === 401) return []
      if (err.response?.status === 403) return []
      if (err.response?.status === 500) return []
      if (isDev) return MOCK_CARS
      throw err
    }
  },
  getByType: async (type, params = {}) => {
    try {
      const response = await api.get(ENDPOINTS.voitures.byType(type), { params })
      return response.data
    } catch (err) {
      if (err.response?.status === 401) return []
      if (err.response?.status === 403) return []
      if (err.response?.status === 500) return []
      if (isDev) return MOCK_CARS.filter(c => c.listingType === type)
      throw err
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(ENDPOINTS.voitures.byId(id))
      return response.data
    } catch (err) {
      if (err.response?.status === 401) return null
      if (err.response?.status === 500) return null
      if (isDev) return MOCK_CARS.find(c => c.id === Number(id)) || null
      throw err
    }
  },
  getMine: async (params = {}) => {
    if (isDev) return []
    const response = await api.get(ENDPOINTS.voitures.mine, { params })
    return response.data
  },
  create: async (data) => {
    if (isDev) return { ...data, id: Date.now() }
    const response = await api.post(ENDPOINTS.voitures.list, data)
    return response.data
  },
  update: async (id, data) => {
    if (isDev) return { ...data, id: Number(id) }
    const response = await api.put(ENDPOINTS.voitures.byId(id), data)
    return response.data
  },
  delete: async (id) => {
    if (isDev) return { success: true }
    const response = await api.delete(ENDPOINTS.voitures.byId(id))
    return response.data
  }
}

export default voitureService