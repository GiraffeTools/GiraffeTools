export default function bootstrap(orm) {
    // Get the empty state according to our schema.
    const state = orm.getEmptyState();

    // Return the whole Redux initial state.
    return {
        orm: state,
    };
}
