export default function bootstrap(schema) {
    // Get the empty state according to our schema.
    const state = schema.getDefaultState();

    // Return the whole Redux initial state.
    return {
        orm: state,
        selectedUserId: 0,
    };
}
