import { Context } from '../../context';
import { Traveler } from './model';

type TravelerResolverParent = { id: string } & Partial<Traveler>;

export const travelerResolvers = () => ({
    name: async (parent: TravelerResolverParent, args: unknown, { travelerLoader }: Context) => {
        return parent.name ?? (await travelerLoader.load(parent.id))?.name;
    },
    eraOfOrigin: async (parent: TravelerResolverParent, args: unknown, { travelerLoader }: Context) => {
        return parent.eraOfOrigin ?? (await travelerLoader.load(parent.id))?.eraOfOrigin;
    },
});
