const minGrid = 6;
const maxGrid = 12;

export function paintDoodle(doodle) {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const gridSize = Math.min(Math.max(minGrid, Math.floor(vw / 200)), maxGrid);
  doodle.update(`
    :doodle {
      @grid: ${gridSize} / 100vmax;
      background: transparent;
     
    }
    background-color: var(--bg-secondary); 
    margin: -0.5px;
    clip-path: polygon(@pick(
      '0 0, 100% 0, 100% 100%',
      '0 0, 100% 0, 0 100%',
      '0 0, 100% 100%, 0 100%',
      '100% 0, 100% 100%, 0 100%'
      ));

    @keyframes turn {
      0% {
        transform: rotate(0);
      }
      18% {
        transform: rotate(0);
      }
      20% {
        transform: rotate(90deg);
      }
      38% {
        transform: rotate(90deg);
      }
      40% {
        transform: rotate(180deg);
      }
      68% {
        transform: rotate(180deg);
      }
      70% {
        transform: rotate(270deg);
      }
      98% {
        transform: rotate(270deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @random (.08) {
      background-color: var(--bg-highlight);
      animation: turn @r(60s, 120s) @pick(
          cubic-bezier(0.6, -0.28, 0.735, 1.045),
          cubic-bezier(0.68, -0.55, 0.265, 1.55),
          cubic-bezier(0.175, 0.885, 0.32, 1.275),
          cubic-bezier(0.785, 0.135, 0.45, 0.93))
        infinite;
      animation-delay: @r(10s);
      animation-direction: @pick(alternate, alternate-reverse, normal);
    }
    transition: background-color @r(.25s, .325s) ease;
  `);
}
