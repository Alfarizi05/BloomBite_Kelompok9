// import { useState, useEffect } from "react";

// const products = [
//   { id: 1, name: "Rendang Sedap", price: 35000, image: "/img/rendang.jpg" },
//   { id: 2, name: "Ayam Bakar Sedap", price: 30000, image: "/img/ayam-bakar.jpg" },
//   { id: 3, name: "Sate Padang Sedap", price: 28000, image: "/img/sate.jpg" },
//   { id: 4, name: "Nasi Goreng Sedap", price: 25000, image: "/img/nasgor.jpg" },
//   { id: 5, name: "Ikan Bakar Sedap", price: 27000, image: "/img/ikan-bakar.jpg" },
//   { id: 6, name: "Ikan Nila Goreng", price: 26000, image: "/img/ikan-nila.jpg" },
//   { id: 7, name: "Ayam Rendang Pedas", price: 32000, image: "/img/ayam-rendang.jpg" },
//   { id: 8, name: "Ayam Geprek Sedap", price: 24000, image: "/img/ayam-geprek.jpg" },
// ];

// const testimonials = [
//   { id: 1, name: "Andi", review: "Makanannya enak dan pengantarannya cepat!", avatar: "/img/man.png", rating: 4.5 },
//   { id: 2, name: "Sari", review: "Porsi besar dan rasanya mantap!", avatar: "/img/woman.png", rating: 4.7 },
//   { id: 3, name: "Budi", review: "Harga terjangkau dan kualitas terjamin.", avatar: "/img/man.png", rating: 4.3 },
//   { id: 4, name: "Rina", review: "Sangat puas dengan pelayanan Sedap!", avatar: "/img/woman.png", rating: 4.8 },
//   { id: 5, name: "Dewi", review: "Variasi menu yang banyak dan menggoda.", avatar: "/img/woman.png", rating: 4.6 },
//   { id: 6, name: "Agus", review: "Rasanya autentik dan selalu segar.", avatar: "/img/man.png", rating: 4.4 },
//   { id: 7, name: "Lina", review: "Pengiriman cepat dan pelayanan ramah.", avatar: "/img/woman.png", rating: 4.7 },
//   { id: 8, name: "Rudy", review: "Harga sesuai dengan kualitas makanannya.", avatar: "/img/man.png", rating: 4.2 },
//   { id: 9, name: "Maya", review: "Tempat makan yang cozy dan nyaman.", avatar: "/img/woman.png", rating: 4.6 },
//   { id: 10, name: "Hadi", review: "Menu lengkap dan pilihan yang variatif.", avatar: "/img/man.png", rating: 4.5 },
//   { id: 11, name: "Sinta", review: "Makanannya selalu membuat ketagihan.", avatar: "/img/woman.png", rating: 4.8 },
//   { id: 12, name: "Bambang", review: "Layanan cepat dan makanannya enak.", avatar: "/img/man.png", rating: 4.3 },
//   { id: 13, name: "Nina", review: "Pilihan menu sehat dan lezat.", avatar: "/img/woman.png", rating: 4.6 },
//   { id: 14, name: "Joko", review: "Harga bersahabat untuk kantong mahasiswa.", avatar: "/img/man.png", rating: 4.1 },
//   { id: 15, name: "Diana", review: "Suka banget sama rasanya yang autentik.", avatar: "/img/woman.png", rating: 4.7 },
//   { id: 16, name: "Eko", review: "Makanan selalu fresh dan lezat.", avatar: "/img/man.png", rating: 4.5 },
//   { id: 17, name: "Rita", review: "Pelanggan tetap karena rasa yang konsisten.", avatar: "/img/woman.png", rating: 4.7 },
//   { id: 18, name: "Fajar", review: "Suasana restoran sangat menyenangkan.", avatar: "/img/man.png", rating: 4.4 },
//   { id: 19, name: "Tika", review: "Makanan cepat datang dan rasanya mantap.", avatar: "/img/woman.png", rating: 4.6 },
//   { id: 20, name: "Wawan", review: "Rekomendasi banget buat pecinta kuliner!", avatar: "/img/man.png", rating: 4.5 },
// ];

// const members = [
//   { member_id: 1, nama: "Andi Setiawan", email: "andi@email.com", tipe_member: "silver" },
//   { member_id: 2, nama: "Budi Hartono", email: "budi@email.com", tipe_member: "gold" },
//   { member_id: 3, nama: "Clara Wijaya", email: "clara@email.com", tipe_member: "platinum" },
//   { member_id: 4, nama: "Dewi Lestari", email: "dewi@email.com", tipe_member: "silver" },
//   { member_id: 5, nama: "Eka Pratama", email: "eka@email.com", tipe_member: "gold" },
// ];

// export default function SedapGuestPage() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState(null);

//   const checkMember = () => {
//     if (!email || !email.includes("@")) {
//       setMessage({ text: "❌ Email tidak boleh kosong dan harus valid.", color: "text-green-600" });
//       return;
//     }
//     const member = members.find((m) => m.email.toLowerCase() === email.toLowerCase());
//     if (member) {
//       const colorMap = {
//         silver: "text-gray-500",
//         gold: "text-yellow-500",
//         platinum: "text-purple-500",
//       };
//       setMessage({
//         text: `🧾 Selamat datang, ${member.nama}! Anda adalah member ${member.tipe_member}.`,
//         color: colorMap[member.tipe_member] || "text-black",
//       });
//     } else {
//       setMessage({ text: "❌ Email tidak terdaftar sebagai member.", color: "text-green-600" });
//     }
//   };

