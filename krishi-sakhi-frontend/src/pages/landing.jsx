import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CloudSun, IndianRupee, LayoutDashboard, Mic, ScanLine, Sprout, TrendingUp } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Counter from '../components/Counter';
import FeatureCard from '../components/FeatureCard';
import NavBar from '../components/NavBar';

import { useI18n } from '../context/I18nContext';

export default function Landing() {
  const { t } = useI18n();
  const location = useLocation();
  const priceData = [42, 45, 43, 50, 47, 52, 55];
  const rainData = [80, 65, 72, 60, 90, 78, 84];

  // Scroll to features section when route is /features
  useEffect(() => {
    if (location.pathname === '/features') {
      const featuresElement = document.getElementById('features');
      if (featuresElement) {
        featuresElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-white text-soil-900">
      <NavBar/>
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-leaf-50 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 pt-14 pb-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-4">
                {t["landing.hero.title"]}
              </h1>
              <p className="mt-4 text-soil-700 text-lg">
                {t["landing.hero.subtitle"]}
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link to="/login" className="btn bg-leaf-600 text-white hover:bg-leaf-700 inline-flex items-center gap-2">
                  {t["landing.hero.demo"]} <ArrowRight size={16}/>
                </Link>
                <Link to="/features" className="btn border border-leaf-200 hover:bg-leaf-50">{t["landing.hero.features"]}</Link>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-soil-700">
                <li>• {t["landing.hero.feature1"]}</li>
                <li>• {t["landing.hero.feature2"]}</li>
                <li>• {t["landing.hero.feature3"]}</li>
                <li>• {t["landing.hero.feature4"]}</li>
              </ul>


            </div>

            <motion.div
              initial={{opacity:0, scale:0.98}}
              whileInView={{opacity:1, scale:1}}
              viewport={{ once: true }}
              transition={{duration:0.6}}
              className="card p-6"
            >
              <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop" alt="Farming"
                className="rounded-xl w-full h-64 object-cover"/>
              <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-leaf-50">
                  <p className="text-soil-700">{t["landing.stats.yield"]}</p>
                  <p className="text-3xl font-bold flex items-baseline gap-1"><Counter to={18}/> <span className="text-base">%</span></p>
                </div>
                <div className="p-4 rounded-xl bg-leaf-50">
                  <p className="text-soil-700">{t["landing.stats.water"]}</p>
                  <p className="text-3xl font-bold flex items-baseline gap-1"><Counter to={15}/> <span className="text-base">%</span></p>
                </div>
                <div className="p-4 rounded-xl bg-leaf-50">
                  <p className="text-soil-700">{t["landing.stats.season"]}</p>
                  <p className="text-3xl font-bold">+₹8–12k</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">{t["landing.features.title"]}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Sprout} title={t["landing.features.crop.title"]} desc={t["landing.features.crop.desc"]} badge={t["landing.features.crop.badge"]}/>
            <FeatureCard icon={CloudSun} title={t["landing.features.weather.title"]} desc={t["landing.features.weather.desc"]}/>
            <FeatureCard icon={ScanLine} title={t["landing.features.disease.title"]} desc={t["landing.features.disease.desc"]}/>
            <FeatureCard icon={TrendingUp} title={t["landing.features.prices.title"]} desc={t["landing.features.prices.desc"]}/>
            <FeatureCard icon={IndianRupee} title={t["landing.features.cost.title"]} desc={t["landing.features.cost.desc"]}/>
            <FeatureCard icon={Mic} title={t["landing.features.voice.title"]} desc={t["landing.features.voice.desc"]} badge={t["landing.features.voice.badge"]}/>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="max-w-7xl mx-auto px-4 py-14">
          <div className="card p-8 text-center">
            <h3 className="text-2xl font-bold">{t["landing.cta.title"]}</h3>
            <p className="text-soil-700 mt-2">{t["landing.cta.subtitle"]}</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link to="/login" className="btn bg-leaf-600 text-white hover:bg-leaf-700 inline-flex items-center gap-2">
                {t["landing.cta.demo"]} <LayoutDashboard size={16}/>
              </Link>
              <Link to="/features" className="btn border border-leaf-200 hover:bg-leaf-50 inline-flex items-center gap-2">
                {t["landing.cta.explore"]} <BookOpen size={16}/>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-leaf-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-soil-700">
          <p>© {new Date().getFullYear()} {t["landing.footer.copyright"]}</p>
          <p className="opacity-80">{t["landing.footer.description"]}</p>
        </div>
      </footer>
    </div>
  )
}
