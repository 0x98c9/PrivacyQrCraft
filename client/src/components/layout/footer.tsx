export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <span className="text-sm text-gray-500">© {new Date().getFullYear()} Privacy-Friendly QR Generator</span>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center text-xs text-gray-500 md:text-right">
              Your data never leaves your device.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