//   const [isScrolled, setIsScrolled] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="font-sans">
//       {/* Navigation Bar */}
//       <nav
//         className={`fixed top-0 left-0 w-full bg-white py-4 px-8 flex justify-between items-center z-50 transition-all duration-300 ${isScrolled ? "shadow-md border-b border-gray-200" : ""
//           }`}
//       >
//         <div className="flex items-center gap-2">
//           <img src="/img/logo.png" alt="Logo Sedap" className="h-8 w-8 object-contain" />
//           <span className="text-xl font-bold text-red-600">Sedap</span>
//         </div>

//         <ul className="flex gap-6 text-gray-700 items-center">
//           <li><a href="#hero" className="hover:text-green-500">Beranda</a></li>
//           <li><a href="#about" className="hover:text-green-500">Tentang</a></li>
//           <li><a href="#produk" className="hover:text-green-500">Menu</a></li>
//           <li><a href="#testimoni" className="hover:text-green-500">Testimoni</a></li>
//           <li><a href="#cek-member" className="hover:text-green-500">Cek Member</a></li>
//           <li>
//             <a
//               href="/login"
//               className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
//             >
//               Login
//             </a>
//           </li>
//           <li>
//             <a
//               href="/register"
//               className="bg-white-500 text-gray px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
//             >
//               Register
//             </a>
//           </li>
//         </ul>
//       </nav>


//       {/* Hero Section (Skywave Style) */}
//       <section
//         id="hero"
//         className="relative bg-white py-16 px-6 md:px-12 overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] bg-cover opacity-10 pointer-events-none" />
//         <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">
//           <div className="md:w-1/2">
//             <h2 className="text-gray-800 text-lg font-medium mb-2">
//               Kuliner Nusantara Terlezat
//             </h2>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
//               Rasakan Lezatnya <br className="hidden md:block" />
//               Makanan <span className="text-green-500">Sedap</span>
//             </h1>
//             <p className="text-gray-600 text-base mb-6 max-w-md">
//               Nikmati berbagai pilihan masakan khas Indonesia yang disiapkan
//               dengan bahan berkualitas dan rasa otentik.
//             </p>
//             <div className="flex items-center gap-6 mb-6">
//               <div className="flex items-center gap-2">
//                 <img src="/img/google.png" alt="Google" className="w-5 h-5" />
//                 <span className="text-yellow-500 font-semibold">4.5</span>
//                 <span className="text-sm text-gray-600">Rating Google</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <img
//                   src="/img/linkedin.png"
//                   alt="LinkedIn"
//                   className="w-5 h-5"
//                 />
//                 <span className="text-yellow-500 font-semibold">4.7</span>
//                 <span className="text-sm text-gray-600">Rating LinkedIn</span>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">
//                 Lihat Menu
//               </button>
//               <button className="bg-sky-500 text-white px-6 py-3 rounded-lg shadow hover:bg-sky-600 transition">
//                 Hubungi Kami
//               </button>
//             </div>
//           </div>
//           <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
//             <img
//               src="/img/woman.jpg"
//               alt="Hero Person"
//               className="w-full max-w-md"
//             />
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="scroll-mt-20 p-8 text-center">
//         <h2 className="text-3xl font-bold text-green-600 mb-4">Tentang Sedap</h2>
//         <p className="text-gray-700 max-w-2xl mx-auto">
//           Sedap adalah platform kuliner yang menghadirkan berbagai masakan khas
//           nusantara dengan rasa otentik, bahan berkualitas, dan layanan cepat.
//           Kami berkomitmen menyajikan makanan terbaik untuk pengalaman makan
//           yang tak terlupakan.
//         </p>
//       </section>

//       {/* Produk Unggulan */}
//       <section id="produk" className="scroll-mt-20 p-8 bg-gray-50">
//         <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
//           Menu Makanan
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow p-4 text-center"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-40 object-cover rounded"
//               />
//               <h3 className="mt-2 font-semibold">{product.name}</h3>
//               <p className="text-green-600 font-bold">
//                 Rp{product.price.toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimoni (updated to 2-column with avatar, name, rating, review) */}
//       {/* Testimoni (3 kolom, rating angka kuning) */}
//       <section id="testimoni" className="scroll-mt-20 py-10 bg-gray-50 text-center">
//         <h2 className="text-3xl font-bold text-green-600 mb-6">Testimoni Pelanggan</h2>
//         <div className="grid md:grid-cols-3 gap-6 px-8">
//           {testimonials.slice(0, 9).map((t) => (
//             <div key={t.id} className="bg-white shadow p-4 rounded">
//               <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
//               <p className="italic">"{t.review}"</p>
//               <p className="font-semibold mt-2">- {t.name}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section id="cek-member" className="scroll-mt-20 p-8 text-center">
//         <h2 className="text-2xl font-bold mb-4 text-green-600">
//           Cek Keanggotaan
//         </h2>
//         <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
//           <input
//             type="email"
//             placeholder="Masukkan email Anda"
//             className="border border-gray-300 px-4 py-2 rounded w-full"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             aria-label="Input email untuk cek member"
//           />
//           <button
//             onClick={checkMember}
//             className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//           >
//             Cek Sekarang
//           </button>
//           {message && (
//             <div className={`mt-4 font-semibold ${message.color}`}>
//               {message.text}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-green-600 text-white p-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
//           <div>
//             <h4 className="font-bold mb-2">Kontak Kami</h4>
//             <p>Email: info@sedap.id</p>
//             <p>Telp: 0812-3456-7890</p>
//           </div>
//           <div>
//             <h4 className="font-bold mb-2">Sosial Media</h4>
//             <p>Instagram: @sedap.id</p>
//             <p>Facebook: Sedap Indonesia</p>
//           </div>
//           <div>
//             <h4 className="font-bold mb-2">Partner Kami</h4>
//             <img
//               src="/images/partner.png"
//               alt="Partner Sedap"
//               className="h-12 mx-auto md:mx-0"
//             />
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
