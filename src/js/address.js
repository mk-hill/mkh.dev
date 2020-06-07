import { addListeners } from './util';

const addressChars = ['l', 'h', 'j', 'd', '?', 'l', 'j', 'g', '-', 'c', 'd', 'u'];
const prefixChars = ['l', '`', 'h', 'k', 's', 'n', '9'];

export function createAddressListeners() {
  const addressLink = document.getElementById('address-link');
  const addressText = addressLink.querySelector('.address');

  async function writeAddressToDom(address) {
    addressText.style.maxWidth = '10rem';
    for (let i = 0; i < address.length; i++) {
      setTimeout(() => {
        addressText.textContent += address[i];
      }, i * 40);
    }
  }

  const { clickListener, keypressListener } = addListeners(addressLink, handleAddressClick);

  async function handleAddressClick(e) {
    const addOneToCharCode = (char) => String.fromCharCode(char.charCodeAt(0) + 1);
    const [address, prefix] = [addressChars, prefixChars].map((chars) => chars.map(addOneToCharCode).join(''));
    addressLink.href = prefix + address;

    if (window.getComputedStyle(addressText).display !== 'none') {
      e.preventDefault();
      addressLink.blur();
      writeAddressToDom(address);
      addressLink.removeEventListener('click', clickListener);
      addressLink.removeEventListener('keypress', keypressListener);
    }
  }
}
