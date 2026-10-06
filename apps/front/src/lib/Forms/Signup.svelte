<script lang="ts">
    import "./form.css";
    import type { SignUpRequest } from "./types";

    interface Props {
        onsubmit: (credentials: SignUpRequest) => void;
    }

    let email = $state("");
    let username = $state("");
    let password = $state("");

    let { onsubmit }: Props = $props();

    function signup(event: SubmitEvent) {
        event.preventDefault();
        // todo -- basic verification here?
        onsubmit({ email, username, password });
    }
</script>

<form onsubmit={signup}>
    <div>
        <h1>Sign up</h1>
        <a href="/">Return</a>
    </div>
    <label for="email">Email:</label>
    <input
        type="text"
        bind:value={email}
        id="email"
        name="email"
        autocomplete="username"
    />
    <label for="username">Username:</label>
    <input
        type="text"
        bind:value={username}
        id="username"
        name="username"
        autocomplete="username"
    />
    <label for="password">Password:</label>
    <input
        type="password"
        bind:value={password}
        id="password"
        name="password"
        autocomplete="new-password"
    />
    <button>Sign up</button>
    <hint>Already registed? Sign in <a href="/login">here</a>.</hint>
</form>
