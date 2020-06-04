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
    doodle.update(`
      :doodle {
        @grid: 15 / 100vmax;
        background: var(--bg-primary);
      }
      background-color: var(--fg-primary); 
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
        10% {
          transform: rotate(90deg);
        }
        25% {
          transform: rotate(90deg);
        }
        30% {
          transform: rotate(180deg);
        }
        55% {
          transform: rotate(180deg);
        }
        60% {
          transform: rotate(270deg);
        }
        95% {
          transform: rotate(270deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      transition: @r(3s) ease;
      @random (.08) {
        background-color: var(--highlight-primary);
        animation: turn @r(30s, 60s) @pick(
            cubic-bezier(0.6, -0.28, 0.735, 0.045),
            cubic-bezier(0.68, -0.55, 0.265, 1.55),
            cubic-bezier(0.175, 0.885, 0.32, 1.275),
            cubic-bezier(0.785, 0.135, 0.15, 0.86))
          infinite;
        animation-delay: @r(5s);
      }
    `);
  }

  function init() {
    createAddressListeners();
    createActivityListeners();

    const doodle = document.querySelector('css-doodle');
    if (doodle) paintDoodle(doodle);

    document.querySelector('main').style.display = 'flex';
  }
  window.addEventListener('load', init);
})();
