<style>
    h1 {
        margin: 0;
    }
    input {
        background-color: var(--input-background);
        border-radius: 8px;
        border-style: solid;
        font-size: 20px;
        padding: 8px 4px;
    }

    input:focus {
        border-color: var(--accent-primary);
    }

    form {
        background-color: var(--bg-card);
        max-width: 600px;
        padding: 50px 50px;
        margin: 0 auto;

        display: flex;
        flex-direction: column;
        gap: 16px;

        border-radius: 16px;
    }

    button {
        background-color: var(--accent-secondary);
        padding: 8px 0;
        font-size: 20px;
        border: none;
        border-radius: 8px;
    }
</style>

<script>
    let login = function() {
        console.log("Test");
    }
</script>

<main>
    <form onsubmit={login}>
        <h1>Log in</h1>
        <input type="text" id="uname" name="uname" placeholder="Username/email" />
        <input type="password" id="psw" name="psw" placeholder="Password" />
        <button>Sign in</button>
    </form>
</main>