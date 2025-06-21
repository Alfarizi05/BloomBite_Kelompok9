export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Kontak */}
        <div>
          <h4 className="font-bold text-yellow-400 mb-3">Kontak Kami</h4>
          <p>Email: <a href="mailto:info@bloombite.id" className="hover:underline">info@bloombite.id</a></p>
          <p>Telp: 0812-3456-7890</p>
        </div>

        {/* Sosial Media */}
        <div>
          <h4 className="font-bold text-yellow-400 mb-3">Sosial Media</h4>
          <p>
            Instagram:{" "}
            <a href="https://instagram.com/bloombite.id" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">
              @bloombite.id
            </a>
          </p>
          <p>
            Facebook:{" "}
            <a href="https://facebook.com/bloombite" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">
              Bloom&Bite
            </a>
          </p>
        </div>

        {/* Branding */}
        <div className="flex flex-col items-center md:items-end">
          <img src="/img/logo.png" alt="Bloom&Bite Logo" className="h-10 w-10 mb-2" />
          <p className="text-yellow-400 font-bold text-lg">Bloom&Bite</p>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
