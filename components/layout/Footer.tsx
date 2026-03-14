import type { SiteConfig } from '@/lib/types';

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {

  return (
    <footer className="bg-gradient-to-br from-eco-dark to-eco-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-eco-mint">Контакти</h3>
            <div className="space-y-2 text-white/90">
              <p>📧 {config.email}</p>
              <p>📞 {config.phone}</p>
              <p>📍 {config.address}</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-eco-mint">Соціальні мережі</h3>
            <div className="flex space-x-4">
              {config.instagram && (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-eco-mint transition-colors"
                >
                  Instagram
                </a>
              )}
              {config.facebook && (
                <a
                  href={config.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-eco-mint transition-colors"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-eco-mint">Про нас</h3>
            <p className="text-white/90">
              {config.siteDescription}
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
          <p>{config.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
