export function showAlert(superDialogBoxReference, text) {
  const container = document.createElement("div");
  container.classList.add("popups-container");

  container.innerHTML = /* html */ `
        <dialog class="popup-dialog-box" closeby="any">
            <div class="container"> 
                <div class="dialog-header">
                    Alert
                </div>
                <div class="text">${text}</div>
                <div class="button-group">
                    <div class="yes-button">OK</div>
                </div>
            </div>
        </dialog>
    `;

  const dialogBoxReference = container.querySelector(".popup-dialog-box");
  dialogBoxReference
    .querySelector(".yes-button")
    .addEventListener("click", (event) => {
      dialogBoxReference.close();
      superDialogBoxReference.showModal();
      setTimeout(() => {
        container.remove();
      }, 500);
    });

  superDialogBoxReference.close();
  document.body.append(container);
  dialogBoxReference.showModal();
}

export async function showConfirm(superDialogBoxReference, text) {
  return new Promise((resolve) => {
    const container = document.createElement("div");

    container.innerHTML = /* html */ `
        <dialog class="popup-dialog-box" closeby="any" >
            <div class="container"> 
                <div class="dialog-header">
                    Confirm
                </div>
                <div class="text">${text}</div>
                <div class="button-group">
                    <div class="no-button">Cancel</div>
                    <div class="yes-button">Delete</div>
                </div>
            </div>
        </dialog>
    `;

    const dialogBoxReference = container.querySelector(".popup-dialog-box");
    dialogBoxReference
      .querySelector(".yes-button")
      .addEventListener("click", (event) => {
        dialogBoxReference.close();
        resolve(true);
        superDialogBoxReference.showModal();
        setTimeout(() => {
          container.remove();
        }, 350);
      });
    dialogBoxReference
      .querySelector(".no-button")
      .addEventListener("click", (event) => {
        dialogBoxReference.close();
        resolve(false);
        superDialogBoxReference.showModal();
        setTimeout(() => {
          container.remove();
        }, 350);
        return false;
      });

    superDialogBoxReference.close();
    document.body.append(container);
    dialogBoxReference.showModal();
  });
}
