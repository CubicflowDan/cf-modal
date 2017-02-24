if(!window.cf){
  window.cf = {}
}

cf.modal = function(selector){
  return new Modal(selector)
};


class Modal {

  constructor(selector) {
    this.selector = selector;
    this.currentTargetID;
    this.openButtons;
    this.contentNodes;
    this.modal;
    this.modalContent;
    this.modalCover;
    this.modalCoverImage;
    this.closeButton;
    this.nextButton;
    this.previousButton;

    this.setupDOM();
  }

  setupDOM() {

    this.addModalToDOM();

    // Setup open buttons
    this.openButtons =
      document.querySelectorAll('[data-modal-target="' + this.selector + '"]') || document.querySelectorAll('[modal-target="' + this.selector + '"]');

    if (this.openButtons.length !== 0){
      for (let button of this.openButtons) {
        button.addEventListener('click', this.open.bind(this));
      }
    } else {
      console.warn('No open buttons attached to cf-modal with selector ' + this.selector);
    }

    // Setup content nodes
    this.contentNodes = document.querySelectorAll(this.selector);
    if (this.contentNodes.length !== 0) {

    } else {
      console.warn('No cf-modals attached with selector ' + this.selector);
    }

    window.contentNodes = this.contentNodes;

    this.modal = document.querySelector('.cf-modal');
    this.modalContent = this.modal.querySelector('.cf-modal__content');
    this.modalCover = this.modal.querySelector('.cf-modal__cover');
    this.modalCoverImage = this.modal.querySelector('.cf-modal__cover__image');

    this.closeButton = this.modal.querySelector('.cf-modal__controls__close');
    this.nextButton = this.modal.querySelector('.cf-modal__controls__next');
    this.previousButton = this.modal.querySelector('.cf-modal__controls__previous');

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.nextButton.addEventListener('click', this.next.bind(this));
    this.previousButton.addEventListener('click', this.previous.bind(this));

  }


  addModalToDOM(){
    const modalTemplate = `
    <div class="cf-modal">
      <div class="cf-modal__frame">
        <div class="cf-modal__frame__scrollarea">
          <div class="cf-modal__controls">

            <a class="cf-modal__controls__close">
              <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="iPhone-7" transform="translate(-336.000000, -19.000000)" fill="#FAF9F7">
                          <g id="navigation--menu--expanded--close" transform="translate(328.000000, 11.000000)">
                              <g id="navigation--menu--expanded--close--dark">
                                  <path d="M27.9705627,15.9705627 L17.9705627,15.9705627 L17.9705627,5.97256275 C17.9705627,5.41856275 17.5235627,4.97056275 16.9705627,4.97056275 C16.4175627,4.97056275 15.9705627,5.41856275 15.9705627,5.97256275 L15.9705627,15.9705627 L5.97056275,15.9705627 C5.41756275,15.9705627 4.97056275,16.4185627 4.97056275,16.9705627 C4.97056275,17.5245627 5.41756275,17.9725627 5.97056275,17.9725627 L15.9705627,17.9725627 L15.9705627,27.9705627 C15.9705627,28.5235627 16.4175627,28.9705627 16.9705627,28.9705627 C17.5235627,28.9705627 17.9705627,28.5235627 17.9705627,27.9705627 L17.9705627,17.9725627 L27.9705627,17.9725627 C28.5235627,17.9725627 28.9705627,17.5245627 28.9705627,16.9705627 C28.9705627,16.4185627 28.5235627,15.9705627 27.9705627,15.9705627" transform="translate(16.970563, 16.970563) rotate(-45.000000) translate(-16.970563, -16.970563) "></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </svg>
            </a>

            <a class="cf-modal__controls__previous">
              <svg width="10px" height="20px" viewBox="0 0 10 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="iPhone-7" transform="translate(-24.000000, -18.000000)" fill="#FAF9F7">
                          <g id="previous" transform="translate(24.000000, 18.000000)">
                              <path d="M1.1885,10 L9.8535,0.8535 C9.9445,0.763 10,0.6385 10,0.5 C10,0.224 9.7765,0 9.5,0 C9.362,0 9.2375,0.056 9.1465,0.1465 L0.1465,9.6465 C0.056,9.7375 0,9.8625 0,10 C0,10.138 0.0555,10.263 0.1465,10.3535 L9.1465,19.8535 C9.2375,19.9445 9.362,20 9.5,20 C9.7765,20 10,19.7765 10,19.5 C10,19.3625 9.9445,19.2375 9.8535,19.1465 L1.1885,10" id="left"></path>
                          </g>
                      </g>
                  </g>
              </svg>
            </a>

            <a class="cf-modal__controls__next">
              <svg width="10px" height="20px" viewBox="0 0 10 20" version="1.1">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="iPhone-7" transform="translate(-82.000000, -18.000000)" fill="#FAF9F7">
                          <g id="next" transform="translate(82.000000, 18.000000)">
                              <path d="M9.8535,9.6465 L0.8535,0.1465 C0.763,0.056 0.638,0 0.5,0 C0.2235,0 0,0.224 0,0.5 C0,0.6385 0.056,0.763 0.1465,0.8535 L8.8115,10 L0.1465,19.1465 C0.056,19.2375 0,19.3625 0,19.5 C0,19.7765 0.2235,20 0.5,20 C0.638,20 0.763,19.9445 0.8535,19.8535 L9.8535,10.3535 C9.944,10.263 10,10.138 10,10 C10,9.862 9.944,9.7375 9.8535,9.6465" id="right"></path>
                          </g>
                      </g>
                  </g>
              </svg>
            </a>

          </div>
          <div class="cf-modal__cover">
            <img class="cf-modal__cover__image">
          </div>

          <div class="cf-modal__content">
          </div>

        </div>

        <div class="cf-modal__loader">
          <svg width="60" height="60" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#CCC">
              <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
                  <circle cx="22" cy="22" r="6" stroke-opacity="0">
                      <animate attributeName="r"
                           begin="1.5s" dur="3s"
                           values="6;22"
                           calcMode="linear"
                           repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity"
                           begin="1.5s" dur="3s"
                           values="1;0" calcMode="linear"
                           repeatCount="indefinite" />
                      <animate attributeName="stroke-width"
                           begin="1.5s" dur="3s"
                           values="2;0" calcMode="linear"
                           repeatCount="indefinite" />
                  </circle>
                  <circle cx="22" cy="22" r="6" stroke-opacity="0">
                      <animate attributeName="r"
                           begin="3s" dur="3s"
                           values="6;22"
                           calcMode="linear"
                           repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity"
                           begin="3s" dur="3s"
                           values="1;0" calcMode="linear"
                           repeatCount="indefinite" />
                      <animate attributeName="stroke-width"
                           begin="3s" dur="3s"
                           values="2;0" calcMode="linear"
                           repeatCount="indefinite" />
                  </circle>
                  <circle cx="22" cy="22" r="8">
                      <animate attributeName="r"
                           begin="0s" dur="1.5s"
                           values="6;1;2;3;4;5;6"
                           calcMode="linear"
                           repeatCount="indefinite" />
                  </circle>
              </g>
          </svg>
        </div>

      </div>
    </div>
    `
    document.body.insertAdjacentHTML('afterbegin', modalTemplate);
  }

