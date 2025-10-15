import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Heart, Star, Users, Award, Calendar } from 'lucide-react';
import Story from '../about/Story';

const About = () => {
  const stats = [
    { icon: Users, number: 10000, suffix: '+', label: 'Guests Hosted' },
    { icon: Award, number: 5, suffix: '★', label: 'Guest Rating' },
    { icon: Calendar, number: 25, suffix: '+', label: 'Years of Hospitality' },
    { icon: Heart, number: 100, suffix: '%', label: 'Guest Satisfaction' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Heartfelt Service',
      description:
        'Every moment is guided by genuine care, ensuring guests feel at home from the moment they arrive.',
    },
    {
      icon: Star,
      title: 'Refined Comfort',
      description:
        'We redefine luxury with thoughtful touches and attention to every small detail that matters.',
    },
    {
      icon: Award,
      title: 'Global Recognition',
      description:
        'Our commitment to excellence has earned us awards and the trust of thousands of guests worldwide.',
    },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <motion.div
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent tracking-tight">
            Our Story
          </h1>
          <p className="text-lg md:text-2xl opacity-90 leading-relaxed font-light">
            Crafting timeless experiences with warmth and elegance since 2000.
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <StatsSection stats={stats} fadeUp={fadeUp} />

      {/* Story / Our Journey */}
      <Section title="Our Journey" fadeUp={fadeUp}>
        <Story />
      </Section>

      {/* Values Section */}
      <ValuesSection values={values} fadeUp={fadeUp} />
    </div>
  );
};

export default About;

const StatsSection = ({ stats, fadeUp }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerAlways: true });

  React.useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        variants={fadeUp}
        initial="hidden"
        animate={controls}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={fadeUp}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full p-6 mx-auto mb-4 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Icon size={40} className="text-yellow-600 mx-auto" />
              </div>
              <div className="text-3xl font-semibold text-gray-800 mb-1">
                {inView && (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

const Section = ({ title, children, fadeUp }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerAlways: true });

  React.useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <section ref={ref} className="py-20 px-6 bg-slate-50">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
};

const ValuesSection = ({ values, fadeUp }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerAlways: true });

  React.useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-r from-yellow-50 to-white">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 w-fit mx-auto mb-6 shadow-md">
                  <IconComponent size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
