<script lang="ts">
    import SignupForm from "$lib/Forms/Signup.svelte";
    import type { SignUpRequest } from '$lib/Forms/types';

    function signup(credentials: SignUpRequest) {
        console.log(`Email: ${credentials.email} Username: ${credentials.username} Password: ${credentials.password}`);
    }
</script>

<main>
    <SignupForm onsubmit={signup} />
</main>