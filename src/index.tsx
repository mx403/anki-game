import { render } from "solid-js/web";
import { createSignal, Show } from "solid-js";
import classes from "./index.module.css";
import confetti from "canvas-confetti";

const cards = [
  {
    title: "SolidJS",
    body: "Is awesome!",
  },
  {
    title: "Hello",
    body: "你好",
  },
];

const App = () => {
  const [answer, showAnswer] = createSignal(false);

  let target = Date.now() + 1000 * 10;
  const [countdown, setCountdown] = createSignal(10);

  const [cardIndex, setCardIndex] = createSignal(0);

  const tick = () => {
    const now = Date.now();
    const diff = target - now;
    setCountdown(Math.ceil(diff / 1000));
    if (diff <= 0) {
      showAnswer(true);
    }
    setTimeout(tick, 1000);
  };
  tick();

  const [points, setPoints] = createSignal(0);

  return (
    <div>
      <div class={classes.top}>
      <progress
        value={cardIndex()}
        max={cards.length}
        class={classes.progress}
      />
      <div class={classes.points}>{points()}</div>
      </div>
      <div class={classes.card}>
        <Show
          when={cardIndex() == cards.length}
          children={<h1>Good Job</h1>}
          fallback={
            <Show
              when={!answer()}
              children={
                <>
                  <h1>{cards[cardIndex()].title}</h1>
                  <p>{countdown()}</p>
                </>
              }
              fallback={
                <>
                  <p>{cards[cardIndex()].body}</p>
                </>
              }
            />
          }
        />
      </div>
      <div class={classes.controls}>
        <Show
          when={cardIndex() == cards.length}
          children={
            <button
              type="button"
              onClick={() => {
                setCardIndex(0);
                target = Date.now() + 1000 * 10;
                setCountdown(10);
                showAnswer(false);
              }}
            >
              restart
            </button>
          }
          fallback={
            <Show
              when={!answer()}
              fallback={
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCardIndex((x) => x + 1);
                      target = Date.now() + 1000 * 10;
                      setCountdown(10);
                      showAnswer(false);
                      setPoints((x) => x + 1);
                    }}
                  >
                    Still learning
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCardIndex((x) => x + 1);
                      target = Date.now() + 1000 * 10;
                      setCountdown(10);
                      showAnswer(false);
                      setPoints((x) => x + 1);
                      confetti();
                    }}
                  >
                    Got it
                  </button>
                </>
              }
            >
              <button type="button" onClick={() => showAnswer(true)}>
                Show answer
              </button>
            </Show>
          }
        />
      </div>
    </div>
  );
};

render(() => <App />, document.getElementById("app")!);
