export const View = {
  displayCongratulations() {
    const inputFields = document.getElementById("input-fields");
    const button = document.getElementById("proceed");
    const form = document.getElementById("forgot-password-form");
    form.classList.replace("opacity-100", "opacity-0");

    setTimeout(() => {
      button.textContent = "Let's sign in!";
      button.addEventListener("click", () => {
        window.location.href = "./signin.html";
      });
      const underText = document.getElementById("remembered");
      form.classList.add("mb-[5rem]");
      inputFields.remove();
      underText.remove();
      const title = document.getElementById("title");
      const text = document.getElementById("text");

      title.textContent = "🎉 New password, new you!";
      title.classList.remove("lg:text-start");
      text.textContent = "Ready to continue solving the unsolvable? Let’s go!";
    }, 200);

    setTimeout(() => {
      form.classList.replace("opacity-0", "opacity-100");
    }, 300);
  },

  displayResetPassword() {
    const inputField = document.getElementById("input-field");
    const inputFields = document.getElementById("input-fields");
    const title = document.getElementById("title");
    const text = document.getElementById("text");
    const form = document.getElementById("forgot-password-form");

    form.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => {
      let label = document.getElementById("label1");
      const button = document.getElementById("proceed");
      button.textContent = "Reset my password";
      inputField.remove();
      label.remove();
      title.textContent = "Welcome back!";
      text.textContent = "Enjoy your new password!";

      const inputWrapper = document.createElement("div");
      inputWrapper.classList = "flex flex-col w-full";

      const input = document.createElement("input");
      input.classList =
        "text-black border-2 outline-none w-full focus:border-[#75e1d9] py-4 px-4 text-lg rounded-lg";
      input.setAttribute("type", "password");
      input.setAttribute("placeholder", "Amar!123");
      input.id = "password";

      label = document.createElement("label");
      label.textContent = "New Password";

      inputWrapper.append(label);
      inputWrapper.append(input);

      const inputWrapper2 = document.createElement("div");
      const input2 = document.createElement("input");

      input2.classList =
        "text-black border-2 outline-none w-full focus:border-[#75e1d9] py-4 px-4 text-lg rounded-lg";
      input2.setAttribute("placeholder", "Amar!123");
      const label2 = document.createElement("label");
      input2.id = "conf-password";
      input2.setAttribute("type", "password");
      label2.textContent = "Confirm New Password";

      input.setAttribute("name", "new-password");
      input2.setAttribute("name", "conf-password");

      inputWrapper2.append(label2);
      inputWrapper2.append(input2);

      inputFields.append(inputWrapper);
      inputFields.append(inputWrapper2);
    }, 200);

    setTimeout(() => {
      form.classList.replace("opacity-0", "opacity-100");
    }, 300);
  },

  displayGetCode() {
    const inputField = document.getElementById("input-field");
    const title = document.getElementById("title");
    const text = document.getElementById("text");
    const label = document.getElementById("label1");
    const button = document.getElementById("proceed");
    const form = document.getElementById("forgot-password-form");

    form.classList.add("opacity-0");

    setTimeout(() => {
      button.textContent = "Enter Code";
      inputField.innerHTML = "";
      title.textContent = "What's the code?";
      text.textContent =
        "Enter the code we've sent you & change your password!";
      label.textContent = "Your Code";

      for (let i = 0; i < 6; i++) {
        const codeNumber = document.createElement("input");
        codeNumber.setAttribute("type", "number");
        codeNumber.setAttribute("name", "number" + i);
        codeNumber.setAttribute("min", "0");
        codeNumber.setAttribute("max", "9");
        codeNumber.classList =
          "text-black border-2 outline-none w-[15%] focus:border-[#75e1d9] py-4 px-4 text-lg rounded-lg";

        inputField.append(codeNumber);
      }
    }, 200);

    setTimeout(() => {
      form.classList.replace("opacity-0", "opacity-100");
    }, 300);
  },
};
