export default function Footer() {
  return (
    <footer className="bg-green-600 text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
        <div>
          <h4 className="font-bold mb-2">Kontak Kami</h4>
          <p>Email: info@sedap.id</p>
          <p>Telp: 0812-3456-7890</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Sosial Media</h4>
          <p>Instagram: @sedap.id</p>
      saadas    <p>Facebook: Sedap Indonesia</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Partner Kami</h4>
          <img src="/img/logo.png" alt="Logo Sedap" className="h-8 w-8" />
        </div>
      </div>
    </footer>
  );
}
