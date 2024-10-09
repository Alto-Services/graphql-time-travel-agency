import { Context } from '../../context';
import { Traveler } from './model';

type TravelerResolverParent = { id: string } & Partial<Traveler>;

export const travelerResolvers = () => ({
    name: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        return parent.name ?? getTravelerById(parent.id)?.name;
    },
    eraOfOrigin: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        return parent.eraOfOrigin ?? getTravelerById(parent.id)?.eraOfOrigin;
    },
    id: (parent: TravelerResolverParent, _: unknown, { getTravelerById }: Context) => {
     return parent.id ?? getTravelerById(parent.id)?.id;
    }
});