export const bookingQueries = () => ({
    // !IMPORTANT: This MUST not change
    booking: (parent: unknown, arg: any) => ({ id: arg.id }),
});
