import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-brown text-text-light">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold text-primary-gold mb-4">Templo Adoracion Y Alabanza</h3>
            <address className="not-italic mb-4 text-sm leading-6">
              <p>209 S 7th Street</p>
              <p>Wilmington, NC</p>
            </address>
          </div>
          
          {/* Service Times */}
          <div>
            <h3 className="text-xl font-bold text-primary-gold mb-4">Service Times</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">Sunday Worship</p>
                  <p>11:00 AM</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">Tuesday Prayer Night</p>
                  <p>7:00 PM</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <div>
                  <p className="font-medium">Friday Bible Study/Youth Night</p>
                  <p>7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-primary-gold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-primary-gold transition-colors">
                  Ministries
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary-gold transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-primary-gold transition-colors">
                  Sermons
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="mt-8 border-t border-primary-gold/30 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <a 
              href="https://www.facebook.com/temploadoracionyalabanza" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-cream hover:text-primary-gold transition-colors"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-1.9c-1.5 0-2.1.659-2.1 1.875v1.125z"/>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@temploadoracionyalabanza9424" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-cream hover:text-primary-gold transition-colors"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>
              </svg>
            </a>
            {/* <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-cream hover:text-primary-gold transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.082c1.602 0 1.792.006 2.425.035 1.627.074 2.385.845 2.46 2.459.028.633.034.822.034 2.424s-.006 1.792-.034 2.424c-.075 1.613-.832 2.386-2.46 2.46-.633.028-.822.035-2.425.035-1.602 0-1.792-.006-2.424-.035-1.63-.075-2.385-.849-2.46-2.46-.028-.632-.035-.822-.035-2.424s.007-1.792.035-2.424c.074-1.615.832-2.386 2.46-2.46.632-.029.822-.034 2.424-.034zm0-1.082c-1.63 0-1.833.007-2.474.037-2.18.1-3.39 1.309-3.49 3.489-.029.641-.036.845-.036 2.474 0 1.63.007 1.834.036 2.474.1 2.179 1.31 3.39 3.49 3.49.641.029.844.036 2.474.036 1.63 0 1.834-.007 2.475-.036 2.176-.1 3.391-1.309 3.489-3.49.029-.64.036-.844.036-2.474 0-1.629-.007-1.833-.036-2.474-.098-2.177-1.309-3.39-3.489-3.489-.641-.03-.845-.037-2.475-.037zm0 2.919c-1.701 0-3.081 1.379-3.081 3.081s1.38 3.081 3.081 3.081 3.081-1.379 3.081-3.081c0-1.701-1.38-3.081-3.081-3.081zm0 5.081c-1.105 0-2-.895-2-2 0-1.104.895-2 2-2 1.104 0 2.001.895 2.001 2 0 1.105-.897 2-2.001 2zm3.202-5.922c-.397 0-.72.322-.72.72 0 .397.322.72.72.72.398 0 .721-.322.721-.72 0-.398-.322-.72-.721-.72z"/>
              </svg>
            </a> */}
          </div>
          <p className="text-sm text-accent-cream/70">
            © {currentYear} Templo Adoracion Y Alabanza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 