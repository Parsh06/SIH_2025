import { motion } from 'framer-motion'

export default function FeatureCard({icon:Icon, title, desc, badge}) {
  return (
    <motion.div
      className="card p-5 hover:shadow-lg transition-shadow"
      initial={{opacity:0, y:12}}
      whileInView={{opacity:1, y:0}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{duration:0.45}}
      whileHover={{scale:1.02}}
      whileTap={{scale:0.98}}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-leaf-50 text-leaf-700 grid place-items-center">
          <Icon/>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{title}</h3>
            {badge && <span className="px-2 py-0.5 text-xs rounded-full bg-leaf-100 text-leaf-700 border border-leaf-200">{badge}</span>}
          </div>
          <p className="text-soil-700">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}
