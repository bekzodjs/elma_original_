<template>
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <img src="../assets/elma-logo.png" alt="ELMA" class="footer-logo-img">
      <p>Tozalik, qulaylik va sifat. 2000-yildan beri.</p>
      <a href="tel:+998712031515">+998 71 203 15 15</a>
    </div>
    <div><h4>Katalog</h4><RouterLink to="/catalog?cat=paper">Qog‘oz mahsulotlari</RouterLink><RouterLink to="/catalog?cat=wet">Nam salfetkalar</RouterLink><RouterLink to="/catalog?cat=universal">Universal salfetkalar</RouterLink><RouterLink to="/catalog?cat=dispensers">Dispenserlar</RouterLink></div>
    <div><h4>Kompaniya</h4><RouterLink to="/about">Biz haqimizda</RouterLink><RouterLink to="/horeca">HoReCa</RouterLink><RouterLink to="/faq">FAQ</RouterLink><RouterLink to="/news">Yangiliklar</RouterLink></div>
    <div><h4>Aloqa</h4><p>Toshkent shahri, Yunusobod-6, Jumamasjid ko‘chasi</p><p>Du–Sha: 09:00–17:00</p><RouterLink to="/contact" class="footer-link">Bog‘lanish →</RouterLink></div>
  </div>
  <div class="container footer-bottom"><span>© 2026 ELMA. Barcha huquqlar himoyalangan.</span><RouterLink to="/admin/login">Admin</RouterLink></div>
</footer>
</template>
<style scoped>
.footer-logo-img{width:150px;height:64px;object-fit:contain;border-radius:10px;background:#fff;margin-bottom:8px}
</style>
