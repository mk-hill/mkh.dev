(function () {
  const toKeypressListener = (clickListener) => (e) => {
    if (e.key === 'Enter') return clickListener(e);
    if (e.key === ' ') return e.preventDefault() || clickListener(e);
  };

  function createAddressListeners() {
    const addressLink = document.getElementById('address-link');
    const addressText = addressLink.querySelector('.address');

    const addressChars = ['l', 'h', 'j', 'd', '?', 'l', 'j', 'g', '-', 'c', 'd', 'u'];
    const prefixChars = ['l', '`', 'h', 'k', 's', 'n', '9'];

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function writeAddressToDom(address) {
      addressText.style.maxWidth = '10rem';
      for (let i = 0; i < address.length; i++) {
        addressText.textContent += address[i];
        await sleep(30);
      }
    }

    const handleAddressKeypress = toKeypressListener(handleAddressClick);

    async function handleAddressClick(e) {
      const addOneToCharCode = (char) => String.fromCharCode(char.charCodeAt(0) + 1);
      const [address, prefix] = [addressChars, prefixChars].map((chars) => chars.map(addOneToCharCode).join(''));
      addressLink.href = prefix + address;

      if (window.getComputedStyle(addressText).display !== 'none') {
        e.preventDefault();
        addressLink.blur();
        writeAddressToDom(address);
        addressLink.removeEventListener('click', handleAddressClick);
        addressLink.removeEventListener('keypress', handleAddressKeypress);
      }
    }

    addressLink.addEventListener('click', handleAddressClick);
    addressLink.addEventListener('keypress', handleAddressKeypress);
  }

  function createActivityListeners() {
    const detailedActivities = document.querySelectorAll('.activity-item.has-detail');

    function handleTitleClick(detailLinks, titleLine) {
      ['expanded', 'collapsed'].forEach((className) => this.classList.toggle(className));
      let tabIndex;
      if (this.classList.contains('collapsed')) {
        titleLine.blur();
        tabIndex = -1;
      } else {
        tabIndex = 0;
      }
      detailLinks.forEach((link) => link.setAttribute('tabindex', tabIndex));
    }

    detailedActivities.forEach((activity) => {
      const titleLine = activity.firstElementChild;
      const detailLinks = activity.querySelectorAll('.activity-detail-item a');

      const handler = handleTitleClick.bind(activity, detailLinks, titleLine);

      titleLine.addEventListener('click', handler);
      titleLine.addEventListener('keypress', toKeypressListener(handler));
    });
  }

  function paintDoodle(doodle) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    doodle.update(`
      :doodle {
        @grid: ${Math.max(6, Math.floor(vw / 200))} / 100vmax;
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
      transition: background-color @r(.2s, .3s) ease;
    `);
  }

  function createThemeListeners() {
    const themes = {
      light: {
        '--bg-primary': '#dcdcdd',
        '--bg-secondary': '#d4d7d8',
        '--bg-highlight': '#cdd7d5',
        '--fg-primary': '#36393c',
        '--highlight-primary': '#2a9d8f',
        '--highlight-secondary': '#11829e',
      },

      dark: {
        '--bg-primary': '#212125',
        '--bg-secondary': '#232327',
        '--bg-highlight': '#212328',
        '--fg-primary': '#f8eed9',
        '--highlight-primary': '#10e0fc',
        '--highlight-secondary': '#11829e',
      },
    };

    const themeButton = document.querySelector('#theme-button');
    let currentTheme = 'dark';

    themeButton.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.className = `theme-${currentTheme}`;
      Object.entries(themes[currentTheme]).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
      themeButton.blur();
    });
  }

  function init() {
    createAddressListeners();
    createActivityListeners();
    createThemeListeners();

    const main = document.querySelector('main');
    main.style.display = 'flex';

    const doodle = document.querySelector('css-doodle');
    if (doodle) paintDoodle(doodle);

    setTimeout(() => {
      main.style.opacity = '1';
    }, 0);
  }
  window.addEventListener('load', () => setTimeout(init, 0));
})();
