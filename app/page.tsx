import { getHomePageContent } from '@/lib/content';
import { PageContainer, MushroomIcon, HeroSlider } from '@/components/ui/Layout';

export default function HomePage() {
  const content = getHomePageContent();

  return (
    <>
      {/* Hero Section with Slider */}
      <section id="home" className="relative">
        {/* Hero Slider Background */}
        <HeroSlider />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <PageContainer className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-white mb-6 animate-fade-in drop-shadow-2xl">
              {content.hero.title}
              <br />
              <span className="text-eco-mint">{content.hero.subtitle}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white max-w-3xl mx-auto mb-12 animate-slide-up drop-shadow-lg">
              {content.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a
                href="#shop"
                className="group relative px-8 py-4 bg-white text-eco-dark rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">
                  <i className="fas fa-shopping-basket mr-2"></i>
                  {content.hero.ctaButtons.shop}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-eco-light to-eco-sage transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <a
                href="#tourism"
                className="group relative px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-eco-dark transition-all duration-300"
              >
                <i className="fas fa-leaf mr-2"></i>
                {content.hero.ctaButtons.tourism}
              </a>
            </div>
          </PageContainer>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl drop-shadow-lg"></i>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-eco-cream/30">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <span className="text-eco-light font-semibold text-sm uppercase tracking-wider">
                {content.about.badge}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold font-display text-eco-dark leading-tight">
                {content.about.title}
                <br />
                <span className="text-eco-light">{content.about.titleHighlight}</span>
              </h2>
              <div className="space-y-4 text-gray-700">
                {content.about.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                <div className="bg-eco-light/10 border-l-4 border-eco-light p-4 rounded-r-lg">
                  <p className="text-eco-dark font-medium">
                    <i className="fas fa-info-circle mr-2 text-eco-light"></i>
                    {content.about.infoBox}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-eco-light">{content.stats.hectares.value}</div>
                  <div className="text-sm text-gray-600">{content.stats.hectares.label}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-eco-light">{content.stats.distance.value}</div>
                  <div className="text-sm text-gray-600">{content.stats.distance.label}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-eco-light">{content.stats.eco.value}</div>
                  <div className="text-sm text-gray-600">{content.stats.eco.label}</div>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-br from-eco-light to-eco-sage rounded-2xl flex items-center justify-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                  <MushroomIcon size={96} />
                </div>
                <div className="h-32 bg-gradient-to-br from-eco-brown to-eco-dark rounded-2xl flex items-center justify-center text-5xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                  🌰
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 bg-gradient-to-br from-eco-sage to-eco-mint rounded-2xl flex items-center justify-center text-5xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                  🌳
                </div>
                <div className="h-48 bg-gradient-to-br from-eco-cream to-eco-light/30 rounded-2xl flex items-center justify-center text-6xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                  🌿
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-white">
        <PageContainer>
          <div className="text-center mb-12">
            <span className="text-eco-light font-semibold text-sm uppercase tracking-wider">Інтернет-магазин</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-display text-eco-dark mt-4">Наші органічні продукти</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mushrooms Product */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-eco-light/90 to-eco-sage/90 z-10"></div>
              <div className="relative z-20 p-8 text-white">
                <div className="mb-4 flex justify-center">
                  <MushroomIcon size={72} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Свіжі печериці</h3>
                <p className="mb-4 opacity-90">Вирощені за власною екологічною технологією</p>
                <button className="bg-white text-eco-dark px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                  Замовити
                </button>
              </div>
            </div>

            {/* Hazelnuts Product */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-eco-brown/90 to-eco-dark/90 z-10"></div>
              <div className="relative z-20 p-8 text-white">
                <div className="text-6xl mb-4">🌰</div>
                <h3 className="text-2xl font-bold mb-2">Лісовий горіх</h3>
                <p className="mb-4 opacity-90">Фундук з власного саду, багатий на вітаміни</p>
                <button className="bg-white text-eco-brown px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                  Замовити
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Tourism Section */}
      <section id="tourism" className="py-20 bg-gradient-to-b from-eco-cream/30 to-white">
        <PageContainer>
          <div className="text-center mb-12">
            <span className="text-eco-light font-semibold text-sm uppercase tracking-wider">Що ми пропонуємо?</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-display text-eco-dark mt-4">Туризм та відпочинок</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Excursions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-eco-light to-eco-sage rounded-xl flex items-center justify-center text-3xl mb-4">
                🚶
              </div>
              <h3 className="text-xl font-bold text-eco-dark mb-3">Екскурсії на грибне виробництво</h3>
              <p className="text-gray-600 mb-4">Кожної суботи та неділі о 12:00. Групові екскурсії за попереднім записом.</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Тривалість:</span>
                  <span className="font-semibold text-eco-dark">1 година</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Мінімум осіб:</span>
                  <span className="font-semibold text-eco-dark">10</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-eco-light/10 px-3 py-2 rounded-lg flex justify-between">
                  <span>Дорослі</span>
                  <span className="font-bold text-eco-light">150 грн</span>
                </div>
                <div className="bg-eco-light/10 px-3 py-2 rounded-lg flex justify-between">
                  <span>7-16 років</span>
                  <span className="font-bold text-eco-light">100 грн</span>
                </div>
                <div className="bg-eco-light/10 px-3 py-2 rounded-lg flex justify-between">
                  <span>До 6 років</span>
                  <span className="font-bold text-eco-light">Безкоштовно</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-eco-light to-eco-sage text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Забронювати
              </button>
            </div>

            {/* Photo Sessions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-eco-brown to-eco-dark rounded-xl flex items-center justify-center text-3xl mb-4">
                📸
              </div>
              <h3 className="text-xl font-bold text-eco-dark mb-3">Фотосесії в саду</h3>
              <p className="text-gray-600 mb-4">50 га для вашої творчості! Ідеально для портретної, романтичної, сімейної фотосесії.</p>
              <div className="bg-eco-brown/10 p-4 rounded-xl mb-4">
                <div className="text-3xl font-bold text-eco-brown mb-1">300 грн</div>
                <div className="text-sm text-gray-600">за годину</div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <i className="fas fa-check text-eco-light mr-2"></i>Горіховий сад
                </li>
                <li>
                  <i className="fas fa-check text-eco-light mr-2"></i>Озеро
                </li>
                <li>
                  <i className="fas fa-check text-eco-light mr-2"></i>Природні локації
                </li>
              </ul>
            </div>

            {/* Location Rental */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-eco-sage to-eco-mint rounded-xl flex items-center justify-center text-3xl mb-4">
                🏕️
              </div>
              <h3 className="text-xl font-bold text-eco-dark mb-3">Оренда локації</h3>
              <p className="text-gray-600 mb-4">Місця для відпочинку на свіжому повітрі для ваших заходів.</p>
              <div className="space-y-3">
                <div className="border-l-4 border-eco-light pl-3">
                  <h4 className="font-semibold text-eco-dark">Шатер</h4>
                  <p className="text-sm text-gray-600">До 50-60 осіб зі сценою</p>
                </div>
                <div className="border-l-4 border-eco-sage pl-3">
                  <h4 className="font-semibold text-eco-dark">Гриль-зони</h4>
                  <p className="text-sm text-gray-600">10-20 осіб біля саду/озера</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-eco-sage to-eco-mint text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Дізнатись ціну
              </button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Master Classes Section */}
      <section id="masters" className="py-20 bg-white">
        <PageContainer>
          <div className="text-center mb-12">
            <span className="text-eco-light font-semibold text-sm uppercase tracking-wider">Розвиваємо таланти</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-display text-eco-dark mt-4">Майстер-класи</h2>
            <p className="text-gray-600 mt-4 text-lg">Від 6 осіб • За попереднім записом</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { icon: '🌾', name: 'Соломоплетіння' },
              { icon: '🏺', name: 'Гончарство' },
              { icon: '🎨', name: 'Вибійка' },
              { icon: '🧿', name: 'Обереги' },
              { icon: '🍵', name: 'Фіто церемонія' },
              { icon: '🎵', name: 'Музична терапія' },
              { icon: '🌸', name: 'Аромотерапія' },
              { icon: '🧘', name: 'Йога та медитація' },
              { icon: '🎯', name: 'Дитячі квести' },
              { icon: '👨‍🍳', name: 'Кулінарні класи' },
              { icon: '💫', name: 'Ретрити' },
              { icon: '👭', name: 'Жіночі кола' },
            ].map((masterClass, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-eco-light/10 to-eco-sage/10 rounded-2xl p-6 text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:animate-bounce-slow">{masterClass.icon}</div>
                <h3 className="font-semibold text-eco-dark">{masterClass.name}</h3>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-eco-dark to-eco-brown text-white">
        <PageContainer>
          <div className="text-center mb-12">
            <span className="text-eco-mint font-semibold text-sm uppercase tracking-wider">Зв&apos;яжіться з нами</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mt-4">Ласкаво просимо!</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Контактна інформація</h3>
              <div className="space-y-4 text-lg">
                <p>
                  <i className="fas fa-envelope mr-3 text-eco-mint"></i>
                  info@yvk.com.ua
                </p>
                <p>
                  <i className="fas fa-phone mr-3 text-eco-mint"></i>
                  +380 XX XXX XX XX
                </p>
                <p>
                  <i className="fas fa-map-marker-alt mr-3 text-eco-mint"></i>
                  Київська область, 49 км від м. Київ
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-map text-6xl text-eco-mint mb-4"></i>
                <p className="text-xl">Яблунівський виробничий комплекс</p>
                <p className="text-eco-mint mt-2">Київська область</p>
                <button className="mt-4 px-6 py-3 bg-eco-light text-white rounded-full hover:bg-eco-sage transition-colors">
                  Прокласти маршрут
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
