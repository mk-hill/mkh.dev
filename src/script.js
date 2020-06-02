(function () {
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

    const handleAddressKeypress = (e) => ['Enter', ' '].includes(e.key) && handleAddressClick(e);

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
    detailedActivities.forEach((activity) => {
      const titleLine = activity.firstElementChild;
      titleLine.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          // Do not collapse if a link in the title line is clicked
          activity.classList.add('expanded');
          activity.classList.remove('collapsed');
          return;
        }
        activity.classList.toggle('collapsed');
        activity.classList.toggle('expanded');
      });
    });
  }

  function init() {
    createAddressListeners();
    createActivityListeners();
    window.addEventListener('load', () => {
      document.querySelector('main').style.display = 'flex';
    });
  }

  init();
})();
