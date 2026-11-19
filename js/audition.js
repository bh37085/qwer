(() => {
  const config = {
    publicKey: "oqWBKu2c_9ibrWlSx",
    serviceId: "service_6tql4pk",
    templateId: "template_es4qcnp",
  };

  const form = document.querySelector("#audition-form");
  const status = document.querySelector("#form-status");

  if (!form || !status) {
    throw new Error("Audition form or status message element was not found.");
  }

  const submitButton = form.querySelector('button[type="submit"]');
  if (!submitButton) {
    throw new Error("Audition form submit button was not found.");
  }

  const buttonLabel = submitButton.textContent.trim();
  const isConfigured = Object.values(config).every(
    (value) => value && !value.startsWith("YOUR_"),
  );
  let emailJsReady = false;

  if (!isConfigured) {
    status.textContent =
      "이메일 연동 설정이 아직 완료되지 않았습니다. README.md를 확인해 주세요.";
  } else if (!window.emailjs) {
    status.textContent = "이메일 전송 라이브러리를 불러오지 못했습니다.";
  } else {
    try {
      window.emailjs.init({ publicKey: config.publicKey });
      emailJsReady = true;
    } catch (error) {
      console.error("EmailJS initialization failed.", error);
      status.textContent = "이메일 전송 서비스를 초기화하지 못했습니다.";
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isConfigured) {
      status.textContent =
        "이메일 연동 설정을 완료한 뒤 신청서를 보낼 수 있습니다. README.md를 확인해 주세요.";
      return;
    }

    if (!window.emailjs || !emailJsReady) {
      status.textContent = "이메일 전송 서비스를 사용할 수 없습니다.";
      return;
    }

    if (submitButton.disabled) {
      return;
    }

    submitButton.disabled = true;
    status.textContent = "신청서를 전송하고 있습니다...";

    try {
      await window.emailjs.sendForm(config.serviceId, config.templateId, form);
      status.textContent = "신청서가 이메일로 전송되었습니다.";
      form.reset();
    } catch (error) {
      console.error("EmailJS audition submission failed.", error);
      status.textContent = "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = buttonLabel;
    }
  });
})();
