export default (state, action) => {
    switch (action.type) {
        case "signIn":

            return {
                authenticated: true,
                user: action.user
            };
        case "signOut":
            return {
                authenticated: false,
                user: null
            };
        default:
            return state;
    }
};