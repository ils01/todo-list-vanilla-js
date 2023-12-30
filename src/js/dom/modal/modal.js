import createHTMLElement from "../createHTMLElement";

const modalContainer = createHTMLElement("div", ["modal", "details-modal"]);
const closeButton = createHTMLElement("button", ["modal__close"], { type: "button" }, "return");

const modalBody = createHTMLElement("div", ["modal__body"]);
modalContainer.append(closeButton, modalBody);

const detailsBlurModal = createHTMLElement("div", ["details-blur-modal"]);

function displayModal(modal) {
	modalBody.innerHTML = "";
	modalBody.append(modal);
	modalContainer.style.opacity = "1";
	modalContainer.style.zIndex = "2";
	detailsBlurModal.style.opacity = "1";
	detailsBlurModal.style.zIndex = "1";
}
function closeModal() {
	modalContainer.style.opacity = "0";
	modalContainer.style.zIndex = "-1";
	detailsBlurModal.style.opacity = "0";
	detailsBlurModal.style.zIndex = "-1";
}

detailsBlurModal.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);

closeModal();
export { modalContainer, detailsBlurModal, displayModal, closeModal };
