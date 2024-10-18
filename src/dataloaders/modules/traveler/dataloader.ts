import DataLoader from 'dataloader';
import { listTravelerByIds, Traveler } from './model';

type BatchTravelers = (travelerIds: string[]) => Promise<Traveler[]>;

export const batchLoadTravelers: BatchTravelers = async (travelerIds) => {
    return listTravelerByIds(travelerIds)
};

export const travelerLoader = new DataLoader(batchLoadTravelers);
