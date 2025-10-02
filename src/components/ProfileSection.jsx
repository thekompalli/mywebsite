import React from 'react';
import { motion } from 'framer-motion';

const ProfileSection = () => {
  return (
    <section className="premium-spacing" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/my_dp.jpg"
              alt="Krishna Kompalli - Lead Data Scientist"
              className="w-96 h-96 md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] object-cover rounded-lg shadow-xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-lg"
            >
              <h3 className="text-lg font-bold text-black mb-1">Krishna Kompalli</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Lead Data Scientist | AI & Machine Learning
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
