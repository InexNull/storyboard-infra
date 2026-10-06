<script lang="ts">
    import LoginForm from "$lib/Forms/Login.svelte";
    import type { LoginRequest } from "$lib/Forms/types";

    function login(credentials: LoginRequest) {
        console.log(
            `Username: ${credentials.username} Password: ${credentials.password}`,
        );
    }
</script>

<main>
    <LoginForm onsubmit={login} />
</main>