  next(){
    const nextContentNode = this.getNextContentNode();
    if(nextContentNode){
      this.modal.classList.remove('loaded');
      window.setTimeout(() => {
        this.loadFromContentNode(nextContentNode)
      }, 400)
    }

  }

  previous(){
    const nextContentNode = this.getPreviousContentNode();
    if(nextContentNode){
      this.modal.classList.remove('loaded');
      window.setTimeout(() => {
        this.loadFromContentNode(nextContentNode)
      }, 400)
    }
  }

  getContentNodeWithID(id){
    return Array.from(this.contentNodes).find((contentNode) => {
      return contentNode.getAttribute('modalId') == id ||
      contentNode.dataset.modalId == id
    })
  }

  getNextContentNode(){
    return this.getContentNodeWithID(Number(this.currentTargetID) + 1);
  }

  getPreviousContentNode(){
    return this.getContentNodeWithID(Number(this.currentTargetID) - 1)
  }

  isModalInSequence(){
    return this.contentNodes.length > 1;
  }

  loadFromContentNode(contentNode){

    this.contentNode = contentNode;
    this.currentTargetID = contentNode.getAttribute("modalId") ||
    contentNode.dataset.modalId;

    if(this.getNextContentNode()){
      this.nextButton.classList.remove('cf-hidden');
    } else {
      this.nextButton.classList.add('cf-hidden');
    }

    if(this.getPreviousContentNode()){
      this.previousButton.classList.remove('cf-hidden');
    } else {
      this.previousButton.classList.add('cf-hidden');
    }

    const contentHTML = contentNode.innerHTML;
    this.modalContent.innerHTML = contentHTML

    const coverURL = contentNode.dataset.cover;
    if (coverURL) {
      this.modalCoverImage.onload = () => {
        this.modal.classList.add('loaded');
        this.modalCover.classList.remove('cf-modal__cover--nocover');
      }
      this.modalCoverImage.src = coverURL;
    } else {
      this.modalCoverImage.src = '';
      this.modalCover.classList.add('cf-modal__cover--nocover');
      this.modal.classList.add('loaded');
    }

  }

  open(event){

    const clickedNode = event.target;
    let targetID =
      clickedNode.getAttribute("modalTargetId") ||
      clickedNode.dataset.modalTargetId;

    let contentNode;

    // Get the right content node
    if (targetID) {
      contentNode = this.getContentNodeWithID(targetID);
    } else {
      contentNode = this.contentNodes[0];
    }

    this.modal.classList.add('active');
    this.loadFromContentNode(contentNode);

  }

  close(){
    this.modal.classList.remove('active', 'loaded');
  }

}
