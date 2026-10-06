<script lang="ts">
    import type { EventHandler, HTMLInputTypeAttribute } from "svelte/elements";

    interface Question {
        type: HTMLInputTypeAttribute;
        id: string;
    }

    interface Props {
        onsubmit: EventHandler<SubmitEvent>;
        questions: Question[];
    }
    let props: Props = $props();
    function login(event: SubmitEvent) {
        event.preventDefault();
        console.log("Test");
    }
</script>

<form onsubmit={props.onsubmit}>
    <div>
        <h1>Log in</h1>
        <a href="/">Return</a>
    </div>
    {#each props.questions as question}
        <input type={question.type} id={question.id} />
    {/each}
    <button>Sign in</button>
    <hint>Not registered? Sign up <a href="/signup">here</a>.</hint>
</form>

<style>
    form {
        background-color: var(--bg-card);
        max-width: 600px;
        padding: 50px;
        margin: 0 auto; /* Center horizontally */

        /* So each item gets to be on a different line*/
        display: flex;
        flex-direction: column;
        gap: 16px;

        border-radius: 16px;
    }

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

    button {
        cursor: pointer;
        background-color: var(--accent-secondary);
        padding: 8px 0;
        font-size: 20px;
        border: none;
        border-radius: 8px;
    }

    form div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
