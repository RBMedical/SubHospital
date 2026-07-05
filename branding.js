// ==========================================================================
// branding.js — ดึงโลโก้โรงพยาบาลมาแสดงใน sidebar โดยอัตโนมัติ
// ที่มาข้อมูล: ชีต "UserDetail"
//   คอลัมน์ E = ชื่อโรงพยาบาล (ต้องตรงกับค่าที่เก็บใน localStorage "fullname")
//   คอลัมน์ F = path รูปโลโก้ เช่น "pic/mitrpracha.png"
// ต้องโหลดไฟล์นี้หลัง AppScript.js (ใช้ตัวแปร BASE_URL ร่วมกัน)
// ==========================================================================

(function () {
  function applyHospitalLogo() {
    const logoImg = document.getElementById("hospitalLogo");
    if (!logoImg) return;

    const fullname = (localStorage.getItem("fullname") || "").trim();
    if (!fullname) return;

    fetch(BASE_URL + "?app=spe&type=userdetail")
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) return;

        const match = data.find(function (row) {
          return String(row.fullname || "").trim() === fullname;
        });

        if (match && match.logo) {
          logoImg.src = String(match.logo).trim();
        }
      })
      .catch(function (err) {
        console.error("โหลดโลโก้โรงพยาบาลไม่สำเร็จ:", err);
      });
  }

  document.addEventListener("DOMContentLoaded", applyHospitalLogo);
})();
