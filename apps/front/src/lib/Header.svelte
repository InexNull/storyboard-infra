<script>
    import { goto } from "$app/navigation";
</script>

<header>
    Website Name
    <nav>
        <a href="/login" onclick={() => goto("/login")}>Log in</a>
        <a href="/signup" onclick={() => goto("/signup")}>Sign up</a>
    </nav>
</header>

<style>
    header {
        font-size: 24px;
        display: flex;
        justify-content: space-between; /* Pushes items away */
        align-items: center;
        padding-left: 8px;
        padding-right: 8px;
        border-bottom: 1px solid var(--border-color);
    }
    nav {
        font-size: 16px;
        display: flex; /* Flexbox ignores whitespace */
        gap: 8px;
    }
    a {
        cursor: pointer;
        position: relative;
        display: inline-block;
        border: none;
        padding: 8px 8px;
        margin: 12px 0;
        border-left: 1px solid var(--accent-primary);
        background-color: transparent;
        color: var(--text-color);
        text-decoration: none;
    }

    a:hover {
        border-color: var(--accent-primary);
        background-color: var(--bg-card);
        text-decoration: underline;
    }
</style>
