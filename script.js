const COURSE_CONFIG = {
  date: "待公布",
  location: "待公布",
  wechat: "待填写"
};

document.querySelectorAll("[data-config]").forEach((node) => {
  node.textContent = COURSE_CONFIG[node.dataset.config];
});

const form = document.querySelector("#registerForm");
const dialog = document.querySelector("#successDialog");
const summary = document.querySelector("#signupSummary");
const copyButton = document.querySelector("#copySignup");
const copyStatus = document.querySelector("#copyStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const record = { ...data, createdAt: new Date().toISOString() };
  const signups = JSON.parse(localStorage.getItem("courseSignups") || "[]");
  signups.push(record);
  localStorage.setItem("courseSignups", JSON.stringify(signups));

  summary.value = [
    "【AI短视频商业化培训报名】",
    `姓名：${data.name}`,
    `手机：${data.phone}`,
    `公司/机构：${data.company}`,
    `岗位：${data.role}`,
    `当前问题：${data.challenge}`
  ].join("\n");

  copyStatus.textContent = "";
  dialog.showModal();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    copyStatus.textContent = `已复制，请发送给课程顾问微信：${COURSE_CONFIG.wechat}`;
    copyButton.textContent = "已复制";
  } catch {
    summary.select();
    document.execCommand("copy");
    copyStatus.textContent = "已复制报名信息";
  }
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
