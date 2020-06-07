import { addListeners } from './util';

export function createActivityListeners() {
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

    addListeners(titleLine, handler);
  });
}
