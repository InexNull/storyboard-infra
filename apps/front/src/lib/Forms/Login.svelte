<script lang="ts">
    import './form.css'
    import type { LoginRequest } from './types';

    interface Props {
        onsubmit: (credentials: LoginRequest) => void;
    }

    let username = $state('');
    let password = $state('');

    let { onsubmit }: Props = $props();

    function login(event: SubmitEvent) {
        event.preventDefault();
        // todo -- basic verification here?
        onsubmit({ username, password });
    }
</script>

<form onsubmit={login}>
    <div>
        <h1>Log in</h1>
        <a href="/">Return</a>
    </div>
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
        autocomplete="current-password"
    />
    <button>Sign in</button>
    <hint>Not registered? Sign up <a href="/signup">here</a>.</hint>
</form>