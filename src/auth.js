import { reactive } from "vue";

export const auth = reactive({
    currentUser: {
        isAuthenticated: false,
        token: "",
    }
});