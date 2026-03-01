const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container-page flex items-center justify-between text-sm text-gray-500">
        <span>© {new Date().getFullYear()} HotelBooking. All rights reserved.</span>
        <span>Built for production demo.</span>
      </div>
    </footer>
  );
};

export default Footer;

