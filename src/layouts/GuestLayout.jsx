// import React from 'react';

// const produk = [
//   { id: 1, nama: 'Rendang Daging', harga: 45000, gambar: 'https://via.placeholder.com/150' },
//   { id: 2, nama: 'Ayam Balado', harga: 35000, gambar: 'https://via.placeholder.com/150' },
//   { id: 3, nama: 'Sate Padang', harga: 40000, gambar: 'https://via.placeholder.com/150' },
//   { id: 4, nama: 'Gulai Ikan', harga: 42000, gambar: 'https://via.placeholder.com/150' }
// ];

// const testimoni = [
//   {
//     id: 1,
//     nama: 'Andi',
//     ulasan: 'Makanannya enak dan pengirimannya cepat!',
//     avatar: 'https://avatar-placeholder.iran.liara.run/1',
//   },
//   {
//     id: 2,
//     nama: 'Siti',
//     ulasan: 'Saya suka konsepnya, praktis dan murah!',
//     avatar: 'https://avatar-placeholder.iran.liara.run/2',
//   },
//   {
//     id: 3,
//     nama: 'Budi',
//     ulasan: 'Pilihan menunya banyak dan lezat semua!',
//     avatar: 'https://avatar-placeholder.iran.liara.run/3',
//   },
//   {
//     id: 4,
//     nama: 'Rina',
//     ulasan: 'Cocok untuk anak kost! Porsinya pas.',
//     avatar: 'https://avatar-placeholder.iran.liara.run/4',
//   },
//   {
//     id: 5,
//     nama: 'Dewi',
//     ulasan: 'Tampilan aplikasinya simpel dan mudah digunakan.',
//     avatar: 'https://avatar-placeholder.iran.liara.run/5',
//   },
// ];

// export default function GuestPage() {
//   return (
//     <div className="font-sans">
//       {/* Navigation Bar */}
//       <nav className="flex justify-between items-center p-4 shadow-md bg-white">
//         <div className="text-2xl font-bold text-red-600">Sedap</div>
//         <ul className="flex space-x-6 text-gray-700">
//           <li><a href="#about" className="hover:text-red-500">Tentang</a></li>
//           <li><a href="#produk" className="hover:text-red-500">Produk</a></li>
//           <li><a href="#testimoni" className="hover:text-red-500">Testimoni</a></li>
//         </ul>
//         <div>
//           <a href="/login" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Login / Register</a>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 bg-yellow-50">
//         <div className="max-w-xl mb-8 md:mb-0">
//           <h1 className="text-4xl font-bold text-red-600 mb-4">Nikmati Masakan Rumahan Kapanpun!</h1>
//           <p className="text-gray-700">Sedap adalah solusi makanan harian berkualitas dengan harga terjangkau, cocok untuk mahasiswa dan pekerja sibuk.</p>
//         </div>
//         <img src="https://via.placeholder.com/400x250" alt="Hero" className="rounded-xl shadow-lg" />
//       </section>

//       {/* About Section */}
//       <section id="about" className="px-6 py-12 bg-white text-center">
//         <h2 className="text-3xl font-bold mb-4 text-red-600">Tentang Sedap</h2>
//         <p className="text-gray-700 max-w-2xl mx-auto">
//           Sedap hadir untuk menyediakan makanan rumahan yang lezat dan sehat dengan harga ramah di kantong. Dengan bahan-bahan pilihan dan proses masak higienis, kami menjamin kepuasan setiap pelanggan.
//         </p>
//       </section>

//       {/* Produk Unggulan */}
//       <section id="produk" className="px-6 py-12 bg-gray-50">
//         <h2 className="text-3xl font-bold mb-8 text-center text-red-600">Produk Unggulan</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {produk.map((item) => (
//             <div key={item.id} className="bg-white rounded-xl shadow-md p-4 text-center">
//               <img src={item.gambar} alt={item.nama} className="w-full h-40 object-cover rounded-md mb-4" />
//               <h3 className="text-lg font-semibold">{item.nama}</h3>
//               <p className="text-red-500 font-bold">Rp{item.harga.toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimoni */}
//       <section id="testimoni" className="px-6 py-12 bg-white">
//         <h2 className="text-3xl font-bold mb-8 text-center text-red-600">Apa Kata Mereka?</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {testimoni.map((t) => (
//             <div key={t.id} className="bg-gray-50 rounded-xl p-6 shadow text-center">
//               <img src={t.avatar} alt={t.nama} className="w-16 h-16 rounded-full mx-auto mb-4" />
//               <h4 className="font-semibold">{t.nama}</h4>
//               <p className="text-gray-600 text-sm mt-2">"{t.ulasan}"</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-red-600 text-white px-6 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
//           <div>
//             <h5 className="font-bold text-lg mb-2">Kontak</h5>
//             <p>Email: info@sedap.com</p>
//             <p>Telp: 0812-3456-7890</p>
//           </div>
//           <div>
//             <h5 className="font-bold text-lg mb-2">Sosial Media</h5>
//             <p>Instagram: @sedap.id</p>
//             <p>TikTok: @sedap_makanan</p>
//           </div>
//           <div>
//             <h5 className="font-bold text-lg mb-2">Partner</h5>
//             <img src="https://via.placeholder.com/100x40" alt="Partner" className="mx-auto md:mx-0" />
//           </div>
//         </div>
//         <p className="text-center mt-6 text-sm">© 2025 Sedap. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
